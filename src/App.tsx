import './styles/globals.css'
import { CanvasWrapper } from './components/ui/CanvasWrapper'
import { Overlay } from './components/ui/Overlay'
import { SectionWrapper } from './components/ui/SectionWrapper'
import { NavDots } from './components/ui/NavDots'
import { ScrollProgressBar } from './components/ui/ScrollProgressBar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import About from './sections/About'
import Contact from './sections/Contact'
import { HeroScene } from './sections/Hero/HeroScene'

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
          <Hero />
        </SectionWrapper>

        <SectionWrapper id="projects" data-section="projects">
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="skills" data-section="skills">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="about" data-section="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="contact" data-section="contact">
          <Contact />
        </SectionWrapper>
      </Overlay>
    </div>
  )
}

export default App
