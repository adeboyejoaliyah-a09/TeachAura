---
name: TeachAura
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#3e4947'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#316763'
  on-secondary: '#ffffff'
  secondary-container: '#b5ede7'
  on-secondary-container: '#376d69'
  tertiary: '#6c4b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#8b6200'
  on-tertiary-container: '#ffe7c4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#b5ede7'
  secondary-fixed-dim: '#9ad1cb'
  on-secondary-fixed: '#00201e'
  on-secondary-fixed-variant: '#144f4b'
  tertiary-fixed: '#ffdea9'
  tertiary-fixed-dim: '#fabc45'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  headline-xl:
    fontFamily: DM Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: DM Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: DM Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system powers an AI-driven instructional planning and classroom delivery engine tailored for Nigerian educators across primary and secondary schools. The interface balances high-density utility with calm, supportive clarity. It must project the stature of a rigorous educational tool while maintaining an approachable, stress-reducing presence during lesson preparation and live classroom display.

The aesthetic follows an **Editorial SaaS Minimalism**:
- Generous breathing room across desktop planning surfaces to reduce cognitive fatigue during multi-period lesson staging.
- High-contrast, large-scale UI tokens optimized for varied projector qualities, ambient daylight in classrooms, and mid-range school laptop screens.
- Warm, grounded institutional polish replacing cold corporate tropes with deliberate structural clarity.

## Colors
The color palette communicates stability, academic depth, and supportive warmth. 

- **Primary (`#0F766E`)**: Deep Teal anchors core actions, active navigation states, and primary system prompts.
- **Secondary (`#134E4A`)**: Dark Teal serves as a deep grounding tone for persistent sidebar containers, critical instructional headers, and high-emphasis focal nodes.
- **Tertiary (`#F4B740`)**: Golden Amber delivers targeted attention signals, highlighting AI generation suggestions, lesson badges, and performance highlights without inducing alarm.
- **Accent Soft Mint (`#D1FAE5`)**: Used for supportive positive feedback, completion chips, and soft background tinting behind active lesson states.
- **Surfaces & Foundation**: Canvas lives on a warm off-white (`#F8FAF9`) to counter glare during long planning sessions. Component cards lift sharply via pure white (`#FFFFFF`).
- **Text & Borders**: Primary reading tone is Slate (`#334155`), secondary instruction is Muted Slate (`#64748B`), framed with structured Soft Grey borders (`#E2E8F0`).

## Typography
The system couples **DM Sans** for headings with **Inter** for user interface tasks and continuous body text.

- **Display & Sectioning (DM Sans)**: Provides geometric structure with subtle humanist warmth, creating crisp demarcations for curriculum units, lesson titles, and slide headers.
- **Reading & Controls (Inter)**: Delivers x-height balance and neutrality for student assessment rosters, rubric details, prompt input areas, and projector slide summaries.
- **Presentation Legibility**: When the platform switches to Classroom Presentation Mode, all body projections must prioritize `body-lg` (18px) or `headline-md` (24px) to retain legibility from the back of large lecture halls.

## Layout & Spacing
The layout follows a fluid 12-column responsive grid underpinned by an 8px base spacing increment. 

- **Desktop (1024px and up)**: 12 columns with 24px (`1.5rem`) gutters and 32px (`2rem`) margins. Supports persistent sidebar navigation alongside a multi-pane split view for curriculum syllabus on the left and AI workspace on the right.
- **Tablet (768px - 1023px)**: 8 columns with 16px (`1rem`) gutters. The side panel collapses into an expandable rail; the lesson planner stacks primary delivery tools above the curriculum index.
- **Mobile (Below 768px)**: 4 columns with 16px (`1rem`) margins. Content reflows into a single column with fixed bottom execution controls for quick grading and period check-ins.
- **Presentation Mode**: Enforces a constrained 16:9 canvas bounding box centered on screen, setting gutters to `space-xl` to prevent edge distortion on legacy projectors.

## Elevation & Depth
Visual hierarchy is established primarily through crisp boundary containment and subtle ambient drop shadows. Overly dramatic, dark skeuomorphic drop shadows are strictly avoided to ensure performance on lower-tier hardware.

- **Level 0 (Flat Ground)**: Base dashboard background (`#F8FAF9`). No shadow.
- **Level 1 (Card & Module Tier)**: Applied to curriculum modules, question banks, and content blocks. Uses a hairline perimeter border (`1px solid #E2E8F0`) backed by an ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Interactive Floating & Flyouts)**: Dropdowns, AI suggestion panels, and contextual action toolbars. Uses `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` over an opaque `#FFFFFF` surface.
- **Level 3 (Modals & Projection Staging)**: Lesson review overlays and projection configuration sheets. Uses `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over a backdrop dimmed with `rgba(19, 78, 74, 0.4)`.

## Shapes
The shape language uses distinct, soft geometry that creates an organized and friendly pedagogical feel:

- **Base Elements (8px / `rounded-md`)**: Checkboxes, tag pills, standard input fields, and small action buttons.
- **Primary Cards & Panels (16px / `rounded-xl`)**: Lesson plan cards, topic breakdown containers, AI prompt composer panels, and timetable blocks.
- **Hero Staging Containers (24px / `rounded-2xl`)**: Classroom delivery canvas viewports, multi-subject analytics containers, and onboarding tooltips.
- **Fully Rounded**: Floating classroom status indicators and student avatar holders.

## Components

### Buttons
- **Primary**: Solid Deep Teal (`#0F766E`) background, `#FFFFFF` text, `rounded-lg` (8px). Subtle brightness shift on hover (`#134E4A`). Height: 44px for high touch precision on interactive whiteboards and mobile.
- **Secondary**: Pure white container, 1px border in `#E2E8F0`, `#334155` text. Hover state shifts surface to `#F8FAF9`.
- **AI Assist / Action**: Surface in `#FEF3C7` (Amber tint) or `#D1FAE5` (Mint tint) with 1px border matching accent tones. Highlights automated lesson generation workflows.

### Chips & Badges
- **Curriculum & Term Badges**: 28px height, `rounded-full`, padding `0 12px`.
- **Subject Tags**: Soft Mint (`#D1FAE5`) with Dark Teal text (`#134E4A`) for active topics; Soft Grey (`#F1F5F9`) with Slate text (`#64748B`) for passive or upcoming items.

### Cards & Content Modules
- Base surface is pure white (`#FFFFFF`) framed with a 1px border (`#E2E8F0`) and `rounded-xl` (16px).
- Internal card padding strictly set to `space-lg` (24px) for desktop and `space-md` (16px) for mobile.
- Header bars within cards are separated with a subtle divider or placed directly above the content without heavy block colors.

### Input Fields & Prompts
- Border: 1.5px solid `#E2E8F0`, surface: `#FFFFFF`, `rounded-lg`.
- Focus state: Border transitions to `#0F766E` with a 3px outer ring in `rgba(15, 118, 110, 0.15)`.
- Helper text and character bounds use `#64748B` with `body-sm`.

### Checkboxes & Radios
- Checkboxes use `rounded-md` (6px) with an active fill of `#0F766E`.
- Unchecked state uses a 1.5px border of `#94A3B8` over `#FFFFFF`. Check icon renders in `#FFFFFF`.

### Classroom Delivery Drawer (Custom Domain Component)
- High-contrast, floating dock at the bottom of the screen designed for quick access to lesson timer, key talking points, and student randomizer. Surface `#134E4A` with pure white iconography and gold (`#F4B740`) accent markers for time remaining.