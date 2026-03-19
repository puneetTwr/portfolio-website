UPDATE PROJECT_PROGRESS.md

Please update the existing PROJECT_PROGRESS.md file located at:
C:\Users\puneet.tanwar\Developer\portfolio-web\PROJECT_PROGRESS.md

Do not rewrite the entire file. Append the following content
to the end of the existing file, preserving everything already there.

---

## Session Checkpoint — Paused Here

### What has been built so far

PHASE 1 — COMPLETE
- Vite + React + TypeScript project scaffolded
- All dependencies installed (Three.js, R3F, Drei, GSAP,
  Postprocessing, Tailwind CSS v4)
- Folder structure established per architecture plan
- src/data/portfolio.ts populated with real content from blueprint
- src/types/index.ts updated with all TypeScript interfaces
- DEVELOPMENT_GUIDELINES.md created and acknowledged
- SECTIONS constant and SectionId type added to portfolio.ts

PHASE 2 — COMPLETE
- Persistent R3F Canvas running behind all sections
- CanvasWrapper, Overlay, SectionWrapper components created
- BaseScene with lights and fog rendering correctly
- Starfield with two layers (Drei Stars + custom points mesh)
- Smooth scroll-driven parallax on starfield — layers move
  at different speeds creating depth effect
- useScrollPosition hook with RAF throttle and passive listener
- useParallax hook with lerp smoothing per layer
- utils/index.ts with lerp, clamp, mapRange, hexToRgb helpers

PHASE 3 — COMPLETE
- HeroObject: glowing icosahedron with cyan wireframe outer mesh,
  purple semi-transparent inner mesh, pulsing emissive glow,
  Float animation, surrounding point lights
- Drag to rotate with inertia — object keeps spinning after release
- Grab cursor on hover (fixed via useRef instead of useState)
- Hover scale effect — object scales up 8% on hover
- Touch support — prevents page scroll during drag
- HeroScene positions object at [0, 0.3, 0]
- HeroText overlay — name, title with blinking cursor, tagline,
  HeroStats with 3 key metrics, CTA buttons, left accent line
- All content from portfolioData.personal — nothing hardcoded
- useHeroAnimation — GSAP staggered entrance animation on load
- ScrollPrompt — scroll indicator fades out when user scrolls
- Mouse parallax — icosahedron drifts toward cursor position
- useMouseTracker updated with smoothX and smoothY values
- useHeroParallax hook with configurable layer multipliers
- HeroContext created to share isDragging ref between components
- Parallax pauses during drag to prevent conflicts

PHASE 4 — COMPLETE
- SECTIONS constant and SectionId type in portfolio.ts
- useActiveSection hook using IntersectionObserver with ratio
  tracking — detects which section is most visible
- useScrollToSection hook for smooth programmatic scrolling
- src/hooks/index.ts barrel export for all hooks
- NavDots component — 5 fixed dots on right edge, active dot
  glows cyan, hover reveals label, click scrolls to section,
  keyboard navigation supported, entrance animation at 2.8s
- Nav dot label font size increased to 12px with padding fix
- ScrollProgressBar — thin neon line at top, fills on scroll,
  color shifts per section (cyan/purple/green/pink), glow pulse
  at 100% scroll, GSAP drives transform for performance

PHASE 5 — IN PROGRESS
- Section height strategy updated to Option 3:
  min-height: max(100vh, 600px) on all sections
  Hero fixed at exactly 100vh with overflow hidden
  100dvh support added for mobile browsers
- Projects section shell started:
  ProjectsHeading component with animated label and title
  ProjectsGrid layout shell with 3 placeholder slots
  useProjectsAnimation with GSAP ScrollTrigger entrance
  icon and abbreviation fields added to Project type
- Icosahedron fly-away on scroll implemented:
  useHeroVisibility hook with HERO_EXIT_START and HERO_EXIT_END
  Object flies upward and backward as user scrolls from hero
  Material opacity fades, scale shrinks, lights fade
  Drag and parallax disabled when visibility < 0.5
  Hero HTML overlay fades with scroll
  All interactions re-enable on scroll back to hero

---

### Known issues resolved
- Tailwind v4 requires @tailwindcss/postcss — already fixed
- Grab cursor needed useRef not useState — already fixed
- Icosahedron overlapping all sections — fixed via fly-away

---

### Deferred feature — icosahedron nav companion
The icosahedron will eventually travel to sit beside the active
nav dot as the user navigates between sections.

Current state: fly-away (Option B) in place as temporary solution.

Implement after: all 5 content sections are fully built.

Performance rules when implementing:
- Disable mouse parallax when not in hero section
- Disable drag and pointer events on mesh when not in hero
- Optionally pause Float animation during travel between dots
- Re-enable all interactions when user returns to hero section

Technical approach:
- Get nav dot screen position via getBoundingClientRect()
- Convert 2D screen coords to 3D world coords via unproject()
- Animate icosahedron group position with lerp in useFrame
- Pause parallax and drag during travel to avoid conflicts
- Handle window resize — recalculate target on resize

---

### Where we stopped

We are paused at Phase 5 Prompt 2.
The Projects section shell exists with placeholder card slots.
The next step is building the actual project cards.

### Resuming instructions
When resuming this project start by:
1. Reading DEVELOPMENT_GUIDELINES.md
2. Reading this file (PROJECT_PROGRESS.md) in full
3. Reading src/data/portfolio.ts to understand content structure
4. Confirming the dev server runs without errors
5. Then await the next prompt for Phase 5 Prompt 2 —
   Project cards base implementation

---

### Plan ahead — remaining phases

PHASE 5 — Projects section (in progress)
  Prompt 5.2: Project cards base — icon placeholder, title,
    role, description, tech stack badges, metrics footer
  Prompt 5.3: Card hover interactions — 3D tilt, glow border,
    detail reveal on hover
  Prompt 5.4: NGAT featured card — larger layout, expandable
    MCS and Geofencing feature panels with toggle
  Prompt 5.5: Metrics strip — 4 glowing impact numbers
    at the bottom of the projects section

PHASE 6 — Skills section
  Prompt 6.1: Node constellation — floating nodes sized by
    proficiency, colored by category, connecting lines
  Prompt 6.2: Hover interactions — highlight connections,
    dim others, show skill label on hover

PHASE 7 — About section
  Prompt 7.1: Holographic terminal panel — typewriter
    animation, green prompt lines, real bio content
  Prompt 7.2: Experience timeline — visual timeline from
    Trainee to Engineer with platform highlights

PHASE 8 — Contact section
  Prompt 8.1: Contact form and social links — neon styled
    inputs, email/LinkedIn/GitHub links, resume download

PHASE 9 — Scroll camera animation
  Prompt 9.1: GSAP ScrollTrigger camera movement — camera
    flies forward through space between sections
  Prompt 9.2: Section entrance animations — staggered reveals
    as camera arrives at each section

PHASE 10 — Post-processing and polish
  Prompt 10.1: Bloom, chromatic aberration, vignette effects
  Prompt 10.2: Mobile responsiveness and performance pass

PHASE 11 — Icosahedron nav companion (deferred feature)
  Full implementation of icosahedron traveling to active
  nav dot with all performance optimizations applied

PHASE 12 — Final content and deployment
  Profile photo and resume PDF added
  Final review and content check
  Deploy to Vercel