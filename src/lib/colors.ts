// Color operations library using culori for OKLCH color space
import { formatHex, oklch, wcagContrast, Oklch, clampChroma } from 'culori';
import type { OKLCHColor, ColorScheme, GlobalFilters } from '../types/scheme';

/**
 * Convert OKLCH color to hex string
 */
export function oklchToHex(color: OKLCHColor): string {
  const oklchColor: Oklch = {
    mode: 'oklch',
    l: clamp(color.l, 0, 1),
    c: clamp(color.c, 0, 0.4),
    h: normalizeHue(color.h),
  };

  // Clamp chroma to displayable range
  const clamped = clampChroma(oklchColor, 'oklch');

  // Convert to hex, fallback to black if conversion fails
  try {
    const hex = formatHex(clamped);
    return hex || '#000000';
  } catch (e) {
    console.warn('Failed to convert OKLCH to hex:', color, e);
    return '#000000';
  }
}

/**
 * Convert hex string to OKLCH color
 */
export function hexToOklch(hex: string): OKLCHColor {
  try {
    const color = oklch(hex);
    if (!color) {
      throw new Error('Invalid color');
    }
    return {
      h: color.h || 0,
      c: color.c || 0,
      l: color.l || 0,
    };
  } catch (e) {
    console.warn('Failed to convert hex to OKLCH:', hex, e);
    return { h: 0, c: 0, l: 0 };
  }
}

/**
 * Apply global filters to a single color
 */
export function applyGlobalFilters(
  color: OKLCHColor,
  filters: GlobalFilters
): OKLCHColor {
  return {
    h: normalizeHue(color.h + filters.hueShift),
    c: clamp(color.c * filters.saturationScale, 0, 0.4),
    l: clamp(color.l + filters.lightnessCurve, 0, 1),
  };
}

/**
 * Apply global filters to entire color scheme
 */
export function applyFiltersToScheme(
  scheme: ColorScheme,
  filters: GlobalFilters
): ColorScheme {
  const result: Partial<ColorScheme> = {};

  for (const key in scheme) {
    if (scheme.hasOwnProperty(key)) {
      const colorKey = key as keyof ColorScheme;
      result[colorKey] = applyGlobalFilters(scheme[colorKey], filters);
    }
  }

  return result as ColorScheme;
}

/**
 * Calculate WCAG contrast ratio between two colors
 */
export function calculateContrast(color1Hex: string, color2Hex: string): number {
  try {
    const ratio = wcagContrast(color1Hex, color2Hex);
    return ratio || 1;
  } catch (e) {
    console.warn('Failed to calculate contrast:', color1Hex, color2Hex, e);
    return 1;
  }
}

/**
 * Validate OKLCH color values are in valid ranges
 */
export function validateColor(color: OKLCHColor): OKLCHColor {
  return {
    h: normalizeHue(color.h),
    c: clamp(color.c, 0, 0.4),
    l: clamp(color.l, 0, 1),
  };
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Normalize hue to 0-360 range
 */
function normalizeHue(hue: number): number {
  let normalized = hue % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Convert entire color scheme to hex values
 */
export function schemeToHex(scheme: ColorScheme): Record<keyof ColorScheme, string> {
  const result: Partial<Record<keyof ColorScheme, string>> = {};

  for (const key in scheme) {
    if (scheme.hasOwnProperty(key)) {
      const colorKey = key as keyof ColorScheme;
      result[colorKey] = oklchToHex(scheme[colorKey]);
    }
  }

  return result as Record<keyof ColorScheme, string>;
}

/**
 * Interpolate between two colors
 */
export function interpolateColors(
  color1: OKLCHColor,
  color2: OKLCHColor,
  t: number
): OKLCHColor {
  // Clamp t to 0-1
  const tClamped = clamp(t, 0, 1);

  return {
    h: interpolateHue(color1.h, color2.h, tClamped),
    c: color1.c + (color2.c - color1.c) * tClamped,
    l: color1.l + (color2.l - color1.l) * tClamped,
  };
}

/**
 * Interpolate between two hue values (handles circular nature)
 */
function interpolateHue(h1: number, h2: number, t: number): number {
  const diff = h2 - h1;
  let shortestDiff = diff;

  if (Math.abs(diff) > 180) {
    shortestDiff = diff > 0 ? diff - 360 : diff + 360;
  }

  return normalizeHue(h1 + shortestDiff * t);
}
