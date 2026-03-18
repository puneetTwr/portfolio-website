import { HeroText } from './HeroText'
import { ScrollPrompt } from './ScrollPrompt'
import { useHeroVisibility } from '../../hooks'

export default function Hero() {
  const { visibility } = useHeroVisibility()

  return (
    <section
      id="hero"
      className="hero-full"
      style={{
        opacity: visibility,
        transition: 'none',
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        maxHeight: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <HeroText />
      <ScrollPrompt />
    </section>
  )
}
