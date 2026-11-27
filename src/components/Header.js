export function renderHeader(state) {
  const isTeacher = state.role === 'teacher';
  const user = isTeacher ? state.currentUser.teacher : state.currentUser.admin;

  return `
    <header class="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between border-b border-outline-variant/30 select-none">
      <!-- Left institution info -->
      <div class="flex items-center gap-space-md">
        <div class="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-full border border-outline-variant/30">
          <span class="material-symbols-outlined text-[18px] text-primary">account_balance</span>
          <span class="font-body text-xs text-on-surface font-semibold truncate max-w-md">
            ${state.institution.name} | ${state.institution.term} - Week ${state.institution.currentWeek}
          </span>
        </div>
        
        <div class="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="font-label-sm text-[11px] text-primary font-bold">
            ${isTeacher ? 'Live Class Ready (JSS 2A)' : 'Curriculum Audit Active'}
          </span>
        </div>
      </div>

      <!-- Right action controls & user profile -->
      <div class="flex items-center gap-space-md">
        ${isTeacher ? `
          <button 
            type="button" 
            onclick="window.teachaura.navigate('lesson-planning')"
            class="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-white px-space-md py-2 rounded-lg font-title-md text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <span class="material-symbols-outlined text-[18px]">add</span>
            <span>Quick AI Prep</span>
          </button>
        ` : `
          <button 
            type="button" 
            onclick="window.teachaura.navigate('teacher-performance')"
            class="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-white px-space-md py-2 rounded-lg font-title-md text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <span class="material-symbols-outlined text-[18px]">bar_chart</span>
            <span>Staff Audit</span>
          </button>
        `}

        <div class="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>

        <!-- User Profile Dropdown / Info -->
        <div class="flex items-center gap-space-sm">
          <div class="relative">
            <img 
              alt="Profile" 
              class="w-9 h-9 rounded-full object-cover border border-outline-variant/40 shadow-sm" 
              src="${user.avatar}"
            />
            <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface-container-lowest"></span>
          </div>
          <div class="flex flex-col leading-tight">
            <span class="font-label-md text-xs text-on-surface font-bold">${user.name}</span>
            <span class="font-label-sm text-[11px] text-on-surface-variant font-medium">${user.title}</span>
          </div>
        </div>
      </div>
    </header>
  `;
}
