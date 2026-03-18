import { useState, useEffect } from 'react'
import { clamp, mapRange } from '../utils'

const HERO_EXIT_START = 0.08
const HERO_EXIT_END = 0.2

/**
 * Calculates the visibility and transform values for the
 * hero icosahedron based on scroll progress.
 * Returns values from 0 to 1 that drive the exit animation.
 * visibility: 1 = fully visible, 0 = fully gone
 * exitProgress: 0 = at hero, 1 = fully exited
 */
export function useHeroVisibility(): {
  visibility: number
  exitProgress: number
} {
  const [visibilityState, setVisibilityState] = useState({
    visibility: 1,
    exitProgress: 0,
  })

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScrollable =
            document.documentElement.scrollHeight - window.innerHeight
          const scrollProgress =
            totalScrollable > 0 ? window.scrollY / totalScrollable : 0

          const exitProg = clamp(
            mapRange(scrollProgress, HERO_EXIT_START, HERO_EXIT_END, 0, 1),
            0,
            1
          )
          const vis = 1 - exitProg

          setVisibilityState((prev) => {
            if (prev.exitProgress !== exitProg || prev.visibility !== vis) {
              return { visibility: vis, exitProgress: exitProg }
            }
            return prev
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return visibilityState
}
