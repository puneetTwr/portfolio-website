import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HeroObject } from '../../scenes'
import { useHeroParallax } from '../../hooks/useHeroParallax'
import { HeroProvider, useHeroContext } from '../../context/HeroContext'
import { lerp } from '../../utils'

function HeroSceneContent() {
  const groupRef = useRef<THREE.Group>(null)
  const { offsetX, offsetY } = useHeroParallax()
  const { isDragging } = useHeroContext()

  useFrame(() => {
    if (!groupRef.current) return
    if (isDragging.current) return

    groupRef.current.position.x = lerp(
      groupRef.current.position.x,
      offsetX,
      0.04
    )
    groupRef.current.position.y = lerp(
      groupRef.current.position.y,
      0.3 + offsetY,
      0.04
    )

    const distanceFromCenter = Math.sqrt(
      offsetX * offsetX + offsetY * offsetY
    )

    groupRef.current.position.z = lerp(
      groupRef.current.position.z,
      distanceFromCenter * 0.3,
      0.04
    )
  })

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      <HeroObject />
    </group>
  )
}

/**
 * HeroScene — thin wrapper that positions the HeroObject inside the R3F Canvas.
 * Handles mouse parallax props and centers the object vertically with a slight 
 * offset to leave room for the text overlay.
 */
export function HeroScene() {
  return (
    <HeroProvider>
      <HeroSceneContent />
    </HeroProvider>
  )
}
