# Project Progress

## Project Initialization
- React + TypeScript project scaffolded using Vite
- Git repository initialized and remote origin configured

## Phase 1: Project Scaffolding
- Core dependencies installed (Three.js, React Three Fiber, Drei, GSAP)
- Tailwind CSS configured
- Base folder structure created under `src/`
- Section placeholders added (Hero, About, Skills, Projects, Contact)
- TypeScript interfaces defined for portfolio data
- Theme CSS variables set (dark sci-fi aesthetic)

## Fixes

### HeroObject Interactions & Overlay Blocking
- **Issue**: Pointer events were failing across the `HeroObject`'s wireframe gaps, drag interactions felt rigid with no inertia, and full-screen HTML overlays blocked the 3D canvas entirely.
- **Fix**: Implemented a transparent solid hitbox to capture raycasts flawlessly, added custom velocity-based drag momentum (`dragVelocity`), integrated Drei's `useCursor`, and explicitly disabled pointer events (`pointerEvents: none`) on the front-layer HTML placeholders.

### Tailwind/PostCSS Configuration Error
- **Issue**: Tailwind v4 requires `@tailwindcss/postcss` plugin (different from v3)
- **Fix**: Installed `@tailwindcss/postcss` and updated PostCSS config
- **Fix**: Updated `globals.css` to use `@import 'tailwindcss'` syntax

---

## Phase 2
- Base layout and navigation setup
- Section rendering structure
- Initial integration of Three.js elements
- Parallax effect for background stars with smooth scroll behavior
- Advanced 3D interactions (continuous drag, momentum, accurate hover rules) on the `HeroObject`

## Phase 3
### HeroObject Hover Cursor
- **Issue**: The `grab` and `grabbing` cursors were not displaying correctly on hover/drag due to a `* { cursor: default; }` wildcard in global CSS, and a state vs. render-loop desync in `HeroObject` using `useCursor`.
- **Fix**: Migrated `HeroObject` state to `useRef`, applied cursor updates manually inside the `useFrame` render loop, and removed the aggressive wildcard rule from `globals.css` to allow proper body inheritance.

### Hero Text Overlay
- **Feature**: Built `HeroText` and `HeroStats` HTML overlay components mapping data from `portfolio.ts` directly onto the 3D scene viewport.
- **Styling**: Included sci-fi neon styling, a left accent gradient line, blinking monospace text cursor, hover interactions on CTAs, and a responsive structure.

### GSAP Text Reveal & Scroll Prompt
- **Feature**: Extracted GSAP timeline logic into `useHeroAnimation` for a staggered, cinematic entrance of the Hero layout elements (controlled via `data-hero` attributes).
- **Feature**: Added a `ScrollPrompt` component with infinite CSS animations and GSAP fade-out upon users scrolling down, leveraging `window.scrollY`.
- **Accessibility**: Included `prefers-reduced-motion` checks to immediately show elements and skip the entrance timeline animation when required.

### Mouse Parallax on Icosahedron
- **Feature**: Added a subtle ambient mouse parallax effect to the `HeroObject`, making it gently drift toward the mouse cursor.
- **Implementation**: Updated `useMouseTracker` with a smooth requestAnimationFrame loop, isolated offsets into `useHeroParallax`, and synchronised states without prop-drilling using `HeroContext`. Parallax elegantly pauses during manual drag interactions to avoid UX conflicts.

### Icosahedron Fly-Away Exit (Option B)
- **Feature**: Prevented the R3F icosahedron from visually bleeding into subsequent content sections by dynamically animating its exit flight off-screen between 8% to 20% scroll depth.
- **Implementation**: Constructed `useHeroVisibility` mapping scrolling limits exclusively within `requestAnimationFrame` and `clamp` math without GSAP overhead. 
- **Transforms**: Interpolates mesh scale, Y-axis altitude, and Z-axis horizon depth directly within R3F's `useFrame` core loop. Fading material opacities and dynamically disabling user pointer interaction smoothly conserves rendering bandwidth off-screen.

## Phase 5

