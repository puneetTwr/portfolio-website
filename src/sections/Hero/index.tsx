import { HeroText } from './HeroText'
import { ScrollPrompt } from './ScrollPrompt'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <HeroText />
      <ScrollPrompt />
    </section>
  )
}
