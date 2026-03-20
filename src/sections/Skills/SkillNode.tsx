import { getNodeSize, getNodeColor } from '../../utils/constellation'

interface SkillNodeProps {
  name: string
  category: string
  level: string
  x: number
  y: number
  index: number
  isHovered: boolean
  isDimmed: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function SkillNode({
  name,
  category,
  level,
  x,
  y,
  index,
  isHovered,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: SkillNodeProps) {
  const size = getNodeSize(level)
  const color = getNodeColor(category)
  const dotSize = size * 0.2

  // Unique float timing per node — prevents synchronized movement
  const floatDuration = 3 + (index % 5) * 0.7
  const floatDelay = (index % 8) * -0.4

  const fontSize =
    level === 'primary' ? '11px' :
    level === 'strong'  ? '10px' : '9px'

  const labelColor =
    isHovered ? color :
    level === 'primary' ? color : 'var(--color-text-secondary)'

  const labelOpacity =
    isDimmed ? 0.15 :
    isHovered ? 1 :
    level === 'primary' ? 1 :
    level === 'strong' ? 0.8 : 0.6

  return (
    <div
      data-skill-node={name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        // CRITICAL: transform is owned by nodeFloat CSS keyframe.
        // GSAP must never animate transform on this element.
        animation: `nodeFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
        animationFillMode: 'both',
        // Hover effects: opacity and filter ONLY — never transform
        opacity: isDimmed ? 0.15 : 1,
        filter: isHovered ? `drop-shadow(0 0 8px ${color})` : 'none',
        transition: 'opacity 0.3s ease, filter 0.3s ease',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: isHovered ? `1.5px solid ${color}` : `1px solid ${color}`,
          background: isHovered ? `${color}25` : `${color}12`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
          boxShadow: isHovered
            ? `0 0 12px ${color}60, inset 0 0 8px ${color}20`
            : 'none',
          transition: 'background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Ambient glow ring — primary nodes only */}
        {level === 'primary' && (
          <div
            style={{
              position: 'absolute',
              width: size * 1.6,
              height: size * 1.6,
              borderRadius: '50%',
              background: `${color}08`,
              border: `0.5px solid ${color}20`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              animation: `nodePulse ${isHovered ? floatDuration * 0.5 : floatDuration}s ease-in-out ${floatDelay}s infinite`,
            }}
          />
        )}

        {/* Inner filled dot — primary nodes only */}
        {level === 'primary' && (
          <div
            style={{
              position: 'absolute',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: color,
              opacity: 0.6,
              animation: `nodePulse ${floatDuration * 0.8}s ease-in-out ${floatDelay}s infinite`,
            }}
          />
        )}
      </div>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize,
          color: labelColor,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          pointerEvents: 'none',
          opacity: labelOpacity,
          lineHeight: 1,
          fontWeight: isHovered ? 500 : 400,
          transition: 'color 0.2s ease, opacity 0.3s ease',
        }}
      >
        {name}
      </span>

      {/* Tooltip — separate child so transform: translateX(-50%) is safe here */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: `calc(100% + 8px)`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-bg-secondary)',
            border: `0.5px solid ${color}`,
            borderRadius: '4px',
            padding: '6px 10px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              color: color,
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
        </div>
      )}
    </div>
  )
}
