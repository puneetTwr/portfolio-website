interface ProjectIconProps {
  icon: string | null
  abbreviation: string
  accentColor: string
  size?: 'default' | 'large'
}

export function ProjectIcon({
  icon,
  abbreviation,
  accentColor,
  size = 'default'
}: ProjectIconProps) {
  const dimension = size === 'large' ? 48 : 40

  if (icon) {
    return (
      <img
        src={icon}
        alt={abbreviation}
        width={dimension}
        height={dimension}
        style={{
          borderRadius: '4px',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        borderRadius: '4px',
        background: `${accentColor}15`,
        border: `0.5px solid ${accentColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: size === 'large' ? '14px' : '12px',
        fontWeight: '500',
        color: accentColor,
        letterSpacing: '0.05em',
      }}
    >
      {abbreviation}
    </div>
  )
}
