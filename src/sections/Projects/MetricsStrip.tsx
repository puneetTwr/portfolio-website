import { useRef, useEffect } from 'react'
import { portfolioData } from '../../data/portfolio'
import { useInView } from '../../hooks'
import { MetricItem } from './MetricItem'
import gsap from 'gsap'

export function MetricsStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(stripRef, 0.3)
  const { metrics } = portfolioData

  useEffect(() => {
    if (!isInView || !stripRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(stripRef.current, { autoAlpha: 1, y: 0 })
      return
    }

    gsap.fromTo(
      stripRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
  }, [isInView])

  return (
    <div
      ref={stripRef}
      style={{
        marginTop: '48px',
        border: '0.5px solid var(--color-text-secondary)',
        borderRadius: '8px',
        overflow: 'hidden',
        opacity: 0.9,
        visibility: 'hidden', // GSAP handles autoAlpha
      }}
    >
      <div
        style={{
          padding: '12px 24px',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--color-neon-cyan)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Measured Impact
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {metrics.map((metric, index) => (
          <MetricItem
            key={metric.id}
            value={metric.value}
            label={metric.label}
            description={metric.description}
            color={metric.color}
            isTriggered={isInView}
            index={index}
            isLast={index === metrics.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
