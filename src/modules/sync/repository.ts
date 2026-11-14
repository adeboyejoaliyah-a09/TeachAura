import { Prisma, type PrismaClient } from "@prisma/client";
import {
  modelDataFromPayload,
  recordFromModel,
  syncEntityRegistry,
  type ParsedSyncChange,
  type SyncEntity,
  type SyncRecord,
  type SyncedRecord,
  type SyncTransaction,
} from "./registry.js";
import { pushResultSchema, type PushResult } from "./schemas.js";

export interface PulledChange {
  change_id: string;
  entity: SyncEntity;
  operation: "upsert" | "delete";
  record: SyncedRecord;
}

export interface PullPage {
  changes: PulledChange[];
  nextSequence: string;
  hasMore: boolean;
}

export interface SyncRepository {
  applyChange(ownerId: string, change: ParsedSyncChange): Promise<PushResult>;
  pullChanges(
    ownerId: string,
    afterSequence: string,
    limit: number,
  ): Promise<PullPage>;
}

interface ModelDelegate {
  findUnique(args: { where: Record<string, unknown> }): Promise<unknown>;
  create(args: { data: Record<string, unknown> }): Promise<unknown>;
  update(args: {
    where: Record<string, unknown>;
    data: Record<string, unknown>;
  }): Promise<unknown>;
  findMany(args: {
    where: Record<string, unknown>;
    orderBy: Record<string, unknown>;
    take: number;
    select: Record<string, boolean>;
  }): Promise<
    Array<{
      sequence: bigint;
      changeId: string;
      entityType: SyncEntity;
      operation: "upsert" | "delete";
      status: "accepted" | "rejected";
      result: Prisma.JsonValue;
    }>
  >;
}

function toJson(value: object): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function parseStoredResult(value: Prisma.JsonValue): PushResult {
  return pushResultSchema.parse(value) as PushResult;
}

function delegateFor(
  transaction: Prisma.TransactionClient,
  model: string,
): ModelDelegate {
  const delegate = transaction[model as keyof Prisma.TransactionClient];
  if (typeof delegate !== "object" || delegate === null) {
    throw new Error(`Unknown Prisma model delegate: ${model}`);
  }
  return delegate as unknown as ModelDelegate;
}

