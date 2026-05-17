# Project Suggestions & Optimization Recommendations

> Generated: 2026-05-17  
> Scope: Full codebase audit — performance, architecture, code quality, UI/UX, accessibility, deployment

---

## Priority Legend

| Level | Meaning |
|---|---|
| 🔴 Critical | Breaks deployment, causes data loss, or severely hurts users |
| 🟠 High | Significant performance or correctness impact; fix before going live |
| 🟡 Medium | Meaningful improvement; should be addressed in Phase 12 or soon after |
| 🟢 Low | Polish and future-proofing; address when time permits |

---

## 1. 🔴 Remove Puppeteer from Runtime Dependencies

### Why
`puppeteer` is listed under `dependencies` (not `devDependencies`) in `package.json`. Puppeteer downloads a full Chromium binary on install (~400MB+). Since it is completely unused anywhere in the codebase, it adds enormous weight to every production install, CI run, and Vercel deployment. Vercel's serverless environment may also fail or time out attempting to install the binary.

### How to Implement
```bash
npm uninstall puppeteer
```
If Puppeteer is ever needed for screenshot automation or end-to-end testing in the future, reinstall it as a `devDependency`:
```bash
npm install --save-dev puppeteer
```

---

## 2. 🔴 Add a `<title>` and SEO Meta Tags to `index.html`

### Why
The current `index.html` has no `<title>` tag, no `<meta name="description">`, and no Open Graph or Twitter card tags. Browsers display "Vite App" or a blank tab title. Google indexes a near-empty page. Any social share (LinkedIn, Twitter/X) of the portfolio URL shows no preview card — a poor first impression for a professional portfolio.

### How to Implement
Add the following inside `<head>` in `index.html`:

```html
<title>Puneet Tanwar — Frontend Developer</title>
<meta name="description" content="Frontend Developer with 3+ years building production React applications. Specialising in TypeScript, performance, and interactive UIs." />

<!-- Open Graph (LinkedIn, Facebook, iMessage) -->
<meta property="og:title" content="Puneet Tanwar — Frontend Developer" />
<meta property="og:description" content="Frontend Developer with 3+ years building production React applications." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://YOUR_DEPLOYED_URL" />
<meta property="og:image" content="https://YOUR_DEPLOYED_URL/images/og-preview.jpg" />

<!-- Twitter / X card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Puneet Tanwar — Frontend Developer" />
<meta name="twitter:description" content="Frontend Developer with 3+ years building production React applications." />
<meta name="twitter:image" content="https://YOUR_DEPLOYED_URL/images/og-preview.jpg" />
```

Create a 1200×630px screenshot of the portfolio hero as `public/images/og-preview.jpg` for the social card image.

---

## 3. 🟠 Verify `@react-three/postprocessing` is Fully Tree-Shaken

### Why
`PostProcessing.tsx` imports `EffectComposer`, `Bloom`, `ChromaticAberration`, and `Vignette` from `@react-three/postprocessing` at the top of the file — static imports, not dynamic. Even though the component is never rendered anywhere in the app, the file is re-exported from `src/scenes/index.ts`. Depending on how Vite/Rollup handles barrel file re-exports in the build, this package (which is large) may still be included in the bundle.