### Projects Section Layout Shell
- **Feature**: Constructed the fundamental Projects section boilerplate, establishing an empty CSS Grid layout (`ProjectsGrid.tsx`) designed to house forthcoming project cards.
- **Feature**: Created `ProjectsHeading.tsx` featuring the "Featured Work" title, subtle neon lines, and subtitle paragraph.
- **Animation**: Integrated `useProjectsAnimation` powered by GSAP's `ScrollTrigger` to coordinate staggered entrances for all heading and grid elements strictly upon scrolling into the 60%-70% viewport boundary.
- **Data Expansion**: Expanded `portfolio.ts` and types appending `icon` and `abbreviation` structures per project for upcoming cards.

## Phase 4

### Section Detection Hook
- **Feature**: Developed `useActiveSection` hook utilizing `IntersectionObserver` to track viewport visibility and identify the currently active portfolio section by intersection ratio.
- **Feature**: Added `useScrollToSection` for smooth anchor navigation and consolidated section definitions globally via `SECTIONS` in `src/data/portfolio.ts`.

### Nav Dots Component
- **Feature**: Created the global vertical `NavDots` overlay providing sticky section navigation that maps dynamically to the `IntersectionObserver` section detection.
- **Styling**: Uses CSS opacity, sizing, and glow transitions natively without GSAP, while relying on GSAP exclusively for the initial 2.8s entrance fade, maintaining accessibility compliance (`prefers-reduced-motion`).

### Scroll Progress Bar
- **Feature**: Integrated a top-edge progress bar reacting to the current scroll depth percentage (`window.scrollY` / `scrollHeight`). 
- **Styling**: Adapts its neon color dynamically depending on the current active section (e.g. Cyan for Hero, Purple for Skills). Gives a fully animated neon-pulse glow via GSAP upon reaching 99% scroll distance.
- **Architecture**: Skips React state-rendering loops in favour of direct, optimized GSAP scale-transforms to provide buttery smooth tracking and `overwrite: auto` protection from tween collisions.


## Deferred Feature — Icosahedron Nav Companion

Decision made: the icosahedron will eventually travel to sit beside
the active nav dot as the user scrolls between sections.

Current state: fly-away on scroll (Option B) implemented as temporary fix.

When to implement: after all 5 content sections are fully built.

Performance rules when implementing:
- Disable mouse parallax when not in hero section
- Disable drag and pointer events on mesh when not in hero
- Optionally pause Float animation during travel between dots
- Re-enable all interactions when user returns to hero section

Technical notes:
- Nav dot screen position via getBoundingClientRect()
- Convert 2D screen coords to 3D world coords via Three.js unproject()
- Pause parallax and drag during travel animation to avoid conflicts
- Handle window resize — recalculate target position on resize

---

## Project Type Distinction — Important Design Decision

### Context
The three projects currently in the portfolio (NGAT, Sekady, IDLA)
are professional company projects built during employment at
In Time Tec. They are not personal or open source projects.
This distinction must be communicated to visitors in a subtle,
professional manner — not hidden, not over-explained.

### How to communicate this
Each project card will carry a small subtle badge or label
indicating the project type. Two types are planned:

  Professional  — company projects built during employment
  Personal      — side projects, open source, personal work (coming later)

The badge should be:
- Small and unobtrusive — not the first thing the eye goes to
- Styled consistently with the existing neon aesthetic
- Located in a consistent position on every card
- Clear enough that a visitor immediately understands the context

### Implementation in portfolio.ts
The Project type in src/types/index.ts must include a
projectType field:

  projectType: 'professional' | 'personal'

All three current projects are set to:
  projectType: 'professional'

Future personal projects will be set to:
  projectType: 'personal'

### Extensibility requirement
The Projects section must be built to support multiple project
categories without structural changes. Specifically:

- The projects array in portfolio.ts can grow — adding new
  projects requires only adding a new object to the array,
  no component changes needed
- The ProjectsGrid layout should handle more than 3 projects
  gracefully — additional cards flow into the grid naturally
- A future "Personal Projects" sub-section can be added
  below the current "Professional" cards by filtering the
  projects array by projectType
- The NGAT featured card treatment (larger, spans rows) is
  specific to NGAT only — all other professional projects
  and all personal projects use the standard card size

