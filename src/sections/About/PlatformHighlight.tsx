import { TechBadge } from '../Projects/TechBadge'
import type { ExperienceHighlight } from '../../types'

interface PlatformHighlightProps {
  platform: ExperienceHighlight
  accentColor?: string
}

const PURPLE = 'var(--color-neon-purple)'
const CYAN = 'var(--color-neon-cyan)'

export function PlatformHighlight({ platform }: PlatformHighlightProps) {
  return (
    <div
      style={{
        marginBottom: '16px',
        padding: '12px 16px',
        border: '0.5px solid rgba(139, 92, 246, 0.2)',
        borderLeft: `2px solid ${PURPLE}`,
        borderRadius: '0 4px 4px 0',
        background: 'rgba(139, 92, 246, 0.03)',
      }}
    >
      {/* Platform name + duration */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            color: PURPLE,
          }}
        >
          {platform.platform}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-secondary)',
            flexShrink: 0,
          }}
        >
          {platform.duration}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          marginBottom: '10px',
          marginTop: 0,
        }}
      >
        {platform.description}
      </p>

      {/* Contributions — first 3 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
        {platform.contributions.slice(0, 3).map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '1px',
                background: PURPLE,
                flexShrink: 0,
                marginTop: '4px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {c}
            </span>
          </div>
        ))}
      </div>

      {/* Impact metrics */}
      {platform.impact.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        >
          {platform.impact.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: CYAN,
              }}
            >
              → {item}
            </span>
          ))}
        </div>
      )}

      {/* Tech badges — first 4 */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
        {platform.techStack.slice(0, 4).map((tech) => (
          <TechBadge key={tech} label={tech} accentColor={PURPLE} size="small" />
        ))}
      </div>
    </div>
  )
}
