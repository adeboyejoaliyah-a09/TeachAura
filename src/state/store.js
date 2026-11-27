import { mockData } from '../data/mockData.js';

class Store {
  constructor() {
    this.subscribers = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem('teachaura_state_v1');
    if (saved) {
      try {
        this.state = JSON.parse(saved);
        return;
      } catch (e) {
        console.error("Could not parse saved state:", e);
      }
    }

    // Default initial state
    this.state = {
      role: 'teacher', // 'teacher' | 'admin'
      currentView: 'overview', // 'overview' | 'lesson-planning' | 'guided-teaching-mode' | 'assessment-studio' | 'admin-dashboard' | 'teacher-performance' | 'achievements-and-streaks'
      institution: mockData.institution,
      currentUser: mockData.currentUser,
      todayClasses: mockData.todayClasses,
      syllabusPacing: mockData.syllabusPacing,
      activeLesson: mockData.activeLesson,
      auraAiSuggestions: mockData.auraAiSuggestions,
      badges: mockData.badges,
      adminMetrics: mockData.adminMetrics,
      teacherPerformanceList: mockData.teacherPerformanceList,
      assessmentData: mockData.assessmentData,
      students: mockData.nigerianStudents,
      
      // Live Classroom Guided Teaching Runner State
      classroom: {
        activeClassId: 'class-jss2a',
        currentStageIndex: 1, // Stage 2: Concept Explanation
        isRunning: true,
        remainingSeconds: 391, // 06:31
        totalStageSeconds: 900, // 15 mins
        elapsedTotalSeconds: 1104, // 18:24
        mode: 'standard', // 'standard' | 'projector' | 'blackboard'
        chimeAlert: true,
        randomCalledStudent: 'Chinedu Okafor',
        roomConfidencePct: 82,
        respondedStudents: 31,
        totalStudentsInRoom: 38,
        completedStages: [0] // Stage 1 Introduction is marked done
      },

      assessmentView: 'marking', // 'marking' | 'student'
      toasts: [],
      selectedTeacherScorecard: null // for modal drill-down
    };
  }

  saveState() {
    try {
      localStorage.setItem('teachaura_state_v1', JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    for (const callback of this.subscribers) {
      try {
        callback(this.state);
      } catch (e) {
        console.error("Error in store subscriber:", e);
      }
    }
  }

  getState() {
    return this.state;
  }

  setRole(newRole) {
    this.state.role = newRole;
    if (newRole === 'admin' && (this.state.currentView === 'overview' || this.state.currentView === 'lesson-planning' || this.state.currentView === 'guided-teaching-mode')) {
      this.state.currentView = 'admin-dashboard';
    } else if (newRole === 'teacher' && (this.state.currentView === 'admin-dashboard' || this.state.currentView === 'teacher-performance')) {
      this.state.currentView = 'overview';
    }
    this.addToast(`Switched to ${newRole === 'admin' ? 'Administrator' : 'Teacher'} profile`, 'info');
    this.saveState();
  }

  setView(viewName) {
    this.state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.saveState();
  }

  // Classroom Live Timer Methods
  toggleTimer() {
    this.state.classroom.isRunning = !this.state.classroom.isRunning;
    this.addToast(this.state.classroom.isRunning ? "Stage runner resumed" : "Stage runner paused", "info");
    this.saveState();
  }

  extendCurrentStage(extraSeconds = 120) {
    this.state.classroom.remainingSeconds += extraSeconds;
    this.state.classroom.totalStageSeconds += extraSeconds;
    this.addToast(`Added +${Math.round(extraSeconds / 60)} minutes to current stage`, 'success');
    this.saveState();
  }

  goToStage(stageIndex) {
    if (stageIndex < 0 || stageIndex >= this.state.activeLesson.stages.length) return;
    this.state.classroom.currentStageIndex = stageIndex;
    const stage = this.state.activeLesson.stages[stageIndex];
    this.state.classroom.totalStageSeconds = stage.secondsTotal;
    this.state.classroom.remainingSeconds = stage.secondsTotal;
    if (!this.state.classroom.completedStages.includes(stageIndex - 1) && stageIndex > 0) {
      this.state.classroom.completedStages.push(stageIndex - 1);
    }
    this.saveState();
  }

  completeStage(stageIndex) {
    if (!this.state.classroom.completedStages.includes(stageIndex)) {
      this.state.classroom.completedStages.push(stageIndex);
    }
    if (stageIndex < this.state.activeLesson.stages.length - 1) {
      this.goToStage(stageIndex + 1);
      this.addToast(`Stage ${stageIndex + 1} completed. Moving to next stage!`, 'success');
    } else {
      this.state.classroom.isRunning = false;
      this.addToast("Lesson completed! You've earned the Classroom Maestro badge credit.", 'success');
    }
    this.saveState();
  }

  pickRandomStudent() {
    const list = this.state.students;
    const randomIndex = Math.floor(Math.random() * list.length);
    this.state.classroom.randomCalledStudent = list[randomIndex];
    this.saveState();
  }

  setPresentationMode(mode) {
    this.state.classroom.mode = mode; // 'standard' | 'projector' | 'blackboard'
    this.saveState();
  }

  // AI Suggestions & Lesson Notes Methods
  injectAiSuggestion(suggestionId) {
    const suggestion = this.state.auraAiSuggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    if (suggestionId === 'ai-sug-1') {
      if (!this.state.activeLesson.instructionalMaterials.includes("Empty 50cl Eva Water Bottle & Party Balloons")) {
        this.state.activeLesson.instructionalMaterials.push("Empty 50cl Eva Water Bottle & Party Balloons (Local Sourced)");
      }
    } else if (suggestionId === 'ai-sug-2') {
      this.state.activeLesson.stages[1].steps.push({
        stepNumber: 4,
        time: "4 mins",
        teacherAction: "Cultural Pressure Analogy: Traditional Blacksmith Bellows (Hausa: 'Kuzun/Zuga-zugu'). Demonstrates how bellows compress air outwards like exhaling and expand to suck air inwards.",
        pupilEngagement: "Relate bellows operation to rib movement and diaphragm flattening."
      });
    }

    this.addToast(`Aura AI injected: "${suggestion.title}" into lesson note`, 'success');
    this.saveState();
  }

  saveLessonNoteChanges(updatedLesson) {
    this.state.activeLesson = { ...this.state.activeLesson, ...updatedLesson };
    this.addToast("Lesson note changes saved and synced with NERDC scheme", 'success');
    this.saveState();
  }

  // Admin Methods
  approvePendingItem(id) {
    const item = this.state.adminMetrics.pendingApprovals.find(a => a.id === id);
    if (item) {
      item.status = "Approved by Principal";
      this.state.currentUser.admin.pendingApprovals = Math.max(0, this.state.currentUser.admin.pendingApprovals - 1);
      this.addToast(`Approved ${item.item}`, 'success');
      this.saveState();
    }
  }

  selectTeacherScorecard(teacherId) {
    this.state.selectedTeacherScorecard = this.state.teacherPerformanceList.find(t => t.id === teacherId) || null;
    this.notify();
  }

  setAssessmentView(view) {
    this.state.assessmentView = view;
    this.addToast(`Switched to ${view === 'student' ? 'Student Test Paper' : 'Teacher Marking Guide & Rubric'}`, 'info');
    this.saveState();
  }

  addToast(message, type = 'info') {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    this.state.toasts.push({ id, message, type });
    this.notify();
    setTimeout(() => {
      this.state.toasts = this.state.toasts.filter(t => t.id !== id);
      this.notify();
    }, 4000);
  }
}

export const store = new Store();