### Grid extensibility plan
Current grid: 1 featured (NGAT) + 2 standard (Sekady, IDLA)
Future grid:  1 featured (NGAT) + N standard cards in a
              responsive grid that wraps automatically

The grid should use CSS Grid with auto-fill so additional
cards slot in without layout changes:
  Professional section: featured card + auto-fill grid
  Personal section: auto-fill grid (no featured card)

### Resume link note
The portfolio also needs a subtle note somewhere in the
Projects section or About section stating:
  "Available to discuss project details in interviews"
This protects company confidentiality while signaling
openness to conversation about the work.

---

## Project Type Communication Strategy — Finalized

### Approach
Two layers to communicate that current projects are company work:

Layer 1 — Section subheading updated to:
  "Production work delivered during professional engagements at In Time Tec"
  Subtle, one line, no over-explanation

Layer 2 — Small badge on each card:
  Text: "Company Project"
  Style: muted gray, small, does not compete with card accent color
  Position: top right corner of every card

### No GitHub link
GitHub links are omitted entirely from all current project cards.
No placeholder, no dead link, no explanation needed.
The badge and header set the context sufficiently.

### Card CTA
Primary CTA on each card is "View Details" which expands
the card to show full project information — not "View Code".

### Extensibility
- projects array in portfolio.ts can grow by adding new objects only
- projectType field ('professional' | 'personal') filters cards
- Future personal projects will have GitHub links and no company badge
- Grid handles N cards via auto-fill — no layout changes needed
- Personal projects section can be added below professional cards
  by filtering portfolioData.projects by projectType

---

## Phase 6: Skills Section

### Section Shell
- **Feature**: Built `Skills/index.tsx` section root with proper `section` layout, 5% horizontal padding, and `pointerEvents: auto`.

### SkillsHeading
- **Feature**: Created `SkillsHeading.tsx` mirroring the Projects heading pattern — `// SKILLS` label in neon purple, `Technical Arsenal` h2, thin purple accent line, and subtitle from `SECTION_SUBTITLES.skills`.
- **Animation**: GSAP `ScrollTrigger` drives a 4-step staggered entrance (label → title → line → subtitle) once the section crosses 70% of the viewport.

### Constellation Layout Utility
- **Utility**: `src/utils/constellation.ts` — seeded pseudo-random position generator (`Math.sin`-based) producing deterministic organic node placement every render.
- **Zone system**: Primary nodes (React, TS, JS) confined to a 35–65% center zone; strong nodes in a 15–85% middle ring; familiar nodes in the full 5–95% area.
- **Overlap prevention**: `isFarEnough` checks minimum 9% Euclidean distance between every placed node, with up to 50 placement attempts per node before fallback.
- **Helpers**: `getNodeSize` (52/38/28px by level), `getNodeColor` (category → neon color), `SKILL_CONNECTIONS` (17 meaningful pairs), `getConnectionCoords` (percentage → SVG pixel coords).

### SkillNode
- **Feature**: `SkillNode.tsx` — absolutely positioned circle with border + tinted fill, primary-level inner filled dot and outer glow ring.
- **Animation**: CSS `nodeFloat` keyframe — each node uses unique duration (3s–6.8s) and negative delay so every node is mid-float on load, guaranteeing no synchronization.
- **Important**: Animation keyframe owns `translate(-50%, -50%)` — GSAP entrance was deliberately limited to `autoAlpha` only to avoid transform conflicts (see fix below).

### SkillsConstellation
- **Feature**: `SkillsConstellation.tsx` — 70vh relative container rendering all `SkillNode` elements and `SkillConnections` SVG layer.
- **ResizeObserver**: Tracks real pixel dimensions so SVG line coordinates recalculate correctly on window resize.

### SkillConnections
- **Feature**: `SkillConnections.tsx` — SVG layer rendering `strokeDasharray` draw-on lines between related skill pairs. Lines use the from-node's category color at `strokeOpacity: 0.2`. 1.5s+stagger delay ensures lines draw after nodes appear.

### useSkillsAnimation
- **Animation**: GSAP `ScrollTrigger` for heading + `autoAlpha`-only stagger for nodes (center-outward, 1.2s total spread, `power2.out`).

