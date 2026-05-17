import { memo, useState } from 'react'
import type { ExperienceHighlight } from '../../types'
import { PlatformHighlight } from './PlatformHighlight'

interface TimelineNodeProps {
  company: string
  role: string
  duration: string
  location: string
  description: string
  platforms: ExperienceHighlight[]
  isLast: boolean
  nodeIndex: number
}

export const TimelineNode = memo(function TimelineNode({
  company,
  role,
  duration,
  location,
  description,
  platforms,
  isLast,
  nodeIndex,
}: TimelineNodeProps) {
  // First node (Software Engineer) starts expanded
  const [isExpanded, setIsExpanded] = useState(nodeIndex === 0)

  return (
    <div
      data-timeline-node={nodeIndex}
      style={{
        position: 'relative',
        paddingLeft: '32px',
        paddingBottom: isLast ? '0' : '40px',
      }}
    >
      {/* Vertical connecting line — drawn top to bottom */}
      {!isLast && (
        <div
          className="timeline-line"
          style={{
            position: 'absolute',
            left: '9px',
            top: '20px',
            bottom: '0',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--color-neon-purple), rgba(139, 92, 246, 0.1))',
          }}
        />
      )}

      {/* Node dot — fills when expanded */}
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        style={{
          position: 'absolute',
          left: '0',
          top: '8px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          border: '1.5px solid var(--color-neon-purple)',
          background: isExpanded ? 'var(--color-neon-purple)' : '#020208',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isExpanded ? '#020208' : 'var(--color-neon-purple)',
            transition: 'background 0.3s ease',
          }}
        />
      </div>

      {/* Content area */}
      <div>
        {/* Header row — clickable */}
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                marginBottom: '2px',
              }}
            >
              {role}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-neon-purple)',
                marginBottom: '2px',
              }}
            >
              {company} · {location}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.08em',
              }}
            >
              {duration}
            </div>
          </div>

          {/* Rotating chevron */}
          <span
            style={{
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '4px',
              color: 'var(--color-neon-purple)',
              opacity: 0.7,
              transition: 'transform 0.25s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              fontSize: '14px',
              userSelect: 'none',
            }}
          >
            ▾
          </span>
        </div>

        {/* Always-visible description */}
        <p
          style={{
            marginTop: '8px',
            marginBottom: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {/* Expandable platform section */}
        <div
          style={{
            maxHeight: isExpanded ? '800px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            marginTop: isExpanded ? '16px' : '0',
          }}
        >
          {platforms.map((platform) => (
            <PlatformHighlight key={platform.platform} platform={platform} />
          ))}
        </div>
      </div>
    </div>
  )
})
