import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SECTIONS, type SectionId } from '../../data/portfolio'
import { useActiveSection, useScrollToSection, useDeviceCapability } from '../../hooks'

interface NavLabelProps {
  section: typeof SECTIONS[number]
  isVisible: boolean
}

function NavLabel({ section, isVisible }: NavLabelProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-neon-cyan)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(8px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '4px',
        paddingBottom: '4px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '2px',
      }}
    >
      {section.label}
    </span>
  )
}

interface NavDotProps {
  section: typeof SECTIONS[number]
  isActive: boolean
  isMobile: boolean
}

function NavDot({ isActive, isMobile }: NavDotProps) {
  return (
    <div
      style={{
        width: isActive ? (isMobile ? '8px' : '10px') : '6px',
        height: isActive ? (isMobile ? '8px' : '10px') : '6px',
        borderRadius: '50%',
        background: isActive
          ? 'var(--color-neon-cyan)'
          : 'transparent',
        border: isActive
          ? '1.5px solid var(--color-neon-cyan)'
          : '1px solid var(--color-text-secondary)',
        transition: 'all 0.3s ease',
        boxShadow: isActive
          ? '0 0 8px var(--color-neon-cyan), 0 0 16px rgba(0,255,255,0.3)'
          : 'none',
        flexShrink: 0,
      }}
    />
  )
}

export function NavDots() {
  const { activeSection } = useActiveSection()
  const scrollToSection = useScrollToSection()
  const { isMobile } = useDeviceCapability()
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navRef.current) return
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo(
      navRef.current,
      { autoAlpha: 0, x: 10 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: prefersReducedMotion ? 0 : 2.8,
      }
    )
  }, [])

  return (
    <div
      ref={navRef}
      style={{
        position: 'fixed',
        right: isMobile ? '12px' : '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '16px',
        zIndex: 'var(--z-nav)',
        pointerEvents: 'auto',
        visibility: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '4px',
          top: '0',
          bottom: '0',
          width: '1px',
          background: 'var(--color-text-secondary)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {SECTIONS.map((section) => (
        <div
          key={section.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          onClick={() => scrollToSection(section.id)}
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
          aria-label={`Navigate to ${section.label} section`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToSection(section.id)
            }
          }}
        >
          <NavLabel section={section} isVisible={hoveredSection === section.id} />
          <NavDot section={section} isActive={activeSection === section.id} isMobile={isMobile} />
        </div>
      ))}
    </div>
  )
}
