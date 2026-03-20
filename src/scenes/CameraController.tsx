import { useFrame, useThree } from '@react-three/fiber'
import { useCameraScroll, useSectionBoundaryShake } from '../hooks'
import { lerp } from '../utils'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export function CameraController() {
  const { camera, scene } = useThree()
  const getCameraTargets = useCameraScroll()
  const { shakeOffset } = useSectionBoundaryShake()

  const ambientLightRef = useRef<THREE.AmbientLight | null>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.AmbientLight && !ambientLightRef.current) {
        ambientLightRef.current = child
      }
    })
  }, [scene])

  useFrame(() => {
    const {
      targetPosition,
      targetRotation,
      targetFov,
      targetFogDensity,
      targetAmbientIntensity,
    } = getCameraTargets()

    // Camera position lerp with shake additive
    camera.position.x = lerp(camera.position.x, targetPosition.x + shakeOffset.x, 0.05)
    camera.position.y = lerp(camera.position.y, targetPosition.y + shakeOffset.y, 0.05)
    camera.position.z = lerp(camera.position.z, targetPosition.z + shakeOffset.z, 0.05)

    // Camera rotation lerp
    camera.rotation.x = lerp(camera.rotation.x, targetRotation.x, 0.05)
    camera.rotation.y = lerp(camera.rotation.y, targetRotation.y, 0.05)
    camera.rotation.z = lerp(camera.rotation.z, targetRotation.z, 0.05)

    // FOV lerp
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = lerp(camera.fov, targetFov, 0.05)
      camera.updateProjectionMatrix()
    }

    // Fog lerp
    if (scene.fog && 'density' in scene.fog) {
      const fog = scene.fog as THREE.FogExp2
      fog.density = lerp(fog.density, targetFogDensity, 0.03)
    }

    // Ambient light lerp
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = lerp(
        ambientLightRef.current.intensity,
        targetAmbientIntensity,
        0.03
      )
    }
  })

  return null
}
