-- CreateEnum
CREATE TYPE "HolidayClosureKind" AS ENUM ('holiday', 'closure');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SyncEntity" ADD VALUE 'subjects';
ALTER TYPE "SyncEntity" ADD VALUE 'teacher_class_subjects';
ALTER TYPE "SyncEntity" ADD VALUE 'academic_sessions';
ALTER TYPE "SyncEntity" ADD VALUE 'terms';
ALTER TYPE "SyncEntity" ADD VALUE 'holidays_and_closures';
ALTER TYPE "SyncEntity" ADD VALUE 'timetable_slots';

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "teacher_class_subjects" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6),
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "teacher_class_subjects"
ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "academic_sessions" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "academic_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "academic_session_id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "term_number" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays_and_closures" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "academic_session_id" UUID NOT NULL,
    "term_id" UUID,
    "name" VARCHAR(160) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "kind" "HolidayClosureKind" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "holidays_and_closures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetable_slots" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "subject_id" UUID NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" VARCHAR(5) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "room" VARCHAR(80),
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "timetable_slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "academic_sessions_owner_id_updated_at_idx" ON "academic_sessions"("owner_id", "updated_at");

-- CreateIndex
CREATE INDEX "academic_sessions_owner_id_deleted_at_idx" ON "academic_sessions"("owner_id", "deleted_at");

-- CreateIndex
CREATE INDEX "academic_sessions_updated_at_idx" ON "academic_sessions"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "academic_sessions_owner_id_name_key" ON "academic_sessions"("owner_id", "name");

-- CreateIndex
CREATE INDEX "terms_owner_id_updated_at_idx" ON "terms"("owner_id", "updated_at");

-- CreateIndex
CREATE INDEX "terms_owner_id_deleted_at_idx" ON "terms"("owner_id", "deleted_at");

-- CreateIndex
CREATE INDEX "terms_academic_session_id_idx" ON "terms"("academic_session_id");

-- CreateIndex
CREATE INDEX "terms_updated_at_idx" ON "terms"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "terms_academic_session_id_term_number_key" ON "terms"("academic_session_id", "term_number");

-- CreateIndex
CREATE INDEX "holidays_and_closures_owner_id_updated_at_idx" ON "holidays_and_closures"("owner_id", "updated_at");

-- CreateIndex
CREATE INDEX "holidays_and_closures_owner_id_deleted_at_idx" ON "holidays_and_closures"("owner_id", "deleted_at");

-- CreateIndex
CREATE INDEX "holidays_and_closures_academic_session_id_idx" ON "holidays_and_closures"("academic_session_id");

-- CreateIndex
CREATE INDEX "holidays_and_closures_term_id_idx" ON "holidays_and_closures"("term_id");

-- CreateIndex
CREATE INDEX "holidays_and_closures_updated_at_idx" ON "holidays_and_closures"("updated_at");

-- CreateIndex
CREATE INDEX "timetable_slots_owner_id_updated_at_idx" ON "timetable_slots"("owner_id", "updated_at");

-- CreateIndex
CREATE INDEX "timetable_slots_owner_id_deleted_at_idx" ON "timetable_slots"("owner_id", "deleted_at");

-- CreateIndex
CREATE INDEX "timetable_slots_class_id_idx" ON "timetable_slots"("class_id");

-- CreateIndex
CREATE INDEX "timetable_slots_subject_id_idx" ON "timetable_slots"("subject_id");

-- CreateIndex
CREATE INDEX "timetable_slots_updated_at_idx" ON "timetable_slots"("updated_at");

-- CreateIndex
CREATE INDEX "subjects_owner_id_deleted_at_idx" ON "subjects"("owner_id", "deleted_at");

-- CreateIndex
CREATE INDEX "teacher_class_subjects_owner_id_updated_at_idx" ON "teacher_class_subjects"("owner_id", "updated_at");

-- CreateIndex
CREATE INDEX "teacher_class_subjects_owner_id_deleted_at_idx" ON "teacher_class_subjects"("owner_id", "deleted_at");

-- AddForeignKey
ALTER TABLE "academic_sessions" ADD CONSTRAINT "academic_sessions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_academic_session_id_fkey" FOREIGN KEY ("academic_session_id") REFERENCES "academic_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holidays_and_closures" ADD CONSTRAINT "holidays_and_closures_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holidays_and_closures" ADD CONSTRAINT "holidays_and_closures_academic_session_id_fkey" FOREIGN KEY ("academic_session_id") REFERENCES "academic_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holidays_and_closures" ADD CONSTRAINT "holidays_and_closures_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable_slots" ADD CONSTRAINT "timetable_slots_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable_slots" ADD CONSTRAINT "timetable_slots_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable_slots" ADD CONSTRAINT "timetable_slots_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "academic_sessions"
ADD CONSTRAINT "academic_sessions_version_positive" CHECK ("version" > 0),
ADD CONSTRAINT "academic_sessions_valid_date_range" CHECK ("start_date" <= "end_date");

ALTER TABLE "terms"
ADD CONSTRAINT "terms_version_positive" CHECK ("version" > 0),
ADD CONSTRAINT "terms_valid_term_number" CHECK ("term_number" BETWEEN 1 AND 3),
ADD CONSTRAINT "terms_valid_date_range" CHECK ("start_date" <= "end_date");

ALTER TABLE "holidays_and_closures"
ADD CONSTRAINT "holidays_and_closures_version_positive" CHECK ("version" > 0),
ADD CONSTRAINT "holidays_and_closures_valid_date_range" CHECK ("start_date" <= "end_date");

ALTER TABLE "timetable_slots"
ADD CONSTRAINT "timetable_slots_version_positive" CHECK ("version" > 0),
ADD CONSTRAINT "timetable_slots_valid_day" CHECK ("day_of_week" BETWEEN 1 AND 7),
ADD CONSTRAINT "timetable_slots_valid_duration" CHECK ("duration_minutes" BETWEEN 1 AND 480),
ADD CONSTRAINT "timetable_slots_valid_start_time" CHECK ("start_time" ~ '^(?:[01][0-9]|2[0-3]):[0-5][0-9]$');

ALTER TABLE "subjects"
ADD CONSTRAINT "subjects_version_positive" CHECK ("version" > 0);

ALTER TABLE "teacher_class_subjects"
ADD CONSTRAINT "teacher_class_subjects_version_positive" CHECK ("version" > 0);

ALTER TABLE "academic_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "academic_sessions" FORCE ROW LEVEL SECURITY;
CREATE POLICY "academic_sessions_owner_access" ON "academic_sessions"
USING ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid)
WITH CHECK ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid);

ALTER TABLE "terms" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "terms" FORCE ROW LEVEL SECURITY;
CREATE POLICY "terms_owner_access" ON "terms"
USING ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid)
WITH CHECK ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid);

ALTER TABLE "holidays_and_closures" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "holidays_and_closures" FORCE ROW LEVEL SECURITY;
CREATE POLICY "holidays_and_closures_owner_access" ON "holidays_and_closures"
USING ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid)
WITH CHECK ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid);

ALTER TABLE "timetable_slots" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "timetable_slots" FORCE ROW LEVEL SECURITY;
CREATE POLICY "timetable_slots_owner_access" ON "timetable_slots"
USING ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid)
WITH CHECK ("owner_id" = NULLIF(current_setting('app.teacher_id', true), '')::uuid);
