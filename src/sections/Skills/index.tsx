const PLACEHOLDER_STYLE: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'auto',
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-text-secondary)',
  fontSize: '14px',
  letterSpacing: '0.1em',
}

export default function Skills() {
  return (
    <div style={PLACEHOLDER_STYLE}>
      <p style={LABEL_STYLE}>// skills section</p>
    </div>
  )
}
