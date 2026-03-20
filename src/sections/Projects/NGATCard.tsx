import { useState, useRef } from 'react'
import type { ProjectFeature } from '../../types'
import { ProjectIcon } from './ProjectIcon'
import { CompanyBadge } from './CompanyBadge'
import { TechBadge } from './TechBadge'
import { FeaturePanel } from './FeaturePanel'
import { useCardTilt } from '../../hooks'

interface NGATCardProps {
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
  features: ProjectFeature[]
  onViewDetails: () => void
}

export function NGATCard({
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
  features,
  onViewDetails,
}: NGATCardProps) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  const cardRef = useRef<HTMLDivElement>(null)
  const { transform, transition, isHovered, tiltX, tiltY } = useCardTilt(cardRef, {
    maxTilt: 4,
    scale: 1.005,
    speed: 500,
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
        isolation: 'isolate',
        height: '100%',
        pointerEvents: 'auto',
        transform,
        transition,
        boxShadow: isHovered
          ? `0 8px 32px ${accentColor}20, 0 0 0 0.5px ${accentColor}40`
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
          overflow: 'hidden',
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

      <div style={{ padding: '20px 20px 16px', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: accentColor,
            letterSpacing: '0.2em',
            opacity: 0.8,
            marginBottom: '8px',
          }}
        >
          // FEATURED PROJECT
        </div>

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
              size="large"
            />
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '18px',
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

      <div style={{ padding: '0 20px 16px', flex: 1, zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: '16px',
            marginTop: 0,
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            flexWrap: 'wrap',
          }}
        >
          {outcomes.slice(0, 3).map((outcome, idx) => {
            const firstSpaceIdx = outcome.indexOf(' ')
            const value = firstSpaceIdx > -1 ? outcome.substring(0, firstSpaceIdx) : outcome
            const label = firstSpaceIdx > -1 ? outcome.substring(firstSpaceIdx + 1) : ''

            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ color: accentColor, fontWeight: 500 }}>{value}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
                </div>
                {idx < 2 && (
                  <div style={{ width: '1px', height: '12px', background: accentColor, opacity: 0.3 }} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {techStack.map((tech) => (
            <TechBadge key={tech} label={tech} accentColor={accentColor} />
          ))}
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            // KEY FEATURES
          </div>
          {features.map((feature) => (
            <FeaturePanel
              key={feature.title}
              title={feature.title}
              description={feature.description}
              highlights={feature.highlights}
              outcomes={feature.outcomes}
              techStack={feature.techStack}
              accentColor={accentColor}
              isOpen={expandedFeature === feature.title}
              onToggle={() =>
                setExpandedFeature(
                  expandedFeature === feature.title ? null : feature.title
                )
              }
            />
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '16px 20px',
          borderTop: `0.5px solid ${accentColor}1A`,
          zIndex: 1,
        }}
      >
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
            marginTop: '12px',
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  )
}
