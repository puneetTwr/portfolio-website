import { useState, useEffect, useRef } from 'react'

/**
 * Animates text appearing character by character.
 * Returns the currently visible portion of the text
 * and whether the animation is complete.
 * @param text - the full text to type out
 * @param speed - milliseconds per character
 * @param isActive - whether typing should start
 * @param delay - milliseconds to wait before starting
 */
export function useTypewriter(
  text: string,
  speed: number,
  isActive: boolean,
  delay: number = 0
): {
  displayText: string
  isComplete: boolean
} {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)


  useEffect(() => {
    if (!isActive) return

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayText(text)
      setIsComplete(true)
      return
    }

    setDisplayText('')
    setIsComplete(false)
    indexRef.current = 0

    const startTimer = setTimeout(() => {
      const type = () => {
        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1))
          indexRef.current++
          timerRef.current = setTimeout(type, speed)
        } else {
          setIsComplete(true)
        }
      }
      type()
    }, delay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(timerRef.current)
    }
  }, [isActive, text, speed, delay])

  return { displayText, isComplete }
}
