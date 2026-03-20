import { useMemo } from 'react'

/**
 * Detects device capability level and returns
 * flags for feature scaling.
 * Used to disable or simplify heavy features
 * on mobile and low-end devices.
 */
export function useDeviceCapability(): {
  isMobile: boolean
  isLowEnd: boolean
  isHighEnd: boolean
  pixelRatio: number
  recommendedParticleCount: number
  recommendedStarCount: number
} {
  const isMobile = useMemo(
    () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768,
    []
  )

  const pixelRatio = Math.min(window.devicePixelRatio ?? 1, 2)

  const cores = navigator.hardwareConcurrency ?? 4
  const isLowEnd = cores <= 4 || isMobile
  const isHighEnd = cores >= 8 && !isMobile

  const recommendedParticleCount = isLowEnd ? 60 : isHighEnd ? 200 : 120
  const recommendedStarCount = isLowEnd ? 1500 : isHighEnd ? 5000 : 3000

  return {
    isMobile,
    isLowEnd,
    isHighEnd,
    pixelRatio,
    recommendedParticleCount,
    recommendedStarCount,
  }
}