### SkillsLegend
- **Feature**: Horizontal centered legend with 8px color dots for all 5 categories (Frontend/Backend/Testing/Mobile/Tools).

---

## Fixes

### Skill Nodes Not Visible — Fix 1: CSS `visibility` Inheritance
- **Root cause**: `SkillsConstellation`'s wrapper div had `data-skills="constellation"`. The global CSS `[data-skills] { visibility: hidden; }` hid that container, and `visibility: hidden` is inherited by all children. The `[data-skill-node]` elements inside were hidden by their parent, not by their own style.
- **Fix**: Removed `data-skills` attribute from the constellation wrapper. The container is always visible; only the individual `[data-skill-node]` divs participate in GSAP's visibility animation.

### Skill Nodes Not Visible — Fix 2: GSAP `scale` Overriding CSS `nodeFloat` Transform
- **Root cause**: The GSAP entrance animation used `scale: 0 → 1`. GSAP writes `scale` as an inline `transform` property. Inline styles have higher cascade priority than CSS animations, so after GSAP finished, its inline `transform: matrix(1,0,0,1,0,0)` permanently overrode the CSS `nodeFloat` keyframe's `transform: translate(-50%, -50%) translateY(...)`. Nodes snapped out of position and stopped floating.
- **Fix**: Removed `scale` from the GSAP `fromTo` entirely. GSAP now only animates `autoAlpha` (opacity + visibility). The CSS `nodeFloat` keyframe owns the `transform` property exclusively — no conflict.

---

## Phase 6 — Skills Section — COMPLETE

All prompts completed and verified.

### Components Built
- **SkillsHeading** — animated section heading with scroll-triggered GSAP entrance, purple accent color
- **SkillsConstellation** — responsive container with `ResizeObserver` for accurate SVG line coordinates
- **SkillNode** — floating circle with category color, size by proficiency, inner dot for primary nodes, glow ring for primary nodes, tooltip on hover
- **SkillConnections** — SVG layer with draw-on animation for connection lines between related skills
- **SkillsLegend** — category color key, highlights active category on node hover

### Hooks Built
- **useSkillHover** — manages hover state, calculates highlighted nodes and connections via Set lookups

### Utilities Added
- `src/utils/constellation.ts` — `seededRandom`, `isFarEnough`, `generateConstellationPositions`, `getNodeSize`, `getNodeColor`, `SKILL_CONNECTIONS`, `getConnectionCoords`

### Known Constraint — Permanent
> **GSAP must never animate `transform` on `[data-skill-node]` elements.**
> The CSS `nodeFloat` keyframe owns `transform` exclusively (it carries `translate(-50%, -50%)` plus `translateY`).
> GSAP only animates `autoAlpha` on these elements.
> This constraint must be respected in all future prompts that touch the Skills section.

---

## Phase 7 — About Section — STARTING NEXT

### Components to Build
- **AboutHeading** — section heading
- **TerminalPanel** — holographic terminal-style bio panel
- **ExperienceTimeline** — visual vertical career timeline
- **AboutSection** — parent section component

### Content Source
- `portfolioData.personal` — bio, name, title, location
- `portfolioData.experience` — timeline data
- `portfolioData.metrics` — key numbers for terminal

### Visual Style
- Terminal aesthetic — dark panel, green prompt lines, typewriter text animation, monospace throughout
- Terminal aesthetic — dark panel, green prompt lines, typewriter text animation, monospace throughout
- Experience timeline — vertical line with nodes for each role and platform highlight

---

## Phase 7 — About Section — COMPLETE

All prompts completed and verified.

### Components Built
- **AboutHeading** — animated section heading with scroll-triggered GSAP entrance, cyan accent color
- **TerminalWindow** — terminal chrome with three-dot buttons (red/yellow/green), title bar, scan line effect, dark panel aesthetic
- **TerminalLine** — individual command + output pair with typewriter animation, blinking cursor during typing, output fade-in on completion
- **TerminalPanel** — orchestrates sequential typewriter animation across all `TERMINAL_LINES`, uses `useInView` to trigger on scroll, final blinking cursor after all lines complete
- **TimelineNode** — expandable career role node with vertical connecting line, animated dot, chevron toggle, first node expanded by default
- **PlatformHighlight** — platform card inside expanded timeline node showing contributions, impact, tech
- **ExperienceTimeline** — vertical timeline container with staggered GSAP entrance, timeline line draw animation, education endpoint at bottom

