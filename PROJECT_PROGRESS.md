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
