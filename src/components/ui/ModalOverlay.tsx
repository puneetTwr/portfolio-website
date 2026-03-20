interface ModalOverlayProps {
  onClose: () => void
  isVisible: boolean
}

export function ModalOverlay({ onClose, isVisible }: ModalOverlayProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 2, 16, 0.85)',
        zIndex: 'var(--z-modal)' as unknown as number,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    />
  )
}
