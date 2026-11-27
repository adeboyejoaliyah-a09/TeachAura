export function renderTeacherPerformance(state) {
  const teachers = state.teacherPerformanceList;
  const selectedTeacher = state.selectedTeacherScorecard;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Header -->
      <section class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <div class="flex items-center gap-space-xs text-on-surface-variant text-xs uppercase tracking-wider">
            <a class="hover:text-primary transition-colors cursor-pointer" onclick="window.teachaura.navigate('admin-dashboard')">Administrator Overview</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Teacher Performance Monitoring</span>
          </div>
          <h1 class="font-headline text-3xl font-bold text-on-surface mt-1">
            Teacher Performance Matrix &amp; Staff Audit
          </h1>
          <p class="text-xs text-on-surface-variant">Monitoring syllabus velocity, note submission punctuality, and Guided Teaching adherence across all 8 teachers.</p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            type="button" 
            onclick="window.teachaura.notify('Staff performance audit exported to CSV', 'success')"
            class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/30 text-xs font-semibold shadow-sm transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </section>

      <!-- AI Pedagogical Intervention Banner -->
      <div class="p-space-lg rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] mb-space-lg flex items-start gap-space-md">
        <div class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
          <span class="material-symbols-outlined text-[24px]">psychology</span>
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <h3 class="font-headline text-sm font-bold text-[#1E3A8A]">Aura AI Instructional Supervisor Insights</h3>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DBEAFE] text-[#1E40AF]">Active Pacing Check</span>
          </div>
          <p class="text-xs text-[#1E3A8A] leading-relaxed">
            Overall staff performance is high (<strong class="text-on-surface">71.4% syllabus coverage vs 66% week 6 target</strong>). 
            <strong class="text-primary">Mrs. Adebayo</strong> leads with a 14-day continuous planning streak. 
            <strong class="text-[#B45309]">Mrs. Danjuma</strong> and <strong class="text-[#B45309]">Mr. Okonjo</strong> have been flagged for automated schedule rebalancing due to recent inter-house sports and lab equipment updates.
          </p>
        </div>
      </div>

      <!-- Performance Table -->
      <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden mb-space-lg">
        <div class="p-space-md border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">table_rows</span>
            <h2 class="font-headline text-base font-bold text-on-surface">Staff Performance Roster (8 Educators)</h2>
          </div>
          <div class="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search teacher or department..." 
              class="text-xs px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:bg-white"
              oninput="window.teachaura.filterTeachers(this.value)"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left" id="teacher-performance-table">
            <thead class="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th class="p-3">Teacher &amp; Dept</th>
                <th class="p-3">Classes</th>
                <th class="p-3">Syllabus Coverage</th>
                <th class="p-3">Punctuality</th>
                <th class="p-3">Guided Delivery</th>
                <th class="p-3">Student CA Avg</th>
                <th class="p-3">Streak</th>
                <th class="p-3">Status</th>
                <th class="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/20">
              ${teachers.map(t => `
                <tr class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="p-3">
                    <div class="flex flex-col">
                      <span class="font-bold text-on-surface">${t.name}</span>
                      <span class="text-[11px] text-on-surface-variant">${t.department}</span>
                    </div>
                  </td>
                  <td class="p-3 text-on-surface-variant font-medium">${t.classes}</td>
                  <td class="p-3">
                    <div class="flex flex-col gap-1 w-28">
                      <div class="flex items-center justify-between text-[11px] font-bold">
                        <span class="text-on-surface">${t.syllabusCoverage}%</span>
                        <span class="${t.syllabusCoverage >= 70 ? 'text-primary' : 'text-[#B45309]'}">
                          ${t.syllabusCoverage >= 70 ? 'Ahead' : 'Pacing'}
                        </span>
                      </div>
                      <div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                        <div class="h-full ${t.syllabusCoverage >= 70 ? 'bg-primary' : 'bg-[#F59E0B]'}" style="width: ${t.syllabusCoverage}%;"></div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 font-semibold ${t.punctualityRate >= 95 ? 'text-primary' : 'text-on-surface'}">${t.punctualityRate}%</td>
                  <td class="p-3 font-semibold text-on-surface">${t.guidedModeAdherence}%</td>
                  <td class="p-3 font-semibold text-on-surface">${t.studentCaAverage}%</td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                      🔥 ${t.streak}D
                    </span>
                  </td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Excellent' 
                        ? 'bg-secondary-container text-on-secondary-container' 
                        : t.status === 'Good' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-[#FEF3C7] text-[#92400E]'
                    }">
                      ${t.status}
                    </span>
                  </td>
                  <td class="p-3 text-right">
                    <button 
                      type="button" 
                      onclick="window.teachaura.openTeacherScorecard('${t.id}')"
                      class="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-outline-variant/30 text-on-surface text-xs font-bold transition-all"
                    >
                      Scorecard
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Teacher Detail Scorecard Modal (if open) -->
      ${selectedTeacher ? `
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-space-lg shadow-2xl border border-outline-variant flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  ${selectedTeacher.name.charAt(4) || 'T'}
                </div>
                <div>
                  <h3 class="font-headline text-lg font-bold text-on-surface">${selectedTeacher.name}</h3>
                  <span class="text-xs text-on-surface-variant">${selectedTeacher.department} • Classes: ${selectedTeacher.classes}</span>
                </div>
              </div>
              <button 
                type="button" 
                onclick="window.teachaura.closeTeacherScorecard()"
                class="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Scorecard KPIs Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-3 bg-surface-container-low rounded-xl text-center">
                <span class="text-[10px] text-on-surface-variant uppercase font-bold">Syllabus Coverage</span>
                <span class="font-headline text-xl font-bold text-primary block mt-1">${selectedTeacher.syllabusCoverage}%</span>
              </div>
              <div class="p-3 bg-surface-container-low rounded-xl text-center">
                <span class="text-[10px] text-on-surface-variant uppercase font-bold">Punctuality</span>
                <span class="font-headline text-xl font-bold text-on-surface block mt-1">${selectedTeacher.punctualityRate}%</span>
              </div>
              <div class="p-3 bg-surface-container-low rounded-xl text-center">
                <span class="text-[10px] text-on-surface-variant uppercase font-bold">Guided Mode</span>
                <span class="font-headline text-xl font-bold text-on-surface block mt-1">${selectedTeacher.guidedModeAdherence}%</span>
              </div>
              <div class="p-3 bg-surface-container-low rounded-xl text-center">
                <span class="text-[10px] text-on-surface-variant uppercase font-bold">Active Streak</span>
                <span class="font-headline text-xl font-bold text-tertiary block mt-1">${selectedTeacher.streak} Days</span>
              </div>
            </div>

            <!-- AI Intervention Note -->
            <div class="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex flex-col gap-1">
              <span class="font-bold uppercase tracking-wider text-[10px] text-tertiary">Aura AI Diagnostic Alert:</span>
              <p>${selectedTeacher.aiAlert}</p>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button 
                type="button" 
                onclick="window.teachaura.notify('Commendation note recorded in teacher profile', 'success'); window.teachaura.closeTeacherScorecard();"
                class="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all"
              >
                Log Commendation / Coaching Note
              </button>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
