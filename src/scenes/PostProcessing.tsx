// Disabled for performance — see PROJECT_PROGRESS.md
// Can be enabled selectively on high-end devices
// in a future phase if needed

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'

interface PostProcessingProps {
  enabled?: boolean
bloomIntensity?: number
}

export function PostProcessing({
  enabled = true,
  bloomIntensity = 1.0,
}: PostProcessingProps) {
  if (!enabled) return null

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur={true}
        radius={0.8}
      />

      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0008, 0.0008)}
        radialModulation={true}
        modulationOffset={0.15}
      />

      <Vignette
        offset={0.4}
        darkness={0.6}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
