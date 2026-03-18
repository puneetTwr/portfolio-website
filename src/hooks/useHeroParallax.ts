import { useMouseTracker } from './useMouseTracker'

const PARALLAX_STRENGTH_X = 0.8
const PARALLAX_STRENGTH_Y = 0.5

/**
 * Calculates 3D position offset for the hero icosahedron
 * based on smoothed mouse position.
 * Returns x and y offset values ready to apply to a Three.js group.
 * The effect is intentionally subtle — the object drifts, not flies.
 */
export function useHeroParallax(): { offsetX: number; offsetY: number } {
  const { smoothX, smoothY } = useMouseTracker()

  return {
    offsetX: smoothX * PARALLAX_STRENGTH_X,
    offsetY: smoothY * PARALLAX_STRENGTH_Y,
  }
}
