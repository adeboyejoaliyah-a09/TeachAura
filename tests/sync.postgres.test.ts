import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import type { RequestHandler } from "express";
import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import type { AppConfig } from "../src/config/env.js";
import {
  syncEntities,
  syncEntityRegistry,
  type SyncEntity,
} from "../src/modules/sync/registry.js";
import { parseSyncChange } from "../src/modules/sync/registry.js";
import { PrismaSyncRepository } from "../src/modules/sync/repository.js";
import { PrismaTeacherRepository } from "../src/modules/teachers/teacher.repository.js";

const isConfigured = Boolean(process.env.TEST_DATABASE_URL);
const databaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://disabled:disabled@127.0.0.1:1/teachaura_test";
const adminDatabaseUrl = process.env.DATABASE_URL ?? databaseUrl;
const config: AppConfig = {
  NODE_ENV: "test",
  PORT: 3000,
  DATABASE_URL: adminDatabaseUrl,
  SUPABASE_URL: "https://test.supabase.co",
  CORS_ORIGINS: ["http://localhost:3001"],
  SYNC_CURSOR_SECRET: "a-secure-test-secret-that-is-at-least-32-characters",
};

interface PrismaFindUnique {
  findUnique(args: { where: Record<string, unknown> }): Promise<unknown>;
}

function makeChange(
  entity: SyncEntity,
  record: Record<string, unknown>,
  operation: "upsert" | "delete" = "upsert",
  baseVersion = 0,
) {
  const parsed = parseSyncChange({
    ...(entity === "classes" ? {} : { entity }),
    change_id: randomUUID(),
    base_version: baseVersion,
    operation,
    record,
  });
  if (!parsed.success) {
    throw new Error(
      `Invalid ${entity} fixture: ${JSON.stringify(parsed.details)}`,
    );
  }
  return parsed.data;
}

