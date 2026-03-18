/**
 * Linear interpolation between two values.
 * @param a - Start value
 * @param b - End value
 * @param t - Interpolation factor (0–1)
 * @returns The value at position `t` between `a` and `b`
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Clamps a value between min and max (inclusive).
 * @param value - The value to clamp
 * @param min   - Lower bound
 * @param max   - Upper bound
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Maps a value from one numeric range to another.
 * @param value  - Input value
 * @param inMin  - Input range minimum
 * @param inMax  - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns The value remapped to the output range
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1)
  return lerp(outMin, outMax, t)
}

/**
 * Converts a CSS hex colour string to an RGB object.
 * Accepts 3-digit (#rgb) and 6-digit (#rrggbb) formats.
 * @param hex - Hex colour string (e.g. "#00ffcc" or "#0fc")
 * @returns An object `{ r, g, b }` with values 0–255, or `null` if invalid
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalised = hex.replace(/^#/, '')

  let full: string
  if (normalised.length === 3) {
    full = normalised
      .split('')
      .map((c) => c + c)
      .join('')
  } else if (normalised.length === 6) {
    full = normalised
  } else {
    return null
  }

  const int = parseInt(full, 16)
  if (isNaN(int)) return null

  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff,
  }
}
