import { useCountUp } from '../../hooks'

interface MetricItemProps {
  value: string
  label: string
  description: string
  color: string
  isTriggered: boolean
  index: number
  isLast?: boolean
}

export function MetricItem({
  value,
  label,
  description,
  color,
  isTriggered,
  index,
  isLast = false,
}: MetricItemProps) {
  const raw = value.trim()
  const prefix = raw.startsWith('+') ? '+' : raw.startsWith('-') ? '-' : ''
  const withoutPrefix = raw.replace(/^[+-]/, '')
  const suffix = withoutPrefix.endsWith('%') ? '%' : withoutPrefix.endsWith('+') ? '+' : ''
  const numericPart = parseFloat(withoutPrefix.replace(/[^0-9.]/g, ''))

  const animatedNumber = useCountUp(numericPart, 1500 + index * 200, isTriggered)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        position: 'relative',
        flex: 1,
        minWidth: '120px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '2px',
          background: color,
          borderRadius: '1px',
        }}
      />

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 500,
          color: color,
          lineHeight: 1,
          marginBottom: '8px',
          marginTop: '16px',
          letterSpacing: '-0.02em',
        }}
      >
        {prefix}{animatedNumber}{suffix}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '4px',
          textAlign: 'center',
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--color-text-secondary)',
          opacity: 0.6,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>

      {!isLast && (
        <div
          className="metric-divider"
          style={{
            position: 'absolute',
            right: 0,
            top: '20%',
            height: '60%',
            width: '0.5px',
            background: 'var(--color-text-secondary)',
            opacity: 0.15,
          }}
        />
      )}
    </div>
  )
}
