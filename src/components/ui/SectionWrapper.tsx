interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  'data-section'?: string
}

/**
 * SectionWrapper — base full-viewport-height container for every portfolio section.
 * Accepts an `id` for scroll-target anchoring and an optional `data-section`
 * attribute for programmatic scroll detection.
 */
export function SectionWrapper({
  id,
  children,
  className,
  'data-section': dataSection,
}: SectionWrapperProps) {
  return (
    <div
      id={id}
      data-section={dataSection}
      className={className ? `section-full ${className}` : 'section-full'}
      style={{
        minHeight: 'max(100vh, 600px)',
        height: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}
