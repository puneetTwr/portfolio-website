import * as THREE from 'three'

/**
 * Generates a soft radial glow texture procedurally
 * using an HTML Canvas element.
 * Returns a THREE.Texture with a circular gradient
 * that is opaque at center and transparent at edges.
 * This mimics the CSS radial-gradient / box-shadow
 * appearance in 3D space.
 * @param color - hex color string e.g. '#00ffff'
 * @param size - texture resolution in pixels (power of 2)
 */
export function createGlowTexture(
  color: string,
  size: number = 256
): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const center = size / 2

  // Create a radial gradient from center to edge:
  const gradient = ctx.createRadialGradient(
    center, center, 0,
    center, center, center
  )

  // Parse the hex color to RGB for gradient stops:
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  // Add gradient color stops:
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1.0)`)
  gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.6)`)
  gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`)
  gradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.05)`)
  gradient.addColorStop(1.0, `rgba(${r}, ${g}, ${b}, 0)`)

  // Fill canvas with gradient:
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Create THREE.Texture from canvas:
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
