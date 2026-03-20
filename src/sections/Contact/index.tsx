import { useRef } from 'react'
import { ContactHeading } from './ContactHeading'
import { ContactForm } from './ContactForm'
import { SocialLinks } from './SocialLinks'
import { useContactAnimation } from './useContactAnimation'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  useContactAnimation(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'max(100vh, 600px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 8% 80px 8%',
        pointerEvents: 'auto',
      }}
    >
      <ContactHeading />

      {/* Personal note between heading and grid */}
      <div
        data-contact="note"
        style={{ marginTop: '32px', marginBottom: '0', visibility: 'hidden' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: 0,
          }}
        >
          Have a project in mind or want to discuss an opportunity? Fill out
          the form or reach out directly through any of the links below.
        </p>
      </div>

      <div className="contact-grid" style={{ marginTop: '32px' }}>
        {/* Form column */}
        <div data-contact="form" style={{ visibility: 'hidden' }}>
          <ContactForm />
        </div>

        {/* Social links column */}
        <div data-contact="social" style={{ visibility: 'hidden' }}>
          <SocialLinks />
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          marginTop: '80px',
          paddingTop: '24px',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-text-secondary)',
            opacity: 0.5,
            margin: 0,
          }}
        >
          © 2025 Puneet Tanwar. Built with React and Three.js.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'transparent',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-neon-cyan)',
            cursor: 'pointer',
            opacity: 0.6,
            letterSpacing: '0.1em',
            transition: 'opacity 0.2s ease',
            pointerEvents: 'auto',
            padding: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}
        >
          Back to top ↑
        </button>
      </div>
    </section>
  )
}
