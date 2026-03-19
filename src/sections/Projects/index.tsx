import { useRef } from 'react'
import { ProjectsHeading } from './ProjectsHeading'
import { ProjectsGrid } from './ProjectsGrid'
import { MetricsStrip } from './MetricsStrip'
import { useProjectsAnimation } from './useProjectsAnimation'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  useProjectsAnimation(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 10% 80px 10%',
        pointerEvents: 'auto',
      }}
    >
      <ProjectsHeading />
      <div style={{ marginTop: '48px' }}>
        <ProjectsGrid />
      </div>
      <MetricsStrip />
    </section>
  )
}
