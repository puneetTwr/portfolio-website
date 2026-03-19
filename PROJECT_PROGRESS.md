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