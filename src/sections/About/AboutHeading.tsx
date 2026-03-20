import { SECTION_SUBTITLES } from '../../data/portfolio'

export function AboutHeading() {
  return (
    <div>
      <div
        data-about="heading-label"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'var(--color-neon-cyan)',
          opacity: 0.8,
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        // ABOUT
      </div>

      <h2
        data-about="heading-title"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        The Developer
      </h2>

      <div
        data-about="heading-line"
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--color-neon-cyan)',
          marginTop: '16px',
          opacity: 0.6,
        }}
      />

      <p
        data-about="heading-sub"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          maxWidth: '480px',
          lineHeight: 1.7,
          marginTop: '16px',
          marginBottom: 0,
        }}
      >
        {SECTION_SUBTITLES.about}
      </p>
    </div>
  )
}
