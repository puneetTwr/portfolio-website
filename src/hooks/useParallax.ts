import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { lerp } from '../utils'
import { useScrollPosition } from './useScrollPosition'

/**
 * useParallax — smoothed, scroll-driven parallax offsets for R3F scene layers.
 *
 * Reads scroll position directly from a ref (no React state, no stale closures)
 * and lerps each layer toward its target value every animation frame.
 *
 * ⚠️ Must be called inside an R3F Canvas context (uses useFrame internally).
 *
 * @param layers - Multiplier per layer (e.g. [0.08, 0.25, 0.5]).
 *                 Higher = more movement = feels closer to camera.
 * @returns Stable array of smoothed offset values updated each frame.
 */
export function useParallax(layers: number[]): number[] {
  const scrollRef = useScrollPosition()
  const smoothed = useRef<number[]>(layers.map(() => 0))

  useFrame(() => {
    const scrollProgress = scrollRef.current?.scrollProgress ?? 0
    for (let i = 0; i < layers.length; i++) {
      const target = scrollProgress * layers[i]
      const current = smoothed.current[i]
      // Performance guard — skip lerp when already at target
      if (Math.abs(target - current) > 0.0001) {
        smoothed.current[i] = lerp(current, target, 0.05)
      }
    }
  })

  return smoothed.current
}
