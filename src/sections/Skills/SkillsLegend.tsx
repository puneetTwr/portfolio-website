const CATEGORIES = [
  { label: 'Frontend', color: '#00ffff' },
  { label: 'Backend',  color: '#1D9E75' },
  { label: 'Testing',  color: '#8b5cf6' },
  { label: 'Mobile',   color: '#ff007f' },
  { label: 'Tools',    color: '#888780' },
]

export function SkillsLegend() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        marginTop: '16px',
        flexWrap: 'wrap',
      }}
    >
      {CATEGORIES.map(({ label, color }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
