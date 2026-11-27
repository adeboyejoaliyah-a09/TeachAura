export function renderBadgesAndAchievements(state) {
  const badges = state.badges;
  const teacher = state.currentUser.teacher;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Top Header & Streak Hero -->
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
        <div>
          <div class="flex items-center gap-space-xs text-on-surface-variant text-xs uppercase tracking-wider">
            <a class="hover:text-primary transition-colors cursor-pointer" onclick="window.teachaura.navigate('overview')">Teacher Dashboard</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Achievements &amp; Pedagogical Milestones</span>
          </div>
          <h1 class="font-headline text-3xl font-bold text-on-surface mt-1">
            Teacher Recognition &amp; Badge Portfolio
          </h1>
          <p class="text-xs text-on-surface-variant">Rewarding instructional consistency, syllabus adherence, and localized pedagogy across Nigerian schools.</p>
        </div>

        <button 
          type="button" 
          onclick="window.teachaura.printCertificate()"
          class="flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all active:scale-95"
        >
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span>Generate Commendation Certificate</span>
        </button>
      </section>

      <!-- Gamification Hero Strip -->
      <section class="bg-gradient-to-r from-primary-container to-secondary p-space-lg rounded-2xl text-white shadow-md mb-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-lg">
            <span class="material-symbols-outlined text-[36px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-headline text-2xl font-bold">${teacher.activeStreakDays}-Day Active Streak</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] uppercase">Top 5% Educator</span>
            </div>
            <p class="text-xs text-teal-100 mt-0.5">
              14 consecutive working days with active lesson preparation, syllabus mapping, and classroom delivery.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6 border-t md:border-t-0 md:border-l border-teal-600/50 pt-3 md:pt-0 md:pl-space-lg">
          <div class="flex flex-col items-center">
            <span class="text-xs text-teal-200 uppercase font-semibold">Total Points</span>
            <span class="font-headline text-2xl font-bold text-white">1,450</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xs text-teal-200 uppercase font-semibold">Unlocked Badges</span>
            <span class="font-headline text-2xl font-bold text-white">6 / 9</span>
          </div>
        </div>
      </section>

      <!-- Badge Categories: Weekly vs End-of-Term -->
      <div class="flex flex-col gap-space-lg">
        <!-- Section 1: Weekly Consistency Badges -->
        <div>
          <div class="flex items-center justify-between mb-space-md">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">calendar_today</span>
              <h2 class="font-headline text-xl font-bold text-on-surface">Weekly Consistency Badges</h2>
            </div>
            <span class="text-xs text-on-surface-variant font-medium">Evaluated every Friday at 4:00 PM</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
            ${badges.filter(b => b.category === 'weekly').map(badge => `
              <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl ${badge.status === 'unlocked' ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center">
                      <span class="material-symbols-outlined text-[26px]">${badge.icon}</span>
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <h3 class="font-headline text-sm font-bold text-on-surface">${badge.title}</h3>
                      </div>
                      <span class="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.2 rounded">${badge.level}</span>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.status === 'unlocked' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}">
                    ${badge.status === 'unlocked' ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>

                <p class="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  ${badge.description}
                </p>

                <div class="pt-3 mt-3 border-t border-outline-variant/20 flex flex-col gap-1.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-on-surface-variant">${badge.dateUnlocked || 'Target: End of Week'}</span>
                    <span class="font-bold text-primary">${badge.rewardText}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: End-of-Term Milestone Badges -->
        <div class="mt-space-lg">
          <div class="flex items-center justify-between mb-space-md">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[22px]">workspace_premium</span>
              <h2 class="font-headline text-xl font-bold text-on-surface">End-of-Term Milestone Accreditations</h2>
            </div>
            <span class="text-xs text-on-surface-variant font-medium">Valid for WAEC &amp; Ministry Evaluation</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
            ${badges.filter(b => b.category === 'term').map(badge => `
              <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl ${badge.status === 'unlocked' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center">
                      <span class="material-symbols-outlined text-[26px]">${badge.icon}</span>
                    </div>
                    <div>
                      <h3 class="font-headline text-sm font-bold text-on-surface">${badge.title}</h3>
                      <span class="text-[10px] font-bold uppercase tracking-wider text-tertiary bg-tertiary/10 px-1.5 py-0.2 rounded">${badge.level}</span>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.status === 'unlocked' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}">
                    ${badge.status === 'unlocked' ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>

                <p class="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  ${badge.description}
                </p>

                <div class="pt-3 mt-3 border-t border-outline-variant/20 flex flex-col gap-1.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-on-surface-variant">Progress</span>
                    <span class="font-bold text-on-surface">${badge.progress}%</span>
                  </div>
                  <div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full" style="width: ${badge.progress}%;"></div>
                  </div>
                  <span class="text-[10px] text-primary font-bold mt-0.5">${badge.rewardText}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
