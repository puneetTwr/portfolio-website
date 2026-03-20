import { useState, useCallback, useMemo } from 'react'
import { SKILL_CONNECTIONS } from '../utils/constellation'

/**
 * Manages hover state for the skills constellation.
 * Tracks which skill is currently hovered and
 * calculates which nodes and connections are
 * directly connected to the hovered node.
 */
export function useSkillHover(
  _skills: Array<{ name: string }>
): {
  hoveredSkill: string | null
  highlightedNodes: Set<string>
  highlightedConnections: Set<string>
  handleNodeEnter: (name: string) => void
  handleNodeLeave: () => void
} {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const highlightedNodes = useMemo(() => {
    if (!hoveredSkill) return new Set<string>()
    const connected = new Set<string>([hoveredSkill])
    SKILL_CONNECTIONS.forEach(([from, to]) => {
      if (from === hoveredSkill) connected.add(to)
      if (to === hoveredSkill) connected.add(from)
    })
    return connected
  }, [hoveredSkill])

  const highlightedConnections = useMemo(() => {
    if (!hoveredSkill) return new Set<string>()
    const connected = new Set<string>()
    SKILL_CONNECTIONS.forEach(([from, to]) => {
      if (from === hoveredSkill || to === hoveredSkill) {
        connected.add(`${from}-${to}`)
      }
    })
    return connected
  }, [hoveredSkill])

  const handleNodeEnter = useCallback((name: string) => {
    setHoveredSkill(name)
  }, [])

  const handleNodeLeave = useCallback(() => {
    setHoveredSkill(null)
  }, [])

  return {
    hoveredSkill,
    highlightedNodes,
    highlightedConnections,
    handleNodeEnter,
    handleNodeLeave,
  }
}
