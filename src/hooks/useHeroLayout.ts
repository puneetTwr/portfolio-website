import { useState, useEffect } from 'react'
import type { HeroLayoutConfig } from '../types'

const BREAKPOINT_MOBILE = 768
const BREAKPOINT_MEDIUM = 1024

const LARGE_LAYOUT: HeroLayoutConfig = {
  objectPosition: [2.2, 0.3, 0],
  objectScale: 1.0,
  textAlign: 'left',
  textPosition: 'left',
  textMaxWidth: '45%',
  textPadding: '0 0 12vh 8%',
  isMobile: false,
  isMedium: false,
}

const MEDIUM_LAYOUT: HeroLayoutConfig = {
  objectPosition: [1.6, 0.2, 0],
  objectScale: 0.75,
  textAlign: 'left',
  textPosition: 'left',
  textMaxWidth: '50%',
  textPadding: '0 0 12vh 6%',
  isMobile: false,
  isMedium: true,
}

const MOBILE_LAYOUT: HeroLayoutConfig = {
  objectPosition: [0, 1.2, 0],
  objectScale: 0.65,
  textAlign: 'center',
  textPosition: 'bottom-center',
  textMaxWidth: '100%',
  textPadding: '0 6% 10vh 6%',
  isMobile: true,
  isMedium: false,
}

const getLayout = (width: number): HeroLayoutConfig => {
  if (width < 375) return { ...MOBILE_LAYOUT, objectScale: 0.5 }
  if (width < BREAKPOINT_MOBILE) return MOBILE_LAYOUT
  if (width < BREAKPOINT_MEDIUM) return MEDIUM_LAYOUT
  return LARGE_LAYOUT
}

export function useHeroLayout(): HeroLayoutConfig {
  const [layout, setLayout] = useState<HeroLayoutConfig>(() =>
    getLayout(typeof window !== 'undefined' ? window.innerWidth : 1440)
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new ResizeObserver(() => {
      setLayout(getLayout(window.innerWidth))
    })

    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  return layout
}
