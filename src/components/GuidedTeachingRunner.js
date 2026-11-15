export function renderGuidedTeachingRunner(state) {
  const lesson = state.activeLesson;
  const classroom = state.classroom;
  const stages = lesson.stages;
  const currentStage = stages[classroom.currentStageIndex];

  // Format remaining time
  const mins = Math.floor(classroom.remainingSeconds / 60);
  const secs = classroom.remainingSeconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const elapsedMins = Math.floor(classroom.elapsedTotalSeconds / 60);
  const elapsedSecs = classroom.elapsedTotalSeconds % 60;
  const formattedElapsed = `${String(elapsedMins).padStart(2, '0')}:${String(elapsedSecs).padStart(2, '0')}`;

  return `
    <div class="flex flex-col w-full pb-20">
      <!-- Top Stage Banner & Controls Strip -->
      <section class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm mb-space-lg">
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
          <div class="flex flex-col gap-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">
                ● Live Stage Runner
              </span>
              <span class="text-xs text-on-surface-variant font-medium">JSS 2A • Basic Science • Federal Scheme Week 6</span>
              <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-mono font-bold">NERDC BIO-02-WK6</span>
            </div>
            <h1 class="font-headline text-2xl md:text-3xl font-bold text-on-surface tracking-tight mt-1">
              ${lesson.topic}
            </h1>
            <div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium flex-wrap">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">schedule</span> Total Target: 45:00 Mins
              </span>
              <span>•</span>
              <span class="flex items-center gap-1 font-semibold text-primary">
                <span class="material-symbols-outlined text-[16px]">timer</span> Elapsed: ${formattedElapsed}
              </span>
            </div>
          </div>

          <!-- Active Stage Timer Pod -->
          <div class="flex flex-col sm:flex-row items-center gap-space-md bg-surface-container-low p-space-md rounded-2xl border border-outline-variant/30 self-start xl:self-auto">
            <div class="flex flex-col items-center sm:items-start">
              <span class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                STAGE ${classroom.currentStageIndex + 1} REMAINING
              </span>
              <div class="flex items-baseline gap-1">
                <span class="font-headline text-3xl font-mono font-bold text-primary tracking-tight" id="live-timer-display">
                  ${formattedTime}
                </span>
                <span class="text-xs font-mono text-on-surface-variant">/ ${currentStage.plannedDuration}</span>
              </div>
              <span class="text-[11px] text-on-surface-variant font-medium">Lesson left: 26:36</span>
            </div>

            <div class="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-outline-variant/30 pt-2 sm:pt-0 sm:pl-space-md">
              <button 
                type="button" 
                onclick="window.teachaura.toggleLiveTimer()"
                class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-container transition-all shadow-sm"
                title="${classroom.isRunning ? 'Pause Stage Timer' : 'Resume Stage Timer'}"
              >
                <span class="material-symbols-outlined text-[22px]">
                  ${classroom.isRunning ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button 
                type="button" 
                onclick="window.teachaura.extendLiveStage(120)"
                class="px-2.5 py-2 rounded-xl bg-surface-container hover:bg-outline-variant/30 text-on-surface text-xs font-bold transition-all"
                title="Add 2 Minutes"
              >
                +2m
              </button>

              <button 
                type="button" 
                onclick="window.teachaura.completeCurrentStage()"
                class="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-primary transition-all shadow-sm"
              >
                <span>Next Stage</span>
                <span class="material-symbols-outlined text-[16px]">skip_next</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mode Buttons Strip -->
        <div class="flex items-center justify-between pt-space-md mt-space-md border-t border-outline-variant/20 flex-wrap gap-2">
          <div class="flex items-center gap-2 flex-wrap">
            <button 
              type="button" 
              onclick="window.teachaura.setClassroomMode('blackboard')"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${classroom.mode === 'blackboard' ? 'bg-inverse-surface text-inverse-on-surface shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}"
            >
              <span class="material-symbols-outlined text-[16px]">edit_note</span>
              <span>Blackboard Mode</span>
            </button>

            <button 
              type="button" 
              onclick="window.teachaura.setClassroomMode('projector')"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${classroom.mode === 'projector' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}"
            >
              <span class="material-symbols-outlined text-[16px]">cast</span>
              <span>Projector Mode (Clean)</span>
            </button>

            <button 
              type="button" 
              onclick="window.teachaura.toggleChime()"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-low text-on-surface hover:bg-surface-container transition-all"
            >
              <span class="material-symbols-outlined text-[16px] text-tertiary">notifications_active</span>
              <span>Chime Alert: ${classroom.chimeAlert ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <button 
            type="button" 
            onclick="window.teachaura.finishLesson()"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container text-xs font-bold transition-all"
          >
            <span class="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Mark Lesson Completed</span>
          </button>
        </div>
      </section>

      <!-- Horizontal Stage Stepper (5 Stages) -->
      <section class="grid grid-cols-2 md:grid-cols-5 gap-space-sm mb-space-lg">
        ${stages.map((stage, idx) => {
          const isDone = classroom.completedStages.includes(idx);
          const isActive = classroom.currentStageIndex === idx;

          return `
            <div 
              onclick="window.teachaura.jumpToStage(${idx})"
              class="p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive 
                  ? 'bg-surface-container-lowest border-2 border-primary shadow-sm' 
                  : isDone 
                  ? 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container' 
                  : 'bg-surface-container-lowest border-outline-variant/20 opacity-70 hover:opacity-100'
              }"
            >
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">STAGE ${idx + 1}</span>
                ${isDone ? `
                  <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                ` : isActive ? `
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary text-white uppercase">Active</span>
                ` : `
                  <span class="material-symbols-outlined text-[16px] text-on-surface-variant">hourglass_empty</span>
                `}
              </div>
              <div class="my-1.5">
                <h3 class="font-headline text-xs font-bold text-on-surface line-clamp-1">${stage.title}</h3>
                <span class="text-[11px] text-on-surface-variant">${stage.plannedDuration}</span>
              </div>
              <div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div class="h-full ${isDone ? 'bg-primary' : isActive ? 'bg-tertiary-fixed-dim' : 'bg-transparent'}" style="width: ${isDone ? '100%' : isActive ? '56%' : '0%'};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </section>

      <!-- Main Live Classroom Split -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <!-- Left: Current Stage Learning Target & Choreography -->
        <div class="lg:col-span-8 flex flex-col gap-space-lg">
          <!-- Learning Target Banner -->
          <div class="p-space-md rounded-2xl bg-secondary-container/40 border border-secondary-container flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-primary">Current Stage Learning Target</span>
              <span class="text-[11px] font-semibold text-on-secondary-container">Bloom's Level: Comprehension</span>
            </div>
            <h2 class="font-headline text-lg font-bold text-on-surface">
              Explain the mechanism of inhalation and exhalation using the thoracic ribcage &amp; diaphragm movement model.
            </h2>
          </div>

          <!-- Teacher Prompts & Choreography Card -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[22px]">record_voice_over</span>
                <h3 class="font-headline text-base font-bold text-on-surface">Teacher Prompts &amp; Choreography</h3>
              </div>
              <span class="text-xs font-bold text-primary">Step 2 of 3 in progress</span>
            </div>

            <!-- Steps checklist -->
            <div class="flex flex-col gap-3">
              <!-- Step 1 -->
              <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <div class="flex flex-col gap-0.5">
                  <div class="flex items-center gap-2">
                    <span class="font-headline text-xs font-bold text-on-surface">Step 1: Anatomy Orientation</span>
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container">Done</span>
                  </div>
                  <p class="text-xs text-on-surface-variant leading-relaxed">
                    Point to the trachea and bronchi on the classroom poster chart. Ask students to place their flat hands firmly on the lower edge of their ribcage.
                  </p>
                </div>
              </div>

              <!-- Step 2 (Active) -->
              <div class="p-space-md rounded-xl bg-white border-2 border-primary/40 shadow-sm flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span class="font-headline text-xs font-bold text-on-surface">Step 2: Guided Breathing Cycle Demonstration</span>
                  </div>
                  <span class="text-xs font-bold text-primary animate-pulse">Live Instruction</span>
                </div>
                <p class="text-xs text-on-surface leading-relaxed">
                  Count: "Breathe IN... 1, 2, 3". Guide synchronized deep breath: Notice how ribs move upwards and outwards while chest volume expands. Have them release: ribs descend, diaphragm relaxes up.
                </p>
                <!-- Crowded classroom pro-tip -->
                <div class="p-2.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] flex items-start gap-2 text-xs text-[#92400E]">
                  <span class="material-symbols-outlined text-[18px] shrink-0 mt-0.5">tips_and_updates</span>
                  <div>
                    <strong class="font-bold">Pro-Tip for Crowded Classrooms:</strong> Have students turn to their bench partner on wooden three-seater desks so every child can observe chest movement profile sideways without standing up.
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-outline-variant text-on-surface-variant flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <div class="flex flex-col gap-0.5">
                  <span class="font-headline text-xs font-bold text-on-surface">Step 3: Physical Analogy (Boyle's Law simplified)</span>
                  <p class="text-xs text-on-surface-variant leading-relaxed">
                    Demonstrate the plastic bottle lung model (or draw syringe analogy) to show how pressure decreases when cavity volume increases.
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer Strip inside card -->
            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/20 flex-wrap gap-2">
              <div class="flex items-center gap-3 text-xs text-on-surface-variant">
                <span class="font-semibold text-on-surface">Attendance: 38 / 42 Present</span>
                <span class="cursor-pointer text-primary hover:underline" onclick="window.teachaura.switchStudioTab('shortnote')">Copy-Note Preview</span>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  onclick="window.teachaura.notify('Aura AI simplified explanation for JSS 2: Imagine a bicycle pump handle pulling back to suck air in!', 'info')"
                  class="px-2.5 py-1.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-bold hover:bg-[#FDE68A] transition-all flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-[16px]">help</span>
                  <span>SOS: Simplify Explanation</span>
                </button>

                <button 
                  type="button" 
                  onclick="window.teachaura.completeCurrentStage()"
                  class="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                >
                  <span>Complete Stage 2</span>
                  <span class="material-symbols-outlined text-[16px]">check</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Blackboard Summary Drawer (Contrast Matrix) -->
          <div class="bg-[#1E293B] text-white rounded-2xl p-space-lg shadow-md flex flex-col gap-4">
            <div class="flex items-center justify-between pb-2 border-b border-slate-700">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[#F4B740] text-[22px]">draw</span>
                <h3 class="font-headline text-base font-bold">Blackboard Summary • Copy into Notes</h3>
              </div>
              <button 
                type="button" 
                onclick="window.teachaura.copyBoardToProjector()"
                class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 border border-slate-700 transition-all"
              >
                <span class="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Copy to Classroom Screen</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col gap-1.5">
                <h4 class="font-headline text-sm font-bold text-[#A3FAEF] uppercase tracking-wider">1. Inhalation (Active)</h4>
                <ul class="text-xs space-y-1 text-slate-300 list-disc list-inside">
                  <li>External intercostal muscles contract</li>
                  <li>Ribs swing <strong class="text-white">UP and OUT</strong></li>
                  <li>Diaphragm contracts &amp; <strong class="text-white">flattens downward</strong></li>
                  <li>Thoracic cavity expands → Air pressure drops</li>
                  <li>Atmospheric air rushes into lungs</li>
                </ul>
              </div>

              <div class="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col gap-1.5">
                <h4 class="font-headline text-sm font-bold text-[#FDE68A] uppercase tracking-wider">2. Exhalation (Passive)</h4>
                <ul class="text-xs space-y-1 text-slate-300 list-disc list-inside">
                  <li>External intercostals relax</li>
                  <li>Ribs drop <strong class="text-white">DOWN and IN</strong></li>
                  <li>Diaphragm relaxes into <strong class="text-white">dome shape</strong></li>
                  <li>Thoracic cavity shrinks → Air pressure rises</li>
                  <li>Air is forced outward through trachea</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Classroom Visual Broadcast & Cold-Call Randomizer -->
        <div class="lg:col-span-4 flex flex-col gap-space-md">
          <!-- Visual Broadcast Preview Card -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Classroom Visual Broadcast</span>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">Ready</span>
            </div>

            <!-- Inhalation/Exhalation Graphic Box -->
            <div class="h-44 bg-surface-container-low rounded-xl border border-outline-variant/20 p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div class="flex items-center justify-center gap-6">
                <div class="flex flex-col items-center gap-1">
                  <span class="material-symbols-outlined text-primary text-[36px]">air</span>
                  <span class="text-xs font-bold text-primary">Inhalation</span>
                  <span class="text-[10px] text-on-surface-variant">Ribs Up • Diaphragm Down</span>
                </div>
                <div class="h-16 w-px bg-outline-variant/40"></div>
                <div class="flex flex-col items-center gap-1">
                  <span class="material-symbols-outlined text-tertiary text-[36px]">waves</span>
                  <span class="text-xs font-bold text-tertiary">Exhalation</span>
                  <span class="text-[10px] text-on-surface-variant">Ribs Down • Diaphragm Up</span>
                </div>
              </div>
              <p class="text-[11px] text-on-surface-variant mt-3 font-medium">Fig 4.2: Diaphragmatic excursion during breathing</p>
            </div>

            <button 
              type="button" 
              onclick="window.teachaura.presentFullscreen()"
              class="w-full py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span class="material-symbols-outlined text-[16px]">fullscreen</span>
              <span>Present Fullscreen to Projector</span>
            </button>
          </div>

          <!-- Live Oral Check-in & Nigerian Cold Call Picker -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between pb-1 border-b border-outline-variant/20">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[18px]">group</span>
                <h4 class="font-headline text-xs font-bold text-on-surface">Live Oral Check-in</h4>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">Critical Thinking</span>
            </div>

            <p class="text-xs text-on-surface-variant">
              Ask random student to explain what prevents the windpipe from collapsing:
            </p>

            <!-- Student Picker Pod -->
            <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                  ${classroom.randomCalledStudent.charAt(0)}
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase font-bold text-on-surface-variant">Random Cold Call:</span>
                  <span class="text-xs font-bold text-on-surface" id="cold-call-name">${classroom.randomCalledStudent}</span>
                </div>
              </div>
              <button 
                type="button" 
                onclick="window.teachaura.pickNextStudent()"
                class="px-2.5 py-1 rounded-lg bg-white border border-outline-variant/40 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Pick Next
              </button>
            </div>

            <!-- Answer rubric toggle -->
            <div class="p-2.5 bg-surface-container rounded-lg text-xs flex flex-col gap-1">
              <span class="font-bold text-on-surface flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                Model Answer:
              </span>
              <p class="text-on-surface-variant text-[11px] leading-relaxed">
                "C-shaped rings of cartilage hold the trachea open even when there is high negative air pressure."
              </p>
            </div>
          </div>

          <!-- Quick Room Pulse Check -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/30 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between pb-1 border-b border-outline-variant/20">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-secondary text-[18px]">how_to_vote</span>
                <h4 class="font-headline text-xs font-bold text-on-surface">Quick Room Pulse Check</h4>
              </div>
              <span class="text-[10px] font-mono text-on-surface-variant">10 Secs</span>
            </div>

            <p class="text-xs text-on-surface-variant leading-relaxed">
              Prompt: "Raise hands: Who can clearly feel their abdomen move outwards during slow inhalation?"
            </p>

            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-on-surface">Room Feedback Confidence</span>
                <span class="text-primary">${classroom.respondedStudents} / ${classroom.totalStudentsInRoom} Responded (~${classroom.roomConfidencePct}%)</span>
              </div>
              <div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: ${classroom.roomConfidencePct}%;"></div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-1 text-[11px]">
              <span class="text-on-surface-variant">Concept taking longer to grasp?</span>
              <button 
                type="button" 
                onclick="window.teachaura.extendLiveStage(180)"
                class="text-xs font-bold text-tertiary hover:underline"
              >
                +3 Mins Extension
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
