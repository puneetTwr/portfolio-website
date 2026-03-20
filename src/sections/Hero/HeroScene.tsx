import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HeroObject } from '../../scenes/HeroObject'
import { useHeroParallax } from '../../hooks/useHeroParallax'
import { useHeroVisibility } from '../../hooks/useHeroVisibility'
import { useHeroLayout } from '../../hooks'
import { HeroProvider, useHeroContext } from '../../context/HeroContext'
import { lerp } from '../../utils'
import { useThree } from '@react-three/fiber'

function HeroSceneContent() {
  const groupRef = useRef<THREE.Group>(null)
  const { offsetX, offsetY } = useHeroParallax()
  const { isDragging } = useHeroContext()
  const { exitProgress, visibility } = useHeroVisibility()
  const { objectPosition, objectScale, isMobile } = useHeroLayout()
  const { camera } = useThree()

  useFrame(() => {
    if (!groupRef.current) return

    const targetCameraY = isMobile ? 0.6 : 0
    camera.position.y = lerp(camera.position.y, targetCameraY, 0.05)

    // Parallax
    if (visibility > 0.1 && !isDragging.current) {
      groupRef.current.position.x = lerp(
        groupRef.current.position.x,
        objectPosition[0] + offsetX,
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
      isDragging.current ? groupRef.current.position.y : (objectPosition[1] + offsetY + exitY),
      0.08
    )

    groupRef.current.position.z = lerp(
      groupRef.current.position.z,
      objectPosition[2] + exitZ + (distanceFromCenter * 0.3),
      0.08
    )

    groupRef.current.scale.setScalar(
      lerp(groupRef.current.scale.x, objectScale * exitScale, 0.08)
    )
  })

  return (
    <group ref={groupRef} position={objectPosition}>
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
