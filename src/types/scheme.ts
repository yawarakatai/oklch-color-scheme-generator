// Type definitions for the OKLCH color scheme generator

export interface OKLCHColor {
  h: number; // Hue: 0-360 degrees
  c: number; // Chroma: 0-0.4
  l: number; // Lightness: 0-1
}

export interface ColorScheme {
  base00: OKLCHColor; // Default background
  base01: OKLCHColor; // Lighter background (used for status bars)
  base02: OKLCHColor; // Selection background
  base03: OKLCHColor; // Comments, invisibles, line highlighting
  base04: OKLCHColor; // Dark foreground (used for status bars)
  base05: OKLCHColor; // Default foreground, caret, delimiters, operators
  base06: OKLCHColor; // Light foreground (not often used)
  base07: OKLCHColor; // Light background (not often used)
  base08: OKLCHColor; // Variables, XML tags, markup link text, markup lists, diff deleted
  base09: OKLCHColor; // Integers, boolean, constants, XML attributes, markup link url
  base0A: OKLCHColor; // Classes, markup bold, search text background
  base0B: OKLCHColor; // Strings, inherited class, markup code, diff inserted
  base0C: OKLCHColor; // Support, regular expressions, escape characters, markup quotes
  base0D: OKLCHColor; // Functions, methods, attribute IDs, headings
  base0E: OKLCHColor; // Keywords, storage, selector, markup italic, diff changed
  base0F: OKLCHColor; // Deprecated, opening/closing embedded language tags
}

export interface GlobalFilters {
  hueShift: number; // -180 to 180 degrees
  saturationScale: number; // 0 to 2 (0% to 200%)
  lightnessCurve: number; // -0.3 to 0.3
}

export type GenerationMode =
  | 'manual'
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'triadic';

export interface SchemeMetadata {
  name: string;
  author: string;
}

export interface AppState {
  mode: GenerationMode;
  colors: ColorScheme;
  globalFilters: GlobalFilters;
  metadata: SchemeMetadata;
}

export type BaseColorKey = keyof ColorScheme;

export interface ContrastResult {
  colorKey: BaseColorKey;
  ratio: number;
  passes: boolean; // WCAG AAA (7:1)
  warning: boolean; // WCAG AA (4.5:1)
}

export type SupportedLanguage = 'cpp' | 'html' | 'javascript' | 'python' | 'rust' | 'go' | 'nix';
