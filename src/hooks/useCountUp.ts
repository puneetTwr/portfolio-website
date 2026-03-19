import { useState, useEffect, useRef } from 'react'

export function useCountUp(
  target: number,
  duration: number,
  isTriggered: boolean
): string {
  const [displayValue, setDisplayValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const numericValue = Math.abs(parseFloat(String(target)))

    if (!isTriggered) {
      setDisplayValue(0)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayValue(numericValue)
      return
    }

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(eased * numericValue)
      
      setDisplayValue(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, isTriggered])

  return displayValue.toString()
}
