import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HeroObject } from '../../scenes/HeroObject'
import { useHeroParallax } from '../../hooks/useHeroParallax'
import { useHeroVisibility } from '../../hooks/useHeroVisibility'
import { HeroProvider, useHeroContext } from '../../context/HeroContext'
import { lerp } from '../../utils'

function HeroSceneContent() {
  const groupRef = useRef<THREE.Group>(null)
  const { offsetX, offsetY } = useHeroParallax()
  const { isDragging } = useHeroContext()
  const { exitProgress, visibility } = useHeroVisibility()

  useFrame(() => {
    if (!groupRef.current) return

    // Parallax
    if (visibility > 0.1 && !isDragging.current) {
      groupRef.current.position.x = lerp(
        groupRef.current.position.x,
        offsetX,
        0.08
      )
    }

    const distanceFromCenter = Math.sqrt(
      offsetX * offsetX + offsetY * offsetY
    )

    // Exit animation — fly away on scroll
    const exitY = exitProgress * 3
    const exitZ = exitProgress * -8
    const exitScale = 1 - exitProgress * 0.95

    groupRef.current.position.y = lerp(
      groupRef.current.position.y,
      isDragging.current ? groupRef.current.position.y : (0.3 + offsetY + exitY),
      0.08
    )

    groupRef.current.position.z = lerp(
      groupRef.current.position.z,
      exitZ + (distanceFromCenter * 0.3),
      0.08
    )

    groupRef.current.scale.setScalar(
      lerp(groupRef.current.scale.x, exitScale, 0.08)
    )
  })

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      <HeroObject isInteractive={visibility > 0.5} exitOpacity={visibility} />
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
