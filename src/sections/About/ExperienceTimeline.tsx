import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../../hooks'
import { portfolioData } from '../../data/portfolio'
import { TimelineNode } from './TimelineNode'

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, 0.2)

  useEffect(() => {
    if (!isInView) return

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('[data-timeline-node]', { autoAlpha: 1, y: 0 })
      document.querySelectorAll('.timeline-line').forEach((el) =>
        el.classList.add('visible')
      )
      return
    }

    gsap.fromTo(
      '[data-timeline-node]',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.2,
      }
    )

    // Draw timeline lines after nodes start appearing
    setTimeout(() => {
      document.querySelectorAll('.timeline-line').forEach((el) =>
        el.classList.add('visible')
      )
    }, 300)
  }, [isInView])

  return (
    <div
      ref={containerRef}
      data-about="timeline"
      style={{ visibility: 'hidden' }}
    >
      {/* Section label */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--color-neon-purple)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          marginTop: 0,
          opacity: 0.8,
        }}
      >
        // Experience
      </p>

      {/* Experience nodes */}
      {portfolioData.experience.map((exp, index) => (
        <TimelineNode
          key={exp.company + exp.role}
          company={exp.company}
          role={exp.role}
          duration={exp.duration}
          location={exp.location}
          description={exp.description}
          platforms={exp.platforms}
          isLast={false}
          nodeIndex={index}
        />
      ))}

      {/* Education — static endpoint, not expandable */}
      <div
        style={{
          position: 'relative',
          paddingLeft: '32px',
        }}
      >
        {/* Filled purple dot — static, no interaction */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '8px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            border: '1.5px solid var(--color-neon-purple)',
            background: 'rgba(139, 92, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-neon-purple)',
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              marginBottom: '2px',
            }}
          >
            B.Tech Computer Science
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-neon-purple)',
              marginBottom: '2px',
            }}
          >
            SKIT, Jaipur
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.08em',
            }}
          >
            2019 – 2023
          </div>
        </div>
      </div>
    </div>
  )
}
