import { useRef } from 'react'
import { AboutHeading } from './AboutHeading'
import { TerminalPanel } from './TerminalPanel'
import { ExperienceTimeline } from './ExperienceTimeline'
import { useAboutAnimation } from './useAboutAnimation'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  useAboutAnimation(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'max(100vh, 600px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 8% 80px 8%',
        pointerEvents: 'auto',
      }}
    >
      <AboutHeading />

      <div className="about-grid" style={{ marginTop: '48px' }}>
        <TerminalPanel />
        <ExperienceTimeline />
      </div>
    </section>
  )
}
