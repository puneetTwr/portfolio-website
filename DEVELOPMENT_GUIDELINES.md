# Development Guidelines — Puneet Tanwar Portfolio

> This document is the **project bible**. Every decision made during development must align with these guidelines. Both the developer and AI coding tools (Antigravity, Warp, etc.) must read and follow this document before writing any code.

---

## 1. Core Philosophy

- **Content drives structure** — components are built around the data in `src/data/portfolio.ts`, never the other way around
- **One source of truth** — all portfolio content lives in `src/data/portfolio.ts`. No content is ever hardcoded inside a component
- **Separation of concerns** — 3D scene logic and HTML overlay logic must never be mixed in the same component
- **Clarity over cleverness** — write code that is easy to read and easy to change, not code that is impressively compact
- **Phase discipline** — never implement anything beyond what the current prompt asks. No gold-plating, no "while I'm here" additions

---

## 2. Constants and Hardcoded Strings

- **All hardcoded strings, URLs, color values, and config values must live in `src/data/portfolio.ts`** under the CONSTANTS section at the top of the file
- No magic strings or numbers inside components — import from the constants instead
- Color values used in Three.js scenes must reference `ACCENT_COLORS` from `portfolio.ts`
- URLs (LinkedIn, GitHub, resume, email) must always reference `PERSONAL_DETAILS` — never typed inline
- If a value appears more than once anywhere in the codebase, it must be extracted to a constant immediately

**Correct:**
```ts
import { PERSONAL_DETAILS, ACCENT_COLORS } from '@/data/portfolio'
<a href={PERSONAL_DETAILS.linkedin}>LinkedIn</a>
```

**Incorrect:**
```ts
<a href="https://linkedin.com/in/puneet-tanwar">LinkedIn</a>
```

---

## 3. Folder Structure Rules

Every file must live in its correct location — do not create files outside the defined structure:

```
src/
├── assets/images/        # static images only
├── components/ui/        # reusable HTML overlay components
├── data/portfolio.ts     # single content source — never split this
├── hooks/                # custom React hooks only
├── scenes/               # R3F 3D scene components only
├── sections/             # one folder per portfolio section
├── styles/globals.css    # global styles and CSS variables only
├── types/index.ts        # all shared TypeScript interfaces
└── utils/                # pure helper functions only
```

- `scenes/` is strictly for Three.js / R3F components — no HTML rendering
- `components/ui/` is strictly for HTML overlay components — no Three.js
- `sections/` components may combine both but must delegate to the above
- Never create a `components/3d/` or `components/three/` folder — use `scenes/`
- Never create extra folders not listed above without explicit approval

---

## 4. Component Rules

### General
- One component per file — no exceptions
- Every component must have a single, clearly named responsibility
- Components must not exceed 150 lines — if longer, split into smaller components
- No inline styles in JSX — use Tailwind classes or CSS variables
- No `any` types — ever. Use proper TypeScript interfaces from `src/types/index.ts`
- Always use named exports for components, not default exports — except for section `index.tsx` files which use default exports

### Props
- Every component prop must be typed with a TypeScript interface
- Define prop interfaces in the same file as the component, above the component
- Do not pass raw data objects from `portfolioData` directly as props — destructure only what the component needs

**Correct:**
```tsx
interface ProjectCardProps {
  title: string
  description: string
  accentColor: string
  techStack: string[]
}
```

**Incorrect:**
```tsx
interface ProjectCardProps {
  project: any
}
```

### Naming Conventions
- Components: `PascalCase` — e.g. `ProjectCard`, `NavDots`, `HeroText`
- Hooks: `camelCase` prefixed with `use` — e.g. `useScrollPosition`, `useMouseTracker`
- Utility functions: `camelCase` — e.g. `lerp`, `clamp`, `hexToRgb`
- Constants: `SCREAMING_SNAKE_CASE` — e.g. `ACCENT_COLORS`, `SECTION_IDS`
- Files: match the component name exactly — e.g. `ProjectCard.tsx`, `NavDots.tsx`

---

## 5. TypeScript Rules

- **Strict mode is always on** — do not disable or loosen TypeScript config
- No `any` — use `unknown` if the type is genuinely unknown, then narrow it
- No type assertions (`as SomeType`) unless absolutely unavoidable — add a comment explaining why
- All interfaces live in `src/types/index.ts` unless they are component-specific props
- Always type the return value of custom hooks explicitly
- Use `const` assertions (`as const`) for constant objects to get literal types

---

## 6. Three.js / React Three Fiber Rules

- All R3F components must live in `src/scenes/`
- Never import `three` directly in section or UI components — only in `scenes/`
- Always dispose of Three.js geometries, materials, and textures when a component unmounts
- Use `useFrame` sparingly — only for animations that must run every frame
- Avoid creating new geometry or material instances inside `useFrame` — create once, animate transform only
- All 3D color values must use the hex values from `ACCENT_COLORS` in `portfolio.ts`
- Always wrap R3F canvas sections in `<Suspense>` with a fallback
- Performance budget: target 60fps on a mid-range laptop — test with `<Stats>` during development and remove before production

