\set ON_ERROR_STOP on

SELECT format(
  'CREATE ROLE %I LOGIN PASSWORD %L NOSUPERUSER NOBYPASSRLS',
  :'app_role',
  :'app_password'
)
WHERE NOT EXISTS (
  SELECT 1
  FROM pg_catalog.pg_roles
  WHERE rolname = :'app_role'
) \gexec

ALTER ROLE :"app_role"
  LOGIN PASSWORD :'app_password'
  NOSUPERUSER NOBYPASSRLS;

GRANT USAGE ON SCHEMA public TO :"app_role";
REVOKE ALL PRIVILEGES
  ON teachers, classes, subjects, teacher_class_subjects,
     academic_sessions, terms, holidays_and_closures, timetable_slots
  FROM :"app_role";
GRANT SELECT, INSERT, UPDATE
  ON teachers, classes, subjects, teacher_class_subjects,
     academic_sessions, terms, holidays_and_closures, timetable_slots
  TO :"app_role";
REVOKE ALL PRIVILEGES ON sync_changes FROM :"app_role";
GRANT SELECT, INSERT ON sync_changes TO :"app_role";
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO :"app_role";
GRANT USAGE ON TYPE
  "TeacherRole", "SyncEntity", "SyncOperation", "SyncStatus", "HolidayClosureKind"
  TO :"app_role";
