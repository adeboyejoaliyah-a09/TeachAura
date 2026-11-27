export function renderTeacherDashboard(state) {
  const teacher = state.currentUser.teacher;
  const pacing = state.syllabusPacing;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Top Greeting & Status Strip -->
      <section class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
        <div class="flex flex-col gap-space-xs">
          <div class="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-secondary-container w-fit text-on-secondary-container font-label-sm text-xs font-semibold">
            <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">verified</span>
            <span>NERDC Basic &amp; Senior Secondary Standard</span>
          </div>
          <h1 class="font-headline text-3xl md:text-4xl text-on-surface font-bold tracking-tight mt-1">
            Good morning, ${teacher.name}! ☀️
          </h1>
          <p class="font-body text-base text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>Week ${state.institution.currentWeek} of ${state.institution.totalWeeks}</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span>2nd Term 2024/2025</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span class="font-semibold text-primary">You have ${teacher.todayClassesCount} classes scheduled today</span>
          </p>
        </div>

        <!-- Streak & Gamification Ribbon -->
        <div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-space-md border border-outline-variant/30">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm">
              <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <span class="font-headline text-xl text-on-surface font-bold">${teacher.activeStreakDays}-Day</span>
                <span class="font-label-sm text-[11px] uppercase tracking-wider text-tertiary font-bold bg-tertiary-fixed/60 px-1.5 py-0.5 rounded">Active Streak</span>
              </div>
              <span class="font-body text-xs text-on-surface-variant">Continuous Lesson Preparation</span>
            </div>
          </div>
          <div class="hidden sm:block h-8 w-px bg-surface-container"></div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs" title="Completed 100% of Week 5 Objectives">
              <span class="material-symbols-outlined text-[14px] text-tertiary-container">military_tech</span> Syllabus Champ
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs" title="On schedule for 2nd Term WAEC &amp; BECE benchmarks">
              <span class="material-symbols-outlined text-[14px] text-primary">speed</span> Pacing Master
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-semibold">
              <span class="material-symbols-outlined text-[14px] text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span> Aligned
            </span>
          </div>
        </div>
      </section>

      <!-- Metric Stat Cards Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
        <!-- Stat 1 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-all">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Today's Lessons</span>
              <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${teacher.todayClassesCount} Classes</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">school</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/20">
            <span class="font-body text-xs text-on-surface-variant">Next: JSS 2A Basic Sci</span>
            <span class="font-label-sm text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">09:15 AM</span>
          </div>
        </div>

        <!-- Stat 2 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-all">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Term Syllabus Covered</span>
              <div class="flex items-baseline gap-2">
                <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${teacher.termSyllabusCoveredPercent}%</span>
                <span class="text-xs font-bold text-primary flex items-center">↑ +4%</span>
              </div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">bar_chart</span>
            </div>
          </div>
          <div class="flex items-center gap-2 pt-4 mt-2 border-t border-outline-variant/20">
            <div class="h-2 flex-1 bg-surface-container rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" style="width: ${teacher.termSyllabusCoveredPercent}%;"></div>
            </div>
            <span class="text-[11px] text-on-surface-variant font-medium">Ahead of benchmark</span>
          </div>
        </div>

        <!-- Stat 3 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-all">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">AI Prep Time Saved</span>
              <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${teacher.prepTimeSavedHours} hrs</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">timer</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/20">
            <span class="font-body text-xs text-on-surface-variant">This Month</span>
            <span class="font-label-sm text-xs font-semibold text-tertiary flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">bolt</span> 4.6 hrs/wk saved
            </span>
          </div>
        </div>

        <!-- Stat 4 -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-all">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Generated Assessments</span>
              <span class="font-headline text-3xl text-on-surface font-bold tracking-tight">${teacher.generatedAssessmentsCount} Tests</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">assignment</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/20">
            <span class="font-body text-xs text-on-surface-variant">Continuous Assessment</span>
            <span class="font-label-sm text-xs font-semibold text-primary">Ready for Week 7 CA</span>
          </div>
        </div>
      </section>

      <!-- Main 2-Column Content Split -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <!-- Left Column: Timetable & Action Cards -->
        <div class="lg:col-span-8 flex flex-col gap-space-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h2 class="font-headline text-2xl font-bold text-on-surface">Today's Timetable &amp; Action Cards</h2>
            </div>
            <div class="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span>Wednesday, 19 Feb</span>
              <span class="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary">sync</span>
            </div>
          </div>

          <!-- Card 1: JSS 2A Basic Science (Hero Action Card) -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border-2 border-primary/20 shadow-sm relative overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm border-b border-outline-variant/20">
              <div class="flex items-center gap-space-sm">
                <span class="px-2.5 py-1 rounded-md bg-primary text-white font-headline text-xs font-bold">JSS 2A</span>
                <span class="font-headline text-lg font-bold text-on-surface">Basic Science</span>
                <span class="text-xs text-on-surface-variant font-medium">• Federal Govt College Main Block • Lab 2</span>
              </div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                  ● Lesson Note Ready
                </span>
                <span class="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">schedule</span> 09:15 AM - 10:00 AM (45 Mins)
                </span>
              </div>
            </div>

            <!-- Subject Details -->
            <div class="my-space-md p-space-md bg-surface-container-low rounded-xl flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-primary">NERDC Unit 4.2 • Class Size: 44 Students</span>
              </div>
              <h3 class="font-headline text-xl font-bold text-on-surface">The Human Respiratory System</h3>
              <p class="text-xs text-on-surface-variant">
                Subtopic: Mechanism of Gaseous Exchange (Inhalation vs Exhalation &amp; Alveoli diffusion).
              </p>
              
              <!-- Focus Aids -->
              <div class="flex items-center gap-2 flex-wrap mt-2 pt-2 border-t border-outline-variant/20">
                <span class="text-[11px] font-bold text-on-surface-variant uppercase">Focus Aids:</span>
                <span class="px-2.5 py-1 rounded-md bg-white border border-outline-variant/30 text-xs text-on-surface">Bellringer: Breathing rate exercise</span>
                <span class="px-2.5 py-1 rounded-md bg-white border border-outline-variant/30 text-xs text-on-surface">Visual: Lungs bell jar model</span>
                <span class="px-2.5 py-1 rounded-md bg-secondary-container/50 border border-secondary-container text-xs text-primary font-medium">Local example: Lagos traffic pollution impact</span>
              </div>
            </div>

            <!-- Action Buttons Strip -->
            <div class="flex items-center justify-between pt-space-xs gap-3 flex-wrap">
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  onclick="window.teachaura.navigate('lesson-planning')"
                  class="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs font-semibold transition-all"
                >
                  <span class="material-symbols-outlined text-[18px]">visibility</span>
                  <span>View Lesson Note</span>
                </button>
                <button 
                  type="button" 
                  onclick="window.teachaura.printStudentNote()"
                  class="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs font-semibold transition-all"
                >
                  <span class="material-symbols-outlined text-[18px]">print</span>
                  <span>Print Student Short Note</span>
                </button>
              </div>

              <button 
                type="button" 
                onclick="window.teachaura.navigate('guided-teaching-mode')"
                class="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white font-title-md text-xs font-bold shadow-md transition-all active:scale-95 group"
              >
                <span class="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Launch Guided Mode</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Card 2: SS 1B Biology -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-xs border-b border-outline-variant/20">
              <div class="flex items-center gap-space-sm">
                <span class="px-2.5 py-1 rounded-md bg-secondary text-white font-headline text-xs font-bold">SS 1B</span>
                <span class="font-headline text-lg font-bold text-on-surface">Biology</span>
                <span class="text-xs text-on-surface-variant font-medium">• Science Wing • Room 14</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
                  ● Drafting Materials
                </span>
                <span class="text-xs text-on-surface-variant font-medium">11:30 AM - 12:15 PM</span>
              </div>
            </div>

            <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-1">
              <span class="text-[11px] font-bold text-secondary uppercase">WAEC Scheme of Work - Week 6</span>
              <h4 class="font-headline text-base font-bold text-on-surface">Cell Structure &amp; Functions (Organelles)</h4>
              <p class="text-xs text-on-surface-variant">Differentiating Plant vs. Animal Cell organelles under light microscopy.</p>
            </div>

            <div class="flex items-center gap-2 justify-end pt-1">
              <button 
                type="button" 
                onclick="window.teachaura.navigate('lesson-planning')"
                class="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container/10 text-primary hover:bg-primary-container/20 text-xs font-semibold transition-all"
              >
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Generate AI Lesson Note</span>
              </button>
              <button 
                type="button" 
                onclick="window.teachaura.navigate('assessment-studio')"
                class="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-all"
              >
                <span class="material-symbols-outlined text-[16px]">quiz</span>
                <span>Prepare Quiz</span>
              </button>
            </div>
          </div>

          <!-- Card 3: JSS 3C Basic Science -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-xs border-b border-outline-variant/20">
              <div class="flex items-center gap-space-sm">
                <span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-headline text-xs font-bold">JSS 3C</span>
                <span class="font-headline text-lg font-bold text-on-surface">Basic Science</span>
                <span class="text-xs text-on-surface-variant font-medium">• FGC Junior Block • Hall B</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                  Review Scheduled
                </span>
                <span class="text-xs text-on-surface-variant font-medium">01:30 PM - 02:15 PM</span>
              </div>
            </div>

            <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-1">
              <span class="text-[11px] font-bold text-on-surface-variant uppercase">BECE Preparatory Topic</span>
              <h4 class="font-headline text-base font-bold text-on-surface">Renewable Energy Resources &amp; Hydroelectric Systems</h4>
              <p class="text-xs text-on-surface-variant">Case study: Kainji Dam power generation and solar installations in Nigeria.</p>
            </div>
          </div>
        </div>

        <!-- Right Column: AI Calendar, Pacing & Library -->
        <div class="lg:col-span-4 flex flex-col gap-space-lg">
          <!-- AI Calendar Assistant Card -->
          <div class="bg-[#FFFBEB] border border-[#FDE68A] p-space-lg rounded-2xl flex flex-col gap-3 shadow-sm">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span class="material-symbols-outlined text-[18px]">calendar_month</span>
              </div>
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-tertiary">AI Calendar Assistant</span>
                <h3 class="font-headline text-sm font-bold text-on-surface">Mid-Term Pacing Auto-Correction</h3>
              </div>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Federal Mid-Term Break (2 days) next week accounted for. TeachAura AI has adjusted <strong class="text-on-surface">3 outstanding subtopics</strong> into double-period practicals to maintain <strong class="text-primary">100% term coverage</strong> prior to unified examinations.
            </p>
            <div class="flex items-center justify-between pt-2 border-t border-[#FDE68A]/60">
              <button 
                type="button" 
                onclick="window.teachaura.notify('Proposed schedule aligned with Nigerian school calendar', 'success')"
                class="text-xs font-bold text-tertiary hover:underline flex items-center gap-1"
              >
                <span>Review Proposed Schedule</span>
                <span class="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
              <span class="px-2 py-0.5 rounded-full bg-white text-xs font-bold text-primary border border-[#FDE68A]">Synced</span>
            </div>
          </div>

          <!-- Curriculum Syllabus Pace Widget -->
          <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h3 class="font-headline text-base font-bold text-on-surface">Curriculum Syllabus Pace</h3>
              <span class="text-xs font-semibold text-primary cursor-pointer hover:underline" onclick="window.teachaura.navigate('achievements-and-streaks')">Full Breakdown →</span>
            </div>

            <div class="flex flex-col gap-3">
              ${pacing
                .map(
                  (p) => `
                <div class="flex flex-col gap-1.5 p-space-sm bg-surface-container-low rounded-xl">
                  <div class="flex items-center justify-between">
                    <span class="font-body text-xs font-bold text-on-surface">${p.title}</span>
                    <span class="font-label-sm text-xs font-bold text-primary">${p.percentage}%</span>
                  </div>
                  <div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full" style="width: ${p.percentage}%;"></div>
                  </div>
                  <div class="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>${p.completedTopics} of ${p.totalTopics} Topics Done</span>
                    <span class="${p.isAhead ? "text-primary font-bold" : ""}">${p.status}</span>
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>

            <!-- Action Button -->
            <button 
              type="button" 
              onclick="window.teachaura.navigate('guided-teaching-mode')"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-primary transition-all shadow-sm"
            >
              <span class="material-symbols-outlined text-[18px]">co_present</span>
              <span>Stage Classroom Lesson Now</span>
            </button>
          </div>

          <!-- Recent Lesson Notes -->
          <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h3 class="font-headline text-base font-bold text-on-surface">Recent Lesson Notes</h3>
              <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Library</span>
            </div>

            <div class="flex flex-col gap-2">
              <div class="p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer transition-all flex items-center justify-between" onclick="window.teachaura.navigate('lesson-planning')">
                <div class="flex items-center gap-2.5">
                  <span class="material-symbols-outlined text-[20px] text-primary">menu_book</span>
                  <div>
                    <h4 class="text-xs font-bold text-on-surface">Respiratory System JSS 2</h4>
                    <p class="text-[11px] text-on-surface-variant">Edited today • Approved</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
              </div>

              <div class="p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer transition-all flex items-center justify-between" onclick="window.teachaura.navigate('lesson-planning')">
                <div class="flex items-center gap-2.5">
                  <span class="material-symbols-outlined text-[20px] text-secondary">biotech</span>
                  <div>
                    <h4 class="text-xs font-bold text-on-surface">Cellular Respiration SS 1</h4>
                    <p class="text-[11px] text-on-surface-variant">Yesterday • 4 Slides Ready</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
              </div>

              <div class="p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer transition-all flex items-center justify-between" onclick="window.teachaura.navigate('lesson-planning')">
                <div class="flex items-center gap-2.5">
                  <span class="material-symbols-outlined text-[20px] text-tertiary">eco</span>
                  <div>
                    <h4 class="text-xs font-bold text-on-surface">Ecology &amp; Habitat JSS 3</h4>
                    <p class="text-[11px] text-on-surface-variant">Monday • Activity Included</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
              </div>
            </div>

            <!-- Fast Actions Bar -->
            <div class="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
              <span class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Fast Actions</span>
              <button 
                type="button" 
                onclick="window.teachaura.triggerUploadSyllabus()"
                class="w-full flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface transition-all"
              >
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[16px] text-primary">upload_file</span>
                  <span>Upload Syllabus (PDF/DOCX)</span>
                </div>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">AI Parse</span>
              </button>

              <button 
                type="button" 
                onclick="window.teachaura.navigate('assessment-studio')"
                class="w-full flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface transition-all"
              >
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[16px] text-tertiary">quiz</span>
                  <span>Generate Custom Class Test</span>
                </div>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
