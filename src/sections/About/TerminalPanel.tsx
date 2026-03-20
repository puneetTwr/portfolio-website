import { useState, useCallback, useEffect, useRef } from 'react'
import { useInView } from '../../hooks'
import { TERMINAL_LINES } from '../../data/portfolio'
import { TerminalWindow } from './TerminalWindow'
import { TerminalLine } from './TerminalLine'

export function TerminalPanel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, 0.3)

  // -1 means no line active yet; 0+ is the active line index
  const [activeLineIndex, setActiveLineIndex] = useState(-1)

  // Start the first line when section scrolls into view
  useEffect(() => {
    if (isInView && activeLineIndex === -1) {
      setActiveLineIndex(0)
    }
  }, [isInView, activeLineIndex])

  // Advance to the next line 300ms after the current one completes
  const handleLineComplete = useCallback((index: number) => {
    setTimeout(() => {
      setActiveLineIndex(index + 1)
    }, 300)
  }, [])

  const allDone = activeLineIndex >= TERMINAL_LINES.length

  return (
    <div
      ref={containerRef}
      data-about="terminal"
      style={{ visibility: 'hidden' }}
    >
      <TerminalWindow title="puneet@portfolio: ~">
        {TERMINAL_LINES.map((line, index) =>
          index <= activeLineIndex ? (
            <TerminalLine
              key={line.command}
              command={line.command}
              output={line.output}
              outputColor={line.outputColor}
              isActive={index === activeLineIndex}
              onComplete={() => handleLineComplete(index)}
              lineIndex={index}
            />
          ) : null
        )}

        {/* Final blinking cursor after all lines complete */}
        {allDone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-neon-cyan)',
              }}
            >
              $
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                background: 'var(--color-neon-cyan)',
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'middle',
              }}
            />
          </div>
        )}
      </TerminalWindow>
    </div>
  )
}
