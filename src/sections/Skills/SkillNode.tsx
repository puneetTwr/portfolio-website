import { getNodeSize, getNodeColor } from '../../utils/constellation'

interface SkillNodeProps {
  name: string
  category: string
  level: string
  x: number
  y: number
  index: number
}

export function SkillNode({ name, category, level, x, y, index }: SkillNodeProps) {
  const size = getNodeSize(level)
  const color = getNodeColor(category)
  const dotSize = size * 0.2

  // Unique float timing per node — prevents synchronized movement
  const floatDuration = 3 + (index % 5) * 0.7
  const floatDelay = (index % 8) * -0.4

  const fontSize =
    level === 'primary' ? '11px' :
    level === 'strong'  ? '10px' : '9px'

  const labelColor = level === 'primary' ? color : 'var(--color-text-secondary)'
  const labelOpacity = level === 'primary' ? 1 : level === 'strong' ? 0.8 : 0.6

  return (
    <div
      data-skill-node={name}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'default',
        // Animation owns transform (includes translate(-50%,-50%))
        animation: `nodeFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
        animationFillMode: 'both',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `1px solid ${color}`,
          background: `${color}12`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Ambient glow ring for primary nodes — renders behind border */}
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
              animation: `nodePulse ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
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
        }}
      >
        {name}
      </span>
    </div>
  )
}