---

## 7. Animation Rules

- All scroll-driven animations must use GSAP ScrollTrigger — no custom scroll listeners
- CSS animations are allowed for simple looping effects (pulse, float, glow)
- Never animate layout properties (`width`, `height`, `top`, `left`) — animate `transform` and `opacity` only for performance
- All GSAP timelines must be killed in the component's cleanup function to prevent memory leaks
- Animation durations: micro-interactions 150–300ms, section transitions 600–900ms, camera movements 1000–1500ms
- Always respect `prefers-reduced-motion` — wrap non-essential animations in a check:

```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReducedMotion) { /* run animation */ }
```

---

## 8. Styling Rules

- Tailwind CSS v4 is the styling system for all HTML overlay components
- Always use `@import 'tailwindcss'` in globals.css — never use `@tailwind` directives (v3 syntax)
- CSS custom properties defined in `globals.css` are the design tokens — use them for all theme colors in HTML components
- Never hardcode hex color values in Tailwind classes or inline styles — use CSS variables
- Dark theme is the only theme — do not build light mode
- Responsive breakpoints: mobile-first. The portfolio must work on screens as small as 375px
- Z-index scale must be defined as CSS variables — never use arbitrary z-index numbers:

```css
--z-canvas: 0;
--z-sections: 10;
--z-overlay: 20;
--z-nav: 30;
--z-modal: 40;
```

---

## 9. Performance Rules

- Lazy load all section components using `React.lazy` and `Suspense`
- Images must use proper `width` and `height` attributes to prevent layout shift
- Never import an entire library when only one function is needed — use named imports
- Three.js post-processing effects (bloom, chromatic aberration) must be toggleable — disable on mobile or low-end devices
- Use `useMemo` and `useCallback` only when there is a measurable performance reason — do not pre-optimise
- No `console.log` statements in committed code — use a debug flag constant if logging is needed during development

---

## 10. Accessibility Rules

- All interactive HTML elements must be keyboard navigable
- All images must have descriptive `alt` text
- Navigation dots must have `aria-label` attributes
- Color alone must never be the only way information is conveyed
- Focus states must always be visible — never `outline: none` without a replacement
- The contact form must have proper `label` elements associated with every input

---

## 11. Git and Version Control

- Commit messages must follow this format: `type(scope): short description`
  - Types: `feat`, `fix`, `style`, `refactor`, `chore`, `docs`
  - Examples: `feat(hero): add draggable icosahedron`, `fix(skills): correct node sizing`
- Never commit directly to `main` — use feature branches
- Branch naming: `feature/phase-name` or `fix/issue-description`
- One logical change per commit — do not bundle unrelated changes
- Never commit commented-out code, `console.log` statements, or TODO comments without a ticket reference

---

## 12. File and Code Hygiene

- Remove all Vite boilerplate defaults — no default App.css, no placeholder SVGs
- No unused imports — every import must be used
- No unused variables or functions
- No dead code — if it is not used, delete it
- Every custom hook must have a JSDoc comment explaining what it does and what it returns
- Utility functions must have a JSDoc comment with parameter and return type descriptions

---

## 13. What Antigravity / AI Tools Must Never Do

- Never invent or assume portfolio content — always read from `portfolio_content_blueprint.md` or `src/data/portfolio.ts`
- Never install additional dependencies without explicit instruction
- Never modify `src/data/portfolio.ts` or `src/types/index.ts` without explicit instruction
- Never create files outside the defined folder structure
- Never implement features from a future phase
- Never leave placeholder comments like `// TODO: add real content here` in committed code
- Never disable TypeScript strict checks to silence an error — fix the error properly
- Never use `!important` in CSS

---

## 14. Design Principles

- **Intentional motion** — every animation must have a purpose. No animation for animation's sake
- **Depth through layers** — the site has three visual layers: starfield background, 3D objects, HTML overlay. Keep them visually distinct
- **Neon restraint** — the neon color palette is powerful but must be used sparingly. Not everything should glow
- **Typography clarity** — monospace font for code-like elements, readable size minimum 14px for body text
- **Hover feedback** — every interactive element must have a clear hover state that signals interactivity
- **Loading grace** — every async or heavy element must have a loading state that fits the aesthetic

---

## 15. Definition of Done

A feature or component is only considered done when:

- [ ] It compiles with zero TypeScript errors (`npx tsc --noEmit`)
- [ ] It renders correctly on desktop (1440px) and mobile (375px)
- [ ] It uses only content from `src/data/portfolio.ts` — no hardcoded strings
- [ ] All props are fully typed
- [ ] No `console.log` statements remain
- [ ] It has been tested at 60fps in the browser
- [ ] The commit message follows the defined format

---

*Last updated: Phase 1 — Project Setup*
*This document must be updated whenever a new architectural decision is made.*
