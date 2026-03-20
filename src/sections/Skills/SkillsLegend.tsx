const CATEGORIES = [
  { label: 'Frontend', key: 'frontend', color: '#00ffff' },
  { label: 'Backend',  key: 'backend',  color: '#1D9E75' },
  { label: 'Testing',  key: 'testing',  color: '#8b5cf6' },
  { label: 'Mobile',   key: 'mobile',   color: '#ff007f' },
  { label: 'Tools',    key: 'tools',    color: '#888780' },
]

interface SkillsLegendProps {
  activeCategory?: string | null
}

export function SkillsLegend({ activeCategory }: SkillsLegendProps) {
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
      {CATEGORIES.map(({ label, key, color }) => {
        const isActive = activeCategory === key
        const isDimmed = activeCategory !== null && activeCategory !== undefined && !isActive

        return (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: isDimmed ? 0.3 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: color,
                flexShrink: 0,
                boxShadow: isActive ? `0 0 6px ${color}` : 'none',
                transition: 'box-shadow 0.3s ease',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: isActive ? color : 'var(--color-text-secondary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
