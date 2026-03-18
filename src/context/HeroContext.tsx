import { createContext, useContext, useRef } from 'react'

interface HeroContextType {
  isDragging: React.MutableRefObject<boolean>
}

const HeroContext = createContext<HeroContextType | null>(null)

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const isDragging = useRef(false)
  return (
    <HeroContext.Provider value={{ isDragging }}>
      {children}
    </HeroContext.Provider>
  )
}

export function useHeroContext() {
  const ctx = useContext(HeroContext)
  if (!ctx) throw new Error('useHeroContext must be used within HeroProvider')
  return ctx
}
