import { useRef } from 'react'
import { portfolioData } from '../../data/portfolio'
import { useSkillHover } from '../../hooks'
import { SkillsHeading } from './SkillsHeading'
import { SkillsConstellation } from './SkillsConstellation'
import { SkillsLegend } from './SkillsLegend'
import { useSkillsAnimation } from './useSkillsAnimation'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  useSkillsAnimation(sectionRef)

  const {
    hoveredSkill,
    highlightedNodes,
    highlightedConnections,
    handleNodeEnter,
    handleNodeLeave,
  } = useSkillHover(portfolioData.skills)

  // Derive the hovered skill's category for legend highlighting
  const hoveredCategory = hoveredSkill
    ? (portfolioData.skills.find((s) => s.name === hoveredSkill)?.category ?? null)
    : null

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'max(100vh, 600px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 5% 80px 5%',
        pointerEvents: 'auto',
      }}
    >
      <SkillsHeading />
      <div style={{ marginTop: '48px' }}>
        <SkillsConstellation
          hoveredSkill={hoveredSkill}
          highlightedNodes={highlightedNodes}
          highlightedConnections={highlightedConnections}
          onNodeEnter={handleNodeEnter}
          onNodeLeave={handleNodeLeave}
        />
        <SkillsLegend activeCategory={hoveredCategory} />
      </div>
    </section>
  )
}
