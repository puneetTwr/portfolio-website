import { useCallback } from 'react'
import { type SectionId } from '../data/portfolio'

/**
 * Returns a function that smoothly scrolls to any section by id.
 * Uses native smooth scrolling with a fallback for browsers
 * that do not support scroll-behavior: smooth.
 */
export function useScrollToSection(): (sectionId: SectionId) => void {
  const scrollToSection = useCallback((sectionId: SectionId) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Use scrollIntoView with smooth behavior
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  return scrollToSection
}
