export function renderWeeklyPlanner(state) {
  const currentWeek = state.institution.currentWeek;

  const weeklySchedule = [
    {
      week: 1,
      topic: "Living Things & Biological Classification",
      status: "Completed",
      rate: 100,
      tag: "NERDC Unit 1.1",
      periods: 3,
    },
    {
      week: 2,
      topic: "Circulatory System: Blood Composition & Functions",
      status: "Completed",
      rate: 100,
      tag: "NERDC Unit 2.1",
      periods: 3,
    },
    {
      week: 3,
      topic: "Heart Structure & Double Circulation Mechanism",
      status: "Completed",
      rate: 100,
      tag: "NERDC Unit 2.2",
      periods: 3,
    },
    {
      week: 4,
      topic: "Excretory System: Structure of Human Kidney & Skin",
      status: "Completed",
      rate: 100,
      tag: "NERDC Unit 3.1",
      periods: 3,
    },
    {
      week: 5,
      topic: "Environmental Pollution & Harmattan Health Effects",
      status: "Completed",
      rate: 100,
      tag: "NERDC Unit 3.2",
      periods: 3,
    },
    {
      week: 6,
      topic: "The Human Respiratory System: Inhalation & Exhalation",
      status: "Active (Current)",
      rate: 75,
      tag: "NERDC Unit 4.1",
      periods: 3,
    },
    {
      week: 7,
      topic: "Mid-Term Break (2 Days) & Lab Practical Double Block",
      status: "Auto-Rebalanced",
      rate: 0,
      tag: "AI Rescheduled",
      periods: 3,
    },
    {
      week: 8,
      topic: "Cellular Respiration & Energy Release in Alveoli",
      status: "Upcoming",
      rate: 0,
      tag: "NERDC Unit 4.2",
      periods: 3,
    },
    {
      week: 9,
      topic: "Ecology: Habitats, Food Chains & Local Niches",
      status: "Upcoming",
      rate: 0,
      tag: "NERDC Unit 5.1",
      periods: 3,
    },
    {
      week: 10,
      topic: "Term Revisions & BECE Mock Practice Tests",
      status: "Upcoming",
      rate: 0,
      tag: "Exam Prep",
      periods: 3,
    },
    {
      week: 11,
      topic: "Unified Term Examinations (All Streams)",
      status: "Upcoming",
      rate: 0,
      tag: "Assessment",
      periods: 3,
    },
    {
      week: 12,
      topic: "Grade Compilation, Pupil Reports & Vacation",
      status: "Upcoming",
      rate: 0,
      tag: "Administrative",
      periods: 2,
    },
  ];

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Header -->
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <div class="flex items-center gap-space-xs text-on-surface-variant text-xs uppercase tracking-wider">
            <a class="hover:text-primary transition-colors cursor-pointer" onclick="window.teachaura.navigate('overview')">Teacher Dashboard</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Weekly Planner &amp; Syllabus Engine</span>
          </div>
          <h1 class="font-headline text-3xl font-bold text-on-surface mt-1">
            Term 2 Syllabus Distribution &amp; Teaching Timeline
          </h1>
          <p class="text-xs text-on-surface-variant">
            12-Week NERDC Curriculum Roadmap for Junior Secondary School 2 • Federal Government College, Lagos.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            type="button" 
            onclick="window.teachaura.notify('Timetable synced with Ministry academic term dates', 'success')"
            class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-[18px]">sync</span>
            <span>Sync with School Calendar</span>
          </button>
        </div>
      </section>

      <!-- Disruption & Auto-Rebalancing Banner -->
      <div class="p-space-lg rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] mb-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[24px]">event_busy</span>
          </div>
          <div class="flex flex-col gap-0.5">
            <div class="flex items-center gap-2">
              <h3 class="font-headline text-sm font-bold text-on-surface">Mid-Term Disruption Detected &amp; Mitigated</h3>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">Week 7 Auto-Adjusted</span>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Federal Mid-Term Break (Thursday 20 Feb - Friday 21 Feb) removes 2 periods. TeachAura AI has shifted remaining topics into double-period practicals on Tuesday and Thursday of Week 7, maintaining 100% completion pace prior to exam revision.
            </p>
          </div>
        </div>

        <button 
          type="button" 
          onclick="window.teachaura.notify('Adapted 12-week schedule approved and locked!', 'success')"
          class="px-4 py-2 rounded-xl bg-tertiary text-white text-xs font-bold hover:bg-tertiary-container transition-all whitespace-nowrap shadow-sm"
        >
          Approve Adaptation
        </button>
      </div>

      <!-- 12-Week Curriculum Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
        ${weeklySchedule
          .map((item) => {
            const isCurrent = item.week === currentWeek;
            const isDone = item.status === "Completed";

            return `
            <div class="bg-surface-container-lowest rounded-2xl p-space-md border transition-all ${
              isCurrent
                ? "border-2 border-primary shadow-md"
                : isDone
                  ? "border-outline-variant/30 shadow-sm opacity-90"
                  : "border-outline-variant/30 shadow-sm"
            } flex flex-col justify-between">
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg ${isCurrent ? "bg-primary text-white" : isDone ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-on-surface-variant"} flex items-center justify-center font-bold text-xs">
                      ${item.week}
                    </span>
                    <span class="text-xs font-bold text-on-surface uppercase tracking-wider">Week ${item.week}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                    isCurrent
                      ? "bg-primary/10 text-primary"
                      : isDone
                        ? "bg-secondary-container text-on-secondary-container"
                        : item.status.includes("Rebalanced")
                          ? "bg-[#FEF3C7] text-[#92400E]"
                          : "bg-surface-container text-on-surface-variant"
                  }">
                    ${item.status}
                  </span>
                </div>

                <h3 class="font-headline text-sm font-bold text-on-surface mt-1 leading-snug">
                  ${item.topic}
                </h3>

                <div class="flex items-center gap-2 text-[11px] text-on-surface-variant">
                  <span class="font-mono bg-surface-container-low px-1.5 py-0.5 rounded border border-outline-variant/20">${item.tag}</span>
                  <span>•</span>
                  <span>${item.periods} Periods Allocated</span>
                </div>
              </div>

              <div class="pt-3 mt-3 border-t border-outline-variant/20 flex flex-col gap-1.5">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-on-surface-variant font-medium">Syllabus Coverage</span>
                  <span class="font-bold ${isCurrent ? "text-primary" : "text-on-surface"}">${item.rate}%</span>
                </div>
                <div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full ${isCurrent ? "bg-primary animate-pulse" : isDone ? "bg-primary" : "bg-transparent"}" style="width: ${item.rate}%;"></div>
                </div>

                ${
                  isCurrent
                    ? `
                  <button 
                    type="button" 
                    onclick="window.teachaura.navigate('lesson-planning')"
                    class="mt-2 w-full py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-1"
                  >
                    <span class="material-symbols-outlined text-[14px]">edit_note</span>
                    <span>Open Lesson Studio</span>
                  </button>
                `
                    : ""
                }
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  `;
}
