export function renderAssessmentStudio(state) {
  const assessment = state.assessmentData;
  const isStudent = state.assessmentView === "student";

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Top Header & Actions -->
      <section class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-lg">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">
              NERDC National Curriculum Compliant
            </span>
            <span class="text-xs text-on-surface-variant font-medium">• BECE Ready Format</span>
          </div>
          <h1 class="font-headline text-2xl md:text-3xl font-bold text-on-surface mt-1">
            Assessment Studio &amp; Examination Generator
          </h1>
          <div class="flex items-center gap-2 text-xs text-on-surface-variant flex-wrap">
            <span class="font-bold text-primary">JSS 2 • Basic Science &amp; Technology</span>
            <span>•</span>
            <span>Theme: Living Things • Respiratory &amp; Circulatory Systems</span>
            <span>•</span>
            <span class="font-semibold text-on-surface">30 Total Marks • 35 Mins</span>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <button 
            type="button" 
            onclick="window.teachaura.notify('Exporting exam paper to DOCX format...', 'info')"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/30 text-xs font-semibold shadow-sm transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">description</span>
            <span>Export Word DOCX</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.printAssessmentPaper('student')"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>Print Test Paper</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.printAssessmentPaper('marking')"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-xs font-bold shadow-md transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Print Marking Scheme</span>
          </button>
        </div>
      </section>

      <!-- Main Studio Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <!-- Left Setup & Parameters Panel (4 Cols) -->
        <div class="lg:col-span-4 flex flex-col gap-space-md">
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[20px]">tune</span>
                <h3 class="font-headline text-sm font-bold text-on-surface">Curriculum &amp; Exam Setup</h3>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container uppercase">BECE Standard</span>
            </div>

            <!-- Focus Domains -->
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Subtopics &amp; Focus Domains</span>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-medium">The Human Respiratory System</span>
                <span class="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-medium">Gaseous Exchange Process</span>
                <span class="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface text-xs font-medium">Respiratory Disorders</span>
              </div>
            </div>

            <!-- Mark Matrix -->
            <div class="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Mark Composition Matrix</span>
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="p-2 bg-surface-container-low rounded-xl">
                  <span class="text-[10px] text-on-surface-variant uppercase font-bold block">Multiple Choice</span>
                  <span class="font-headline text-base font-bold text-primary block mt-0.5">10 Qs</span>
                  <span class="text-[10px] text-on-surface-variant font-medium">10 Marks</span>
                </div>
                <div class="p-2 bg-surface-container-low rounded-xl">
                  <span class="text-[10px] text-on-surface-variant uppercase font-bold block">Fill-the-Gap</span>
                  <span class="font-headline text-base font-bold text-primary block mt-0.5">5 Qs</span>
                  <span class="text-[10px] text-on-surface-variant font-medium">5 Marks</span>
                </div>
                <div class="p-2 bg-surface-container-low rounded-xl">
                  <span class="text-[10px] text-on-surface-variant uppercase font-bold block">Theory Rubric</span>
                  <span class="font-headline text-base font-bold text-primary block mt-0.5">3 Qs</span>
                  <span class="text-[10px] text-on-surface-variant font-medium">15 Marks</span>
                </div>
              </div>
            </div>

            <!-- Regenerate with AI button -->
            <button 
              type="button" 
              onclick="window.teachaura.regenerateQuestions()"
              class="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Regenerate Questions with AI</span>
            </button>
          </div>

          <!-- Compliance Checklist -->
          <div class="bg-surface-container-lowest p-space-md rounded-2xl border border-outline-variant/30 shadow-sm flex items-start gap-3">
            <span class="material-symbols-outlined text-primary text-[24px]">verified</span>
            <div class="flex flex-col">
              <h4 class="text-xs font-bold text-on-surface">Curriculum Compliance Check</h4>
              <p class="text-[11px] text-on-surface-variant mt-0.5">
                BECE / JSCE Standard 100% Match. Verified against 2024 revised NERDC basic science scheme.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Examination Sheet / Marking Scheme (8 Cols) -->
        <div class="lg:col-span-8 flex flex-col gap-space-md">
          <div class="bg-surface-container-lowest rounded-2xl p-space-xl border border-outline-variant/30 shadow-md flex flex-col gap-6">
            <!-- Mode Switcher Tabs: Student Test Paper vs Marking Guide -->
            <div class="flex items-center justify-between pb-3 border-b border-outline-variant/30 flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  onclick="window.teachaura.toggleAssessmentView('student')"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isStudent ? "bg-primary text-white shadow-sm" : "bg-surface-container-low text-on-surface hover:bg-surface-container"}"
                >
                  <span class="material-symbols-outlined text-[16px]">edit_document</span>
                  <span>Student Test Paper</span>
                </button>
                <button 
                  type="button" 
                  onclick="window.teachaura.toggleAssessmentView('marking')"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isStudent ? "bg-primary text-white shadow-sm" : "bg-surface-container-low text-on-surface hover:bg-surface-container"}"
                >
                  <span class="material-symbols-outlined text-[16px]">fact_check</span>
                  <span>Teacher's Marking Guide &amp; Rubric</span>
                </button>
              </div>
              <span class="text-xs text-on-surface-variant font-medium">
                ${isStudent ? "Pupil Clean Examination Sheet" : "WAEC / BECE Standardized Scheme"}
              </span>
            </div>

            <!-- Exam Paper Header -->
            <div class="border-b-2 border-on-surface/20 pb-4 text-center flex flex-col gap-1">
              <h2 class="font-headline text-base font-bold uppercase tracking-wider text-on-surface">${assessment.examTitle}</h2>
              <h3 class="text-xs font-semibold uppercase text-on-surface-variant">${assessment.subtitle}</h3>
              <div class="flex items-center justify-center gap-4 text-xs font-medium text-on-surface mt-2 flex-wrap">
                <span>SUBJECT: <strong class="text-primary">${assessment.subject}</strong></span>
                <span>•</span>
                <span>CLASS: <strong>${assessment.targetClass}</strong></span>
                <span>•</span>
                <span>TIME: <strong>${assessment.timeAllowed}</strong></span>
                <span>•</span>
                <span>MARKS: <strong>${assessment.totalMarks} Marks</strong></span>
              </div>
              <p class="text-[11px] text-on-surface-variant italic mt-1">
                INSTRUCTIONS: Answer all questions in Section A and B. Answer all parts in Section C on the answer sheet provided.
              </p>
            </div>

            <!-- SECTION A -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <h4 class="font-headline text-xs font-bold uppercase text-primary tracking-wider">SECTION A: Multiple Choice Questions (10 Marks)</h4>
                <span class="text-[11px] text-on-surface-variant">[1 Mark Each]</span>
              </div>

              <!-- Question 1 -->
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
                <span class="text-xs font-semibold text-on-surface">1. ${assessment.questions[0].question}</span>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  ${assessment.questions[0].options
                    .map((opt, i) => {
                      const isCorrect =
                        i === assessment.questions[0].correctIndex;
                      return `
                      <div class="p-2 rounded-lg text-xs flex items-center gap-2 ${!isStudent && isCorrect ? "bg-secondary-container/60 border border-primary/40 font-semibold text-on-surface" : "bg-white border border-outline-variant/30 text-on-surface"}">
                        <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${!isStudent && isCorrect ? "bg-primary text-white" : "bg-surface-container text-on-surface"}">
                          ${String.fromCharCode(65 + i)}
                        </span>
                        <span>${opt}</span>
                      </div>
                    `;
                    })
                    .join("")}
                </div>
                ${
                  !isStudent
                    ? `
                  <div class="mt-2 p-2 bg-white rounded border border-outline-variant/30 text-[11px] text-on-surface-variant">
                    <strong class="text-primary">${assessment.questions[0].markingScheme}</strong>
                  </div>
                `
                    : ""
                }
              </div>

              <!-- Question 2 -->
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
                <span class="text-xs font-semibold text-on-surface">2. ${assessment.questions[1].question}</span>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                  ${assessment.questions[1].options
                    .map((opt, i) => {
                      const isCorrect =
                        i === assessment.questions[1].correctIndex;
                      return `
                      <div class="p-2 rounded-lg text-xs flex items-center gap-2 ${!isStudent && isCorrect ? "bg-secondary-container/60 border border-primary/40 font-semibold text-on-surface" : "bg-white border border-outline-variant/30 text-on-surface"}">
                        <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${!isStudent && isCorrect ? "bg-primary text-white" : "bg-surface-container text-on-surface"}">
                          ${String.fromCharCode(65 + i)}
                        </span>
                        <span>${opt}</span>
                      </div>
                    `;
                    })
                    .join("")}
                </div>
                ${
                  !isStudent
                    ? `
                  <div class="mt-2 p-2 bg-white rounded border border-outline-variant/30 text-[11px] text-on-surface-variant">
                    <strong class="text-primary">${assessment.questions[1].markingScheme}</strong>
                  </div>
                `
                    : ""
                }
              </div>
            </div>

            <!-- SECTION B -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <h4 class="font-headline text-xs font-bold uppercase text-primary tracking-wider">SECTION B: Fill-in-the-Gap Questions (5 Marks)</h4>
                <span class="text-[11px] text-on-surface-variant">[1 Mark Each]</span>
              </div>

              <div class="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
                <p class="text-xs text-on-surface leading-relaxed">
                  3. The cartilaginous structure commonly referred to as the 'voice box' located at the superior opening of the trachea is scientifically known as the ${
                    isStudent
                      ? "________________________."
                      : '<strong class="text-primary underline px-1">Larynx</strong>.'
                  }
                </p>
                ${
                  !isStudent
                    ? `
                  <div class="p-2 bg-white rounded border border-outline-variant/30 text-[11px] text-on-surface-variant">
                    <span class="font-bold text-primary">Model Answer: Larynx (1 Mk).</span> Accepted: Larynx / Voice box. (Do NOT accept Pharynx or Epiglottis).
                  </div>
                `
                    : ""
                }
              </div>
            </div>

            <!-- SECTION C -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <h4 class="font-headline text-xs font-bold uppercase text-primary tracking-wider">SECTION C: Theory &amp; Step-by-Step Marking Rubrics (15 Marks)</h4>
                <span class="text-[11px] text-on-surface-variant">[Total: 5 Marks]</span>
              </div>

              <div class="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
                <p class="text-xs font-semibold text-on-surface leading-relaxed whitespace-pre-line">
                  4. ${assessment.questions[3].question}
                </p>

                ${
                  isStudent
                    ? `
                  <!-- Blank writing space for students -->
                  <div class="h-40 bg-white border border-dashed border-outline-variant rounded-xl p-3 flex flex-col justify-between text-on-surface-variant text-[11px]">
                    <span>[Candidate Answer Space for Part (a) Table &amp; Part (b) Explanation]</span>
                    <span class="text-right text-[10px]">Continue on back if needed</span>
                  </div>
                `
                    : `
                  <!-- Rubric Table for Teacher -->
                  <div class="overflow-x-auto border border-outline-variant/40 rounded-xl bg-white">
                    <table class="w-full text-xs text-left">
                      <thead class="bg-surface-container text-on-surface uppercase text-[10px] tracking-wider font-bold">
                        <tr>
                          <th class="p-2.5">Parameter</th>
                          <th class="p-2.5">Inhaled Air</th>
                          <th class="p-2.5">Exhaled Air</th>
                          <th class="p-2.5 text-right">Award Criteria</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-outline-variant/20">
                        ${assessment.questions[3].rubric
                          .map(
                            (r) => `
                          <tr>
                            <td class="p-2.5 font-bold text-on-surface">${r.parameter}</td>
                            <td class="p-2.5 text-on-surface-variant">${r.inhaled}</td>
                            <td class="p-2.5 text-on-surface-variant">${r.exhaled}</td>
                            <td class="p-2.5 text-right font-bold text-primary">${r.marks}</td>
                          </tr>
                        `,
                          )
                          .join("")}
                      </tbody>
                    </table>
                  </div>

                  <div class="p-2.5 bg-white rounded-lg border border-outline-variant/30 text-xs">
                    <strong class="text-primary font-bold">Part (b) Mechanism Rubric [2 Marks]:</strong>
                    <p class="text-on-surface-variant text-[11px] mt-1">${assessment.questions[3].partB}</p>
                  </div>
                `
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
