import { useState, useCallback, useRef, useEffect } from 'react'

export function useCardTilt(
  ref: React.RefObject<HTMLDivElement | null>,
  options?: {
    maxTilt?: number
    scale?: number
    speed?: number
  }
): {
  transform: string
  transition: string
  isHovered: boolean
  tiltX: number
  tiltY: number
} {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = (e.clientX - centerX) / (rect.width / 2)
        const mouseY = (e.clientY - centerY) / (rect.height / 2)

        const maxT = options?.maxTilt ?? 8

        setTilt({
          x: -mouseY * maxT,
          y: mouseX * maxT,
        })
      })
    },
    [ref, options?.maxTilt]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (!ref.current) return
    ref.current.addEventListener('mousemove', handleMouseMove)
  }, [ref, handleMouseMove])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    cancelAnimationFrame(rafRef.current)
    if (!ref.current) return
    ref.current.removeEventListener('mousemove', handleMouseMove)
  }, [ref, handleMouseMove])

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const el = ref.current
    if (!el) return

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ref, handleMouseEnter, handleMouseLeave])

  const scaleValue = isHovered ? (options?.scale ?? 1.02) : 1
  const speedValue = options?.speed ?? 400

  return {
    transform: `
      perspective(1000px)
      rotateX(${tilt.x}deg)
      rotateY(${tilt.y}deg)
      scale(${scaleValue})
      translateY(${isHovered ? '-6px' : '0px'})
    `,
    transition: isHovered
      ? `transform ${speedValue}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
      : `transform ${speedValue}ms ease`,
    isHovered,
    tiltX: tilt.x,
    tiltY: tilt.y,
  }
}
