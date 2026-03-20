import { SECTION_SUBTITLES } from '../../data/portfolio'

export function SkillsHeading() {
  return (
    <div>
      <div
        data-skills="heading-label"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'var(--color-neon-purple)',
          opacity: 0.8,
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        // SKILLS
      </div>

      <h2
        data-skills="heading-title"
        className="neon-glow-purple"
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
        Technical Arsenal
      </h2>

      <div
        data-skills="heading-line"
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--color-neon-purple)',
          marginTop: '16px',
          opacity: 0.6,
        }}
      />

      <p
        data-skills="heading-sub"
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
        {SECTION_SUBTITLES.skills}
      </p>
    </div>
  )
}
