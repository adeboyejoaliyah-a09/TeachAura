// Browser-only entry point; the API application lives in app.ts.
import { store } from "./state/store.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderHeader } from "./components/Header.js";
import { renderTeacherDashboard } from "./components/TeacherDashboard.js";
import { renderLessonPlanningStudio } from "./components/LessonPlanningStudio.js";
import { renderGuidedTeachingRunner } from "./components/GuidedTeachingRunner.js";
import { renderLessonNotesAndActivities } from "./components/LessonNotesAndActivities.js";
import { renderAdminDashboard } from "./components/AdminDashboard.js";
import { renderTeacherPerformance } from "./components/TeacherPerformance.js";
import { renderBadgesAndAchievements } from "./components/BadgesAndAchievements.js";
import { renderAssessmentStudio } from "./components/AssessmentStudio.js";
import { renderWeeklyPlanner } from "./components/WeeklyPlanner.js";

class App {
  constructor() {
    this.appRoot = document.getElementById("app-root");
    this.sidebarContainer = document.getElementById("sidebar-container");
    this.headerContainer = document.getElementById("header-container");
    this.mainContainer = document.getElementById("main-content-viewport");
    this.toastContainer = document.getElementById("toast-container");

    this.initGlobalApi();
    this.initTimerTicker();

    store.subscribe((state) => this.render(state));
    this.render(store.getState());
  }

  initTimerTicker() {
    // 1-second countdown ticker for the Guided Teaching live classroom runner
    setInterval(() => {
      const state = store.getState();
      if (state.classroom && state.classroom.isRunning) {
        if (state.classroom.remainingSeconds > 0) {
          state.classroom.remainingSeconds -= 1;
          state.classroom.elapsedTotalSeconds += 1;
          // Softly update live timer display if on screen without full DOM thrashing
          const timerDisplay = document.getElementById("live-timer-display");
          if (timerDisplay) {
            const mins = Math.floor(state.classroom.remainingSeconds / 60);
            const secs = state.classroom.remainingSeconds % 60;
            timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
          }
        } else {
          // Auto advance stage or complete
          store.completeStage(state.classroom.currentStageIndex);
        }
      }
    }, 1000);
  }

