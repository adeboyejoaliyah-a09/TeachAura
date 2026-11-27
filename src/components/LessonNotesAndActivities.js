export function renderLessonNotesAndActivities(state) {
  const lesson = state.activeLesson;
  const shortNote = lesson.studentShortNote;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Breadcrumb & Header -->
      <section class="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div>
          <div class="flex items-center gap-space-xs text-on-surface-variant text-xs uppercase tracking-wider">
            <a class="hover:text-primary transition-colors cursor-pointer" onclick="window.teachaura.navigate('lesson-planning')">Lesson Studio</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Lesson Notes &amp; Student Notebook Copy</span>
          </div>
          <h1 class="font-headline text-2xl md:text-3xl font-bold text-on-surface mt-1">
            ${shortNote.topic}
          </h1>
          <p class="text-xs text-on-surface-variant">Calibrated for standard Nigerian 2B Exercise Books &amp; Chalkboard Copying</p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            type="button" 
            onclick="window.teachaura.printStudentNote()"
            class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/30 text-xs font-semibold shadow-sm transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>Print Pupil Copies</span>
          </button>
          <button 
            type="button" 
            onclick="window.teachaura.navigate('guided-teaching-mode')"
            class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">co_present</span>
            <span>Stage Classroom Delivery</span>
          </button>
        </div>
      </section>

      <!-- 2B Student Notebook Preview Sheet (Styled like a clean ruled lined book) -->
      <div class="bg-surface-container-lowest rounded-2xl p-space-xl border border-outline-variant/30 shadow-md max-w-4xl mx-auto w-full">
        <!-- Notebook Header Margin -->
        <div class="border-b-2 border-primary/30 pb-4 mb-6 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Subject: <strong class="text-primary">${shortNote.subject}</strong></span>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Class: <strong class="text-on-surface">${shortNote.class}</strong></span>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Term: <strong>2nd Term (Week 6)</strong></span>
          </div>
          <h2 class="font-headline text-xl font-bold text-center text-on-surface underline uppercase tracking-tight mt-2">
            TOPIC: ${lesson.topic.toUpperCase()}
          </h2>
        </div>

        <!-- Definition Section -->
        <div class="mb-6 flex flex-col gap-2">
          <h3 class="font-headline text-sm font-bold text-primary uppercase">1. Definition of Respiration</h3>
          <p class="text-sm text-on-surface leading-relaxed p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
            ${shortNote.definitions}
          </p>
        </div>

        <!-- Contrast Table (The Core 2B Notebook Table) -->
        <div class="mb-6 flex flex-col gap-2">
          <h3 class="font-headline text-sm font-bold text-primary uppercase">2. Differences Between Inhalation and Exhalation</h3>
          <div class="overflow-x-auto border border-outline-variant/40 rounded-xl">
            <table class="w-full text-xs text-left border-collapse">
              <thead class="bg-primary-container text-white font-headline text-xs uppercase">
                <tr>
                  ${shortNote.tableHeaders.map((h) => `<th class="p-3 border-r border-teal-700/50">${h}</th>`).join("")}
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/30 bg-white">
                ${shortNote.tableRows
                  .map(
                    (r, i) => `
                  <tr class="${i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low/40"}">
                    <td class="p-3 font-bold text-primary border-r border-outline-variant/20">${r[0]}</td>
                    <td class="p-3 text-on-surface border-r border-outline-variant/20">${r[1]}</td>
                    <td class="p-3 text-on-surface">${r[2]}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Memory Aid Callout Box -->
        <div class="mb-6 p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-start gap-3 text-xs text-[#92400E]">
          <span class="material-symbols-outlined text-[22px] shrink-0 text-[#B45309]">lightbulb</span>
          <div>
            <strong class="font-bold">Student Memory Key:</strong>
            <p class="mt-0.5">${shortNote.memoryKey}</p>
          </div>
        </div>

        <!-- Classroom Homework Assignment Box -->
        <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-primary uppercase tracking-wider">3. Weekend Homework Exercise</span>
            <span class="text-xs text-on-surface-variant font-mono font-bold">5 Marks</span>
          </div>
          <ol class="text-xs text-on-surface space-y-1.5 list-decimal list-inside pl-1">
            <li>Draw a clear, labeled diagram of the human respiratory system showing the trachea, left bronchus, right bronchus, and lungs.</li>
            <li>In two sentences, state why living in an environment with heavy generator smoke or burning unrefined firewood damages the alveoli.</li>
          </ol>
        </div>
      </div>
    </div>
  `;
}
