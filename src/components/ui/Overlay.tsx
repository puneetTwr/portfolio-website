interface OverlayProps {
  children: React.ReactNode
}

/**
 * Overlay — absolute HTML layer that sits on top of the 3D canvas.
 * Pointer events are disabled at this level; individual children must
 * set pointer-events: auto to become interactive.
 */
export function Overlay({ children }: OverlayProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        zIndex: 'var(--z-overlay)' as unknown as number,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  )
}
