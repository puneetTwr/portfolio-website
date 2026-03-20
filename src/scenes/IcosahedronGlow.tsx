import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createGlowTexture } from '../utils/glowTexture'

interface IcosahedronGlowProps {
  exitOpacity: number
  enabled?: boolean
}

export function IcosahedronGlow({ exitOpacity, enabled = true }: IcosahedronGlowProps) {
  // Create the glow textures once
  const glowTexture = useMemo(() => createGlowTexture('#00ffff', 256), [])
  const purpleGlowTexture = useMemo(() => createGlowTexture('#8b5cf6', 256), [])

  const cyanGlowRef = useRef<THREE.SpriteMaterial>(null)
  const purpleGlowRef = useRef<THREE.SpriteMaterial>(null)

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const pulse = 0.5 + Math.sin(elapsed * 1.5) * 0.25

    if (cyanGlowRef.current) {
      cyanGlowRef.current.opacity = pulse * 0.35 * exitOpacity
    }

    if (purpleGlowRef.current) {
      purpleGlowRef.current.opacity = pulse * 0.15 * exitOpacity
    }
  })

  if (!enabled) return null

  // Sprites in Three.js always face the camera automatically
  return (
    <>
      <sprite scale={[4.5, 4.5, 1]}>
        <spriteMaterial
          ref={cyanGlowRef}
          map={glowTexture}
          transparent={true}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      <sprite scale={[7, 7, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent={true}
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      <sprite scale={[3.5, 3.5, 1]}>
        <spriteMaterial
          ref={purpleGlowRef}
          map={purpleGlowTexture}
          transparent={true}
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </>
  )
}
