import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
}

export function Portal({ children }: PortalProps) {
  const elRef = useRef<HTMLDivElement | null>(null)

  if (!elRef.current) {
    if (typeof document !== 'undefined') {
      elRef.current = document.createElement('div')
    }
  }

  useEffect(() => {
    if (!elRef.current) return
    const el = elRef.current
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [])

  if (!elRef.current) return null
  return createPortal(children, elRef.current)
}
