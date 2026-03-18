import { HeroObject } from '../../scenes'

/**
 * HeroScene — thin wrapper that positions the HeroObject inside the R3F Canvas.
 * Later, this will handle mouse parallax props. For now, it centers the object
 * vertically with a slight offset to leave room for the text overlay.
 */
export function HeroScene() {
  return (
    <group position={[0, 0.3, 0]}>
      <HeroObject />
    </group>
  )
}
