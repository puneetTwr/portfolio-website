import { useState, useRef } from 'react'
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
  highlights,
  featured = false,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
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
            marginBottom: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {isExpanded
            ? description
            : description.length > 120
              ? description.slice(0, 120) + '...'
              : description}
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
            maxHeight: isExpanded ? '400px' : isHovered ? '200px' : '52px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            marginBottom: '12px',
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
                opacity: (isExpanded || isHovered) ? 1 : i < 2 ? 1 : 0,
                transform: (isExpanded || (isHovered && i >= 2))
                  ? 'translateY(0)'
                  : i < 2 ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`,
              }}
            >
              → {outcome}
            </p>
          ))}
        </div>

        <div
          style={{
            maxHeight: isExpanded ? '300px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            marginTop: isExpanded ? '16px' : '0',
            marginBottom: isExpanded ? '16px' : '0',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: accentColor,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            opacity: isExpanded ? 1 : 0,
            transition: 'opacity 0.3s ease 0.1s',
          }}>
            // Highlights
          </p>

          {highlights?.map((highlight, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '6px',
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded
                  ? 'translateY(0)'
                  : 'translateY(6px)',
                transition: `opacity 0.3s ease ${0.1 + i * 0.05}s, transform 0.3s ease ${0.1 + i * 0.05}s`,
              }}
            >
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '1px',
                background: accentColor,
                flexShrink: 0,
                marginTop: '5px',
              }} />
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                margin: 0,
              }}>
                {highlight}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: isExpanded ? `${accentColor}15` : 'transparent',
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
          {isExpanded ? 'Show Less ↑' : 'View Details →'}
        </button>
      </div>
    </div>
  )
}
