// Default color scheme - A pleasant dark theme inspired by Tokyo Night
import type { ColorScheme, AppState } from '../types/scheme';

export const defaultColorScheme: ColorScheme = {
  // Dark backgrounds with blue-purple tint
  base00: { h: 240, c: 0.05, l: 0.15 }, // Deep dark blue background
  base01: { h: 240, c: 0.05, l: 0.20 }, // Slightly lighter background
  base02: { h: 240, c: 0.06, l: 0.25 }, // Selection background
  base03: { h: 240, c: 0.08, l: 0.40 }, // Comments, line highlighting
  base04: { h: 240, c: 0.08, l: 0.60 }, // Dark foreground
  base05: { h: 240, c: 0.05, l: 0.80 }, // Default foreground
  base06: { h: 240, c: 0.03, l: 0.90 }, // Light foreground
  base07: { h: 240, c: 0.02, l: 0.95 }, // Very light foreground

  // Accent colors
  base08: { h: 0, c: 0.18, l: 0.65 },    // Red - variables, deletion
  base09: { h: 30, c: 0.16, l: 0.68 },   // Orange - integers, constants
  base0A: { h: 50, c: 0.15, l: 0.72 },   // Yellow - classes, search
  base0B: { h: 130, c: 0.14, l: 0.68 },  // Green - strings, insertion
  base0C: { h: 180, c: 0.15, l: 0.70 },  // Cyan - regex, support
  base0D: { h: 220, c: 0.17, l: 0.68 },  // Blue - functions, methods
  base0E: { h: 280, c: 0.16, l: 0.70 },  // Magenta - keywords, storage
  base0F: { h: 25, c: 0.12, l: 0.60 },   // Brown - deprecated
};

export const defaultGlobalFilters = {
  hueShift: 0,
  saturationScale: 1,
  lightnessCurve: 0,
};

export const defaultMetadata = {
  name: 'My Color Scheme',
  author: 'Anonymous',
};

export const defaultAppState: AppState = {
  mode: 'manual',
  colors: defaultColorScheme,
  globalFilters: defaultGlobalFilters,
  filtersEnabled: true,
  metadata: defaultMetadata,
};
