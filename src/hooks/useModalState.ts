import { useState, useEffect, useCallback } from 'react'

/**
 * Manages modal open/close state and body scroll locking.
 * Handles ESC key to close.
 * Returns open state and handlers for opening and closing.
 */
export function useModalState(): {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
} {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    document.body.style.paddingRight = ''
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeModal])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  return { isOpen, openModal, closeModal }
}
