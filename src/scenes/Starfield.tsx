import { useRef, useMemo, useState, useEffect } from 'react'
import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group, Points, Mesh, BackSide } from 'three'
import { useParallax } from '../hooks/useParallax'

/**
 * Starfield — multi-layered animated space background with scroll parallax.
 *
 * Layer 1: Drei <Stars> in a <group> — barely moves (distant).
 * Layer 2: Custom slow-drifting point cloud — moves more (mid-field).
 * Layer 3: Large BackSide nebula atmosphere sphere — moves most (closest).
 *
 * Parallax offsets are smoothly lerped each frame via useParallax.
 * Drei Stars animation pauses during active scrolling and resumes 150 ms after stop.
 * Particle counts are halved on mobile (< 768 px).
 */
export function Starfield() {
  // Layer refs
  const starsGroupRef = useRef<Group>(null)
  const pointsRef = useRef<Points>(null)
  const atmosphereRef = useRef<Mesh>(null)

  // Configuration
  // Direction of parallax: -1 moves stars UP when scrolling down (normal). 1 moves them DOWN.
  const scrollDirection = 1

  // Performance guard — reduce geometry on mobile
  const isMobile = window.innerWidth < 768
  const particleCount = isMobile ? 80 : 200
  const starCount = isMobile ? 2000 : 5000

  // Pause Drei Stars internal drift while the user is actively scrolling
  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setIsScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsScrolling(false), 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
    }
  }, [])

  // Smoothed parallax offsets — lerped each frame, reads scroll from a live ref
  // [0.08] → Stars group  : barely drifts (very far away)
  // [0.25] → Points mesh  : moves a bit more (mid-field)
  // [0.50] → Atmosphere   : moves most (feels closest)
  const parallax = useParallax([0.08, 0.25, 0.5])

  // Particle positions — uniform sphere distribution via cube-root radius
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 15 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [particleCount])

  // Per-frame: apply parallax offsets + slow ambient rotation on points
  useFrame(() => {
    // Layer 1 — Stars group: parallax y-offset only
    if (starsGroupRef.current) {
      starsGroupRef.current.position.y = parallax[0] * 10 * scrollDirection
    }

    // Layer 2 — Points mesh: ambient rotation + parallax y-offset
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002
      pointsRef.current.rotation.x += 0.0001
      pointsRef.current.position.y = parallax[1] * 10 * scrollDirection
    }

    // Layer 3 — Atmosphere sphere: subtle parallax (large sphere, small offset)
    if (atmosphereRef.current) {
      atmosphereRef.current.position.y = parallax[2] * 5 * scrollDirection
    }
  })

  return (
    <>
      {/* Layer 1 — distant star field via Drei, wrapped in group for parallax */}
      <group ref={starsGroupRef}>
        <Stars
          radius={100}
          depth={50}
          count={starCount}
          factor={4}
          saturation={0.5}
          fade
          speed={isScrolling ? 0 : 0.3}
        />
      </group>

      {/* Layer 2 — custom cyan close-particle cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00ffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Layer 3 — nebula atmosphere: large back-face sphere for edge tint */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial
          color="#0a0020"
          transparent
          opacity={0.4}
          side={BackSide}
        />
      </mesh>
    </>
  )
}