### How to Implement
1. Run `npm run build` and check `dist/assets/` for file sizes.
2. Install `rollup-plugin-visualizer` temporarily:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```
   Add to `vite.config.ts`:
   ```ts
   import { visualizer } from 'rollup-plugin-visualizer'
   plugins: [react(), visualizer({ open: true })]
   ```
3. If `postprocessing` or `@react-three/postprocessing` appears in the treemap, the simplest fix is to **delete `PostProcessing.tsx`** and remove its export from `scenes/index.ts`. The feature is documented as permanently disabled; the file provides no value.
4. If you want to keep the file for potential future use, convert the imports to dynamic:
   ```ts
   // Lazy import — only bundled if actually rendered
   const EffectComposer = React.lazy(() =>
     import('@react-three/postprocessing').then(m => ({ default: m.EffectComposer }))
   )
   ```

---

## 4. 🟠 Add an `ErrorBoundary` Around Lazy-Loaded Sections

### Why
All five sections are loaded via `React.lazy`. The single `<Suspense fallback={null}>` handles loading state, but there is no `ErrorBoundary`. If any section's JavaScript chunk fails to load (network error, CDN issue, bad deploy), React throws an unhandled error that crashes the entire app — the user sees a white screen with no explanation.

### How to Implement
Install `react-error-boundary` (lightweight, well-maintained):
```bash
npm install react-error-boundary
```

Create a minimal fallback component in `src/components/ui/SectionErrorFallback.tsx`:
```tsx
export function SectionErrorFallback() {
  return (
    <div style={{ padding: '80px 5%', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
      <span style={{ color: 'var(--color-neon-pink)' }}>// </span>
      section failed to load — refresh to retry
    </div>
  )
}
```

Wrap each `SectionWrapper` individually so one failing section doesn't crash the others:
```tsx
import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary FallbackComponent={SectionErrorFallback}>
  <Suspense fallback={null}>
    <SectionWrapper id="projects" data-section="projects">
      <Projects />
    </SectionWrapper>
  </Suspense>
</ErrorBoundary>
```

---

## 5. 🟠 Centralise `useDeviceCapability` into a React Context

### Why
`useDeviceCapability` reads `navigator.userAgent`, `window.innerWidth`, `window.devicePixelRatio`, and `navigator.hardwareConcurrency` on every call. It is called in at least five components: `CanvasWrapper`, `HeroObject`, `HeroScene`, `ProjectsGrid`, `SkillNode`. Device capabilities don't change during a session, so this is five separate reads of the same values on every render of each component.

### How to Implement
1. Create `src/context/DeviceCapabilityContext.tsx`:
   ```tsx
   const DeviceCapabilityContext = createContext(computeCapability())
   export function DeviceCapabilityProvider({ children }) {
     const capability = useMemo(computeCapability, [])
     return (
       <DeviceCapabilityContext.Provider value={capability}>
         {children}
       </DeviceCapabilityContext.Provider>
     )
   }
   export const useDeviceCapability = () => useContext(DeviceCapabilityContext)
   ```
2. Move the computation logic into a module-level `computeCapability()` function (no hooks, no re-render dependencies).
3. Wrap `App` in `<DeviceCapabilityProvider>` inside `main.tsx`.
4. All existing call sites (`useDeviceCapability()`) continue to work without changes since the hook name stays the same.

---

## 6. 🟠 Centralise GSAP Plugin Registration

### Why
`gsap.registerPlugin(ScrollTrigger)` is called inside each animation hook file (`useSkillsAnimation`, `useProjectsAnimation`, `useAboutAnimation`, `useContactAnimation`). While GSAP is safe with repeated registration, this is redundant boilerplate that must be copied into every new animation hook — easy to forget, and harder to audit at a glance.

### How to Implement
Remove individual registrations from all animation hook files and add a single call in `src/main.tsx`, before `createRoot`:
```ts
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
```
This guarantees ScrollTrigger is always registered before any hook runs, regardless of which section loads first.

---

## 7. 🟠 Configure Vite Manual Chunk Splitting for Vendor Libraries

### Why
Three.js (~600KB gzipped), `@react-three/fiber`, `@react-three/drei`, and GSAP are bundled with application code into the same chunk by default. Every time any app code changes, browsers must re-download the entire bundle — losing the cache benefit for these stable vendor libraries. Splitting them into separate chunks means the vendor chunk is cached across deploys.

### How to Implement
Update `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap': ['gsap'],
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
  },
})
```
This creates four separate cached chunks. Updating portfolio content only invalidates the app chunk; Three.js and GSAP remain cached on return visits.

---

## 8. 🟡 Replace Index-Based Featured Card with a `featured` Flag

### Why
`ProjectsGrid.tsx` determines the featured NGAT card by array index: `projects[0]`. If a new project is ever prepended to the `projects` array in `portfolio.ts`, a different project accidentally becomes the featured card without any visual warning or TypeScript error.

### How to Implement
1. Add `featured?: boolean` to the `Project` interface in `src/types/index.ts`.
2. Set `featured: true` on the NGAT project object in `portfolio.ts`.
3. Update `ProjectsGrid.tsx`:
   ```tsx
   const featuredProject = projects.find(p => p.featured) ?? projects[0]
   const standardProjects = projects.filter(p => !p.featured)
   ```
This makes intent explicit and survives reordering.

---

## 9. 🟡 Apply `React.memo` to List-Rendered Leaf Components

### Why
`SkillNode`, `TechBadge`, `MetricItem`, `TimelineNode`, and `ProjectCard` are rendered in arrays. When a parent's state changes — for example, when a different skill node is hovered and `activeSkill` updates — every sibling `SkillNode` re-renders even if its own props haven't changed. The constellation has 30+ nodes, so that's 29 unnecessary re-renders on every hover change.

### How to Implement
Wrap each of these components with `React.memo`:
```tsx
export const SkillNode = React.memo(function SkillNode({ ... }: SkillNodeProps) {
  // unchanged component body
})
```
Ensure that callback props passed to these components (like `onMouseEnter`, `onMouseLeave`) are stable references — wrap them in `useCallback` in the parent if they aren't already.

---

## 10. 🟡 Split `portfolio.ts` into Domain Modules

### Why
`src/data/portfolio.ts` is 1300+ lines and mixes three distinct concerns: content data (project descriptions, skill definitions, bio text), UI configuration (camera keyframes, accent colours, section order), and contact configuration (Formspree endpoint, social URLs). This makes the file difficult to navigate and means unrelated changes (e.g., updating a project description) touch the same file as camera tuning.

### How to Implement
Proposed split:

```
src/data/
  content.ts      — projects, skills, experience, personal, terminal lines
  config.ts       — CAMERA_KEYFRAMES, ACCENT_COLORS, SECTIONS, SECTION_SUBTITLES
  contact.ts      — CONTACT_CONFIG, PERSONAL_DETAILS (email, linkedin, github, resume)
  index.ts        — re-exports everything for backwards-compatible imports
