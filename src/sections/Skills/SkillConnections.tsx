import { useMemo } from 'react'
import {
  SKILL_CONNECTIONS,
  getConnectionCoords,
  getNodeColor,
} from '../../utils/constellation'

interface SkillConnectionsProps {
  positions: Array<{ x: number; y: number }>
  skills: Array<{ name: string; category: string; level: string }>
  containerWidth: number
  containerHeight: number
  hoveredSkill: string | null
  highlightedConnections: Set<string>
}

export function SkillConnections({
  positions,
  skills,
  containerWidth,
  containerHeight,
  hoveredSkill,
  highlightedConnections,
}: SkillConnectionsProps) {
  const lines = useMemo(() => {
    return SKILL_CONNECTIONS.flatMap(([fromName, toName]) => {
      const fromIndex = skills.findIndex((s) => s.name === fromName)
      const toIndex = skills.findIndex((s) => s.name === toName)

      if (fromIndex === -1 || toIndex === -1) return []

      const fromPos = positions[fromIndex]
      const toPos = positions[toIndex]
      const fromSkill = skills[fromIndex]

      if (!fromPos || !toPos) return []

      const coords = getConnectionCoords(fromPos, toPos, containerWidth, containerHeight)

      return [
        {
          ...coords,
          id: `${fromName}-${toName}`,
          color: getNodeColor(fromSkill.category),
          fromName,
          toName,
        },
      ]
    })
  }, [positions, skills, containerWidth, containerHeight])

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {lines.map((line, index) => {
        const length = Math.sqrt(
          Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2)
        )
        const isHighlighted = highlightedConnections.has(line.id)
        const isDimmed = hoveredSkill !== null && !isHighlighted

        return (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            strokeOpacity={isDimmed ? 0.03 : isHighlighted ? 0.7 : 0.2}
            strokeDasharray={length}
            strokeDashoffset={length}
            data-connection={line.id}
            style={{
              animation: `drawLine 0.8s ease forwards`,
              animationDelay: `${1.5 + index * 0.05}s`,
              transition: 'stroke-opacity 0.3s ease, stroke-width 0.3s ease',
            }}
          />
        )
      })}
    </svg>
  )
}
