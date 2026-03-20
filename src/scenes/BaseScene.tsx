import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { lerp } from '../utils'
import { Starfield } from './Starfield'

/**
 * BaseScene — persistent 3D scene elements shared across all portfolio sections.
 * Contains all ambient lighting, point lights, fog configuration, and the Starfield.
 * No visible meshes of its own — only environment setup and scene composition.
 */
export function BaseScene() {
  const { camera } = useThree()
  const trailLightRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (trailLightRef.current) {
      trailLightRef.current.position.x = lerp(
        trailLightRef.current.position.x,
        camera.position.x,
        0.02
      )
      trailLightRef.current.position.y = lerp(
        trailLightRef.current.position.y,
        camera.position.y,
        0.02
      )
      trailLightRef.current.position.z = camera.position.z + 2
    }
  })

  return (
    <>
      {/* Deep-space ambient fill — very dim to keep the scene dark */}
      <ambientLight intensity={0.1} color="#050510" />

      {/* Central cyan accent — subtle glow at the scene origin */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        color="#00ffff"
        distance={20}
      />

      {/* Purple accent fill — upper-right background light */}
      <pointLight
        position={[5, 5, -10]}
        intensity={0.3}
        color="#8b5cf6"
        distance={30}
      />

      {/* Trailing camera light — soft white glow that stays ahead of the camera */}
      <pointLight
        ref={trailLightRef}
        position={[0, 0, 7]}
        intensity={0.3}
        color="#ffffff"
        distance={15}
        decay={2}
      />

      {/* Exponential fog — creates depth and fades distant geometry to near-black */}
      <fogExp2 attach="fog" args={['#050510', 0.035]} />

      {/* Permanent starfield background */}
      <Starfield />
    </>
  )
}
