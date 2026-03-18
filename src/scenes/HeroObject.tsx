import { useRef, useCallback, useEffect } from 'react'
import { type ThreeEvent, useFrame } from '@react-three/fiber'
import { useHeroContext } from '../context/HeroContext'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { ACCENT_COLORS } from '../data/portfolio'
import { lerp } from '../utils'

/**
 * HeroObject — the signature glowing icosahedron for the hero section.
 * Features a wireframe outer cage and a solid, emissive inner core.
 * Floats gently using Drei's Float component.
 * Includes drag-to-rotate interactions, hover scaling, and pulsing emissive.
 */
interface HeroObjectProps {
  isInteractive: boolean
  exitOpacity: number
}

export function HeroObject({ isInteractive, exitOpacity }: HeroObjectProps) {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const light1Ref = useRef<THREE.PointLight>(null)
  const light2Ref = useRef<THREE.PointLight>(null)

  // Interaction State
  const { isDragging } = useHeroContext()
  const previousPointer = useRef({ x: 0, y: 0 })
  const dragRotation = useRef({ x: 0, y: 0 })
  const dragVelocity = useRef({ x: 0, y: 0 })
  const isHovered = useRef(false)
  const targetScale = useRef(1)

  // === Pointer Event Handlers ===
  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!isInteractive) return
    e.stopPropagation()
    isDragging.current = true
    previousPointer.current = { x: e.clientX, y: e.clientY }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }, [isInteractive])

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!isInteractive || !isDragging.current) return
    const deltaX = e.clientX - previousPointer.current.x
    const deltaY = e.clientY - previousPointer.current.y
    const sensitivity = 0.005
    dragRotation.current.y += deltaX * sensitivity
    dragRotation.current.x += deltaY * sensitivity
    previousPointer.current = { x: e.clientX, y: e.clientY }
  }, [isInteractive])

  const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    isDragging.current = false
    try {
      ;(e.target as Element).releasePointerCapture(e.pointerId)
    } catch (err) {
      // Ignore errors if pointer capture was already lost
    }
  }, [])

  const handlePointerOver = useCallback(() => {
    if (!isInteractive) return
    isHovered.current = true
  }, [isInteractive])

  const handlePointerOut = useCallback(() => {
    isHovered.current = false
  }, [])

  // === Touch scroll prevention ===
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    const preventScroll = (e: TouchEvent) => {
      if (isDragging.current) e.preventDefault()
    }

    canvas.addEventListener('touchmove', preventScroll, { passive: false })
    return () => canvas.removeEventListener('touchmove', preventScroll)
  }, [])

  // === Animation Loop ===
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()

    if (groupRef.current && outerRef.current && innerRef.current) {
      // 1. Rotation Logic (Drag vs Auto)
      if (isDragging.current) {
        const prevRotX = groupRef.current.rotation.x
        const prevRotY = groupRef.current.rotation.y

        groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, dragRotation.current.x, 0.15)
        groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, dragRotation.current.y, 0.15)

        dragVelocity.current.x = groupRef.current.rotation.x - prevRotX
        dragVelocity.current.y = groupRef.current.rotation.y - prevRotY
      } else {
        dragVelocity.current.x *= 0.95 // Friction
        dragVelocity.current.y *= 0.95

        groupRef.current.rotation.x += dragVelocity.current.x
        groupRef.current.rotation.y += dragVelocity.current.y

        groupRef.current.rotation.y += 0.003
        groupRef.current.rotation.x += 0.001
        
        innerRef.current.rotation.y -= 0.002
        innerRef.current.rotation.x += 0.0015
        
        // Sync dragRotation to current so next drag starts smoothly
        dragRotation.current.x = groupRef.current.rotation.x
        dragRotation.current.y = groupRef.current.rotation.y
      }

      // 2. Pulsing Glow (Breathing effect)
      const outerMat = outerRef.current.material as THREE.MeshStandardMaterial
      const innerMat = innerRef.current.material as THREE.MeshStandardMaterial
      outerMat.emissiveIntensity = 0.8 + Math.sin(elapsed * 1.5) * 0.6

      // Fade materials
      outerMat.opacity = lerp(outerMat.opacity, exitOpacity * 0.9, 0.1)
      innerMat.opacity = lerp(innerMat.opacity, exitOpacity * 0.15, 0.1)

      // Fade lights
      if (light1Ref.current && light2Ref.current) {
        light1Ref.current.intensity = lerp(light1Ref.current.intensity, exitOpacity * 0.8, 0.1)
        light2Ref.current.intensity = lerp(light2Ref.current.intensity, exitOpacity * 0.5, 0.1)
      }

      // 3. Cursor Update Logic
      if (!isInteractive) {
        document.body.style.cursor = 'default'
      } else if (isDragging.current) {
        document.body.style.cursor = 'grabbing'
      } else if (isHovered.current) {
        document.body.style.cursor = 'grab'
      } else {
        document.body.style.cursor = 'default'
      }

      // 4. Hover Scale
      targetScale.current = isHovered.current ? 1.08 : 1.0
      const currentScale = groupRef.current.scale.x
      const newScale = lerp(currentScale, targetScale.current, 0.08)
      groupRef.current.scale.setScalar(newScale)
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.8}
      floatingRange={[-0.15, 0.15]}
    >
      <pointLight ref={light1Ref} position={[2, 2, 2]} intensity={0.8} color={ACCENT_COLORS.cyan} distance={8} />
      <pointLight ref={light2Ref} position={[-2, -1, -2]} intensity={0.5} color={ACCENT_COLORS.purple} distance={8} />

      <group ref={groupRef}>
        {/* Invisible Interaction Hitbox */}
        <mesh
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOut={handlePointerUp} // Also stop dragging if pointer leaves canvas unexpectedly
          onPointerOver={handlePointerOver}
          onPointerLeave={handlePointerOut}
        >
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
        </mesh>

        {/* Layer 1 — Outer wireframe cage */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial
            color="#000000"
            emissive={ACCENT_COLORS.cyan}
            emissiveIntensity={0.8}
            wireframe={true}
            transparent={true}
            opacity={0.9}
          />
        </mesh>

        {/* Layer 2 — Inner solid glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color={ACCENT_COLORS.purple}
            emissive={ACCENT_COLORS.purple}
            emissiveIntensity={0.4}
            transparent={true}
            opacity={0.15}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
    </Float>
  )
}
