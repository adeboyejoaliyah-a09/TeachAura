import { z } from "zod";
import {
  syncEntities,
  type ParsedSyncChange,
  type SyncedRecord,
} from "./registry.js";

export type PushChange = ParsedSyncChange;
export interface ClassRecord extends SyncedRecord {
  id: string;
  name: string;
  grade_level: string | null;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export const syncEntitySchema = z.enum(syncEntities);
export const pushBatchSchema = z
  .object({ changes: z.array(z.unknown()).min(1).max(100) })
  .strict();

export const syncRecordSchema = z
  .object({
    id: z.string().uuid(),
    version: z.number().int().positive(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    deleted_at: z.string().datetime().nullable(),
  })
  .passthrough();

export const pushResultSchema = z.discriminatedUnion("status", [
  z.object({
    change_id: z.string().uuid(),
    status: z.literal("accepted"),
    record: syncRecordSchema,
    conflict: z
      .object({
        base_version: z.number().int().nonnegative(),
        current_version: z.number().int().positive(),
        losing_record: syncRecordSchema,
      })
      .optional(),
    replayed: z.boolean().optional(),
  }),
  z.object({
    change_id: z.string().uuid(),
    status: z.literal("rejected"),
    reason: z.enum(["not_found", "id_conflict", "validation_failed"]),
    message: z.string(),
    replayed: z.boolean().optional(),
  }),
]);

export type PushResult =
  | {
      change_id: string;
      status: "accepted";
      record: SyncedRecord;
      conflict?: {
        base_version: number;
        current_version: number;
        losing_record: SyncedRecord;
      };
      replayed?: boolean;
    }
  | {
      change_id: string;
      status: "rejected";
      reason: "not_found" | "id_conflict" | "validation_failed";
      message: string;
      replayed?: boolean;
    };

export const invalidChangeResultSchema = z.object({
  index: z.number().int().nonnegative(),
  status: z.literal("rejected"),
  reason: z.literal("invalid_change"),
  message: z.string(),
  details: z.array(z.unknown()),
});

export const temporarilyUnavailableResultSchema = z.object({
  index: z.number().int().nonnegative(),
  change_id: z.string().uuid(),
  status: z.literal("rejected"),
  reason: z.literal("temporarily_unavailable"),
  retryable: z.literal(true),
  message: z.string(),
});

export const pushResponseSchema = z.object({
  results: z.array(
    z.union([
      pushResultSchema,
      invalidChangeResultSchema,
      temporarilyUnavailableResultSchema,
    ]),
  ),
});

export const pullResponseSchema = z.object({
  changes: z.array(
    z.object({
      change_id: z.string().uuid(),
      entity: syncEntitySchema,
      operation: z.enum(["upsert", "delete"]),
      record: syncRecordSchema,
    }),
  ),
  next_cursor: z.string(),
  has_more: z.boolean(),
});
