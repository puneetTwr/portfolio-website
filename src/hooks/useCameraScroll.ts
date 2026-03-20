import { useCallback, useRef } from 'react'
import { useScrollPosition } from './useScrollPosition'
import { CAMERA_KEYFRAMES } from '../data/portfolio'
import { mapRange, clamp } from '../utils'

/**
 * Drives the R3F camera through keyframe positions
 * based on scroll progress. Returns a function to be
 * called inside `useFrame` to avoid re-renders.
 */
export function useCameraScroll() {
  const scrollRef = useScrollPosition()

  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  return useCallback(() => {
    if (prefersReducedMotion.current) {
      return {
        targetPosition: CAMERA_KEYFRAMES[0].position,
        targetRotation: CAMERA_KEYFRAMES[0].rotation,
        targetFov: CAMERA_KEYFRAMES[0].fov,
        targetFogDensity: CAMERA_KEYFRAMES[0].fogDensity,
        targetAmbientIntensity: CAMERA_KEYFRAMES[0].ambientIntensity,
      }
    }

    const scrollProgress = scrollRef.current?.scrollProgress || 0

    const keyframes = [...CAMERA_KEYFRAMES]
    let fromFrame = keyframes[0]
    let toFrame = keyframes[keyframes.length - 1]

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (
        scrollProgress >= keyframes[i].scrollProgress &&
        scrollProgress <= keyframes[i + 1].scrollProgress
      ) {
        fromFrame = keyframes[i]
        toFrame = keyframes[i + 1]
        break
      }
    }

    const localProgress = clamp(
      mapRange(
        scrollProgress,
        fromFrame.scrollProgress,
        toFrame.scrollProgress,
        0,
        1
      ),
      0,
      1
    )

    const eased =
      localProgress < 0.5
        ? 2 * localProgress * localProgress
        : 1 - Math.pow(-2 * localProgress + 2, 2) / 2

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    return {
      targetPosition: {
        x: lerp(fromFrame.position.x, toFrame.position.x, eased),
        y: lerp(fromFrame.position.y, toFrame.position.y, eased),
        z: lerp(fromFrame.position.z, toFrame.position.z, eased),
      },
      targetRotation: {
        x: lerp(fromFrame.rotation.x, toFrame.rotation.x, eased),
        y: lerp(fromFrame.rotation.y, toFrame.rotation.y, eased),
        z: lerp(fromFrame.rotation.z, toFrame.rotation.z, eased),
      },
      targetFov: lerp(fromFrame.fov, toFrame.fov, eased),
      targetFogDensity: lerp(fromFrame.fogDensity, toFrame.fogDensity, eased),
      targetAmbientIntensity: lerp(fromFrame.ambientIntensity, toFrame.ambientIntensity, eased),
    }
  }, [scrollRef])
}