  initGlobalApi() {
    window.teachaura = {
      navigate: (view) => store.setView(view),
      switchRole: (role) => store.setRole(role),
      toggleLiveTimer: () => store.toggleTimer(),
      extendLiveStage: (secs) => store.extendCurrentStage(secs),
      completeCurrentStage: () =>
        store.completeStage(store.getState().classroom.currentStageIndex),
      jumpToStage: (index) => store.goToStage(index),
      setClassroomMode: (mode) => {
        store.setPresentationMode(mode);
        store.addToast(`Switched classroom display to ${mode} mode`, "info");
      },
      toggleChime: () => {
        store.getState().classroom.chimeAlert =
          !store.getState().classroom.chimeAlert;
        store.addToast(
          `Chime Alert ${store.getState().classroom.chimeAlert ? "Enabled" : "Disabled"}`,
          "info",
        );
        store.saveState();
      },
      finishLesson: () => {
        store.getState().classroom.isRunning = false;
        store.addToast(
          "Lesson recorded as 100% delivered. Added to term audit logs!",
          "success",
        );
        store.saveState();
      },
      pickNextStudent: () => {
        store.pickRandomStudent();
        store.addToast(
          `Called upon: ${store.getState().classroom.randomCalledStudent}`,
          "info",
        );
      },
      injectAiSuggestion: (id) => store.injectAiSuggestion(id),
      runCustomAuraPrompt: () => {
        const input = document.getElementById("custom-aura-prompt");
        const text = input ? input.value.trim() : "";
        if (!text) {
          store.addToast(
            "Please enter an instruction or prompt for Aura AI",
            "info",
          );
          return;
        }
        store.addToast(
          `Aura AI analyzing: "${text.substring(0, 30)}..."`,
          "info",
        );
        setTimeout(() => {
          store.addToast(
            "Aura AI: Generated localized differentiation notes & alternative apparatus!",
            "success",
          );
          if (input) input.value = "";
        }, 1200);
      },
      switchStudioTab: (tab) => {
        if (tab === "shortnote") {
          store.setView("lesson-notes");
        } else {
          store.setView("lesson-planning");
        }
      },
      saveLessonNotes: () => {
        store.saveLessonNoteChanges({});
      },
      exportPdf: () => {
        store.addToast(
          "Preparing high-resolution PDF with NERDC scheme watermarks...",
          "info",
        );
        setTimeout(() => {
          window.print();
        }, 600);
      },
      printStudentNote: () => {
        store.setView("lesson-notes");
        store.addToast(
          "Opening 2B Exercise Book short notes format for printing...",
          "info",
        );
        setTimeout(() => {
          window.print();
        }, 600);
      },
      printCertificate: () => {
        store.addToast(
          "Generating Federal Republic of Nigeria Teacher Commendation Certificate...",
          "success",
        );
        setTimeout(() => {
          window.print();
        }, 600);
      },
      printAssessmentPaper: (type) => {
        store.addToast(
          `Preparing ${type === "student" ? "Student Examination Paper" : "Teacher Marking Scheme"} for printing...`,
          "info",
        );
        setTimeout(() => {
          window.print();
        }, 600);
      },
      approveItem: (id) => store.approvePendingItem(id),
      openTeacherScorecard: (id) => store.selectTeacherScorecard(id),
      closeTeacherScorecard: () => store.selectTeacherScorecard(null),
      filterTeachers: (query) => {
        const rows = document.querySelectorAll(
          "#teacher-performance-table tbody tr",
        );
        const q = query.toLowerCase();
        rows.forEach((row) => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(q) ? "" : "none";
        });
      },
      toggleAssessmentView: (view) => store.setAssessmentView(view),
      regenerateQuestions: () => {
        store.addToast(
          "Aura AI is regenerating Section A & B question variants based on WAEC Scheme...",
          "info",
        );
        setTimeout(() => {
          store.addToast(
            "10 New Multiple Choice & Fill-in-the-gap items generated with updated marking scheme!",
            "success",
          );
        }, 1400);
      },
      copyBoardToProjector: () => {
        store.addToast(
          "Inhalation & Exhalation contrast table broadcasted to Classroom Projector screen!",
          "success",
        );
      },
      presentFullscreen: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          store.addToast("Entering Fullscreen Presentation Mode", "info");
        } else {
          document.exitFullscreen().catch(() => {});
        }
      },
      toggleChalkboardView: () => {
        store.setView("guided-teaching-mode");
        store.setPresentationMode("blackboard");
        store.addToast(
          "Loaded high-contrast Blackboard apparatus view",
          "info",
        );
      },
      triggerUploadSyllabus: () => {
        store.addToast(
          "NERDC Syllabus Analyzer: Select a PDF or DOCX file to extract learning objectives...",
          "info",
        );
      },
      notify: (msg, type) => store.addToast(msg, type),
    };
  }

  render(state) {
    // 1. Render Sidebar
    if (this.sidebarContainer) {
      this.sidebarContainer.innerHTML = renderSidebar(state);
    }

    // 2. Render Header
    if (this.headerContainer) {
      this.headerContainer.innerHTML = renderHeader(state);
    }

    // 3. Render Active View
    if (this.mainContainer) {
      let viewHtml = "";
      switch (state.currentView) {
        case "overview":
          viewHtml = renderTeacherDashboard(state);
          break;
        case "lesson-planning":
          viewHtml = renderLessonPlanningStudio(state);
          break;
        case "guided-teaching-mode":
          viewHtml = renderGuidedTeachingRunner(state);
          break;
        case "lesson-notes":
          viewHtml = renderLessonNotesAndActivities(state);
          break;
        case "admin-dashboard":
          viewHtml = renderAdminDashboard(state);
          break;
        case "teacher-performance":
          viewHtml = renderTeacherPerformance(state);
          break;
        case "achievements-and-streaks":
          viewHtml = renderBadgesAndAchievements(state);
          break;
        case "assessment-studio":
          viewHtml = renderAssessmentStudio(state);
          break;
        case "weekly-planner":
          viewHtml = renderWeeklyPlanner(state);
          break;
        default:
          viewHtml = renderTeacherDashboard(state);
      }
      this.mainContainer.innerHTML = viewHtml;
    }

    // 4. Render Toasts
    if (this.toastContainer) {
      this.toastContainer.innerHTML = state.toasts
        .map(
          (t) => `
        <div class="px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2.5 transition-all animate-bounce ${
          t.type === "success"
            ? "bg-secondary-container text-on-secondary-container border-primary/30"
            : t.type === "error"
              ? "bg-red-50 text-red-900 border-red-200"
              : "bg-surface-container-lowest text-on-surface border-outline-variant shadow-md"
        }">
          <span class="material-symbols-outlined text-[18px] ${t.type === "success" ? "text-primary" : t.type === "error" ? "text-red-600" : "text-primary"}">
            ${t.type === "success" ? "check_circle" : t.type === "error" ? "error" : "info"}
          </span>
          <span>${t.message}</span>
        </div>
      `,
        )
        .join("");
    }
  }
}

// Bootstrap once DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new App());
} else {
  new App();
}
