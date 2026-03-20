import { useRef } from 'react'
import { SkillsHeading } from './SkillsHeading'
import { SkillsConstellation } from './SkillsConstellation'
import { SkillsLegend } from './SkillsLegend'
import { useSkillsAnimation } from './useSkillsAnimation'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  useSkillsAnimation(sectionRef)

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
        <SkillsConstellation />
        <SkillsLegend />
      </div>
    </section>
  )
}
