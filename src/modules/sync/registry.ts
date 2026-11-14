import { z } from "zod";

export const syncEntities = [
  "classes",
  "subjects",
  "teacher_class_subjects",
  "academic_sessions",
  "terms",
  "holidays_and_closures",
  "timetable_slots",
] as const;

export type SyncEntity = (typeof syncEntities)[number];
export type SyncRecord = Record<string, unknown>;

export interface SyncPayload extends SyncRecord {
  id: string;
}

export interface SyncedRecord extends SyncPayload {
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SyncTransaction {
  lookupOwned(
    entity: SyncEntity,
    id: string,
    ownerId: string,
  ): Promise<SyncRecord | null>;
}

export interface SyncForeignKey {
  field: string;
  entity: SyncEntity;
  optional?: boolean;
}

export interface SyncField {
  payload: string;
  model: string;
  output: string;
  kind?: "date";
}

export interface SyncEntityConfig {
  entity: SyncEntity;
  prismaModel: string;
  ownershipField: "ownerId";
  payloadSchema: z.ZodType<SyncRecord>;
  fields: readonly SyncField[];
  foreignKeys?: readonly SyncForeignKey[];
  createFields?: (ownerId: string) => SyncRecord;
  validate?: (
    record: SyncRecord,
    lookupOwned: SyncTransaction["lookupOwned"],
    ownerId: string,
  ) => Promise<string | null>;
}

const uuid = z.string().uuid();
const date = z.iso.date();
const name = z.string().trim().min(1).max(160);

function strictPayload<T extends z.ZodRawShape>(
  shape: T,
  validate?: (record: SyncRecord) => string | null,
): z.ZodType<SyncRecord> {
  return z
    .object(shape)
    .strict()
    .superRefine((value, context) => {
      const message = validate?.(value as SyncRecord);
      if (message) {
        context.addIssue({ code: "custom", message });
      }
    })
    .transform((value) => {
      const payload = value as Record<string, unknown>;
      const record: SyncPayload = { id: payload.id as string };
      for (const [key, fieldValue] of Object.entries(payload)) {
        if (key !== "id" && fieldValue !== undefined) record[key] = fieldValue;
      }
      return record;
    });
}

const dateRangeValidation = (record: SyncRecord) => {
  const start = record.start_date;
  const end = record.end_date;
  return typeof start === "string" && typeof end === "string" && start > end
    ? "start_date must be on or before end_date"
    : null;
};

const commonFields: SyncField[] = [
  { payload: "id", model: "id", output: "id" },
];

function config(
  definition: Omit<SyncEntityConfig, "ownershipField" | "fields"> & {
    fields: readonly SyncField[];
  },
): SyncEntityConfig {
  return { ...definition, ownershipField: "ownerId" };
}

export const syncEntityRegistry: Readonly<
  Record<SyncEntity, SyncEntityConfig>
> = {
  classes: config({
    entity: "classes",
    prismaModel: "schoolClass",
    payloadSchema: strictPayload({
      id: uuid,
      name: z.string().trim().min(1).max(120),
      grade_level: z.string().trim().max(80).nullable().default(null),
    }),
    fields: [
      ...commonFields,
      { payload: "name", model: "name", output: "name" },
      { payload: "grade_level", model: "gradeLevel", output: "grade_level" },
    ],
  }),
  subjects: config({
    entity: "subjects",
    prismaModel: "subject",
    payloadSchema: strictPayload({ id: uuid, name }),
    fields: [
      ...commonFields,
      { payload: "name", model: "name", output: "name" },
    ],
  }),
  teacher_class_subjects: config({
    entity: "teacher_class_subjects",
    prismaModel: "teacherClassSubject",
    payloadSchema: strictPayload({
      id: uuid,
      class_id: uuid,
      subject_id: uuid,
    }),
    fields: [
      ...commonFields,
      { payload: "class_id", model: "classId", output: "class_id" },
      { payload: "subject_id", model: "subjectId", output: "subject_id" },
    ],
    foreignKeys: [
      { field: "class_id", entity: "classes" },
      { field: "subject_id", entity: "subjects" },
    ],
    createFields: (ownerId) => ({ teacherId: ownerId }),
  }),
  academic_sessions: config({
    entity: "academic_sessions",
    prismaModel: "academicSession",
    payloadSchema: strictPayload(
      {
        id: uuid,
        name: z.string().trim().min(1).max(120),
        start_date: date,
        end_date: date,
      },
      dateRangeValidation,
    ),
    fields: [
      ...commonFields,
      { payload: "name", model: "name", output: "name" },
      {
        payload: "start_date",
        model: "startDate",
        output: "start_date",
        kind: "date",
      },
      {
        payload: "end_date",
        model: "endDate",
        output: "end_date",
        kind: "date",
      },
    ],
  }),
  terms: config({
    entity: "terms",
    prismaModel: "term",
    payloadSchema: strictPayload(
      {
        id: uuid,
        academic_session_id: uuid,
        name,
        term_number: z.number().int().min(1).max(3),
        start_date: date,
        end_date: date,
      },
      dateRangeValidation,
    ),
    fields: [
      ...commonFields,
      {
        payload: "academic_session_id",
        model: "academicSessionId",
        output: "academic_session_id",
      },
      { payload: "name", model: "name", output: "name" },
      { payload: "term_number", model: "termNumber", output: "term_number" },
      {
        payload: "start_date",
        model: "startDate",
        output: "start_date",
        kind: "date",
      },
      {
        payload: "end_date",
        model: "endDate",
        output: "end_date",
        kind: "date",
      },
    ],
    foreignKeys: [
      { field: "academic_session_id", entity: "academic_sessions" },
    ],
  }),
  holidays_and_closures: config({
    entity: "holidays_and_closures",
    prismaModel: "holidayClosure",
    payloadSchema: strictPayload(
      {
        id: uuid,
        academic_session_id: uuid,
        term_id: uuid.nullable().optional(),
        name,
        start_date: date,
        end_date: date,
        kind: z.enum(["holiday", "closure"]),
      },
      dateRangeValidation,
    ),
    fields: [
      ...commonFields,
      {
        payload: "academic_session_id",
        model: "academicSessionId",
        output: "academic_session_id",
      },
      { payload: "term_id", model: "termId", output: "term_id" },
      { payload: "name", model: "name", output: "name" },
      {
        payload: "start_date",
        model: "startDate",
        output: "start_date",
        kind: "date",
      },
      {
        payload: "end_date",
        model: "endDate",
        output: "end_date",
        kind: "date",
      },
      { payload: "kind", model: "kind", output: "kind" },
    ],
    foreignKeys: [
      { field: "academic_session_id", entity: "academic_sessions" },
      { field: "term_id", entity: "terms", optional: true },
    ],
    validate: async (record, lookupOwned, ownerId) => {
      if (typeof record.term_id !== "string") return null;
      const term = await lookupOwned("terms", record.term_id, ownerId);
      return term?.academicSessionId === record.academic_session_id
        ? null
        : "term_id must belong to academic_session_id";
    },
  }),
  timetable_slots: config({
    entity: "timetable_slots",
    prismaModel: "timetableSlot",
    payloadSchema: strictPayload({
      id: uuid,
      class_id: uuid,
      subject_id: uuid,
      day_of_week: z.number().int().min(1).max(7),
      start_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
      duration_minutes: z.number().int().min(1).max(480),
      room: z.string().trim().max(80).nullable().optional(),
    }),
    fields: [
      ...commonFields,
      { payload: "class_id", model: "classId", output: "class_id" },
      { payload: "subject_id", model: "subjectId", output: "subject_id" },
      { payload: "day_of_week", model: "dayOfWeek", output: "day_of_week" },
      { payload: "start_time", model: "startTime", output: "start_time" },
      {
        payload: "duration_minutes",
        model: "durationMinutes",
        output: "duration_minutes",
      },
      { payload: "room", model: "room", output: "room" },
    ],
    foreignKeys: [
      { field: "class_id", entity: "classes" },
      { field: "subject_id", entity: "subjects" },
    ],
  }),
};

const changeEnvelopeSchema = z
  .object({
    entity: z.enum(syncEntities).optional(),
    change_id: uuid,
    base_version: z.number().int().nonnegative(),
    operation: z.enum(["upsert", "delete"]),
    record: z.unknown(),
  })
  .strict();

export interface ParsedSyncChange {
  entity: SyncEntity;
  change_id: string;
  base_version: number;
  operation: "upsert" | "delete";
  record: SyncPayload;
}

export type ParseSyncChangeResult =
  | { success: true; data: ParsedSyncChange }
  | { success: false; details: z.ZodIssue[] };

export function parseSyncChange(value: unknown): ParseSyncChangeResult {
  const envelope = changeEnvelopeSchema.safeParse(value);
  if (!envelope.success)
    return { success: false, details: envelope.error.issues };

  const entity = envelope.data.entity ?? "classes";
  const definition = syncEntityRegistry[entity];
  if (envelope.data.entity === undefined && entity !== "classes") {
    return {
      success: false,
      details: [
        {
          code: "custom",
          message: "entity is required for non-class changes",
          path: ["entity"],
        },
      ],
    };
  }

  const payloadSchema =
    envelope.data.operation === "delete"
      ? z
          .object({ id: uuid })
          .strict()
          .transform((record) => ({ id: record.id }))
      : definition.payloadSchema;
  const record = payloadSchema.safeParse(envelope.data.record);
  if (!record.success) return { success: false, details: record.error.issues };

  return {
    success: true,
    data: {
      entity,
      change_id: envelope.data.change_id,
      base_version: envelope.data.base_version,
      operation: envelope.data.operation,
      record: record.data as SyncPayload,
    },
  };
}

export function modelDataFromPayload(
  definition: SyncEntityConfig,
  record: SyncRecord,
): SyncRecord {
  const modelData: SyncRecord = {};
  for (const field of definition.fields) {
    if (field.payload === "id" || !Object.hasOwn(record, field.payload))
      continue;
    const value = record[field.payload];
    modelData[field.model] =
      field.kind === "date" && typeof value === "string"
        ? new Date(`${value}T00:00:00.000Z`)
        : value;
  }
  return modelData;
}

export function recordFromModel(
  definition: SyncEntityConfig,
  value: unknown,
): SyncedRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Prisma returned an invalid ${definition.entity} row`);
  }
  const row = value as Record<string, unknown>;
  const record: SyncPayload = { id: "" };
  for (const field of definition.fields) {
    const value = row[field.model];
    record[field.output] =
      field.kind === "date" && value instanceof Date
        ? value.toISOString().slice(0, 10)
        : value;
  }
  const id = row.id;
  const createdAt = row.createdAt;
  const updatedAt = row.updatedAt;
  const deletedAt = row.deletedAt;
  if (
    typeof id !== "string" ||
    typeof row.version !== "number" ||
    !(createdAt instanceof Date) ||
    !(updatedAt instanceof Date)
  ) {
    throw new Error(
      `Prisma returned invalid timestamps for ${definition.entity}`,
    );
  }
  record.version = row.version;
  record.created_at = createdAt.toISOString();
  record.updated_at = updatedAt.toISOString();
  record.deleted_at =
    deletedAt instanceof Date ? deletedAt.toISOString() : null;
  return record as SyncedRecord;
}

export function syncEntityForModel(modelName: string): SyncEntity {
  const entry = Object.values(syncEntityRegistry).find(
    (definition) => definition.prismaModel === modelName,
  );
  if (!entry) throw new Error(`Unregistered sync model: ${modelName}`);
  return entry.entity;
}
