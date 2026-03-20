import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { BaseScene, CameraController } from '../../scenes'

interface CanvasWrapperProps {
  children?: React.ReactNode
}

/**
 * CanvasWrapper — fixed fullscreen layer behind all HTML overlay content.
 * Pointer events are disabled on the wrapper so the HTML overlay receives
 * mouse events by default. Re-enable pointer events on individual 3D canvas
 * children as needed for 3D interaction.
 */
export function CanvasWrapper({ children }: CanvasWrapperProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 'var(--z-canvas)' as unknown as number,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => gl.setClearColor('#050510', 1)}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'auto',
        }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <BaseScene />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
