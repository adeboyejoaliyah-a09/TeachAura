# ADR 0002: Registry-driven generic sync engine

## Status

Accepted

## Context

The initial synchronization implementation handled classes directly in the repository. Adding each new table by copying that flow would duplicate and gradually diverge ownership checks, version conflict behavior, idempotent receipts, tombstone handling, and pull serialization. New entities also need strict writable-field boundaries and entity-specific foreign-key validation without allowing clients to set owner or lifecycle fields.

## Decision

Use a central sync entity registry to describe each entity's Prisma delegate, payload schema, ownership field, field mappings, and optional foreign-key or custom validation. The generic repository uses this metadata for push and pull. Entity payloads are strict; ownership is derived from the authenticated teacher, and version/timestamps/tombstones are server-controlled. PostgreSQL RLS remains enabled and forced for the application role as defense in depth.

Preserve the existing classes protocol, including its legacy request shape without an `entity` property. Other entity changes identify themselves with `entity`. New database tables are introduced through additive migrations, and the shared role/grant script is used by local setup and CI.

## Consequences

- Sync behavior such as idempotency, last-write-wins conflict reporting, per-change rejection, and soft deletion is implemented once.
- New entities require registry metadata, schema/migration/grant entries, tests, and documentation rather than repository-specific control flow.
- The registry and PostgreSQL integration tests must remain aligned with Prisma model names and database RLS policies.
- Strict schemas intentionally reject unknown and server-managed payload fields instead of silently ignoring them.
