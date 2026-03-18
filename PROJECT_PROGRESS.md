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
