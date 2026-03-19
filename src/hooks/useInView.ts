import { useState, useEffect } from 'react'

export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  threshold: number = 0.3
): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}
