import { type ReactNode } from 'react'
import { portfolioData } from '../../data/portfolio'
import { ProjectCard } from './ProjectCard'
import { NGATCard } from './NGATCard'
import type { Project } from '../../types'

interface ProjectsGridProps {
  children?: ReactNode
  onProjectClick: (project: Project) => void
}

export function ProjectsGrid({ children, onProjectClick }: ProjectsGridProps) {
  const { projects } = portfolioData

  const mapProjectToProps = (project: typeof projects[0], featured: boolean) => ({
    title: project.title,
    subtitle: project.subtitle,
    role: project.role,
    duration: project.duration,
    description: project.description,
    techStack: project.techStack,
    outcomes: project.outcomes,
    highlights: project.highlights,
    accentColor: project.accentColor,
    icon: project.icon,
    abbreviation: project.abbreviation,
    projectType: project.projectType,
    featured,
  })

  const ngatProject = projects[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
      <div
        data-projects="card-0"
        className="md:row-start-1 md:row-end-3 md:col-start-1 project-card-scroll"
        style={{ overflow: 'hidden', overflowY: 'auto', maxHeight: '100%', borderRadius: '6px', alignSelf: 'start' }}
      >
        <NGATCard
          title={ngatProject.title}
          subtitle={ngatProject.subtitle}
          role={ngatProject.role}
          duration={ngatProject.duration}
          description={ngatProject.description}
          techStack={ngatProject.techStack}
          outcomes={ngatProject.outcomes}
          accentColor={ngatProject.accentColor}
          icon={ngatProject.icon}
          abbreviation={ngatProject.abbreviation}
          projectType={ngatProject.projectType}
          features={ngatProject.features ?? []}
          onViewDetails={() => onProjectClick(ngatProject)}
        />
      </div>
      <div
        data-projects="card-1"
        className="md:row-start-1 md:col-start-2"
        style={{ alignSelf: 'start' }}
      >
        <ProjectCard {...mapProjectToProps(projects[1], false)} onViewDetails={() => onProjectClick(projects[1] as Project)} />
      </div>
      <div
        data-projects="card-2"
        className="md:row-start-2 md:col-start-2"
        style={{ alignSelf: 'start' }}
      >
        <ProjectCard {...mapProjectToProps(projects[2], false)} onViewDetails={() => onProjectClick(projects[2] as Project)} />
      </div>
      {children}
    </div>
  )
}
