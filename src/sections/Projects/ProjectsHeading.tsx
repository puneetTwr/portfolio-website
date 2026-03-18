export function ProjectsHeading() {
  return (
    <div>
      <div
        data-projects="heading-label"
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
        // PROJECTS
      </div>

      <h2
        data-projects="heading-title"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        Featured Work
      </h2>

      <div
        data-projects="heading-line"
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--color-neon-cyan)',
          marginTop: '16px',
          opacity: 0.6,
        }}
      />

      <p
        data-projects="heading-sub"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          maxWidth: '480px',
          lineHeight: 1.7,
          marginTop: '16px',
        }}
      >
        Production-grade applications built across logistics,
        construction finance, and dispatch management.
      </p>
    </div>
  )
}
