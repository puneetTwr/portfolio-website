import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Triggers scroll-driven entrance animations for
 * the About section using GSAP ScrollTrigger.
 * Animates heading and both layout columns when
 * the section scrolls into view.
 */
export function useAboutAnimation(
  sectionRef: React.RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('[data-about]', { autoAlpha: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Heading — staggered fade-up, same pattern as Projects and Skills
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      headingTl
        .fromTo(
          '[data-about="heading-label"]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '[data-about="heading-title"]',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '[data-about="heading-line"]',
          { autoAlpha: 0, scaleX: 0, transformOrigin: 'left' },
          { autoAlpha: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '[data-about="heading-sub"]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )

      // Left column — slides in from left
      gsap.fromTo(
        '[data-about="terminal"]',
        { autoAlpha: 0, x: -40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      )

      // Right column — slides in from right with slight delay
      gsap.fromTo(
        '[data-about="timeline"]',
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [sectionRef])
}
