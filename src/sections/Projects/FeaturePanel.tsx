import { TechBadge } from './TechBadge'

interface FeaturePanelProps {
  title: string
  description: string
  highlights: string[]
  outcomes: string[]
  techStack: string[]
  accentColor: string
  isOpen: boolean
  onToggle: () => void
}

export function FeaturePanel({
  title,
  description,
  highlights,
  techStack,
  accentColor,
  isOpen,
  onToggle,
}: FeaturePanelProps) {
  return (
    <div
      style={{
        border: `0.5px solid ${isOpen ? accentColor + '80' : accentColor + '30'}`,
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '8px',
        transition: 'border-color 0.2s ease',
      }}
    >
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          cursor: 'pointer',
          background: isOpen ? accentColor + '10' : 'transparent',
          transition: 'background 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRight: `1.5px solid ${accentColor}`,
              borderBottom: `1.5px solid ${accentColor}`,
              transform: isOpen ? 'rotate(-135deg)' : 'rotate(-45deg)',
              transition: 'transform 0.25s ease',
              marginTop: isOpen ? '3px' : '0px',
              flexShrink: 0,
            }}
          />
          <h4
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 500,
              color: accentColor,
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            {title}
          </h4>
        </div>
        {!isOpen && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-text-secondary)',
              opacity: 0.7,
            }}
          >
            {highlights.length} highlights
          </div>
        )}
      </div>

      <div
        style={{
          maxHeight: isOpen ? '400px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: isOpen ? '0 14px 14px' : '0 14px',
        }}
      >
        <div
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.25s ease 0.15s',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: '10px',
              marginTop: '4px',
            }}
          >
            {description}
          </p>

          <div style={{ marginBottom: '10px' }}>
            {highlights.map((highlight, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '4px',
                    background: accentColor,
                    borderRadius: '1px',
                    marginTop: '5px',
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {highlight}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {techStack.map((tech) => (
              <TechBadge key={tech} label={tech} accentColor={accentColor} size="small" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