describe.skipIf(!isConfigured)("PostgreSQL generic sync integration", () => {
  const prisma = new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });
  const admin = new PrismaClient({
    datasources: { db: { url: adminDatabaseUrl } },
  });
  const sync = new PrismaSyncRepository(prisma);
  const teachers = new PrismaTeacherRepository(prisma);
  const testTeacherIds = new Set<string>();

  afterAll(async () => {
    try {
      if (testTeacherIds.size > 0) {
        await admin.teacher.deleteMany({
          where: { id: { in: [...testTeacherIds] } },
        });
      }
    } finally {
      await prisma.$disconnect();
      await admin.$disconnect();
    }
  });

  async function createTeacher(): Promise<string> {
    const id = randomUUID();
    testTeacherIds.add(id);
    await teachers.getOrCreateProfile(id);
    return id;
  }

  async function push(
    ownerId: string,
    entity: SyncEntity,
    record: Record<string, unknown>,
    baseVersion = 0,
  ) {
    return sync.applyChange(
      ownerId,
      makeChange(entity, record, "upsert", baseVersion),
    );
  }

  async function createReferences(ownerId: string) {
    const classId = randomUUID();
    const subjectId = randomUUID();
    const sessionId = randomUUID();
    const termId = randomUUID();
    const results = await Promise.all([
      push(ownerId, "classes", { id: classId, name: "Primary 4" }),
      push(ownerId, "subjects", { id: subjectId, name: "Mathematics" }),
      push(ownerId, "academic_sessions", {
        id: sessionId,
        name: `Session ${sessionId.slice(0, 8)}`,
        start_date: "2026-01-01",
        end_date: "2026-12-31",
      }),
    ]);
    expect(results.every((result) => result.status === "accepted")).toBe(true);
    const term = await push(ownerId, "terms", {
      id: termId,
      academic_session_id: sessionId,
      name: "First Term",
      term_number: 1,
      start_date: "2026-01-01",
      end_date: "2026-04-30",
    });
    expect(term.status).toBe("accepted");
    return { classId, subjectId, sessionId, termId };
  }

  function targetRecord(
    entity: SyncEntity,
    references: Awaited<ReturnType<typeof createReferences>>,
  ) {
    const id = randomUUID();
    const payloads: Record<SyncEntity, Record<string, unknown>> = {
      classes: { id, name: "Primary 5" },
      subjects: { id, name: "Basic Science" },
      teacher_class_subjects: {
        id,
        class_id: references.classId,
        subject_id: references.subjectId,
      },
      academic_sessions: {
        id,
        name: `Next session ${id.slice(0, 8)}`,
        start_date: "2027-01-01",
        end_date: "2027-12-31",
      },
      terms: {
        id,
        academic_session_id: references.sessionId,
        name: "Second Term",
        term_number: 2,
        start_date: "2026-05-01",
        end_date: "2026-08-31",
      },
      holidays_and_closures: {
        id,
        academic_session_id: references.sessionId,
        term_id: references.termId,
        name: "Mid-term break",
        start_date: "2026-03-01",
        end_date: "2026-03-07",
        kind: "holiday",
      },
      timetable_slots: {
        id,
        class_id: references.classId,
        subject_id: references.subjectId,
        day_of_week: 1,
        start_time: "09:00",
        duration_minutes: 45,
        room: "Room 2",
      },
    };
    return payloads[entity];
  }

  async function findAsOwner(
    ownerId: string,
    entity: SyncEntity,
    id: string,
  ): Promise<unknown> {
    return prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT set_config('app.teacher_id', ${ownerId}, true)`;
      const delegate =
        transaction[
          syncEntityRegistry[entity].prismaModel as keyof typeof transaction
        ];
      return (delegate as unknown as PrismaFindUnique).findUnique({
        where: { id },
      });
    });
  }

  it.each(syncEntities)("replays an idempotency key for %s", async (entity) => {
    const ownerId = await createTeacher();
    const references = await createReferences(ownerId);
    const record = targetRecord(entity, references);
    const change = makeChange(entity, record);

    const created = await sync.applyChange(ownerId, change);
    expect(created).toMatchObject({
      status: "accepted",
      record: { id: record.id, version: 1 },
    });
    const replayed = await sync.applyChange(ownerId, change);
    expect(replayed).toMatchObject({
      status: "accepted",
      replayed: true,
      record: { id: record.id, version: 1 },
    });
  });

  it.each(syncEntities)("isolates reads and writes for %s", async (entity) => {
    const ownerA = await createTeacher();
    const ownerB = await createTeacher();
    const references = await createReferences(ownerA);
    const record = targetRecord(entity, references);
    const created = await push(ownerA, entity, record);
    expect(created.status).toBe("accepted");

    expect(await findAsOwner(ownerB, entity, String(record.id))).toBeNull();
    const attemptedWrite = await push(ownerB, entity, record);
    expect(attemptedWrite.status).toBe("rejected");
    if (attemptedWrite.status === "rejected") {
      expect(["id_conflict", "validation_failed"]).toContain(
        attemptedWrite.reason,
      );
    }
    expect(await findAsOwner(ownerB, entity, String(record.id))).toBeNull();
  });

  it("reports last-write-wins conflicts with the displaced snapshot", async () => {
    const ownerId = await createTeacher();
    const classId = randomUUID();
    await push(ownerId, "classes", { id: classId, name: "Primary 4" });
    const update = await push(
      ownerId,
      "classes",
      { id: classId, name: "Primary 4 Updated" },
      0,
    );
    expect(update).toMatchObject({
      status: "accepted",
      record: { version: 2, name: "Primary 4 Updated" },
      conflict: {
        current_version: 1,
        losing_record: { name: "Primary 4", version: 1 },
      },
    });
  });

  it("propagates a class tombstone through pull", async () => {
    const ownerId = await createTeacher();
    const classId = randomUUID();
    await push(ownerId, "classes", { id: classId, name: "Primary 4" });
    const deleted = await sync.applyChange(
      ownerId,
      makeChange("classes", { id: classId }, "delete", 1),
    );
    expect(deleted).toMatchObject({
      status: "accepted",
      record: { id: classId, version: 2 },
    });

    const page = await sync.pullChanges(ownerId, "0", 50);
    expect(page.changes).toContainEqual(
      expect.objectContaining({
        entity: "classes",
        operation: "delete",
        record: expect.objectContaining({
          id: classId,
          deleted_at: expect.any(String),
        }),
      }),
    );
  });

  it("rejects one invalid reference without failing another change in the batch", async () => {
    const ownerId = await createTeacher();
    const teachersRepository = {
      getOrCreateProfile: async (id: string) => ({
        id,
        role: "teacher" as const,
        plan: "default",
        school_id: null,
      }),
    };
    const authenticate: RequestHandler = (_request, response, next) => {
      response.locals.teacherId = ownerId;
      next();
    };
    const app = createApp({
      config,
      teachers: teachersRepository,
      sync,
      authenticate,
    });
    const invalidSlotId = randomUUID();
    const validClassId = randomUUID();

    const response = await request(app)
      .post("/api/v1/sync/push")
      .send({
        changes: [
          {
            entity: "timetable_slots",
            change_id: randomUUID(),
            base_version: 0,
            operation: "upsert",
            record: {
              id: invalidSlotId,
              class_id: randomUUID(),
              subject_id: randomUUID(),
              day_of_week: 1,
              start_time: "09:00",
              duration_minutes: 45,
            },
          },
          {
            change_id: randomUUID(),
            base_version: 0,
            operation: "upsert",
            record: { id: validClassId, name: "Primary 6" },
          },
        ],
      })
      .expect(200);

    expect(response.body.results).toHaveLength(2);
    expect(response.body.results[0]).toMatchObject({
      status: "rejected",
      reason: "validation_failed",
    });
    expect(response.body.results[1]).toMatchObject({
      status: "accepted",
      record: { id: validClassId },
    });
  });
});
