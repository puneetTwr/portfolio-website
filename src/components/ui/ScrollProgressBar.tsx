import { useRef, useEffect } from 'react'
import { useActiveSection } from '../../hooks'
import { ACCENT_COLORS } from '../../data/portfolio'
import gsap from 'gsap'

const SECTION_COLORS: Record<string, string> = {
  hero:     ACCENT_COLORS.cyan,
  projects: ACCENT_COLORS.cyan,
  skills:   ACCENT_COLORS.purple,
  about:    ACCENT_COLORS.green,
  contact:  ACCENT_COLORS.pink,
}

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const { activeSection } = useActiveSection()

  useEffect(() => {
    let hasPulsed = false

    const handleScroll = () => {
      if (!barRef.current) return
      
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = totalScrollable > 0 ? window.scrollY / totalScrollable : 0

      // scaleX transforms are fast and bypass layout recalcs
      gsap.to(barRef.current, {
        scaleX: scrollProgress,
        duration: 0.1,
        ease: 'none',
        overwrite: 'auto', // GSAP 3: 'auto' prevents killing boxShadow/background tweens
      })

      // Pulse glow when fully scrolled
      if (scrollProgress >= 0.99) {
        if (!hasPulsed) {
          hasPulsed = true
          gsap.to(barRef.current, {
            boxShadow: '0 0 20px var(--color-neon-cyan), 0 0 40px rgba(0,255,255,0.6)',
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            overwrite: 'auto',
          })
        }
      } else {
        hasPulsed = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Shift section colors
  useEffect(() => {
    if (!barRef.current) return
    const color = SECTION_COLORS[activeSection] ?? ACCENT_COLORS.cyan
    gsap.to(barRef.current, {
      background: color,
      boxShadow: `0 0 8px ${color}, 0 0 16px ${color}40`,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [activeSection])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        zIndex: 'var(--z-nav)' as unknown as number,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--color-neon-cyan)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          boxShadow: '0 0 8px var(--color-neon-cyan), 0 0 16px rgba(0,255,255,0.4)',
        }}
      />
    </div>
  )
}
