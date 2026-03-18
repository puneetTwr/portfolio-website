import { portfolioData } from '../../data/portfolio'

export function HeroStats() {
  const stats = portfolioData.metrics.slice(0, 3)

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
      {stats.map((stat, i) => (
        <div key={stat.id} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 500,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-neon-cyan)',
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div
              style={{
                width: '1px',
                height: '40px',
                backgroundColor: 'var(--color-text-secondary)',
                opacity: 0.3,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