```

All existing import paths (`import { portfolioData } from '../../data/portfolio'`) continue to work via the `index.ts` barrel. No component changes are needed.

---

## 11. 🟡 Fix Skill Node Tooltip Clipping at Right Edge

### Why
Skill nodes positioned near the right edge of the constellation use a tooltip with `zIndex: 10`. The `NavDots` component sits at `--z-nav: 30`. On narrower viewports, right-edge node tooltips can appear behind the navigation dots column. Additionally, the tooltip always opens centered above the node — edge nodes on the right will overflow the viewport.

### How to Implement
1. Raise tooltip `zIndex` to at least `var(--z-overlay)` (20) or higher.
2. Detect edge proximity and flip the tooltip anchor:
   ```tsx
   // In SkillNode.tsx
   const isRightEdge = x > 75  // percentage position
   const tooltipLeft = isRightEdge ? 'auto' : '50%'
   const tooltipRight = isRightEdge ? 0 : 'auto'
   const tooltipTransform = isRightEdge ? 'none' : 'translateX(-50%)'
   ```
3. Similarly handle left-edge nodes (`x < 25`).

---

## 12. 🟡 Standardise `prefers-reduced-motion` Across All GSAP Animations

### Why
`prefers-reduced-motion` is partially respected: skill node CSS animations are disabled, the hero GSAP entrance checks for it, and the terminal scan line stops. However, the GSAP ScrollTrigger entrance animations for Projects, Skills, About, and Contact sections do not check for this preference. Users who have vestibular motion sensitivity settings enabled still receive full stagger and translate animations.

### How to Implement
Add a shared utility in `src/utils/index.ts`:
```ts
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
```
At the top of each `useXxxAnimation` hook, check and skip or simplify:
```ts
if (prefersReducedMotion()) {
  // Make elements immediately visible without animation
  gsap.set('[data-projects]', { autoAlpha: 1 })
  return
}
// ... full GSAP animation setup
```

---

## 13. 🟡 Add `font-display: swap` to Prevent FOIT

### Why
JetBrains Mono is preloaded via `<link rel="preload">` in `index.html`, but there is no `@font-face` declaration with `font-display: swap` in `globals.css`. Without it, some browsers apply FOIT (Flash of Invisible Text) — hiding all text until the font loads. On slow connections this is a visible blank period for the entire page.

### How to Implement
Add to `globals.css`:
```css
@font-face {
  font-family: 'JetBrains Mono';
  src: local('JetBrains Mono');
  font-display: swap;
  font-weight: 400 500;
}
```
Or, if using a CDN (Google Fonts / Bunny Fonts), append `&display=swap` to the font URL and remove the manual preload in favour of the hosted stylesheet.

---

## 14. 🟡 Remove Global `scroll-behavior: smooth`

### Why
`scroll-behavior: smooth` is set globally on `html` and `body` in `globals.css`. This creates conflicts: GSAP's ScrollTrigger calculates scroll positions on the assumption it controls scroll behaviour. The CSS smooth scroll adds an invisible easing on top of JavaScript-driven scroll calls, causing double-smoothing, delayed `scrollY` reporting, and subtle animation timing issues. It also overrides `ScrollTrigger.scrollTo()` with browser-native easing that cannot be customised.

### How to Implement
Remove the `scroll-behavior: smooth` line from `globals.css`. Smooth scrolling for the nav dot clicks is already handled by `useScrollToSection` — verify it uses `element.scrollIntoView({ behavior: 'smooth' })` or equivalent and nothing breaks after removal.

---

## 15. 🟡 Accessibility — ARIA Improvements

### Why
The portfolio currently has several accessibility gaps that would prevent screen reader users from navigating it meaningfully, and could affect Lighthouse accessibility scores which some recruiters use as a signal of code quality.

### How to Implement

**NavDots** (`src/components/ui/NavDots.tsx`)
```tsx
<nav role="navigation" aria-label="Portfolio sections">
  {SECTIONS.map(section => (
    <button
      aria-label={`Go to ${section.label} section`}
      aria-current={activeSection === section.id ? 'true' : undefined}
      ...
    />
  ))}
