export function CompanyBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '99px',
        border: '0.5px solid var(--color-text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
        opacity: 0.7,
      }}
    >
      Company Project
    </span>
  )
}
