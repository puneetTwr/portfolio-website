import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Runs the hero section entrance animation once on mount.
 * Animates all data-hero elements in sequence using GSAP timeline.
 * Returns the GSAP timeline instance for external control if needed.
 */
export function useHeroAnimation(containerRef: React.RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('[data-hero]', { autoAlpha: 1, y: 0, scaleY: 1 })
      return
    }

    const tl = gsap.timeline({ delay: 0.4 })

    tl.fromTo(
      '[data-hero="line"]',
      { scaleY: 0, transformOrigin: 'top center', autoAlpha: 0 },
      { scaleY: 1, autoAlpha: 0.6, duration: 0.8, ease: 'power2.out' }
    )

    tl.fromTo(
      '[data-hero="badge"]',
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo(
      '[data-hero="name"]',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.2'
    )

    tl.fromTo(
      '[data-hero="title"]',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo(
      '[data-hero="tagline"]',
      { autoAlpha: 0, y: 15 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )

    tl.fromTo(
      '[data-hero="stats"]',
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )

    tl.fromTo(
      '[data-hero="cta"]',
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )

    return () => {
      tl.kill()
    }
  }, [containerRef])
}
