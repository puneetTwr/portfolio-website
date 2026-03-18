import { Starfield } from './Starfield'

/**
 * BaseScene — persistent 3D scene elements shared across all portfolio sections.
 * Contains all ambient lighting, point lights, fog configuration, and the Starfield.
 * No visible meshes of its own — only environment setup and scene composition.
 */
export function BaseScene() {
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

      {/* Exponential fog — creates depth and fades distant geometry to near-black */}
      <fogExp2 attach="fog" args={['#050510', 0.035]} />

      {/* Permanent starfield background */}
      <Starfield />
    </>
  )
}
