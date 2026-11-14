import { describe, expect, it } from "vitest";
import {
  parseSyncChange,
  syncEntities,
  syncEntityRegistry,
  syncEntityForModel,
} from "../src/modules/sync/registry.js";

const uuidA = "b91401f4-7034-4f4a-b815-8155046281d5";
const uuidB = "d755694e-2fca-4b6a-9ce5-f5aa46ee3565";

const validPayloads = {
  classes: { id: uuidA, name: "Primary 4", grade_level: "Primary 4" },
  subjects: { id: uuidA, name: "Mathematics" },
  teacher_class_subjects: {
    id: uuidA,
    class_id: uuidA,
    subject_id: uuidB,
  },
  academic_sessions: {
    id: uuidA,
    name: "2026/2027",
    start_date: "2026-09-01",
    end_date: "2027-07-31",
  },
  terms: {
    id: uuidA,
    academic_session_id: uuidB,
    name: "First Term",
    term_number: 1,
    start_date: "2026-09-01",
    end_date: "2026-12-18",
  },
  holidays_and_closures: {
    id: uuidA,
    academic_session_id: uuidB,
    term_id: null,
    name: "Public holiday",
    start_date: "2026-10-01",
    end_date: "2026-10-01",
    kind: "holiday",
  },
  timetable_slots: {
    id: uuidA,
    class_id: uuidA,
    subject_id: uuidB,
    day_of_week: 1,
    start_time: "09:00",
    duration_minutes: 45,
    room: null,
  },
} as const;

describe("sync table registry", () => {
  it("registers every supported Prisma model exactly once with an id field", () => {
    expect(Object.keys(syncEntityRegistry).sort()).toEqual(
      [...syncEntities].sort(),
    );
    const models = Object.values(syncEntityRegistry).map(
      (definition) => definition.prismaModel,
    );
    expect(new Set(models).size).toBe(syncEntities.length);
    for (const entity of syncEntities) {
      const definition = syncEntityRegistry[entity];
      expect(definition.ownershipField).toBe("ownerId");
      expect(definition.fields[0]).toEqual({
        payload: "id",
        model: "id",
        output: "id",
      });
      expect(syncEntityForModel(definition.prismaModel)).toBe(entity);
    }
  });

  it.each(syncEntities)("parses the registered %s client payload", (entity) => {
    const parsed = parseSyncChange({
      ...(entity === "classes" ? {} : { entity }),
      change_id: uuidB,
      base_version: 0,
      operation: "upsert",
      record: validPayloads[entity],
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.entity).toBe(entity);
      expect(parsed.data.record.id).toBe(uuidA);
    }
  });

  it.each(syncEntities)(
    "rejects server-managed fields in %s payloads",
    (entity) => {
      const payload = {
        ...validPayloads[entity],
        owner_id: uuidB,
        version: 99,
        created_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-01T00:00:00.000Z",
        deleted_at: null,
      };
      const parsed = parseSyncChange({
        ...(entity === "classes" ? {} : { entity }),
        change_id: uuidB,
        base_version: 0,
        operation: "upsert",
        record: payload,
      });
      expect(parsed.success).toBe(false);
    },
  );

  it("rejects malformed dates, date ranges, timetable times and entity ids", () => {
    const badSession = parseSyncChange({
      entity: "academic_sessions",
      change_id: uuidB,
      base_version: 0,
      operation: "upsert",
      record: {
        ...validPayloads.academic_sessions,
        start_date: "2027-08-01",
      },
    });
    expect(badSession.success).toBe(false);

    const badSlot = parseSyncChange({
      entity: "timetable_slots",
      change_id: uuidB,
      base_version: 0,
      operation: "upsert",
      record: { ...validPayloads.timetable_slots, start_time: "25:90" },
    });
    expect(badSlot.success).toBe(false);

    const badEntity = parseSyncChange({
      entity: "not_registered",
      change_id: uuidB,
      base_version: 0,
      operation: "upsert",
      record: validPayloads.classes,
    });
    expect(badEntity.success).toBe(false);
  });

  it("preserves the original class push shape without an entity field", () => {
    expect(
      parseSyncChange({
        change_id: uuidB,
        base_version: 0,
        operation: "upsert",
        record: { id: uuidA, name: "Primary 4" },
      }),
    ).toMatchObject({
      success: true,
      data: {
        entity: "classes",
        record: { id: uuidA, grade_level: null },
      },
    });
  });
});
