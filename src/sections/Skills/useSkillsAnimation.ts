import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Triggers scroll-driven entrance animations for the
 * Skills section using GSAP ScrollTrigger.
 * Animates heading elements and constellation nodes
 * when the section scrolls into view.
 */
export function useSkillsAnimation(
  sectionRef: React.RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('[data-skills]', { autoAlpha: 1 })
      gsap.set('[data-skill-node]', { autoAlpha: 1, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Heading animation — same pattern as Projects section
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      headingTl
        .fromTo(
          '[data-skills="heading-label"]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '[data-skills="heading-title"]',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '[data-skills="heading-line"]',
          { autoAlpha: 0, scaleX: 0, transformOrigin: 'left' },
          { autoAlpha: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '[data-skills="heading-sub"]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )

      // Constellation entrance — nodes fade in from center outward
      // NOTE: We only animate autoAlpha (opacity + visibility) here.
      // The CSS nodeFloat keyframe owns the transform property.
      // If we animated scale here, GSAP would write an inline transform
      // that overrides the CSS animation (inline style > CSS animation cascade).
      gsap.fromTo(
        '[data-skill-node]',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: {
            amount: 1.2,
            from: 'center',
          },
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
