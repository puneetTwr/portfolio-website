import { useState, useEffect } from 'react'
import { Portal } from './Portal'
import { ModalOverlay } from './ModalOverlay'
import { ProjectIcon } from '../../sections/Projects/ProjectIcon'
import { CompanyBadge } from '../../sections/Projects/CompanyBadge'
import { TechBadge } from '../../sections/Projects/TechBadge'
import { FeaturePanel } from '../../sections/Projects/FeaturePanel'
import { useDeviceCapability } from '../../hooks'
import type { Project, ProjectFeature } from '../../types'

// We pass the full Project object here because the modal
// needs all fields. This is an exception to the
// "destructure only what you need" rule because the
// modal is specifically designed to display a complete
// project — passing all fields individually would be
// impractical and harder to maintain.
interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { isMobile } = useDeviceCapability()
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true))
      })
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
        setExpandedFeature(null)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!shouldRender || !project) return null

  return (
    <Portal>
      <ModalOverlay onClose={onClose} isVisible={isVisible} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 'var(--z-modal)' as unknown as number,
          pointerEvents: 'none',
          padding: '20px',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '760px',
            maxHeight: isMobile ? '92vh' : 'calc(100vh - 40px)',
            background: 'var(--color-bg-secondary)',
            border: `0.5px solid ${project.accentColor}60`,
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto',
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
            opacity: isVisible ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <div
            style={{
              padding: '20px 24px 16px',
              borderBottom: `0.5px solid ${project.accentColor}20`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '3px',
                background: project.accentColor,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ProjectIcon
                size="large"
                icon={project.icon}
                abbreviation={project.abbreviation}
                accentColor={project.accentColor}
              />
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: project.accentColor,
                    margin: '4px 0 0',
                  }}
                >
                  {project.role}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-text-secondary)',
                    margin: '2px 0 0',
                  }}
                >
                  {project.duration}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'transparent',
                border: '0.5px solid var(--color-text-secondary)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                fontSize: '16px',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.accentColor
                e.currentTarget.style.color = project.accentColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-text-secondary)'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              ✕
            </button>
          </div>

          <div
            className="modal-scroll"
            style={{
              overflowY: 'auto',
              flex: 1,
              padding: '24px',
            }}
          >
            {project.projectType === 'professional' && (
              <div style={{ marginBottom: '16px' }}>
                <CompanyBadge />
              </div>
            )}

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: project.accentColor,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                opacity: 0.8,
              }}
            >
              // Overview
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              {project.description}
            </p>
            {project.context && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '0',
                  marginTop: 0,
                }}
              >
                {project.context}
              </p>
            )}

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: project.accentColor,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                marginTop: '24px',
                opacity: 0.8,
              }}
            >
              // Tech Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.techStack.map((tech) => (
                <TechBadge key={tech} label={tech} accentColor={project.accentColor} />
              ))}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: project.accentColor,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    marginTop: '24px',
                    opacity: 0.8,
                  }}
                >
                  // What Was Built
                </div>
                <div>
                  {project.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '4px',
                          height: '4px',
                          background: project.accentColor,
                          flexShrink: 0,
                          marginTop: '6px',
                        }}
                      />
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.outcomes && project.outcomes.length > 0 && (
              <>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: project.accentColor,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    marginTop: '24px',
                    opacity: 0.8,
                  }}
                >
                  // Impact
                </div>
                <div>
                  {project.outcomes.map((outcome, i) => {
                    const prefix = '→ '
                    const text = outcome.startsWith(prefix) ? outcome.substring(prefix.length) : outcome
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: project.accentColor,
                            lineHeight: 1.6,
                          }}
                        >
                          →
                        </span>
                        <p
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {text}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {project.features && project.features.length > 0 && (
              <>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: project.accentColor,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    marginTop: '24px',
                    opacity: 0.8,
                  }}
                >
                  // Key Features
                </div>
                <div>
                  {project.features.map((feature: ProjectFeature) => (
                    <FeaturePanel
                      key={feature.title}
                      title={feature.title}
                      description={feature.description}
                      highlights={feature.highlights}
                      outcomes={feature.outcomes}
                      techStack={feature.techStack}
                      accentColor={project.accentColor}
                      isOpen={expandedFeature === feature.title}
                      onToggle={() =>
                        setExpandedFeature(
                          expandedFeature === feature.title ? null : feature.title
                        )
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}