### Hooks Built
- **useTypewriter** — character-by-character text animation with speed, delay, and reduced-motion support

### Content Added to `portfolio.ts`
- `TERMINAL_LINES` constant — 7 terminal command/output pairs for the bio terminal animation

### Layout
- Two-column grid — terminal left, timeline right
- Responsive — collapses to single column on mobile via `.about-grid` CSS class with media query
- Both columns animate in from opposite sides via GSAP ScrollTrigger

---

## Session Checkpoint — Paused After Phase 7

### Current Implementation State

**Complete phases:**
| Phase | Status |
|---|---|
| Phase 1 — Foundation and data | ✅ |
| Phase 2 — Persistent canvas, starfield, parallax | ✅ |
| Phase 3 — Hero section (icosahedron, text, animations) | ✅ |
| Phase 4 — Navigation (nav dots, scroll progress bar) | ✅ |
| Phase 5 — Projects section (cards, modal, metrics) | ✅ |
| Phase 6 — Skills constellation | ✅ |
| Phase 7 — About section (terminal, timeline) | ✅ |
| Phase 8 — Contact section | ❌ Not started |

### Where to Resume

**Next: Phase 8 — Contact Section** (single-prompt phase)
- Section heading
- Neon-styled contact form (name, email, message)
- Social links row (email, LinkedIn, GitHub, resume)
- Form submission via mailto or formspree.io

### Resuming Instructions

1. Read `DEVELOPMENT_GUIDELINES.md`
2. Read `PROJECT_PROGRESS.md` in full
3. Read `src/data/portfolio.ts` to confirm content
4. Run dev server and confirm no errors
5. Visually check: Hero → Projects → Skills → About
6. Confirm nav dots and scroll progress bar working
7. Await next prompt for Phase 8

### Key Architectural Decisions to Remember

- **GSAP must never animate `transform` on `[data-skill-node]` elements** — CSS `nodeFloat` keyframe owns `transform` exclusively
- Icosahedron will later travel to nav dot position (Phase 11) — fly-away is temporary
- All content comes from `src/data/portfolio.ts` only
- Modal system uses React Portal for above-canvas rendering
- Section heights use `min-height: max(100vh, 600px)` except Hero (fixed `100vh`)
- `useHeroLayout` hook coordinates 3D object and HTML text positions across breakpoints

### Known Issues to Watch on Resume

- If dev server has stale cache: `npm run dev --force`
- If GSAP ScrollTrigger animations do not fire: confirm `gsap.registerPlugin(ScrollTrigger)` is called before any ScrollTrigger usage
- If skill nodes lose float animation: check no new code is animating `transform` on `[data-skill-node]`

---

## Phase 8 — Contact Section — COMPLETE

All prompts completed and verified.

### Components Built
- **ContactHeading** — animated section heading with pink accent color matching contact theme
- **ContactForm** — fully functional neon-styled form with name, email, message fields, client-side validation, Formspree submission, success state, error handling, loading state
- **SocialLinks** — right column with personal note, direct contact links (email, LinkedIn, GitHub), resume download button, availability status badge
- **Footer strip** — copyright and back-to-top button

### Hooks Built
- **useFormSubmit** — async Formspree submission handler with loading, success, error, and reset states
- **useContactAnimation** — scroll-triggered GSAP entrance for all contact section elements

### Notes
- Formspree endpoint is placeholder — Puneet must create Formspree account and replace placeholder in `CONTACT_CONFIG.formEndpoint` in `portfolio.ts`
- Resume download links to `/resume.pdf` which must be added to the `public/` folder
- GitHub link uses placeholder URL — update `PERSONAL_DETAILS.github` in `portfolio.ts` when ready

---

## Phases Complete — All Content Sections Done

