// Color scheme generators for different harmony modes
import type { ColorScheme, OKLCHColor } from '../types/scheme';
import { interpolateColors, validateColor } from './colors';

/**
 * Generate a monochromatic color scheme (single hue with varying lightness)
 */
export function generateMonochromatic(baseColor: OKLCHColor): ColorScheme {
  const hue = baseColor.h;
  const chroma = baseColor.c;

  return {
    // Backgrounds (dark to light)
    base00: validateColor({ h: hue, c: chroma * 0.3, l: 0.15 }),
    base01: validateColor({ h: hue, c: chroma * 0.3, l: 0.20 }),
    base02: validateColor({ h: hue, c: chroma * 0.3, l: 0.25 }),
    base03: validateColor({ h: hue, c: chroma * 0.4, l: 0.40 }),
    base04: validateColor({ h: hue, c: chroma * 0.4, l: 0.60 }),
    base05: validateColor({ h: hue, c: chroma * 0.3, l: 0.75 }),
    base06: validateColor({ h: hue, c: chroma * 0.2, l: 0.85 }),
    base07: validateColor({ h: hue, c: chroma * 0.1, l: 0.95 }),

    // Accent colors (varying lightness)
    base08: validateColor({ h: hue, c: chroma, l: 0.60 }),
    base09: validateColor({ h: hue, c: chroma * 0.9, l: 0.65 }),
    base0A: validateColor({ h: hue, c: chroma * 0.8, l: 0.70 }),
    base0B: validateColor({ h: hue, c: chroma * 0.9, l: 0.65 }),
    base0C: validateColor({ h: hue, c: chroma * 0.85, l: 0.68 }),
    base0D: validateColor({ h: hue, c: chroma, l: 0.62 }),
    base0E: validateColor({ h: hue, c: chroma * 0.9, l: 0.67 }),
    base0F: validateColor({ h: hue, c: chroma * 0.7, l: 0.55 }),
  };
}

/**
 * Generate an analogous color scheme (±30° hue variation)
 */
export function generateAnalogous(baseColor: OKLCHColor): ColorScheme {
  const hue = baseColor.h;
  const chroma = baseColor.c;

  return {
    // Backgrounds (base hue)
    base00: validateColor({ h: hue, c: chroma * 0.3, l: 0.15 }),
    base01: validateColor({ h: hue, c: chroma * 0.3, l: 0.20 }),
    base02: validateColor({ h: hue + 5, c: chroma * 0.3, l: 0.25 }),
    base03: validateColor({ h: hue + 10, c: chroma * 0.4, l: 0.40 }),
    base04: validateColor({ h: hue - 10, c: chroma * 0.4, l: 0.60 }),
    base05: validateColor({ h: hue, c: chroma * 0.3, l: 0.75 }),
    base06: validateColor({ h: hue - 5, c: chroma * 0.2, l: 0.85 }),
    base07: validateColor({ h: hue, c: chroma * 0.1, l: 0.95 }),

    // Accent colors (varying hues within analogous range)
    base08: validateColor({ h: hue, c: chroma, l: 0.60 }), // Red
    base09: validateColor({ h: hue + 15, c: chroma * 0.9, l: 0.65 }), // Orange
    base0A: validateColor({ h: hue + 30, c: chroma * 0.85, l: 0.70 }), // Yellow
    base0B: validateColor({ h: hue - 15, c: chroma * 0.9, l: 0.65 }), // Green
    base0C: validateColor({ h: hue - 30, c: chroma * 0.85, l: 0.68 }), // Cyan
    base0D: validateColor({ h: hue + 10, c: chroma, l: 0.62 }), // Blue
    base0E: validateColor({ h: hue - 20, c: chroma * 0.9, l: 0.67 }), // Magenta
    base0F: validateColor({ h: hue + 20, c: chroma * 0.8, l: 0.55 }), // Brown
  };
}

/**
 * Generate a complementary color scheme (180° hue pairs)
 */
