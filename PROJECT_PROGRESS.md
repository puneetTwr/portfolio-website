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
- Experience timeline — vertical line with nodes for each role and platform highlight