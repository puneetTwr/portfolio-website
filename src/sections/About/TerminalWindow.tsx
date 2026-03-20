interface TerminalWindowProps {
  children: React.ReactNode
  title?: string
}

export function TerminalWindow({ children, title }: TerminalWindowProps) {
  return (
    <div
      style={{
        width: '100%',
        background: '#020208',
        border: '0.5px solid rgba(0, 255, 255, 0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Title bar — macOS-style chrome */}
      <div
        style={{
          height: '36px',
          background: '#0a0a14',
          borderBottom: '0.5px solid rgba(0, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '8px',
        }}
      >
        {/* Three-dot buttons */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ff5f57',
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ffbd2e',
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#28c840',
            }}
          />
        </div>

        {/* Title — truly centered by offsetting for dot width */}
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.1em',
            marginRight: '52px',
          }}
        >
          {title ?? 'terminal — bash'}
        </div>
      </div>

      {/* Content area with scan line overlay */}
      <div
        style={{
          padding: '20px 24px',
          minHeight: '320px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="terminal-scan" />
        {children}
      </div>
    </div>
  )
}
