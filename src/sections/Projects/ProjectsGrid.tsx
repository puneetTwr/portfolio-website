import { type CSSProperties, type ReactNode } from 'react'

interface ProjectsGridProps {
  children?: ReactNode
}

export function ProjectsGrid({ children }: ProjectsGridProps) {
  const placeholderStyle: CSSProperties = {
    border: '0.5px dashed var(--color-text-secondary)',
    borderRadius: '6px',
    opacity: 0.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.1em',
    color: 'var(--color-text-secondary)',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
      <div
        data-projects="card-0"
        className="md:row-start-1 md:row-end-3 md:col-start-1"
        style={{ ...placeholderStyle, minHeight: '400px' }}
      >
        NGAT PLACEHOLDER
      </div>
      <div
        data-projects="card-1"
        className="md:row-start-1 md:col-start-2"
        style={{ ...placeholderStyle, minHeight: '300px' }}
      >
        SEKADY PLACEHOLDER
      </div>
      <div
        data-projects="card-2"
        className="md:row-start-2 md:col-start-2"
        style={{ ...placeholderStyle, minHeight: '300px' }}
      >
        IDLA PLACEHOLDER
      </div>
      {children}
    </div>
  )
}
