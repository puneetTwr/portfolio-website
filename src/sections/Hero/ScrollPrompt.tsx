import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function ScrollPrompt() {
  const promptRef = useRef<HTMLDivElement>(null)

  // Fade out once user has scrolled more than 80px
  useEffect(() => {
    const handleScroll = () => {
      if (!promptRef.current) return
      const opacity = window.scrollY > 80 ? 0 : 1
      gsap.to(promptRef.current, {
        autoAlpha: opacity,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation — appears after hero text finishes animating
  useEffect(() => {
    if (!promptRef.current) return
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo(
      promptRef.current,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: prefersReducedMotion ? 0 : 2.2,
      }
    )
  }, [])

  return (
    <div
      ref={promptRef}
      style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none',
        visibility: 'hidden',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--color-text-secondary)',
      }}>
        scroll to explore
      </span>

      <div style={{
        width: '1px',
        height: '40px',
        background: 'var(--color-text-secondary)',
        opacity: 0.4,
        animation: 'scrollLine 1.5s ease-in-out infinite',
      }} />

      <div style={{
        width: '6px',
        height: '6px',
        borderRight: '1px solid var(--color-text-secondary)',
        borderBottom: '1px solid var(--color-text-secondary)',
        transform: 'rotate(45deg)',
        opacity: 0.4,
        animation: 'scrollChevron 1.5s ease-in-out infinite',
        animationDelay: '0.2s',
      }} />
    </div>
  )
}
