import { useState, useEffect, useRef } from 'react'
import { useActiveSection } from './useActiveSection'

/**
 * Detects when the active section changes and
 * returns a brief offset to apply to camera position.
 * The offset decays back to zero quickly.
 * Used to create a micro-turbulence effect on
 * section boundary crossing.
 */
export function useSectionBoundaryShake(): {
  shakeOffset: { x: number; y: number; z: number }
} {
  const { activeSection } = useActiveSection()
  const previousSection = useRef(activeSection)
  const shakeRef = useRef({ x: 0, y: 0, z: 0 })
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    if (previousSection.current === activeSection) return
    previousSection.current = activeSection

    const prefersReducedMotion =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    if (prefersReducedMotion) return

    shakeRef.current = {
      x: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02,
    }
    setShakeOffset({ ...shakeRef.current })

    const startTime = performance.now()
    const decay = () => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / 600, 1)
      const remaining = 1 - progress

      const decayed = {
        x: shakeRef.current.x * remaining,
        y: shakeRef.current.y * remaining,
        z: shakeRef.current.z * remaining,
      }
      setShakeOffset(decayed)

      if (progress < 1) {
        requestAnimationFrame(decay)
      }
    }
    requestAnimationFrame(decay)
  }, [activeSection])

  return { shakeOffset }
}
