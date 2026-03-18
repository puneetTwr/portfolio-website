import { useState, useEffect, useRef } from 'react'
import { lerp } from '../utils'

/**
 * Tracks normalised mouse position relative to the viewport.
 * Returns raw and smoothed x/y values in range -1 to 1.
 * (0,0) is center, (-1,-1) is top-left, (1,1) is bottom-right.
 * Smoothed values use lerp for gradual interpolation — suitable
 * for parallax effects that need easing.
 */
export function useMouseTracker(): {
  x: number
  y: number
  smoothX: number
  smoothY: number
  isOver: boolean
} {
  const [position, setPosition] = useState({ x: 0, y: 0, smoothX: 0, smoothY: 0 })
  const [isOver, setIsOver] = useState(false)

  const rawX = useRef(0)
  const rawY = useRef(0)
  const smoothXRef = useRef(0)
  const smoothYRef = useRef(0)

  useEffect(() => {
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      rawX.current = (e.clientX / window.innerWidth) * 2 - 1
      rawY.current = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const tick = () => {
      const nextSmoothX = lerp(smoothXRef.current, rawX.current, 0.06)
      const nextSmoothY = lerp(smoothYRef.current, rawY.current, 0.06)

      // Only update state if change is significant to avoid unnecessary re-renders
      if (
        Math.abs(nextSmoothX - smoothXRef.current) > 0.001 ||
        Math.abs(nextSmoothY - smoothYRef.current) > 0.001
      ) {
        smoothXRef.current = nextSmoothX
        smoothYRef.current = nextSmoothY
        
        setPosition({
          x: rawX.current,
          y: rawY.current,
          smoothX: nextSmoothX,
          smoothY: nextSmoothY
        })
      }

      rafId = requestAnimationFrame(tick)
    }

    const handleMouseEnter = () => setIsOver(true)
    const handleMouseLeave = () => setIsOver(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return { ...position, isOver }
}
