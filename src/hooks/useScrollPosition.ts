import { useRef, useEffect } from 'react'

/** Live scroll position values kept in a ref — readable inside useFrame without stale closures. */
export interface ScrollPositionRef {
  scrollY: number
  scrollProgress: number
}

/**
 * useScrollPosition — tracks the current window scroll position.
 *
 * Returns a **stable ref object** whose `.current` values are mutated in
 * place on every scroll event (RAF-throttled). Reading from the ref inside
 * R3F's `useFrame` is always fresh — no React re-renders required.
 *
 * @returns A React ref: `{ current: { scrollY, scrollProgress } }`
 */
export function useScrollPosition(): React.RefObject<ScrollPositionRef> {
  const ref = useRef<ScrollPositionRef>({ scrollY: 0, scrollProgress: 0 })

  useEffect(() => {
    let latestScrollY = window.scrollY
    let rafId: number

    const handleScroll = () => {
      latestScrollY = window.scrollY
    }

    const tick = () => {
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight
      ref.current.scrollY = latestScrollY
      ref.current.scrollProgress =
        totalScrollable > 0 ? latestScrollY / totalScrollable : 0
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return ref
}