**COMPLETE:**
- Phase 1 — Foundation and data
- Phase 2 — Canvas, starfield, parallax
- Phase 3 — Hero section
- Phase 4 — Navigation system
- Phase 5 — Projects section
- Phase 6 — Skills constellation
- Phase 7 — About section
- Phase 8 — Contact section
- Phase 9 — Scroll camera animation

## Phase 10 — Post-processing and Polish — COMPLETE

All prompts completed and verified.

### Core Changes
- Built `useDeviceCapability` hook for detecting hardware scaling limits (pixel ratio, core count)
- Fully disabled expensive R3F `PostProcessing` array (bloom, aberration, vignette)
- Ported bloom effects entirely to CSS drop-shadows and box-shadows via global utility classes
- Added concentric floating mesh layers to `HeroObject` with transparent textures mimicking zero-cost volumetric bloom
- Passed `enableShake` down into `CameraController` and `isLowEnd` to `IcosahedronGlow` to respect hardware degradation rules
- Suspended all sections beneath the fold to guarantee First Contentful Paint arrives smoothly on all devices
- Preloaded `Jetbrains Mono` inside `index.html` to eliminate cumulative layout shifts
- Ensured touch zoom out does not affect default `ContactForm` on iOS Safari

## Phase 11.1 — Nav Dot Tracking Bug Fix — COMPLETE
- **Root Cause:** Due to Phase 10 introducing React.lazy and Suspense for all content sections, `useActiveSection` was initializing its `IntersectionObserver` before the lower sections existed in the DOM. Consequently, `document.getElementById()` for `projects`, `skills`, etc. returned null and they were never observed, locking the active dot to `hero`.
- **Fix Applied:** (Likely Fix A) Added a `MutationObserver` to `useActiveSection` which watches `document.body` for `childList` and `subtree` changes. When the `Suspense` boundary resolves and mounts the lazy-loaded sections, the mutation callback fires and registers the new elements with the `IntersectionObserver`, ensuring all sections are correctly tracked.

**REMAINING:**
- Phase 11.2 — Icosahedron nav companion
- Phase 12 — Final content and deployment

---

## Bug Fix — Nav Dots Section Detection (Post Phase 10)

ISSUE:
Nav dots stopped updating when scrolling between
sections after React.lazy / Suspense was introduced
in Phase 10 mobile performance pass.

ROOT CAUSE:
NavDots mounts immediately with the Hero section.
useActiveSection initialised its IntersectionObserver
before lazy-loaded sections (Projects, Skills, About,
Contact) had mounted into the DOM. document.getElementById
returned null for all sections except hero. The observer
never re-ran so the other sections were never observed.

FIX APPLIED:
In useActiveSection.ts — wrapped section observation
in a MutationObserver that watches document.body for
DOM mutations. When Suspense boundaries resolve and
lazy sections paint into the DOM the MutationObserver
fires a re-tick which calls observeSections again.
A Set tracks which section ids have already been
observed to prevent duplicate observation.

RESULT:
All 5 sections are correctly observed regardless of
when they mount. Nav dots update correctly on scroll
through all sections.

CONSTRAINT FOR FUTURE PROMPTS:
If any new sections or lazy-loaded components are
added they will automatically be picked up by the
MutationObserver without any changes to useActiveSection.
Do not replace the MutationObserver approach with a
simple useEffect — it will break lazy loading again.

---

## Phase 11 — Icosahedron Nav Companion — STASHED

### What was attempted
Built the foundation for the icosahedron nav
companion feature across two prompts:

Prompt 11.1 — Infrastructure (COMPLETE, STASHED):
  - ENABLE_NAV_COMPANION feature flag in portfolio.ts
  - NavCompanionContext with camera ref bridge
  - CameraRefSync component to share live camera
  - useNavDotPositions hook measuring dot positions
    once on mount and once on resize
  - screenToWorld utility in worldCoordinates.ts
  - NavDotPosition interface in types/index.ts
  - MutationObserver fix in useActiveSection for
    lazy-loaded sections (THIS FIX IS KEPT)