</nav>
```

**3D Canvas** (`src/components/ui/CanvasWrapper.tsx`)
```tsx
<div aria-hidden="true" role="presentation"> {/* wrap the canvas div */}
```
The 3D canvas is purely decorative — hiding it from the accessibility tree prevents screen readers from announcing WebGL content.

**ProjectModal**
- Add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the project title `id`.
- Trap focus inside the modal when open (use the `focus-trap-react` library or a manual implementation).
- Return focus to the trigger card button when the modal closes.

**ScrollProgressBar**
```tsx
<div role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Page scroll progress" />
```

---

## 16. 🟡 Add Individual `Suspense` Boundaries Per Section

### Why
A single `<Suspense>` wraps all five lazy-loaded sections. This means:
- If any one section is loading, the fallback (`null`) applies to all of them simultaneously.
- A skeleton or shimmer fallback cannot be shown per-section.
- The loading waterfall is sequential — React won't start rendering `Projects` until `Hero` resolves.

Giving each section its own boundary allows them to render independently as each chunk arrives, which feels faster.

### How to Implement
```tsx
{/* In App.tsx */}
<SectionWrapper id="hero">
  <Suspense fallback={<SectionSkeleton />}>
    <Hero />
  </Suspense>
</SectionWrapper>

<SectionWrapper id="projects">
  <Suspense fallback={<SectionSkeleton />}>
    <Projects />
  </Suspense>
</SectionWrapper>
// etc.
```

`SectionSkeleton` can be as simple as a div with the section's minimum height to prevent layout shift.

---

## 17. 🟢 Add a Canonical Link Tag

### Why
Once deployed, search engines may index both `https://yourdomain.com` and `https://yourdomain.com/index.html` as separate pages, causing duplicate content signals that can hurt search ranking.

