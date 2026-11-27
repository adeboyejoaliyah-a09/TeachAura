export const mockData = {
  institution: {
    name: "Federal Government College, Lagos",
    term: "Term 2 (2024/2025)",
    currentWeek: 6,
    totalWeeks: 12,
    academicCalendar: {
      termStart: "2025-01-08",
      midTermBreak: "2025-02-20 to 2025-02-21",
      revisions: "2025-03-24",
      examinations: "2025-03-31",
      termEnd: "2025-04-11"
    }
  },

  currentUser: {
    teacher: {
      id: "tch-01",
      name: "Mrs. Adebayo, F.",
      title: "Senior Science Teacher (JSS 2 - SS 2)",
      school: "Federal Government College, Lagos",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvHZjNBLVSEXRdIxvCNcLfa1VkHAdj-IF5x8U2q6AvqUx2u-ooGBWj9L_rs1Y6oaDmcVg_w_brJLcfQ9jCwTZO8WIwVT1f9rnM3bJM3HYd-Gs7cYEwprwmm3SSSJldHGxhRelJzQQ0KJcKNGqmPfYYG1u_JYcqD40nRl4F6SG5U4HRXRl-DVSgLU_XvVvBNqJtQh5RXd2e1xzzKCQNqVgs6F1p_fMwWRyZR-69jZ0",
      activeStreakDays: 14,
      prepTimeSavedHours: 18.5,
      termSyllabusCoveredPercent: 68,
      generatedAssessmentsCount: 12,
      todayClassesCount: 3
    },
    admin: {
      id: "adm-01",
      name: "Dr. Babatunde Lawal",
      title: "Vice Principal & Academic Director",
      school: "Federal Government College, Lagos",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      pendingApprovals: 4,
      monitoredTeachersCount: 8,
      schoolSyllabusAverage: 71.4,
      totalStudentsEnrolled: 840
    }
  },

  todayClasses: [
    {
      id: "class-jss2a",
      classCode: "JSS 2A",
      className: "Junior Secondary School 2A",
      subject: "Basic Science",
      venue: "Federal Govt College Main Block • Lab 2",
      studentCount: 44,
      timeSlot: "09:15 AM - 10:00 AM (45 Mins)",
      period: 3,
      topic: "The Human Respiratory System",
      subtopic: "Mechanism of Gaseous Exchange (Inhalation vs Exhalation & Alveoli diffusion)",
      nerdcCode: "NERDC Unit 4.2",
      status: "Lesson Note Ready",
      focusAids: [
        "Bellringer: Breathing rate exercise",
        "Visual: Lungs bell jar model",
        "Local example: Lagos traffic pollution impact"
      ],
      diagram: "stitch_teachaura_ai_teaching_assistant/teacher_dashboard_overview/screen.png"
    },
    {
      id: "class-ss1b",
      classCode: "SS 1B",
      className: "Senior Secondary School 1B",
      subject: "Biology",
      venue: "Science Wing • Room 14",
      studentCount: 38,
      timeSlot: "11:30 AM - 12:15 PM (45 Mins)",
      period: 5,
      topic: "Cell Structure & Functions (Organelles)",
      subtopic: "Differentiating Plant vs. Animal Cell organelles under light microscopy",
      nerdcCode: "WAEC Scheme of Work - Week 6",
      status: "Drafting Materials",
      focusAids: [
        "Light microscope slide preparation",
        "Onion peel vs cheek cell smear"
      ]
    },
    {
      id: "class-jss3c",
      classCode: "JSS 3C",
      className: "Junior Secondary School 3C",
      subject: "Basic Science",
      venue: "FGC Junior Block • Hall B",
      studentCount: 42,
      timeSlot: "01:30 PM - 02:15 PM (45 Mins)",
      period: 7,
      topic: "Renewable Energy Resources & Hydroelectric Systems",
      subtopic: "Case study: Kainji Dam power generation and solar installations in Nigeria",
      nerdcCode: "BECE Preparatory Topic",
      status: "Review Scheduled",
      focusAids: [
        "Kainji Dam turbine model",
        "National grid distribution map"
      ]
    }
  ],

  syllabusPacing: [
    {
      classId: "jss2-basic-sci",
      title: "JSS 2 Basic Science",
      completedTopics: 22,
      totalTopics: 30,
      percentage: 72,
      status: "+8% ahead",
      isAhead: true
    },
    {
      classId: "ss1-biology",
      title: "SS 1 Biology",
      completedTopics: 18,
      totalTopics: 28,
      percentage: 64,
      status: "On track exactly",
      isAhead: false
    },
    {
      classId: "jss3-basic-sci",
      title: "JSS 3 Basic Science",
      completedTopics: 26,
      totalTopics: 38,
      percentage: 68,
      status: "+4% ahead (BECE prep)",
      isAhead: true
    }
  ],

  activeLesson: {
    id: "lesson-resp-01",
    cohort: "JSS 2 (A, B, Gold Stream)",
    totalStudents: 120,
    theme: "You & Your Environment",
    subtheme: "Theme 2, Sub-theme 3 (Respiration)",
    nerdcCode: "NERDC BIO-02-WK6",
    period: "Period 3 (10:15 - 11:00 AM)",
    venue: "Double Room Lab",
    qualityIndex: "WAEC/BECE Foundation (94% pass rate benchmark)",
    topic: "The Human Respiratory System",
    subtopic: "Mechanism of Inhalation & Exhalation",
    behavioralObjectives: {
      cognitive: "Identify and label the 5 primary organs of the respiratory system (nasal passage, trachea, bronchi, lungs, diaphragm) without notes.",
      psychomotor: "Assemble and demonstrate the mechanical action of inhalation vs exhalation using the desktop plastic bottle & balloon model.",
      affective: "Relate breathing hygiene to daily Lagos/Nigerian realities (dusty harmattan air, generator exhaust fumes, and sports recovery)."
    },
    instructionalMaterials: [
      "Human Torso Chart",
      "Bell Jar Lung Demo",
      "Plastic Bottle & 2 Balloons",
      "Chalkboard Grid"
    ],
    learnerEntryBehavior: "Pupils completed circulatory units (Term 2, Week 5) and understand how blood transports oxygen from the lungs to heart and muscles.",
    stages: [
      {
        stageNumber: 1,
        title: "Introduction & Starter Hook",
        plannedDuration: "5 Mins",
        secondsTotal: 300,
        completedSeconds: 282,
        teacherPrompt: "The Inter-House Sprint Hook: Instruct two students to jog vigorously on the spot for 35 seconds. Ask the entire class to place their right palms flat against their ribcages. 'Class, what do you notice about their shoulders and rib cage now compared to when we were sitting during morning assembly? Why is the chest rising and falling so rapidly after the sprint?'",
        contextualTip: "Connect to student experience: Harmattan nasal dry crusting & 100m heats."
      },
      {
        stageNumber: 2,
        title: "Concept Explanation & Instructional Matrix",
        plannedDuration: "15 Mins",
        secondsTotal: 900,
        completedSeconds: 504,
        steps: [
          {
            stepNumber: 1,
            time: "7 mins",
            teacherAction: "Exploration of Respiratory Organs: Presents the human torso chart. Traces airflow path: Nostrils -> Trachea (windpipe) -> Left/Right Bronchi -> Bronchioles -> Alveoli (air sacs).",
            pupilEngagement: "Observe chart; touch their own throat to feel the cartilaginous rings of the trachea. Note down key spelling words in exercise book."
          },
          {
            stepNumber: 2,
            time: "8 mins",
            teacherAction: "Mechanism: Inhalation vs Exhalation: Explains pressure volume laws simply. Inhalation: Diaphragm contracts & flattens downward, ribcage moves upwards and outwards. Chest cavity volume enlarges.",
            pupilEngagement: "Take deliberate deep breaths in unison; place hands under ribs to physically feel diaphragm excursion and rib elevation."
          },
          {
            stepNumber: 3,
            time: "5 mins",
            teacherAction: "Gaseous Exchange at Alveolar Beds: Describes diffusion across thin moist membranes. Oxygen moves into capillaries; carbon dioxide exits into lungs for expulsion.",
            pupilEngagement: "Answer prompt: 'Why do athletes need immediate oxygen replenishment after running?' Connect to cellular energy release."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Class Activities & Apparatus Practical",
        plannedDuration: "10 Mins",
        secondsTotal: 600,
        completedSeconds: 0,
        teacherPrompt: "Student Pair Practical: Chest Expansion Test. Each bench pairs up (Pupil A & Pupil B). Pupil A wraps tailor's tape around Pupil B's ribcage right below armpits. Pupil B breathes out completely (record chest circumference, e.g. 68cm). Pupil B inhales deeply to maximum lung capacity (measure expansion, e.g. 73cm). Calculate net chest difference.",
        contextualTip: "Pro-Tip for Crowded Classrooms: Have students turn to their bench partner on wooden three-seater desks so every child can observe chest movement profile sideways without standing up."
      },
      {
        stageNumber: 4,
        title: "Formative Evaluation",
        plannedDuration: "10 Mins",
        secondsTotal: 600,
        completedSeconds: 0,
        teacherPrompt: "Conduct 3 quick formative oral check-ins using random cold-call picker. Question 1: 'Chinedu, what keeps the trachea from collapsing when there is no air inside?' (Answer: Cartilage rings). Question 2: 'Amina, when you breathe in, does your diaphragm move up or flatten down?' (Answer: Flattens downward).",
        contextualTip: "Address common trap: Students often confuse diaphragm movement direction with chest movement."
      },
      {
        stageNumber: 5,
        title: "Conclusion & Homework Assignment",
        plannedDuration: "5 Mins",
        secondsTotal: 300,
        completedSeconds: 0,
        teacherPrompt: "Summarize key blackboard contrast table (Inhalation vs Exhalation). Assign weekend 2B exercise book short note: 'State 3 harmful effects of breathing unrefined firewood smoke and generator exhaust (Carbon Monoxide) on alveolar health.'",
        contextualTip: "Copy to classroom screen / chalkboard before period bell."
      }
    ],
    studentShortNote: {
      subject: "Basic Science",
      class: "JSS 2",
      topic: "The Respiratory System (Pupils' 2B Notebook Copy)",
      definitions: "Respiration is the bodily process by which living organisms inhale oxygen to release energy from food, and exhale carbon dioxide as waste.",
      tableHeaders: ["Feature", "Inhalation (Breathing In)", "Exhalation (Breathing Out)"],
      tableRows: [
        ["Diaphragm", "Contracts and flattens DOWNWARD", "Relaxes and curves UPWARD (dome shape)"],
        ["Ribcage", "Moves UP and OUTWARD", "Drops DOWN and INWARD"],
        ["Chest Volume", "Increases / Expands", "Decreases / Shrinks"],
        ["Air Pressure", "Drops below atmospheric pressure", "Increases, forcing air out"],
        ["Air Movement", "Air rushes INTO lungs", "Air is forced OUT of lungs"]
      ],
      memoryKey: "Remember: INhalation = Ribs INcrease & diaphragm goes DOWN. EXhalation = Ribs EXpire/drop & diaphragm returns UP."
    }
  },

  auraAiSuggestions: [
    {
      id: "ai-sug-1",
      badge: "Low-Cost Local Experiment",
      title: "Use Empty 50cl Eva Water Bottle & Party Balloons",
      description: "Provides step-by-step assembly instructions using discarded plastic bottles and elastic rubber bands readily sourced around school premises to demonstrate diaphragm motion without expensive imported glassware.",
      actionLabel: "Inject into Apparatus Plan"
    },
    {
      id: "ai-sug-2",
      badge: "Relatable Nigerian Analogies",
      title: "Bellows (Hausa: 'Kuzun / Zuga-zugu') for Air Pressure",
      description: "Compares lung diaphragm suction to the traditional blacksmith bellows (Zugazugu) or kerosene suction pump used in local markets to make the pressure gradient intuitively understandable.",
      actionLabel: "Insert Analogy to Step II"
    },
    {
      id: "ai-sug-3",
      badge: "Fast vs Slow Differentiation",
      title: "Challenge Fast Finishers & Support Struggling Learners",
      description: "Assign gifted students to calculate breathing rate variation at rest vs post-skipping rope, while struggling learners sketch and color-code the trachea rings and bronchial tree.",
      actionLabel: "Add Differentiation Matrix"
    },
    {
      id: "ai-sug-4",
      badge: "3 Quick Formative Checks",
      title: "Cold-Call Questions with Model Rubrics",
      description: "Ready-made 10-second recall checks for verifying student attention right before transitioning to notebook copying.",
      actionLabel: "Load into Evaluation Stage"
    }
  ],

  badges: [
    {
      id: "badge-w1",
      category: "weekly",
      title: "Syllabus Champ",
      level: "Gold",
      status: "unlocked",
      dateUnlocked: "Term 2, Week 5",
      icon: "military_tech",
      description: "Completed 100% of weekly learning objectives according to the NERDC syllabus timetable.",
      progress: 100,
      rewardText: "+200 Teacher Impact Points"
    },
    {
      id: "badge-w2",
      category: "weekly",
      title: "Pacing Master",
      level: "Gold",
      status: "unlocked",
      dateUnlocked: "Term 2, Week 6",
      icon: "speed",
      description: "Maintained teaching pace within 5% of WAEC and BECE milestone deadlines.",
      progress: 100,
      rewardText: "Pacing Certification Ready"
    },
    {
      id: "badge-w3",
      category: "weekly",
      title: "Punctual Planner",
      level: "Silver",
      status: "unlocked",
      dateUnlocked: "Term 2, Week 6",
      icon: "event_available",
      description: "Submitted all upcoming weekly lesson notes and student short notes before Monday 08:00 AM.",
      progress: 100,
      rewardText: "Academic Commendation"
    },
    {
      id: "badge-w4",
      category: "weekly",
      title: "Classroom Maestro",
      level: "Gold",
      status: "unlocked",
      dateUnlocked: "Term 2, Week 5",
      icon: "timer",
      description: "Delivered 10 consecutive Guided Teaching sessions with 90%+ stage punctuality.",
      progress: 100,
      rewardText: "Master Pedagogy Badge"
    },
    {
      id: "badge-w5",
      category: "weekly",
      title: "14-Day Active Streak",
      level: "Platinum",
      status: "unlocked",
      dateUnlocked: "Active Today",
      icon: "local_fire_department",
      description: "Prepared lessons, tracked syllabus coverage, and reviewed student analytics for 14 continuous working days.",
      progress: 100,
      rewardText: "Top 5% Educator in Lagos State"
    },
    {
      id: "badge-t1",
      category: "term",
      title: "NERDC Curriculum Perfectionist",
      level: "Diamond",
      status: "in-progress",
      dateUnlocked: null,
      icon: "verified",
      description: "Achieve 100% verified syllabus coverage across all assigned classes by Week 11.",
      progress: 68,
      rewardText: "End-of-Term Ministry Accreditation"
    },
    {
      id: "badge-t2",
      category: "term",
      title: "WAEC / BECE Benchmark Luminary",
      level: "Diamond",
      status: "in-progress",
      dateUnlocked: null,
      icon: "workspace_premium",
      description: "Generate and administer 15+ comprehensive CA assessment batteries with verified marking schemes.",
      progress: 80,
      rewardText: "Exam Prep Excellence Award"
    },
    {
      id: "badge-t3",
      category: "term",
      title: "Resource Innovator",
      level: "Gold",
      status: "unlocked",
      dateUnlocked: "Term 2, Week 4",
      icon: "lightbulb",
      description: "Contributed 10+ localized Nigerian teaching analogies or low-cost experiment guides to the school library.",
      progress: 100,
      rewardText: "Instructional Leadership Ribbon"
    },
    {
      id: "badge-t4",
      category: "term",
      title: "Master Mentor",
      level: "Silver",
      status: "in-progress",
      dateUnlocked: null,
      icon: "groups",
      description: "Co-authored and reviewed curriculum adaptations for junior teachers in the department.",
      progress: 60,
      rewardText: "Departmental Star Badge"
    }
  ],

  adminMetrics: {
    totalTeachers: 8,
    activeLessonsToday: 24,
    completedLessonsToday: 16,
    schoolWideSyllabusCoverage: 71.4,
    departments: [
      { name: "Basic Science & Technology", head: "Mrs. Adebayo, F.", teachers: 3, syllabusRate: 74, status: "Ahead (+6%)" },
      { name: "Mathematics", head: "Mr. Chukwu, E.", teachers: 2, syllabusRate: 69, status: "On Track" },
      { name: "English & Literary Studies", head: "Mrs. Bello, T.", teachers: 2, syllabusRate: 72, status: "On Track" },
      { name: "Physical & Health Education", head: "Mr. Danjuma, K.", teachers: 1, syllabusRate: 66, status: "Review Needed (-4%)" }
    ],
    pendingApprovals: [
      {
        id: "appr-01",
        teacher: "Mrs. Adebayo, F.",
        subject: "Basic Science (JSS 2)",
        item: "Week 7 Lesson Note: Respiration & Excretory Organs",
        submittedDate: "Today, 08:30 AM",
        type: "Lesson Note",
        status: "Pending Review"
      },
      {
        id: "appr-02",
        teacher: "Mr. Chukwu, E.",
        subject: "Mathematics (JSS 3)",
        item: "Continuous Assessment Test 2 (BECE Mock Rubrics)",
        submittedDate: "Yesterday, 04:15 PM",
        type: "Assessment Battery",
        status: "Pending Review"
      },
      {
        id: "appr-03",
        teacher: "Mrs. Bello, T.",
        subject: "English Language (SS 1)",
        item: "Mid-Term Reading Comprehension & Lexis Sheet",
        submittedDate: "Yesterday, 02:00 PM",
        type: "Lesson Note",
        status: "Pending Review"
      },
      {
        id: "appr-04",
        teacher: "Mr. Okonjo, P.",
        subject: "Physics (SS 2)",
        item: "Lab Apparatus Staging: Optics & Focal Lengths",
        submittedDate: "2 days ago",
        type: "Lab Practical",
        status: "Flagged for Safety Review"
      }
    ]
  },

  teacherPerformanceList: [
    {
      id: "tch-01",
      name: "Mrs. Adebayo, F.",
      department: "Basic Science & Tech",
      classes: "JSS 2A, SS 1B, JSS 3C",
      syllabusCoverage: 72,
      punctualityRate: 98,
      guidedModeAdherence: 94,
      studentCaAverage: 76.5,
      streak: 14,
      status: "Excellent",
      aiAlert: "Pacing ahead by 8%; ready for early WAEC revision modules."
    },
    {
      id: "tch-02",
      name: "Mr. Chukwu, E.",
      department: "Mathematics",
      classes: "JSS 1B, JSS 2C, JSS 3A",
      syllabusCoverage: 69,
      punctualityRate: 92,
      guidedModeAdherence: 88,
      studentCaAverage: 71.0,
      streak: 9,
      status: "Good",
      aiAlert: "JSS 3A quadratic equations require 1 remedial revision session."
    },
    {
      id: "tch-03",
      name: "Mrs. Bello, T.",
      department: "English Language",
      classes: "JSS 2B, SS 1A, SS 2C",
      syllabusCoverage: 72,
      punctualityRate: 95,
      guidedModeAdherence: 91,
      studentCaAverage: 74.2,
      streak: 11,
      status: "Excellent",
      aiAlert: "Essay composition rubrics fully aligned with WAEC marking guidelines."
    },
    {
      id: "tch-04",
      name: "Mr. Okonjo, P.",
      department: "Basic Science & Tech",
      classes: "SS 1A, SS 2A, SS 3B (Physics)",
      syllabusCoverage: 65,
      punctualityRate: 88,
      guidedModeAdherence: 82,
      studentCaAverage: 68.4,
      streak: 5,
      status: "Average",
      aiAlert: "Optics practicals delayed by 3 periods due to lab refurbishment; AI recommends catch-up timetable."
    },
    {
      id: "tch-05",
      name: "Mrs. Danjuma, K.",
      department: "Physical & Health Education",
      classes: "JSS 1A, JSS 2A, JSS 3B",
      syllabusCoverage: 66,
      punctualityRate: 85,
      guidedModeAdherence: 79,
      studentCaAverage: 82.0,
      streak: 4,
      status: "Needs Attention",
      aiAlert: "Behind by 4% due to inter-house sports logistics; redistribute athletic theory units."
    },
    {
      id: "tch-06",
      name: "Mr. Ibrahim, S.",
      department: "Mathematics",
      classes: "SS 1B, SS 2B, SS 3A",
      syllabusCoverage: 70,
      punctualityRate: 94,
      guidedModeAdherence: 89,
      studentCaAverage: 73.1,
      streak: 8,
      status: "Good",
      aiAlert: "Geometry units progressing on schedule."
    },
    {
      id: "tch-07",
      name: "Mrs. Olumide, R.",
      department: "Basic Science & Tech",
      classes: "JSS 1C, JSS 2C, JSS 3C",
      syllabusCoverage: 71,
      punctualityRate: 96,
      guidedModeAdherence: 92,
      studentCaAverage: 75.8,
      streak: 12,
      status: "Excellent",
      aiAlert: "Living Things classification practical notes commended by supervisor."
    },
    {
      id: "tch-08",
      name: "Mr. Eze, N.",
      department: "English Language",
      classes: "JSS 3A, SS 2A, SS 3A",
      syllabusCoverage: 68,
      punctualityRate: 90,
      guidedModeAdherence: 86,
      studentCaAverage: 70.5,
      streak: 7,
      status: "Good",
      aiAlert: "Oral English phonetics exercises show 14% improvement in pupil pronunciation tests."
    }
  ],

  assessmentData: {
    examTitle: "Federal Republic of Nigeria • Ministry of Education",
    subtitle: "Continuous Assessment Test (CA 2) • Second Term",
    subject: "Basic Science & Technology",
    targetClass: "Junior Secondary 2 (JSS 2)",
    timeAllowed: "35 Minutes",
    totalMarks: 30,
    mcqCount: 10,
    fillGapCount: 5,
    theoryCount: 3,
    questions: [
      {
        section: "SECTION A: Multiple Choice Questions (10 Marks)",
        id: "q-1",
        question: "During normal inhalation (breathing in) in humans, which of the following mechanical events occurs simultaneously?",
        options: [
          "Diaphragm relaxes and moves upwards, ribs move downward",
          "Diaphragm contracts and flattens, ribcage moves upwards and outwards",
          "Thoracic cavity volume decreases, lung pressure increases",
          "Intercostal muscles relax, forcing air out through the trachea"
        ],
        correctIndex: 1,
        markingScheme: "Marking Scheme Key: Option B (1 Mark). NERDC Competency Spec: JSS 2 Theme 2 Topic 3 - Mechanism of Breathing. Explanation: Contraction of diaphragm flattens it while ribcage moves outwards, expanding thoracic volume and causing air to rush in."
      },
      {
        section: "SECTION A: Multiple Choice Questions (10 Marks)",
        id: "q-2",
        question: "The microscopic clustered air sacs in the human lungs where gaseous exchange takes place between air and blood capillaries are known as:",
        options: [
          "Bronchioles",
          "Alveoli",
          "Trachea",
          "Pleural membranes"
        ],
        correctIndex: 1,
        markingScheme: "Marking Scheme Key: Option B (Alveoli - 1 Mark). Examiner Guidance: Note that Bronchioles are fine branches, but only Alveoli possess thin-walled single-cell epithelial surfaces for diffusion."
      },
      {
        section: "SECTION B: Fill-in-the-Gap Questions (5 Marks)",
        id: "q-3",
        question: "The cartilaginous structure commonly referred to as the 'voice box' located at the superior opening of the trachea is scientifically known as the _______.",
        correctAnswer: "Larynx",
        acceptedVariants: ["Larynx (1 Mk)", "Larynx / Voice box (1 Mk)"],
        markingScheme: "Mark Allocation: 1 Mark. (Do NOT accept Pharynx or Epiglottis - 0 Marks)."
      },
      {
        section: "SECTION C: Theory & Step-by-Step Marking Rubrics (15 Marks)",
        id: "q-4",
        question: "(a) State three major physical or chemical differences between inhaled air and exhaled air in tabular form [3 Marks].\n(b) Describe clearly the role played by the muscular diaphragm and the intercostal muscles during the process of exhalation [2 Marks].",
        totalMarks: 5,
        rubric: [
          { parameter: "Oxygen (O2) Content", inhaled: "Approximately 21%", exhaled: "Approximately 16%", marks: "1 Mark" },
          { parameter: "Carbon Dioxide (CO2)", inhaled: "Low (~0.04%)", exhaled: "Significantly higher (~4%)", marks: "1 Mark" },
          { parameter: "Moisture / Water Vapor", inhaled: "Variable / Relatively lower", exhaled: "Saturated / High moisture", marks: "1 Mark" }
        ],
        partB: "Diaphragm relaxes into curved dome shape pushing against thoracic base (1 Mark). External intercostal muscles relax, allowing ribs to drop downward and inward (1 Mark)."
      }
    ]
  },

  nigerianStudents: [
    "Chinedu Okafor",
    "Amina Bello",
    "Tunde Bakare",
    "Fatima Aliyu",
    "Emeka Nwosu",
    "Khadijah Danjuma",
    "Blessing Adeyemi",
    "Ibrahim Musa",
    "Ngozi Eze",
    "Oluwaseun Adeleke",
    "Zainab Garba",
    "Favour Okoli"
  ]
};
