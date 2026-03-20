import { useRef } from 'react'
import { ProjectIcon } from './ProjectIcon'
import { CompanyBadge } from './CompanyBadge'
import { TechBadge } from './TechBadge'
import { useCardTilt } from '../../hooks'

interface ProjectCardProps {
  title: string
  subtitle: string
  role: string
  duration: string
  description: string
  techStack: string[]
  outcomes: string[]
  accentColor: string
  icon: string | null
  abbreviation: string
  projectType: 'professional' | 'personal'
  highlights?: string[]
  featured?: boolean
  onViewDetails: () => void
}

export function ProjectCard({
  title,
  role,
  duration,
  description,
  techStack,
  outcomes,
  accentColor,
  icon,
  abbreviation,
  projectType,
  featured = false,
  onViewDetails,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { transform, transition, isHovered, tiltX, tiltY } = useCardTilt(cardRef, {
    maxTilt: featured ? 5 : 8,
    scale: featured ? 1.01 : 1.02,
    speed: 400,
  })

  return (
    <div
      ref={cardRef}
      style={{
        background: 'var(--color-bg-secondary)',
        border: `0.5px solid ${isHovered ? accentColor + 'aa' : accentColor + '40'}`,
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        pointerEvents: 'auto',
        transform,
        transition: `${transition}, box-shadow 0.3s ease`,
        boxShadow: isHovered
          ? `0 8px 32px ${accentColor}20,
             0 0 0 0.5px ${accentColor}40`
          : 'none',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          height: '3px',
          background: accentColor,
          width: '100%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '6px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(
            circle at ${50 + tiltY * 3}% ${50 - tiltX * 3}%,
            ${accentColor}08 0%,
            transparent 60%
          )`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ padding: '20px 20px 16px', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <ProjectIcon
              icon={icon}
              abbreviation={abbreviation}
              accentColor={accentColor}
              size={featured ? 'large' : 'default'}
            />
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: featured ? '18px' : '15px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: accentColor,
                  margin: '4px 0 0',
                }}
              >
                {role}
              </p>
            </div>
          </div>
          {projectType === 'professional' && <CompanyBadge />}
        </div>

        <div
          style={{
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.08em',
          }}
        >
          {duration}
        </div>

        <div
          style={{
            marginTop: '16px',
            height: '1px',
            background: accentColor,
            opacity: 0.15,
          }}
        />
      </div>

      <div style={{ padding: '16px 20px', flex: 1 }}>
        <div
          style={{
            transition: 'all 0.3s ease',
            marginBottom: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {description}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {techStack.slice(0, 5).map((tech) => (
            <TechBadge key={tech} label={tech} accentColor={accentColor} />
          ))}
          {techStack.length > 5 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--color-text-secondary)',
                padding: '3px 8px',
                opacity: 0.7,
              }}
            >
              +{techStack.length - 5}
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '16px 20px',
          borderTop: `0.5px solid ${accentColor}1A`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginBottom: '16px',
          }}
        >
          {outcomes.map((outcome, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 6px',
              }}
            >
              → {outcome}
            </p>
          ))}
        </div>



        <button
          onClick={onViewDetails}
          style={{
            background: 'transparent',
            border: `0.5px solid ${accentColor}`,
            color: accentColor,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: '2px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'all 0.2s ease',
            width: '100%',
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  )
}
