/**
 * Generates a seeded pseudo-random number between 0 and 1.
 * Same seed always produces same sequence.
 * Used to create deterministic organic layouts.
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/**
 * Checks if a new position is far enough from all
 * existing positions to prevent node overlap.
 */
export function isFarEnough(
  x: number,
  y: number,
  existing: Array<{ x: number; y: number }>,
  minDistance: number
): boolean {
  return existing.every((pos) => {
    const dx = x - pos.x
    const dy = y - pos.y
    return Math.sqrt(dx * dx + dy * dy) > minDistance
  })
}

/**
 * Generates constellation positions for all skill nodes.
 * Primary nodes near center, strong in middle ring,
 * familiar toward edges. Always produces identical layout.
 * @param skills - array of skills from portfolioData
 * @returns array of {x, y} percentage positions
 */
export function generateConstellationPositions(
  skills: Array<{ name: string; level: string }>
): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = []

  const ZONES = {
    primary:  { xMin: 35, xMax: 65, yMin: 35, yMax: 65 },
    strong:   { xMin: 15, xMax: 85, yMin: 15, yMax: 85 },
    familiar: { xMin: 5,  xMax: 95, yMin: 5,  yMax: 95 },
  }

  const MIN_DISTANCE = 9
  const MAX_ATTEMPTS = 50

  skills.forEach((skill, index) => {
    const zone = ZONES[skill.level as keyof typeof ZONES] ?? ZONES.familiar

    let placed = false
    let attempts = 0

    while (!placed && attempts < MAX_ATTEMPTS) {
      const seed = index * 137 + attempts * 31
      const x = zone.xMin + seededRandom(seed) * (zone.xMax - zone.xMin)
      const y = zone.yMin + seededRandom(seed + 1000) * (zone.yMax - zone.yMin)

      if (isFarEnough(x, y, positions, MIN_DISTANCE)) {
        positions.push({ x, y })
        placed = true
      }
      attempts++
    }

    if (!placed) {
      positions.push({
        x: zone.xMin + seededRandom(index * 77) * (zone.xMax - zone.xMin),
        y: zone.yMin + seededRandom(index * 77 + 500) * (zone.yMax - zone.yMin),
      })
    }
  })

  return positions
}

/**
 * Returns the node size in pixels based on proficiency level.
 */
export function getNodeSize(level: string): number {
  switch (level) {
    case 'primary':  return 52
    case 'strong':   return 38
    case 'familiar': return 28
    default:         return 28
  }
}

/**
 * Returns the neon color for a skill category.
 */
export function getNodeColor(category: string): string {
  switch (category) {
    case 'frontend': return '#00ffff'
    case 'backend':  return '#1D9E75'
    case 'testing':  return '#8b5cf6'
    case 'mobile':   return '#ff007f'
    case 'tools':    return '#888780'
    default:         return '#888780'
  }
}

/**
 * Defines meaningful connections between skills.
 * Each pair represents two skills that work together.
 * Keep to 1-3 connections per skill to avoid clutter.
 */
export const SKILL_CONNECTIONS: [string, string][] = [
  ['React', 'TypeScript'],
  ['React', 'JavaScript'],
  ['React', 'Redux Toolkit'],
  ['React', 'React Query'],
  ['TypeScript', 'JavaScript'],
  ['Node.js', 'Express.js'],
  ['Node.js', 'MongoDB'],
  ['Node.js', 'Socket.io'],
  ['MongoDB', 'Firebase'],
  ['Jest', 'React Testing Library'],
  ['Jest', 'Cypress'],
  ['React', 'Tailwind CSS'],
  ['Mapbox API', 'AG Grid'],
  ['Git', 'Jira'],
  ['Flutter', 'Firebase'],
  ['Redux Toolkit', 'React Query'],
  ['JavaScript', 'Node.js'],
]

/**
 * Calculates SVG line coordinates between two nodes
 * given their percentage positions and container dimensions.
 */
export function getConnectionCoords(
  fromPos: { x: number; y: number },
  toPos: { x: number; y: number },
  containerWidth: number,
  containerHeight: number
): { x1: number; y1: number; x2: number; y2: number } {
  return {
    x1: (fromPos.x / 100) * containerWidth,
    y1: (fromPos.y / 100) * containerHeight,
    x2: (toPos.x / 100) * containerWidth,
    y2: (toPos.y / 100) * containerHeight,
  }
}
