import { useEffect } from 'react'
import { useTypewriter } from '../../hooks'

const COMMAND_SPEED = 35
const COMMAND_DELAY = 200

interface TerminalLineProps {
  command: string
  output: string
  outputColor: string
  isActive: boolean
  onComplete: () => void
  lineIndex: number
}

export function TerminalLine({
  command,
  output,
  outputColor,
  isActive,
  onComplete,
}: TerminalLineProps) {
  const { displayText: typedCommand, isComplete } = useTypewriter(
    command,
    COMMAND_SPEED,
    isActive,
    COMMAND_DELAY
  )

  useEffect(() => {
    if (isComplete) onComplete()
  }, [isComplete, onComplete])

  return (
    <div style={{ marginBottom: '4px' }}>
      {/* Command row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-neon-cyan)',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          $
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-text-primary)',
          }}
        >
          {typedCommand}
        </span>
        {/* Blinking cursor — shows only while this line is actively typing */}
        {isActive && !isComplete && (
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              background: 'var(--color-neon-cyan)',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </div>

      {/* Output row — appears instantly after command finishes */}
      {isComplete && (
        <div
          className="terminal-output"
          style={{
            marginBottom: '16px',
            paddingLeft: '16px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: outputColor,
              lineHeight: 1.5,
            }}
          >
            {output}
          </span>
        </div>
      )}
    </div>
  )
}
