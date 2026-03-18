import { useState, useEffect } from 'react'

/**
 * Tracks normalised mouse position relative to the viewport.
 * Returns x and y values in the range -1 to 1.
 * (0, 0) is the center of the screen.
 * (-1, -1) is top-left, (1, 1) is bottom-right.
 */
export function useMouseTracker(): { x: number; y: number; isOver: boolean } {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return

      rafId = requestAnimationFrame(() => {
        setPosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        })
        rafId = null
      })
    }

    const handleMouseEnter = () => setIsOver(true)
    const handleMouseLeave = () => setIsOver(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return { ...position, isOver }
}
