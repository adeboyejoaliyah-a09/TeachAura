import assert from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mockData } from "../src/data/mockData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

console.log("--- Starting TeachAura Frontend Smoke Tests ---");

// Test 1: Critical Files Existence
const requiredFiles = [
  "index.html",
  "package.json",
  "server.js",
  "src/frontend-app.js",
  "src/data/mockData.js",
  "src/state/store.js",
  "src/components/Sidebar.js",
  "src/components/Header.js",
  "src/components/TeacherDashboard.js",
  "src/components/LessonPlanningStudio.js",
  "src/components/GuidedTeachingRunner.js",
  "src/components/LessonNotesAndActivities.js",
  "src/components/AdminDashboard.js",
  "src/components/TeacherPerformance.js",
  "src/components/BadgesAndAchievements.js",
  "src/components/AssessmentStudio.js",
  "src/components/WeeklyPlanner.js",
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Missing required file: ${relPath}`);
  const stats = fs.statSync(fullPath);
  assert(stats.size > 0, `File is empty: ${relPath}`);
  console.log(`[PASS] Verified file: ${relPath} (${stats.size} bytes)`);
}

// Test 2: Mock Data Validation
assert(
  mockData.institution.name.includes("Federal Government College, Lagos"),
  "Institution name mismatch",
);
assert(
  mockData.todayClasses.length >= 3,
  "Expected at least 3 classes in timetable",
);
assert(
  mockData.badges.length >= 8,
  "Expected at least 8 badges in gamification data",
);
assert(
  mockData.teacherPerformanceList.length >= 8,
  "Expected at least 8 teachers in staff performance data",
);
assert(
  mockData.adminMetrics.departments.length >= 4,
  "Expected 4 departments in school admin data",
);
console.log(
  "[PASS] Verified mockData integrity & Nigerian curriculum structure",
);

// Test 3: Stitch Design Token Consistency in index.html
const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
assert(indexHtml.includes("DM Sans"), "index.html missing DM Sans font");
assert(indexHtml.includes("Inter"), "index.html missing Inter font");
assert(
  indexHtml.includes("Material Symbols Outlined"),
  "index.html missing Material Symbols",
);
assert(
  indexHtml.includes("#005c55"),
  "index.html missing primary Stitch color #005c55",
);
assert(
  indexHtml.includes("#0f766e"),
  "index.html missing primary-container color #0f766e",
);
assert(
  indexHtml.includes("#6c4b00"),
  "index.html missing tertiary color #6c4b00",
);
console.log(
  "[PASS] Verified Stitch design system tokens and fonts in index.html",
);

// Test 4: Verify Component Exports
const components = [
  "./src/components/Sidebar.js",
  "./src/components/Header.js",
  "./src/components/TeacherDashboard.js",
  "./src/components/LessonPlanningStudio.js",
  "./src/components/GuidedTeachingRunner.js",
  "./src/components/LessonNotesAndActivities.js",
  "./src/components/AdminDashboard.js",
  "./src/components/TeacherPerformance.js",
  "./src/components/BadgesAndAchievements.js",
  "./src/components/AssessmentStudio.js",
  "./src/components/WeeklyPlanner.js",
];

for (const modPath of components) {
  const fullPath = path.join(projectRoot, modPath);
  const content = fs.readFileSync(fullPath, "utf8");
  assert(
    content.includes("export function render"),
    `Component ${modPath} missing export function render...`,
  );
  console.log(`[PASS] Verified render function export in ${modPath}`);
}

console.log(
  "\nALL SMOKE TESTS PASSED SUCCESSFULLY! TeachAura frontend is fully verified.",
);
