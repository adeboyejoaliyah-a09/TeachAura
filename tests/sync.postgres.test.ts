import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { afterAll, describe, expect, it } from "vitest";
import { PrismaSyncRepository } from "../src/modules/sync/repository.js";
import { PrismaTeacherRepository } from "../src/modules/teachers/teacher.repository.js";

const isConfigured = Boolean(process.env.TEST_DATABASE_URL);
const databaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://disabled:disabled@127.0.0.1:1/teachaura_test";
const adminDatabaseUrl = process.env.DATABASE_URL ?? databaseUrl;

describe.skipIf(!isConfigured)("PostgreSQL sync integration", () => {
  const prisma = new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });
  const admin = new PrismaClient({
    datasources: { db: { url: adminDatabaseUrl } },
  });
  const sync = new PrismaSyncRepository(prisma);
  const teachers = new PrismaTeacherRepository(prisma);
  const firstOwnerId = randomUUID();
  const secondOwnerId = randomUUID();

  afterAll(async () => {
    try {
      await admin.teacher.deleteMany({
        where: { id: { in: [firstOwnerId, secondOwnerId] } },
      });
    } finally {
      await prisma.$disconnect();
      await admin.$disconnect();
    }
  });

  it("persists idempotency, last-write-wins conflicts, tombstones and tenant isolation", async () => {
    await teachers.getOrCreateProfile(firstOwnerId);
    await teachers.getOrCreateProfile(secondOwnerId);
    const classId = randomUUID();
    const firstChangeId = randomUUID();
    const initialChange = {
      change_id: firstChangeId,
      base_version: 0,
      operation: "upsert" as const,
      record: { id: classId, name: "Primary 4", grade_level: "Primary 4" },
    };

    const created = await sync.applyChange(firstOwnerId, initialChange);
    expect(created).toMatchObject({
      status: "accepted",
      record: { version: 1, deleted_at: null },
    });

    const secondOwnerRows = await prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT set_config('app.teacher_id', ${secondOwnerId}, true)`;
      return transaction.schoolClass.findMany({ where: { id: classId } });
    });
    expect(secondOwnerRows).toEqual([]);

    const replayed = await sync.applyChange(firstOwnerId, initialChange);
    expect(replayed).toMatchObject({
      status: "accepted",
      replayed: true,
      record: { version: 1 },
    });

    const conflicting = await sync.applyChange(firstOwnerId, {
      change_id: randomUUID(),
      base_version: 0,
      operation: "upsert",
      record: { id: classId, name: "Updated Primary 4" },
    });
    expect(conflicting).toMatchObject({
      status: "accepted",
      record: { version: 2, name: "Updated Primary 4" },
      conflict: {
        current_version: 1,
        losing_record: { name: "Primary 4", version: 1 },
      },
    });

    const otherOwnerWrite = await sync.applyChange(secondOwnerId, {
      change_id: randomUUID(),
      base_version: 0,
      operation: "upsert",
      record: { id: classId, name: "Private class" },
    });
    expect(otherOwnerWrite).toMatchObject({
      status: "rejected",
      reason: "id_conflict",
    });

    const tombstone = await sync.applyChange(firstOwnerId, {
      change_id: randomUUID(),
      base_version: 2,
      operation: "delete",
      record: { id: classId },
    });
    expect(tombstone).toMatchObject({
      status: "accepted",
      record: { version: 3 },
    });
    expect(
      tombstone.status === "accepted" && tombstone.record.deleted_at,
    ).toBeTruthy();

    const firstOwnerPage = await sync.pullChanges(firstOwnerId, "0", 10);
    expect(
      firstOwnerPage.changes.map((change) => change.record.version),
    ).toEqual([1, 2, 3]);
    expect(firstOwnerPage.changes[2]?.record.deleted_at).toBeTruthy();

    const secondOwnerPage = await sync.pullChanges(secondOwnerId, "0", 10);
    expect(secondOwnerPage.changes).toEqual([]);
  });
});
