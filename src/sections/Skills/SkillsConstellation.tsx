import { useMemo, useRef, useState, useEffect } from 'react'
import { portfolioData } from '../../data/portfolio'
import { generateConstellationPositions } from '../../utils/constellation'
import { SkillNode } from './SkillNode'
import { SkillConnections } from './SkillConnections'

export function SkillsConstellation() {
  const { skills } = portfolioData
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const positions = useMemo(
    () => generateConstellationPositions(skills),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Track real container dimensions via ResizeObserver for SVG coordinate calc
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setDimensions({ width, height })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        minHeight: '500px',
      }}
    >
      {/* Connection lines rendered behind nodes — only once dimensions are known */}
      {dimensions.width > 0 && (
        <SkillConnections
          positions={positions}
          skills={skills}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      )}

      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          name={skill.name}
          category={skill.category}
          level={skill.level}
          x={positions[index]?.x ?? 50}
          y={positions[index]?.y ?? 50}
          index={index}
        />
      ))}
    </div>
  )
}
