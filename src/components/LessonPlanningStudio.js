export function renderLessonPlanningStudio(state) {
  const lesson = state.activeLesson;
  const suggestions = state.auraAiSuggestions;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Top Command & Action Bar -->
      <section class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-lg">
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-xs uppercase tracking-wider flex-wrap">
            <a class="hover:text-primary transition-colors cursor-pointer" onclick="window.teachaura.navigate('overview')">Lesson Preparation</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>${lesson.cohort} Basic Science</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">${lesson.topic}</span>
          </div>
          <div class="flex items-center gap-space-sm flex-wrap mt-0.5">
            <h1 class="font-headline text-2xl md:text-3xl text-on-surface font-bold tracking-tight">Lesson Studio &amp; Curriculum Stager</h1>
            <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>NERDC Aligned • Auto-Saved Just Now</span>
            </div>
          </div>
        </div>

        <!-- Action Toolbar Buttons -->
        <div class="flex items-center gap-2 flex-wrap">
          <button 
            type="button" 
            onclick="window.teachaura.saveLessonNotes()"
            class="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 shadow-sm text-xs font-semibold transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">save</span>
            <span>Save Changes</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.exportPdf()"
            class="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 shadow-sm text-xs font-semibold transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Export PDF</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.toggleChalkboardView()"
            class="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-inverse-surface hover:bg-on-background text-inverse-on-surface shadow-sm text-xs font-semibold transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Chalkboard View</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.navigate('guided-teaching-mode')"
            class="flex items-center gap-1.5 px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white font-title-md text-xs font-bold shadow-md transition-all group"
          >
            <span>Send to Guided Runner</span>
            <span class="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">rocket_launch</span>
          </button>
        </div>
      </section>

      <!-- Lesson Metadata & Context Banner -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-start gap-space-sm">
          <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Target Cohort</span>
            <span class="font-headline text-sm font-bold text-on-surface truncate">${lesson.cohort}</span>
            <span class="font-body text-xs text-on-surface-variant">45 Mins • ${lesson.totalStudents} Students Total</span>
          </div>
        </div>

        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-start gap-space-sm">
          <div class="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">menu_book</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">NERDC Curriculum Theme</span>
            <span class="font-headline text-sm font-bold text-on-surface truncate">${lesson.theme}</span>
            <span class="font-body text-xs text-on-surface-variant">${lesson.subtheme}</span>
          </div>
        </div>

        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-start gap-space-sm">
          <div class="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">schedule</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Pacing &amp; Period</span>
            <span class="font-headline text-sm font-bold text-on-surface truncate">${lesson.period}</span>
            <span class="font-body text-xs text-on-surface-variant">${lesson.venue}</span>
          </div>
        </div>

        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-start gap-space-sm">
          <div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Quality Index</span>
            <span class="font-headline text-sm font-bold text-on-surface truncate">WAEC/BECE Foundation</span>
            <span class="font-body text-xs text-primary font-semibold">94% pass benchmark</span>
          </div>
        </div>
      </section>

      <!-- Behavioral Objectives Card (SMART Format) -->
      <section class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm mb-space-lg">
        <div class="flex flex-col lg:flex-row gap-space-lg justify-between">
          <div class="flex-1 flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">flag</span>
              <h2 class="font-headline text-lg font-bold text-on-surface">Behavioral Objectives</h2>
              <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-secondary-container text-on-secondary-container uppercase">SMART Format</span>
            </div>
            <p class="text-xs text-on-surface-variant italic">
              By the end of the 45-minute period, the JSS 2 learners should comfortably demonstrate:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
              <div class="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                <span class="text-[11px] font-bold text-primary uppercase">1. Cognitive Domain</span>
                <p class="text-xs text-on-surface leading-relaxed">${lesson.behavioralObjectives.cognitive}</p>
              </div>
              <div class="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                <span class="text-[11px] font-bold text-secondary uppercase">2. Psychomotor Domain</span>
                <p class="text-xs text-on-surface leading-relaxed">${lesson.behavioralObjectives.psychomotor}</p>
              </div>
              <div class="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                <span class="text-[11px] font-bold text-tertiary uppercase">3. Affective / Local Context</span>
                <p class="text-xs text-on-surface leading-relaxed">${lesson.behavioralObjectives.affective}</p>
              </div>
            </div>
          </div>

          <!-- Materials & Entry Behavior Side Strip -->
          <div class="lg:w-80 flex flex-col gap-3 pt-3 lg:pt-0 lg:pl-space-md lg:border-l border-outline-variant/20">
            <div>
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">science</span> Instructional Materials
              </span>
              <div class="flex flex-wrap gap-1.5 mt-2">
                ${lesson.instructionalMaterials.map(m => `
                  <span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface text-xs font-medium border border-outline-variant/20">${m}</span>
                `).join('')}
              </div>
            </div>
            <div class="pt-2 border-t border-outline-variant/20">
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">history_edu</span> Learner's Entry Behavior
              </span>
              <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                ${lesson.learnerEntryBehavior}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab Switcher Bar -->
      <div class="flex items-center justify-between mb-space-md border-b border-outline-variant/30 pb-2">
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            id="tab-btn-fullnote"
            onclick="window.teachaura.switchStudioTab('fullnote')"
            class="px-space-md py-2 rounded-lg text-xs font-bold transition-all bg-primary-container text-white shadow-sm flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">description</span>
            <span>Teacher's Lesson Plan (Full Note)</span>
          </button>
          <button 
            type="button" 
            id="tab-btn-shortnote"
            onclick="window.teachaura.switchStudioTab('shortnote')"
            class="px-space-md py-2 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Pupil's 2B Exercise Book Note</span>
          </button>
        </div>
        <span class="text-xs text-on-surface-variant font-medium hidden sm:inline-block">Format: Standard NERDC Secondary Schema</span>
      </div>

      <!-- Main Studio Body: Content Matrix & Aura AI Assistant -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        <!-- Left: Full Lesson Plan Details -->
        <div class="xl:col-span-8 flex flex-col gap-space-lg" id="studio-left-pane">
          <!-- Stage 1 -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">1</span>
                <h3 class="font-headline text-base font-bold text-on-surface">Lesson Introduction &amp; Starter Hook</h3>
              </div>
              <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-mono font-bold">00:00 - 05:00</span>
            </div>
            <div class="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface leading-relaxed border border-outline-variant/20">
              ${lesson.stages[0].teacherPrompt}
            </div>
            <div class="flex items-center gap-1.5 text-xs text-primary font-medium">
              <span class="material-symbols-outlined text-[16px]">lightbulb</span>
              <span>${lesson.stages[0].contextualTip}</span>
            </div>
          </div>

          <!-- Stage 2 -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">2</span>
                <h3 class="font-headline text-base font-bold text-on-surface">Step-by-Step Instructional Matrix</h3>
              </div>
              <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-mono font-bold">05:00 - 25:00</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-xs text-left">
                <thead class="bg-surface-container text-on-surface uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th class="p-2.5 rounded-l-lg w-20">Step &amp; Time</th>
                    <th class="p-2.5">Teacher's Pedagogical Flow</th>
                    <th class="p-2.5 rounded-r-lg">Pupils' Active Engagement</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/20">
                  ${lesson.stages[1].steps.map(s => `
                    <tr>
                      <td class="p-2.5 font-bold text-primary align-top">Step ${s.stepNumber} <br><span class="text-on-surface-variant font-normal">(${s.time})</span></td>
                      <td class="p-2.5 text-on-surface align-top leading-relaxed">${s.teacherAction}</td>
                      <td class="p-2.5 text-on-surface-variant align-top leading-relaxed">${s.pupilEngagement}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Stage 3 & Apparatus -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">3</span>
                <h3 class="font-headline text-base font-bold text-on-surface">Chalkboard Diagram &amp; Apparatus Layout</h3>
              </div>
              <span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-xs font-bold">Lab Staging</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div class="p-space-md bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <span class="font-headline font-bold text-xs text-on-surface">Figure 6.1: The Respiratory Pathway</span>
                  <span class="px-2 py-0.5 rounded bg-white text-[10px] font-bold text-primary border border-outline-variant/30">Board Copy</span>
                </div>
                <div class="h-32 bg-surface-container rounded-lg flex items-center justify-center text-on-surface-variant text-xs flex-col gap-1 p-2 border border-dashed border-outline-variant">
                  <span class="material-symbols-outlined text-[32px] text-primary">draw</span>
                  <span class="font-bold">Chalkboard Quadrant Layout</span>
                  <span class="text-[11px] text-center">Trachea → Bronchus → Alveoli (4 Labels Required)</span>
                </div>
                <p class="text-[11px] text-on-surface-variant italic">Teacher draws this on the right-hand board quadrant using white and yellow chalk.</p>
              </div>

              <div class="p-space-md bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <span class="font-headline font-bold text-xs text-on-surface">DIY Bell-Jar Model Setup</span>
                  <span class="px-2 py-0.5 rounded bg-white text-[10px] font-bold text-tertiary border border-outline-variant/30">Hands-on</span>
                </div>
                <div class="h-32 bg-surface-container rounded-lg flex items-center justify-center text-on-surface-variant text-xs flex-col gap-1 p-2 border border-dashed border-outline-variant">
                  <span class="material-symbols-outlined text-[32px] text-tertiary">science</span>
                  <span class="font-bold">Plastic Bottle &amp; Balloon Model</span>
                  <span class="text-[11px] text-center">Pulling bottom rubber diaphragm inflates internal balloons</span>
                </div>
                <p class="text-[11px] text-on-surface-variant italic">Demonstrates Boyle's breathing mechanics without imported hospital equipment.</p>
              </div>
            </div>
          </div>

          <!-- Stage 4 & 5 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col gap-2">
              <div class="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                <span class="font-headline text-xs font-bold text-on-surface">4. Student Practical (10 Mins)</span>
                <span class="text-xs font-mono text-on-surface-variant">25:00 - 35:00</span>
              </div>
              <p class="text-xs text-on-surface leading-relaxed">
                ${lesson.stages[2].teacherPrompt}
              </p>
            </div>

            <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col gap-2">
              <div class="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                <span class="font-headline text-xs font-bold text-on-surface">5. Class Evaluation (10 Mins)</span>
                <span class="text-xs font-mono text-on-surface-variant">35:00 - 45:00</span>
              </div>
              <p class="text-xs text-on-surface leading-relaxed">
                ${lesson.stages[3].teacherPrompt}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Aura AI Co-Pilot Panel -->
        <div class="xl:col-span-4 flex flex-col gap-space-md">
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm">
                  <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div>
                  <h3 class="font-headline text-sm font-bold text-on-surface">Aura AI Co-Pilot</h3>
                  <span class="text-[11px] text-primary font-bold">Nigerian Classroom Tuned</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">Active</span>
            </div>

            <p class="text-xs text-on-surface-variant leading-relaxed">
              Contextually analyzing your JSS 2 Lesson. Click any tactical recommendation to inject it into your note.
            </p>

            <!-- Clickable Suggestion Cards -->
            <div class="flex flex-col gap-3">
              ${suggestions.map(s => `
                <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container transition-all flex flex-col gap-1.5 group">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">${s.badge}</span>
                    <button 
                      type="button" 
                      onclick="window.teachaura.injectAiSuggestion('${s.id}')"
                      class="text-primary hover:text-primary-container p-1 rounded-full group-hover:scale-110 transition-transform" 
                      title="${s.actionLabel}"
                    >
                      <span class="material-symbols-outlined text-[18px]">add_circle</span>
                    </button>
                  </div>
                  <h4 class="text-xs font-bold text-on-surface">${s.title}</h4>
                  <p class="text-[11px] text-on-surface-variant leading-relaxed">${s.description}</p>
                </div>
              `).join('')}
            </div>

            <!-- Custom Aura Instruction Input -->
            <div class="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
              <label class="text-[11px] font-bold text-on-surface uppercase tracking-wider">Custom Aura Instruction</label>
              <div class="relative">
                <textarea 
                  id="custom-aura-prompt"
                  rows="2"
                  class="w-full text-xs p-2.5 rounded-xl border border-outline-variant bg-surface-container-low focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-on-surface"
                  placeholder="e.g. Adapt this lesson for a classroom with no electricity or digital projector..."
                ></textarea>
              </div>
              <button 
                type="button" 
                onclick="window.teachaura.runCustomAuraPrompt()"
                class="w-full py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Generate Suggestion</span>
              </button>
            </div>
          </div>

          <!-- Quick Link to Guided Runner -->
          <div class="bg-surface-container-lowest p-space-md rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[24px]">co_present</span>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-on-surface">Ready to teach this class?</span>
                <span class="text-[11px] text-on-surface-variant">Switch to the 45-min live runner</span>
              </div>
            </div>
            <button 
              type="button" 
              onclick="window.teachaura.navigate('guided-teaching-mode')"
              class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all"
            >
              Launch Live
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
