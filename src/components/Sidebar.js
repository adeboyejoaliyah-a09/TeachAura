export function renderSidebar(state) {
  const isTeacher = state.role === 'teacher';
  const currentView = state.currentView;

  return `
    <aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-outline-variant/30 select-none">
      <div class="flex flex-col">
        <!-- Logo & Brand Header -->
        <div class="px-space-lg pt-space-lg pb-space-md flex flex-col gap-space-xs border-b border-outline-variant/20">
          <div class="flex items-center gap-space-sm cursor-pointer" onclick="window.teachaura.navigate('overview')">
            <div class="w-10 h-10 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-sm">
              <span class="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div class="flex flex-col">
              <span class="font-headline text-2xl text-primary font-bold leading-none tracking-tight">TeachAura</span>
              <span class="font-label-sm text-[11px] text-tertiary-container uppercase tracking-wider font-semibold">The Teaching Flow</span>
            </div>
          </div>
          <p class="font-body text-xs text-on-surface-variant mt-space-xs italic font-medium">Teach Smarter. Prepare Better.</p>
        </div>

        <!-- Role Switcher Strip -->
        <div class="px-space-md pt-space-md">
          <div class="bg-surface-container-low p-1 rounded-xl flex items-center gap-1 border border-outline-variant/30">
            <button 
              type="button" 
              onclick="window.teachaura.switchRole('teacher')"
              class="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${isTeacher ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}"
            >
              <span class="material-symbols-outlined text-[16px]">person</span>
              <span>Teacher</span>
            </button>
            <button 
              type="button" 
              onclick="window.teachaura.switchRole('admin')"
              class="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${!isTeacher ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}"
            >
              <span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Admin</span>
            </button>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="px-space-md py-space-sm mt-1">
          <nav class="flex flex-col gap-1">
            ${isTeacher ? `
              <!-- TEACHER NAVIGATION -->
              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('overview')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'overview' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Dashboard Overview</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('lesson-planning')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'lesson-planning' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">auto_awesome</span>
                <span>AI Lesson Prep Studio</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('guided-teaching-mode')"
                class="flex items-center justify-between px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'guided-teaching-mode' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <div class="flex items-center gap-space-sm">
                  <span class="material-symbols-outlined text-[20px]">slideshow</span>
                  <span>Guided Teaching Mode</span>
                </div>
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse" title="Live class ready"></span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('weekly-planner')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'weekly-planner' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>Weekly Planner &amp; Syllabus</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('assessment-studio')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'assessment-studio' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">quiz</span>
                <span>Assessment &amp; Questions</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('achievements-and-streaks')"
                class="flex items-center justify-between px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'achievements-and-streaks' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <div class="flex items-center gap-space-sm">
                  <span class="material-symbols-outlined text-[20px]">military_tech</span>
                  <span>Badges &amp; Streaks</span>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed">14D</span>
              </a>
            ` : `
              <!-- ADMIN NAVIGATION -->
              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('admin-dashboard')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'admin-dashboard' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                <span>School Admin Overview</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('teacher-performance')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'teacher-performance' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">insights</span>
                <span>Teacher Performance</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('achievements-and-streaks')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'achievements-and-streaks' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">military_tech</span>
                <span>Badges &amp; Gamification</span>
              </a>

              <a 
                href="javascript:void(0)" 
                onclick="window.teachaura.navigate('assessment-studio')"
                class="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-sm transition-all ${currentView === 'assessment-studio' ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}"
              >
                <span class="material-symbols-outlined text-[20px]">quiz</span>
                <span>Term Assessment Bank</span>
              </a>
            `}
          </nav>
        </div>
      </div>

      <!-- Curriculum Pill Container -->
      <div class="p-space-md m-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs border border-outline-variant/30">
        <div class="flex items-center justify-between">
          <span class="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">NERDC Syllabus</span>
          <span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">Active</span>
        </div>
        <p class="font-body text-xs text-on-surface leading-relaxed">
          ${isTeacher 
            ? 'Nigerian Curriculum aligned for Basic Sci & Biology (JSS 2 - SS 2).' 
            : '840 Students • 8 Teachers • 15 Classrooms monitored.'}
        </p>
      </div>
    </aside>
  `;
}