export function generateComplementary(baseColor: OKLCHColor): ColorScheme {
  const hue = baseColor.h;
  const compHue = (hue + 180) % 360;
  const chroma = baseColor.c;

  return {
    // Backgrounds (base hue)
    base00: validateColor({ h: hue, c: chroma * 0.3, l: 0.15 }),
    base01: validateColor({ h: hue, c: chroma * 0.3, l: 0.20 }),
    base02: validateColor({ h: hue, c: chroma * 0.3, l: 0.25 }),
    base03: validateColor({ h: hue, c: chroma * 0.4, l: 0.40 }),
    base04: validateColor({ h: hue, c: chroma * 0.4, l: 0.60 }),
    base05: validateColor({ h: hue, c: chroma * 0.3, l: 0.75 }),
    base06: validateColor({ h: hue, c: chroma * 0.2, l: 0.85 }),
    base07: validateColor({ h: hue, c: chroma * 0.1, l: 0.95 }),

    // Accent colors (alternating between base and complementary hues)
    base08: validateColor({ h: hue, c: chroma, l: 0.60 }), // Red (base)
    base09: validateColor({ h: hue + 30, c: chroma * 0.9, l: 0.65 }), // Orange
    base0A: validateColor({ h: hue + 60, c: chroma * 0.85, l: 0.70 }), // Yellow
    base0B: validateColor({ h: compHue - 30, c: chroma * 0.9, l: 0.65 }), // Green (comp)
    base0C: validateColor({ h: compHue, c: chroma * 0.85, l: 0.68 }), // Cyan (comp)
    base0D: validateColor({ h: compHue + 30, c: chroma, l: 0.62 }), // Blue (comp)
    base0E: validateColor({ h: hue - 30, c: chroma * 0.9, l: 0.67 }), // Magenta (base)
    base0F: validateColor({ h: hue + 45, c: chroma * 0.8, l: 0.55 }), // Brown
  };
}

/**
 * Generate a triadic color scheme (120° hue intervals)
 */
export function generateTriadic(baseColor: OKLCHColor): ColorScheme {
  const hue1 = baseColor.h;
  const hue2 = (hue1 + 120) % 360;
  const hue3 = (hue1 + 240) % 360;
  const chroma = baseColor.c;

  return {
    // Backgrounds (base hue)
    base00: validateColor({ h: hue1, c: chroma * 0.3, l: 0.15 }),
    base01: validateColor({ h: hue1, c: chroma * 0.3, l: 0.20 }),
    base02: validateColor({ h: hue1, c: chroma * 0.3, l: 0.25 }),
    base03: validateColor({ h: hue1, c: chroma * 0.4, l: 0.40 }),
    base04: validateColor({ h: hue1, c: chroma * 0.4, l: 0.60 }),
    base05: validateColor({ h: hue1, c: chroma * 0.3, l: 0.75 }),
    base06: validateColor({ h: hue1, c: chroma * 0.2, l: 0.85 }),
    base07: validateColor({ h: hue1, c: chroma * 0.1, l: 0.95 }),

    // Accent colors (distributed across three hues)
    base08: validateColor({ h: hue1, c: chroma, l: 0.60 }), // Red (hue1)
    base09: validateColor({ h: hue1 + 30, c: chroma * 0.9, l: 0.65 }), // Orange
    base0A: validateColor({ h: hue1 + 60, c: chroma * 0.85, l: 0.70 }), // Yellow
    base0B: validateColor({ h: hue2, c: chroma * 0.9, l: 0.65 }), // Green (hue2)
    base0C: validateColor({ h: hue2 + 20, c: chroma * 0.85, l: 0.68 }), // Cyan
    base0D: validateColor({ h: hue3, c: chroma, l: 0.62 }), // Blue (hue3)
    base0E: validateColor({ h: hue3 + 20, c: chroma * 0.9, l: 0.67 }), // Magenta
    base0F: validateColor({ h: hue1 + 45, c: chroma * 0.8, l: 0.55 }), // Brown
  };
}

/**
 * Generate a gradient of colors between two colors
 */
export function generateGradient(
  color1: OKLCHColor,
  color2: OKLCHColor,
  steps: number
): OKLCHColor[] {
  const colors: OKLCHColor[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    colors.push(interpolateColors(color1, color2, t));
  }

  return colors;
}
