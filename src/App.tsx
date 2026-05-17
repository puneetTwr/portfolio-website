import { lazy, Suspense } from 'react'
import './styles/globals.css'
import { CanvasWrapper } from './components/ui/CanvasWrapper'
import { Overlay } from './components/ui/Overlay'
import { SectionWrapper } from './components/ui/SectionWrapper'
import { NavDots } from './components/ui/NavDots'
import { ScrollProgressBar } from './components/ui/ScrollProgressBar'
import { HeroScene } from './sections/Hero/HeroScene'

const Hero = lazy(() => import('./sections/Hero'))
const Projects = lazy(() => import('./sections/Projects'))
const Skills = lazy(() => import('./sections/Skills'))
const About = lazy(() => import('./sections/About'))
const Contact = lazy(() => import('./sections/Contact'))

function App() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        background: 'var(--color-bg-primary)',
      }}
    >
      {/* Layer 1 — 3D canvas (fixed, behind everything). BaseScene renders internally, children append to it. */}
      <CanvasWrapper>
        <HeroScene />
      </CanvasWrapper>

      {/* Layer 2 — HTML overlay (scrollable, sits on top) */}
      <Overlay>
        <ScrollProgressBar />
        <NavDots />

        <SectionWrapper id="hero" data-section="hero">
          <Suspense fallback={null}>
            <Hero />
          </Suspense>
        </SectionWrapper>

        <SectionWrapper id="projects" data-section="projects">
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
        </SectionWrapper>

        <SectionWrapper id="skills" data-section="skills">
          <Suspense fallback={null}>
            <Skills />
          </Suspense>
        </SectionWrapper>

        <SectionWrapper id="about" data-section="about">
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </SectionWrapper>

        <SectionWrapper id="contact" data-section="contact">
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </SectionWrapper>
      </Overlay>
    </div>
  )
}

export default App
