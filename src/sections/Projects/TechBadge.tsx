interface TechBadgeProps {
  label: string
  accentColor: string
  size?: 'small' | 'default'
}

export function TechBadge({ label, accentColor, size = 'default' }: TechBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        padding: size === 'small' ? '2px 6px' : '3px 8px',
        borderRadius: '2px',
        border: `0.5px solid ${accentColor}`,
        fontFamily: 'var(--font-mono)',
        fontSize: size === 'small' ? '9px' : '10px',
        color: accentColor,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        opacity: 0.85,
      }}
    >
      {label}
    </span>
  )
}