function isPrismaUniqueViolation(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export class PrismaSyncRepository implements SyncRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async applyChange(
    ownerId: string,
    change: ParsedSyncChange,
  ): Promise<PushResult> {
    const definition = syncEntityRegistry[change.entity];
    try {
      return await this.prisma.$transaction(async (transaction) => {
        await transaction.$queryRaw`SELECT set_config('app.teacher_id', ${ownerId}, true)`;
        await transaction.$queryRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`${ownerId}:${change.change_id}`}, 0))::text`;

        const previous = await transaction.syncChange.findUnique({
          where: { ownerId_changeId: { ownerId, changeId: change.change_id } },
          select: { result: true },
        });
        if (previous) {
          return { ...parseStoredResult(previous.result), replayed: true };
        }

        await transaction.$queryRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`${change.entity}:${change.record.id}`}, 1))::text`;
        const entityDelegate = delegateFor(transaction, definition.prismaModel);
        const current = await entityDelegate.findUnique({
          where: {
            id: change.record.id,
            [definition.ownershipField]: ownerId,
          },
        });
        const now = new Date();
        let result: PushResult;

        if (!current && change.operation === "delete") {
          result = {
            change_id: change.change_id,
            status: "rejected",
            reason: "not_found",
            message: "The record does not exist or is not accessible.",
          };
        } else if (
          current &&
          !this.isOwnedRecord(current, ownerId, definition.ownershipField)
        ) {
          result = {
            change_id: change.change_id,
            status: "rejected",
            reason: "id_conflict",
            message: "A record with this id already exists.",
          };
        } else if (!current && change.base_version !== 0) {
          result = {
            change_id: change.change_id,
            status: "rejected",
            reason: "not_found",
            message: "The record does not exist at the supplied base version.",
          };
        } else {
          const validationError =
            change.operation === "upsert"
              ? await this.validateReferences(
                  transaction,
                  definition,
                  change.record,
                  ownerId,
                )
              : null;
          if (validationError) {
            result = {
              change_id: change.change_id,
              status: "rejected",
              reason: "validation_failed",
              message: validationError,
            };
          } else {
            result = await this.applyAcceptedChange(
              entityDelegate,
              definition,
              ownerId,
              change,
              current,
              now,
            );
          }
        }

        await transaction.syncChange.create({
          data: {
            ownerId,
            changeId: change.change_id,
            entityType: change.entity,
            entityId: change.record.id,
            operation: change.operation,
            status: result.status,
            result: toJson(result),
          },
        });
        return result;
      });
    } catch (error) {
      if (isPrismaUniqueViolation(error)) {
        return this.saveIdConflict(ownerId, change);
      }
      throw error;
    }
  }

  private isOwnedRecord(
    value: unknown,
    ownerId: string,
    ownershipField: string,
  ): boolean {
    if (typeof value !== "object" || value === null) return false;
    const row = value as Record<string, unknown>;
    return ownershipField in row && row[ownershipField] === ownerId;
  }

  private async validateReferences(
    transaction: Prisma.TransactionClient,
    definition: (typeof syncEntityRegistry)[SyncEntity],
    record: SyncRecord,
    ownerId: string,
  ): Promise<string | null> {
    const syncContext: SyncTransaction = {
      lookupOwned: async (entity, id, teacherId) => {
        const target = syncEntityRegistry[entity];
        const row = await delegateFor(
          transaction,
          target.prismaModel,
        ).findUnique({
          where: {
            id,
            [target.ownershipField]: teacherId,
            deletedAt: null,
          },
        });
        if (typeof row !== "object" || row === null) return null;
        return row as SyncRecord;
      },
    };

    for (const reference of definition.foreignKeys ?? []) {
      const id = record[reference.field];
      if (id === null && reference.optional) continue;
      if (typeof id !== "string") {
        return `${reference.field} is required`;
      }
      const target = await syncContext.lookupOwned(
        reference.entity,
        id,
        ownerId,
      );
      if (!target) {
        return `${reference.field} does not reference an active record owned by this teacher`;
      }
    }
    return definition.validate
      ? definition.validate(record, syncContext.lookupOwned, ownerId)
      : null;
  }

  private async applyAcceptedChange(
    delegate: ModelDelegate,
    definition: (typeof syncEntityRegistry)[SyncEntity],
    ownerId: string,
    change: ParsedSyncChange,
    current: unknown,
    now: Date,
  ): Promise<PushResult> {
    const currentRow =
      typeof current === "object" && current !== null
        ? (current as Record<string, unknown>)
        : null;
    const currentVersion =
      typeof currentRow?.version === "number" ? currentRow.version : 0;
    const losingRecord = currentRow
      ? recordFromModel(definition, currentRow)
      : null;
    const conflict =
      currentRow !== null && change.base_version !== currentVersion;
    const data =
      change.operation === "delete"
        ? {
            version: currentVersion + 1,
            updatedAt: now,
            deletedAt: now,
          }
        : {
            ...modelDataFromPayload(definition, change.record),
            version: currentVersion + 1,
            updatedAt: now,
            deletedAt: null,
          };
    const updated =
      currentRow === null
        ? await delegate.create({
            data: {
              ...modelDataFromPayload(definition, change.record),
              ...definition.createFields?.(ownerId),
              id: change.record.id,
              ownerId,
              version: 1,
              createdAt: now,
              updatedAt: now,
              deletedAt: null,
            },
          })
        : await delegate.update({
            where: { id: change.record.id, ownerId },
            data,
          });
    const record = recordFromModel(definition, updated);
    return {
      change_id: change.change_id,
      status: "accepted",
      record,
      ...(conflict && losingRecord
        ? {
            conflict: {
              base_version: change.base_version,
              current_version: currentVersion,
              losing_record: losingRecord,
            },
          }
        : {}),
    };
  }

  private async saveIdConflict(
    ownerId: string,
    change: ParsedSyncChange,
  ): Promise<PushResult> {
    return this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT set_config('app.teacher_id', ${ownerId}, true)`;
      await transaction.$queryRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`${ownerId}:${change.change_id}`}, 0))::text`;
      const previous = await transaction.syncChange.findUnique({
        where: { ownerId_changeId: { ownerId, changeId: change.change_id } },
        select: { result: true },
      });
      if (previous) {
        return { ...parseStoredResult(previous.result), replayed: true };
      }

      const result: PushResult = {
        change_id: change.change_id,
        status: "rejected",
        reason: "id_conflict",
        message: "A record with this id already exists.",
      };
      await transaction.syncChange.create({
        data: {
          ownerId,
          changeId: change.change_id,
          entityType: change.entity,
          entityId: change.record.id,
          operation: change.operation,
          status: "rejected",
          result: toJson(result),
        },
      });
      return result;
    });
  }

  async pullChanges(
    ownerId: string,
    afterSequence: string,
    limit: number,
  ): Promise<PullPage> {
    return this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT set_config('app.teacher_id', ${ownerId}, true)`;
      const rows = await transaction.syncChange.findMany({
        where: { ownerId, sequence: { gt: BigInt(afterSequence) } },
        orderBy: { sequence: "asc" },
        take: limit + 1,
        select: {
          sequence: true,
          changeId: true,
          entityType: true,
          operation: true,
          status: true,
          result: true,
        },
      });
      const page = rows.slice(0, limit);
      const changes: PulledChange[] = page.flatMap((row) => {
        if (row.status !== "accepted") return [];
        const result = parseStoredResult(row.result);
        if (result.status !== "accepted") return [];
        return [
          {
            change_id: row.changeId,
            entity: row.entityType,
            operation: row.operation,
            record: result.record,
          },
        ];
      });
      return {
        changes,
        nextSequence: page.at(-1)?.sequence.toString() ?? afterSequence,
        hasMore: rows.length > limit,
      };
    });
  }
}