Prompt 11.2 — 3D Component (PARTIAL, STASHED):
  - NavCompanionObject — small rotating icosahedron
  - NavCompanion — travel animation component
  - Companion appears correctly as small glow
  - Companion does NOT reach correct nav dot position
  - Root cause: coordinate mismatch between screen
    space (HTML nav dots) and 3D world space (canvas)
  - The Phase 9 scroll-driven camera movement
    compounds the conversion complexity — dots are
    measured at hero camera position but companion
    travels while camera has moved

### Why stashed
The screen-to-world coordinate conversion is
non-trivial when combined with a scroll-driven
moving camera. The companion appears but lands
in the wrong position. Further debugging was
deprioritised in favour of content and deployment.

### All changes stashed via git stash
The codebase is back to the clean Phase 10 state.
All Phase 11 files have been stashed not deleted
so work can be resumed later.

### What is KEPT from Phase 11 work
The MutationObserver fix in useActiveSection.ts
is the only Phase 11 change that remains in the
codebase. This fix ensures nav dots work correctly
with React.lazy loaded sections and must be
preserved in all future work.

### How to resume Phase 11 later
When resuming run: git stash pop
This restores all Phase 11 files.

The root problem to solve:
  Nav dots exist in HTML screen space.
  The companion lives in 3D world space.
  The camera moves as the user scrolls (Phase 9).
  Screen-to-world conversion must account for
  the CURRENT camera position at the time the
  companion needs to move — not the camera
  position at mount time when dots were measured.

Recommended approach on resume:
  Instead of converting screen coords to world
  coords, place invisible R3F plane meshes at
  the nav dot positions and use those as targets.
  The meshes live in world space so no conversion
  is needed. The companion lerps to the mesh
  position directly.

---

## Phase 12 — Final Content and Deployment — NEXT

### What needs to be done

CONTENT UPDATES:
  1. Profile photo
     - Add real photo to public/images/
     - Update PLACEHOLDER_IMAGE in portfolio.ts
     - Currently shows placeholder

  2. Resume PDF
     - Add resume.pdf to public/
     - CONTACT_CONFIG.resumeUrl = '/resume.pdf'
     - Download button in Contact section already
       links to this path — just add the file

  3. Formspree endpoint
     - Create account at formspree.io (free tier)
     - Create a new form
     - Replace placeholder in CONTACT_CONFIG:
       formEndpoint: 'https://formspree.io/f/REAL_ID'
     - Test form submission end to end

  4. GitHub URL
     - Update PERSONAL_DETAILS.github in portfolio.ts
     - Currently placeholder URL

  5. Review all portfolio content
     - Read through all text visible on the site
     - Verify all project details are accurate
     - Verify all metrics are correct
     - Verify contact details are correct

DEPLOYMENT:
  1. Production build
     - Run npm run build
     - Verify zero errors
     - Check bundle size

  2. Deploy to Vercel
     - Connect GitHub repository to Vercel
     - Configure build settings:
       Framework: Vite
       Build command: npm run build
       Output directory: dist
     - Deploy and verify live URL

  3. Custom domain (optional)
     - Configure custom domain in Vercel if available

  4. Final live testing
     - Test all sections on live URL
     - Test on mobile device (real device not emulated)
     - Test contact form with real Formspree endpoint
     - Test resume download
     - Test all navigation

### Current codebase state
- All 5 sections complete and working
- Navigation working with MutationObserver fix
- Camera movement working (Phase 9)
- Sprite glow on icosahedron working
- Mobile performance pass complete
- PostProcessing disabled (performance)
- Git is clean — Phase 11 stashed separately

### Resuming instructions
When resuming for Phase 12:
1. Read DEVELOPMENT_GUIDELINES.md
2. Read PROJECT_PROGRESS.md
3. Run npm run dev and verify all sections work
4. Have the following ready:
   - Profile photo file
   - Resume PDF file
   - Formspree account created
   - GitHub profile URL
5. Await Phase 12 prompts

---

## Documentation Audit — 2026-05-17

The following components, hooks, and architectural details were present in the
codebase but not previously captured in this document. Added for completeness.

### Hooks implemented but not explicitly documented

