import { useState, useEffect, useRef } from 'react'
import { SECTIONS, type SectionId } from '../data/portfolio'

/**
 * Detects which portfolio section is currently active based on
 * scroll position using IntersectionObserver.
 * Returns the id of the currently visible section and its index.
 * Updates reactively as the user scrolls between sections.
 */
export function useActiveSection(): {
  activeSection: SectionId
  activeSectionIndex: number
} {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const ratios = useRef<Record<string, number>>({})

  useEffect(() => {
    const observedIds = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.intersectionRatio
        })

        const topSection = SECTIONS.reduce((best, section) => {
          const ratio = ratios.current[section.id] ?? 0
          const bestRatio = ratios.current[best.id] ?? 0
          return ratio > bestRatio ? section : best
        }, SECTIONS[0])

        setActiveSection(topSection.id)
        setActiveSectionIndex(topSection.index)
      },
      {
        threshold: 0.4,
        rootMargin: '0px',
      }
    )

    const observeSections = () => {
      SECTIONS.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element && !observedIds.has(id)) {
          observer.observe(element)
          observedIds.add(id)
        }
      })
    }

    observeSections()

    const mutationObserver = new MutationObserver(observeSections)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return { activeSection, activeSectionIndex }
}
