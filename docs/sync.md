# Sync protocol (v1)

Every request is authenticated with a Supabase access token; the server derives `owner_id` from the verified JWT subject and rejects client-supplied ownership or other server-managed fields. The original class request shape below remains supported. Changes for other registered entities include an `entity` field.

## Class sync protocol (v1)

## Push changes

`POST /api/v1/sync/push`

Send 1-100 changes in outbox order. `change_id` is a client-generated UUID and idempotency key. For a new class, use `base_version: 0`; each accepted write increments the server-owned version. Timestamps, owner, and version are assigned by the server. An invalid item is reported as a per-item rejection and does not prevent later valid items in the batch from being processed. Empty or oversized batches return HTTP 400; request bodies over the configured size limit return HTTP 413.

```json
{
  "changes": [
    {
      "change_id": "4d027e20-f88f-4330-9d26-e42202b64349",
      "base_version": 0,
      "operation": "upsert",
      "record": {
        "id": "fd7f35dd-820b-468a-9605-3cb6fe4f18ce",
        "name": "Primary 4",
        "grade_level": "Primary 4"
      }
    },
    {
      "change_id": "4cf608dc-c32a-42e6-a739-69329b9c9b57",
      "base_version": 1,
      "operation": "delete",
      "record": { "id": "fd7f35dd-820b-468a-9605-3cb6fe4f18ce" }
    }
  ]
}
```

The response contains one result per change, in request order. Accepted results include the canonical record. If `base_version` is stale, the server applies the incoming change as the latest server-time write, increments the version, and includes a `conflict` object with the stale base, displaced version, and its snapshot. The sync log retains each accepted snapshot, so the displaced value remains retrievable. Domain-level rejections include a stable reason. Valid changes that reach persistence, whether accepted or rejected, are recorded so replaying a `change_id` returns the original result with `replayed: true`. Schema-invalid items are rejected before persistence and may be corrected and retried with the same idempotency key.

```json
{
  "results": [
    {
      "change_id": "4d027e20-f88f-4330-9d26-e42202b64349",
      "status": "accepted",
      "record": {
        "id": "fd7f35dd-820b-468a-9605-3cb6fe4f18ce",
        "name": "Primary 4",
        "grade_level": "Primary 4",
        "version": 1,
        "created_at": "2026-11-14T10:00:00.000Z",
        "updated_at": "2026-11-14T10:00:00.000Z",
        "deleted_at": null
      }
    }
  ]
}
```

Deletes set `deleted_at`; synced rows are not hard-deleted. A later upsert can restore a tombstoned class and will receive a new version.

## Pull changes

`GET /api/v1/sync/pull?cursor=<opaque>&limit=50`

Omit the cursor for the first page. Cursors are signed and scoped to the authenticated teacher; clients must treat them as opaque. `limit` is optional, from 1 to 100. Only accepted changes appear in the pull feed; rejected outcomes are available to the originating push request. A cursor advances through the teacher's sync log, including rejected receipts, so rejected rows do not block later pages.

```json
{
  "changes": [
    {
      "change_id": "4d027e20-f88f-4330-9d26-e42202b64349",
      "entity": "classes",
      "operation": "upsert",
      "record": {
        "id": "fd7f35dd-820b-468a-9605-3cb6fe4f18ce",
        "name": "Primary 4",
        "grade_level": "Primary 4",
        "version": 1,
        "created_at": "2026-11-14T10:00:00.000Z",
        "updated_at": "2026-11-14T10:00:00.000Z",
        "deleted_at": null
      }
    }
  ],
  "next_cursor": "<opaque signed cursor>",
  "has_more": false
}
```

Clients should apply pull changes by record id and version, persist the returned cursor only after applying the page, and retain local edits until a push result is accepted or explicitly resolved. A cursor from another teacher or a modified cursor receives `400 INVALID_CURSOR`.

## Errors and ownership

Errors use `{ "error": { "code": "...", "message": "...", "details": ... } }`. Request validation errors return HTTP 400; absent or invalid tokens return 401. Cross-teacher reads and writes are blocked by transaction-scoped PostgreSQL row-level security as well as repository ownership checks. Database operations set the teacher context only from the verified token subject. The deployed application database role must be non-superuser and `NOBYPASSRLS`; use a separate migration role for schema changes.

Apply migrations with `npm run db:deploy` in deployed environments. Configure the restricted application role using `scripts/grant-app-role.sql` after migrations.

## Registered entities

The generic engine is driven by `src/modules/sync/registry.ts`. Each registry entry binds a public entity name to its Prisma model, strict Zod client-payload schema, `ownerId` ownership field, payload-to-model field mappings, and any foreign-key or domain validation. Push, idempotency, versioning, soft deletion, and pull serialization use this metadata rather than entity-specific engine branches. Server-controlled `owner_id`, `version`, `created_at`, `updated_at`, and `deleted_at` are never accepted in payloads.

Each upsert uses the following entity-specific payload fields in addition to the client-generated `id` UUID:

| Entity                   | Writable payload fields                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `classes`                | `name`, `grade_level`                                                                                        |
| `subjects`               | `name`                                                                                                       |
| `teacher_class_subjects` | `class_id`, `subject_id`; `teacher_id` is derived from the authenticated teacher                             |
| `academic_sessions`      | `name`, `start_date`, `end_date`                                                                             |
| `terms`                  | `academic_session_id`, `name`, `term_number`, `start_date`, `end_date`                                       |
| `holidays_and_closures`  | `academic_session_id`, optional `term_id`, `name`, `start_date`, `end_date`, `kind` (`holiday` or `closure`) |
| `timetable_slots`        | `class_id`, `subject_id`, `day_of_week` (1-7), `start_time` (`HH:mm`), `duration_minutes`, optional `room`   |

Dates use `YYYY-MM-DD`. Each change retains the `change_id`, `base_version`, and `operation` rules described above. For example, a subject upsert is:

```json
{
  "entity": "subjects",
  "change_id": "4d027e20-f88f-4330-9d26-e42202b64349",
  "base_version": 0,
  "operation": "upsert",
  "record": {
    "id": "fd7f35dd-820b-468a-9605-3cb6fe4f18ce",
    "name": "Mathematics"
  }
}
```

Foreign keys are checked against rows owned by the authenticated teacher. In particular, a timetable slot's class and subject, a term's academic session, and a closure's academic session and optional term must be accessible to that teacher. A closure's term must belong to its declared academic session. PostgreSQL row-level security remains the final tenant boundary; synced rows use versioned soft deletes and are not hard-deleted by the application role.

## Adding a syncable entity

1. Define the Prisma model with a client UUID primary key, `ownerId`, version, timestamps, tombstone, and owner/update indexes.
2. Add any relations, constraints, and back-relations to `prisma/schema.prisma`.
3. Add the entity to Prisma's `SyncEntity` enum and `syncEntities` in the registry.
4. Add a strict payload schema containing only client-writable fields.
5. Add the field mappings between payload names, Prisma names, and output names.
6. Declare ownership, foreign-key metadata, server-derived create fields, or custom validation in the registry entry.
7. Add an additive migration with the table, indexes, constraints, matching owner RLS policies, and sync enum change.
8. Add the table to `scripts/grant-app-role.sql` with only the required restricted-role privileges.
9. Add registry/unit and restricted-role PostgreSQL tests, then document the entity payload here.