**useCardTilt** (`src/hooks/useCardTilt.ts`)
- RAF-throttled 3D perspective tilt effect for project cards on hover
- Computes rotateX/rotateY from mouse position relative to card center
- Touch-aware: disabled automatically on touch devices
- Returns `transform`, `transition`, `isHovered`, `tiltX`, `tiltY`
- Used in: ProjectCard, NGATCard

**useCountUp** (`src/hooks/useCountUp.ts`)
- Animated number counter for hero stats
- Used in: HeroStats

**useModalState** (`src/hooks/useModalState.ts`)
- Open/close state with selected project ref
- Used in: Projects section index, ProjectModal, NGATCard

**useSectionBoundaryShake** (`src/hooks/useSectionBoundaryShake.ts`)
- Generates a small XYZ camera shake offset when user crosses section boundaries
- Consumed by CameraController via `shakeOffset`; enabled/disabled via `enableShake` prop

**useCameraScroll** (`src/hooks/useCameraScroll.ts`)
- Reads `window.scrollY` and interpolates across `CAMERA_KEYFRAMES` from portfolio.ts
- Returns a getter function (`getCameraTargets`) called every frame in CameraController

**useInView** (`src/hooks/useInView.ts`)
- IntersectionObserver wrapper returning a boolean ref
- Used by TerminalPanel to trigger typewriter animation on scroll

**useScrollPosition** (`src/hooks/useScrollPosition.ts`)
- Returns current `window.scrollY` via RAF, used by ScrollPrompt and ScrollProgressBar

**useHeroLayout** (`src/hooks/useHeroLayout.ts`)
- Returns responsive layout config (3D object position, HTML text position)
  that shifts based on viewport width breakpoint
- Used by: HeroScene, HeroText

### Canvas architecture details (Phase 10)

**Adaptive DPR**
- `Canvas dpr={[1, pixelRatio]}` — pixel ratio is capped at 2 via `useDeviceCapability`
  to prevent 3x GPU load on high-DPI retina devices

**Adaptive Performance**
- `Canvas performance={{ min: 0.5 }}` — R3F automatically scales DPR down
  to 0.5x if the frame rate drops below 60fps (adaptive rendering)

**Vignette overlay**
- A CSS `radial-gradient` div sits over the canvas inside CanvasWrapper
  to create a darkened edge vignette without a GPU post-process pass

**IcosahedronGlow clarification**
- Phase 10 notes mention "concentric floating mesh layers" — these are in fact
  THREE.Sprite objects with AdditiveBlending (not icosahedron meshes):
    Sprite 1: cyan glow, scale 4.5, opacity pulses 0.1–0.6
    Sprite 2: outer soft cyan, scale 7, opacity ~0.08
    Sprite 3: purple accent, scale 3.5, opacity pulses 0.05–0.2
  Sprites always face the camera automatically. Disabled on isLowEnd devices.

### Mobile-specific enhancements (Phase 10.1 — not separately logged)

**HeroObject Float parameters**
- `rotationIntensity`: 0.2 desktop → 0.1 mobile
- `floatIntensity`: 0.8 desktop → 0.3 mobile
- Reduces vestibular motion on mobile

**SkillNode mobile tooltip**
- Primary-level skill nodes always show their tooltip on mobile
  (`isMobile && level === 'primary'` condition in SkillNode.tsx)
- Addresses the UX gap of no hover on touch devices

**ProjectsGrid mobile layout**
- NGAT featured card uses `gridRow: '1/3'` only on desktop
- On mobile it falls back to `auto` flow so all cards stack vertically

**ContactForm iOS touch-zoom fix**
- Input `font-size` set to 16px minimum to prevent iOS Safari auto-zoom
  on input focus (noted in Phase 10 but not detailed)

### Permanent architectural notes

**PostProcessing.tsx**
- File exists at `src/scenes/PostProcessing.tsx` and is exported from `scenes/index.ts`
- It is NEVER imported by CanvasWrapper or any rendered component
- Tree-shaking should eliminate it from the bundle, but this should be
  verified with `npm run build` and bundle analysis before deployment

**ProjectsGrid project ordering**
- NGAT is featured because it is `projects[0]` — index-based, not flag-based
- Adding a new project before index 0 would accidentally replace the featured card
- A `featured: boolean` field on the Project type is a planned improvement