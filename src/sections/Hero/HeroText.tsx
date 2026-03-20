import { useRef } from 'react'
import { portfolioData } from '../../data/portfolio'
import { HeroStats } from './HeroStats'
import { useHeroAnimation } from './useHeroAnimation'
import { useHeroLayout } from '../../hooks'

export function HeroText() {
  const { textAlign, textMaxWidth, textPadding, isMobile } = useHeroLayout()

  const { personal } = portfolioData
  const containerRef = useRef<HTMLDivElement>(null)

  useHeroAnimation(containerRef)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: isMobile ? 'auto' : 0,
        top: isMobile ? '50%' : 'auto',
        left: 0,
        width: '100%',
        padding: textPadding,
        textAlign,
        pointerEvents: 'none',
      }}
    >
      <div
        data-hero="line"
        style={{
          position: 'absolute',
          left: 'calc(10% - 20px)',
          top: '10%',
          width: '1px',
          height: '60%',
          background: 'linear-gradient(to bottom, transparent, var(--color-neon-cyan), transparent)',
          opacity: 0.6,
          display: isMobile ? 'none' : 'block',
        }}
      />

      <div
        data-hero="badge"
        style={{
          display: 'inline-flex',
          border: '0.5px solid var(--color-neon-cyan)',
          color: 'var(--color-neon-cyan)',
          fontSize: '11px',
          padding: '4px 12px',
          borderRadius: '99px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          marginBottom: '16px',
        }}
      >
        {personal.availability}
      </div>

      <h1
        data-hero="name"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          marginBottom: '12px',
          letterSpacing: '-0.02em',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {personal.name}
      </h1>

      <h2
        data-hero="title"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontWeight: 400,
          color: 'var(--color-neon-cyan)',
          marginBottom: '16px',
          letterSpacing: '0.08em',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {personal.title}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            background: 'var(--color-neon-cyan)',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </h2>

      <p
        data-hero="tagline"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
          fontWeight: 400,
          color: 'var(--color-text-secondary)',
          maxWidth: textMaxWidth,
          margin: isMobile ? '0 auto 24px' : '0 0 24px',
          lineHeight: 1.6,
        }}
      >
        {personal.tagline}
      </p>

      <div data-hero="stats" style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
        <HeroStats />
      </div>

      <div data-hero="cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
        <a
          href="#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            border: '0.5px solid var(--color-neon-cyan)',
            color: 'var(--color-neon-cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            background: 'transparent',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.08)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          View Projects
        </a>

        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            border: '0.5px solid var(--color-neon-purple)',
            color: 'var(--color-neon-purple)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            background: 'transparent',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Contact Me
        </a>
      </div>
    </div>
  )
}
