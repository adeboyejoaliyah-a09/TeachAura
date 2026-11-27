export function renderAdminDashboard(state) {
  const admin = state.currentUser.admin;
  const metrics = state.adminMetrics;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Admin Header Banner -->
      <section class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
        <div class="flex flex-col gap-space-xs">
          <div class="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-secondary-container w-fit text-on-secondary-container font-label-sm text-xs font-semibold">
            <span class="material-symbols-outlined text-[16px] text-primary">admin_panel_settings</span>
            <span>Academic Supervision &amp; Institutional Governance</span>
          </div>
          <h1 class="font-headline text-3xl md:text-4xl text-on-surface font-bold tracking-tight mt-1">
            School Administrator Overview
          </h1>
          <p class="font-body text-base text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>${state.institution.name}</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span>${state.institution.term}</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span class="font-semibold text-primary">Week ${state.institution.currentWeek} Academic Audit Active</span>
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <button 
            type="button" 
            onclick="window.teachaura.navigate('teacher-performance')"
            class="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-xs font-bold shadow-sm hover:bg-surface-container-low transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">insights</span>
            <span>Teacher Performance Matrix</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.notify('School syllabus compliance report generated as PDF', 'success')"
            class="flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-[18px]">download</span>
            <span>Export Ministry Report</span>
          </button>
        </div>
      </section>

      <!-- Institutional Metric Stat Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
        <!-- Stat 1 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Students</span>
              <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${admin.totalStudentsEnrolled}</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">groups</span>
            </div>
          </div>
          <div class="pt-4 mt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>15 Classrooms Active</span>
            <span class="text-primary font-bold">98.2% Attendance</span>
          </div>
        </div>

        <!-- Stat 2 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">School Syllabus Pacing</span>
              <div class="flex items-baseline gap-2">
                <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${metrics.schoolWideSyllabusCoverage}%</span>
                <span class="text-xs font-bold text-primary">↑ +5.4%</span>
              </div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">speed</span>
            </div>
          </div>
          <div class="pt-4 mt-2 border-t border-outline-variant/20 flex items-center gap-2">
            <div class="h-2 flex-1 bg-surface-container rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" style="width: ${metrics.schoolWideSyllabusCoverage}%;"></div>
            </div>
            <span class="text-[11px] text-on-surface-variant">Target: 66% (Wk 6)</span>
          </div>
        </div>

        <!-- Stat 3 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Today's Class Delivery</span>
              <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${metrics.completedLessonsToday} / ${metrics.activeLessonsToday}</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">co_present</span>
            </div>
          </div>
          <div class="pt-4 mt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>8 Periods Remaining</span>
            <span class="text-tertiary font-bold">100% Teacher Punctuality</span>
          </div>
        </div>

        <!-- Stat 4 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Pending Note Approvals</span>
              <span class="font-headline text-3xl text-primary font-bold tracking-tight">${admin.pendingApprovals} Items</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">rule</span>
            </div>
          </div>
          <div class="pt-4 mt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>WAEC / BECE Standards</span>
            <span class="text-primary font-bold">Action Required</span>
          </div>
        </div>
      </section>

      <!-- Departmental Syllabus Coverage & Pending Approvals -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <!-- Departmental Overview (Left 7 Cols) -->
        <div class="lg:col-span-7 flex flex-col gap-space-lg">
          <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[22px]">domain</span>
                <h2 class="font-headline text-lg font-bold text-on-surface">Departmental Syllabus Health (NERDC)</h2>
              </div>
              <span class="text-xs text-on-surface-variant font-medium">Updated 30 mins ago</span>
            </div>

            <div class="flex flex-col gap-3">
              ${metrics.departments
                .map(
                  (dept) => `
                <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-headline text-sm font-bold text-on-surface">${dept.name}</h3>
                      <span class="text-xs text-on-surface-variant">Head of Dept: <strong class="text-on-surface">${dept.head}</strong> • ${dept.teachers} Teachers</span>
                    </div>
                    <div class="flex flex-col items-end">
                      <span class="font-headline text-base font-bold text-primary">${dept.syllabusRate}%</span>
                      <span class="text-[11px] font-semibold ${dept.status.includes("Ahead") ? "text-primary" : dept.status.includes("Review") ? "text-[#B45309]" : "text-on-surface-variant"}">${dept.status}</span>
                    </div>
                  </div>
                  <div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full" style="width: ${dept.syllabusRate}%;"></div>
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <!-- Academic Calendar & Midterm Mitigation -->
          <div class="bg-[#FFFBEB] border border-[#FDE68A] p-space-lg rounded-2xl shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-tertiary text-[22px]">event_repeat</span>
                <h3 class="font-headline text-base font-bold text-on-surface">Term 2 Schedule Adjustment &amp; Holidays</h3>
              </div>
              <span class="px-2 py-0.5 rounded bg-white text-xs font-bold text-tertiary border border-[#FDE68A]">AI Auto-Reschedule</span>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Upcoming: Federal Mid-Term Break (Thursday 20 Feb - Friday 21 Feb). All 12 missed periods have been automatically redistributed across Week 7 and 8 practical double blocks to avoid syllabus slippage.
            </p>
            <div class="flex items-center justify-between pt-2 border-t border-[#FDE68A]/60">
              <span class="text-xs font-medium text-on-surface">100% of teachers notified via dashboard</span>
              <button 
                type="button" 
                onclick="window.teachaura.notify('Timetable modifications broadcasted to all staff', 'success')"
                class="px-3 py-1.5 rounded-lg bg-tertiary text-white text-xs font-bold hover:bg-tertiary-container transition-all"
              >
                Broadcast Notice
              </button>
            </div>
          </div>
        </div>

        <!-- Pending Approval Queue (Right 5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-space-lg">
          <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[22px]">pending_actions</span>
                <h2 class="font-headline text-base font-bold text-on-surface">Pending Approvals Queue</h2>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                ${metrics.pendingApprovals.filter((a) => a.status === "Pending Review").length} Pending
              </span>
            </div>

            <div class="flex flex-col gap-3">
              ${metrics.pendingApprovals
                .map(
                  (item) => `
                <div class="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">${item.type}</span>
                    <span class="text-[11px] text-on-surface-variant">${item.submittedDate}</span>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-on-surface">${item.item}</h4>
                    <p class="text-[11px] text-on-surface-variant">${item.teacher} • <strong class="text-on-surface">${item.subject}</strong></p>
                  </div>
                  <div class="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                    <span class="text-[11px] font-semibold ${item.status.includes("Approved") ? "text-primary" : "text-[#B45309]"}">${item.status}</span>
                    ${
                      item.status === "Pending Review"
                        ? `
                      <button 
                        type="button" 
                        onclick="window.teachaura.approveItem('${item.id}')"
                        class="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-sm"
                      >
                        Approve
                      </button>
                    `
                        : `
                      <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    `
                    }
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