### How to Implement
```html
<link rel="canonical" href="https://YOUR_DEPLOYED_URL/" />
```
Add this to `index.html` after setting the final Vercel URL.

---

## 18. 🟢 Add `robots.txt` and `sitemap.xml`

### Why
Without a `robots.txt`, search engine crawlers have no guidance on what to index. A `sitemap.xml` helps Google discover the page faster after deployment.

### How to Implement
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://YOUR_DEPLOYED_URL/sitemap.xml
```

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/0.5/sitemap">
  <url>
    <loc>https://YOUR_DEPLOYED_URL/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 19. 🟢 Add `useCallback` to `SkillsConstellation` Mouse Handlers

### Why
`SkillsConstellation.tsx` likely creates new handler functions (onMouseEnter/Leave per node) on every render. If these are inline arrow functions passed as props to `SkillNode`, each render creates 30+ new function references. Combined with the hover state updates that trigger re-renders, this creates a churn loop where hovering one node causes all 30 nodes to receive new prop references.

### How to Implement
In `SkillsConstellation.tsx`, wrap per-node handlers with `useCallback`, keyed by skill name, or use a single delegated handler pattern:
```tsx
const handleMouseEnter = useCallback((name: string) => {
  setHoveredSkill(name)
}, [])

const handleMouseLeave = useCallback(() => {
  setHoveredSkill(null)
}, [])
```
Pass `handleMouseEnter` and `handleMouseLeave` as stable references, with the skill `name` curried or passed as a data attribute.

---

## 20. 🟢 Add a `noreferrer` + `noopener` to all External Links

### Why
External links in `SocialLinks.tsx` (LinkedIn, GitHub, email) likely use `target="_blank"`. Without `rel="noopener noreferrer"`, the opened tab can access the opener's `window` object (a security and privacy concern), and the browser passes the full referrer URL to the external site.

### How to Implement
Ensure every `<a target="_blank">` in the codebase includes:
```tsx
<a href={url} target="_blank" rel="noopener noreferrer">
```
This is a standard, quick audit that can be done with a codebase grep:
```bash
grep -r 'target="_blank"' src/
```

---

## Summary Table

| # | Suggestion | Priority | Effort |
|---|---|---|---|
| 1 | Remove Puppeteer from dependencies | 🔴 Critical | < 5 min |
| 2 | Add `<title>` and SEO/OG meta tags | 🔴 Critical | 30 min |
| 3 | Verify PostProcessing tree-shaking | 🟠 High | 30 min |
| 4 | Add ErrorBoundary around lazy sections | 🟠 High | 1 hr |
| 5 | Centralise useDeviceCapability into Context | 🟠 High | 1 hr |
| 6 | Centralise GSAP plugin registration | 🟠 High | 15 min |
| 7 | Vite manual chunk splitting | 🟠 High | 30 min |
| 8 | Replace index-based featured card with flag | 🟡 Medium | 30 min |
| 9 | Apply React.memo to list-rendered components | 🟡 Medium | 1 hr |
| 10 | Split portfolio.ts into domain modules | 🟡 Medium | 2 hr |
| 11 | Fix skill tooltip clipping at edges | 🟡 Medium | 1 hr |
| 12 | Standardise prefers-reduced-motion | 🟡 Medium | 1 hr |
| 13 | Add font-display: swap | 🟡 Medium | 15 min |
| 14 | Remove global scroll-behavior: smooth | 🟡 Medium | 15 min |
| 15 | Accessibility — ARIA improvements | 🟡 Medium | 2 hr |
| 16 | Individual Suspense per section | 🟡 Medium | 30 min |
| 17 | Add canonical link tag | 🟢 Low | 5 min |
| 18 | Add robots.txt + sitemap.xml | 🟢 Low | 15 min |
| 19 | useCallback for constellation handlers | 🟢 Low | 30 min |
| 20 | Add noopener/noreferrer to external links | 🟢 Low | 15 min |
