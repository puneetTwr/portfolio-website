import { useRef, useState, useCallback } from 'react'
import { ProjectsHeading } from './ProjectsHeading'
import { ProjectsGrid } from './ProjectsGrid'
import { MetricsStrip } from './MetricsStrip'
import { useProjectsAnimation } from './useProjectsAnimation'
import { useModalState } from '../../hooks'
import { ProjectModal } from '../../components/ui/ProjectModal'
import type { Project } from '../../types'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  useProjectsAnimation(sectionRef)

  const { isOpen, openModal, closeModal } = useModalState()
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const handleOpenModal = useCallback((project: Project) => {
    setActiveProject(project)
    openModal()
  }, [openModal])

  const handleCloseModal = useCallback(() => {
    closeModal()
    setTimeout(() => setActiveProject(null), 350)
  }, [closeModal])

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
        <ProjectsGrid onProjectClick={handleOpenModal} />
      </div>
      <MetricsStrip />

      <ProjectModal
        project={activeProject}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
