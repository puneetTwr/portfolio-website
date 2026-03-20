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
}

export function SkillConnections({
  positions,
  skills,
  containerWidth,
  containerHeight,
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
        return (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={0.5}
            strokeOpacity={0.2}
            strokeDasharray={length}
            strokeDashoffset={length}
            data-connection={`${line.fromName}-${line.toName}`}
            style={{
              animation: `drawLine 0.8s ease forwards`,
              animationDelay: `${1.5 + index * 0.05}s`,
            }}
          />
        )
      })}
    </svg>
  )
}
