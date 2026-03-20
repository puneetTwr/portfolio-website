import { portfolioData, CONTACT_CONFIG } from '../../data/portfolio'

const GREEN = '#1D9E75'

export function SocialLinks() {
  const links = [
    {
      label: 'Email',
      value: CONTACT_CONFIG.email,
      href: `mailto:${CONTACT_CONFIG.email}`,
      color: 'var(--color-neon-cyan)',
    },
    {
      label: 'LinkedIn',
      value: 'puneet-tanwar',
      href: CONTACT_CONFIG.linkedin,
      color: 'var(--color-neon-purple)',
    },
    {
      label: 'GitHub',
      value: 'github.com/puneet-tanwar',
      href: CONTACT_CONFIG.github,
      color: 'var(--color-text-secondary)',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Personal note */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          &ldquo;Whether you have a project in mind, a role to discuss, or just
          want to connect — my inbox is always open.&rdquo;
        </p>
      </div>

      {/* Direct contact links */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-neon-pink)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            marginTop: 0,
          }}
        >
          // Reach me directly
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '12px 16px',
                border: `0.5px solid ${link.color}30`,
                borderRadius: '4px',
                background: `${link.color}05`,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${link.color}80`
                e.currentTarget.style.background = `${link.color}10`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${link.color}30`
                e.currentTarget.style.background = `${link.color}05`
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: link.color,
                }}
              >
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Resume download */}
      <div
        style={{
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '12px',
            marginTop: 0,
          }}
        >
          // Resume
        </p>

        <a
          href={CONTACT_CONFIG.resumeUrl}
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            border: '0.5px solid var(--color-neon-cyan)',
            borderRadius: '2px',
            color: 'var(--color-neon-cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            pointerEvents: 'auto',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.08)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Download Resume ↓
        </a>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-secondary)',
            opacity: 0.5,
            marginTop: '8px',
            marginBottom: 0,
          }}
        >
          PDF · Updated 2025
        </p>
      </div>

      {/* Availability status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          border: `0.5px solid ${GREEN}4d`,
          borderRadius: '4px',
          background: `${GREEN}0d`,
        }}
      >
        {/* Pulsing green dot */}
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: GREEN,
            flexShrink: 0,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: GREEN,
          }}
        >
          {portfolioData.personal.availability}
        </span>
      </div>

    </div>
  )
}
