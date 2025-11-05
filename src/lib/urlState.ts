// URL state management for sharing color schemes
import type { AppState, ColorScheme, OKLCHColor } from '../types/scheme';
import { defaultAppState } from '../data/defaultScheme';

/**
 * Encode an OKLCH color to a compact string
 */
function encodeColor(color: OKLCHColor): string {
  // Round to 2 decimal places to reduce URL length
  const h = Math.round(color.h);
  const c = Math.round(color.c * 100) / 100;
  const l = Math.round(color.l * 100) / 100;
  return `${h},${c},${l}`;
}

/**
 * Decode a compact string to an OKLCH color
 */
function decodeColor(str: string): OKLCHColor | null {
  const parts = str.split(',');
  if (parts.length !== 3) return null;

  const h = parseFloat(parts[0]);
  const c = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);

  if (isNaN(h) || isNaN(c) || isNaN(l)) return null;

  return { h, c, l };
}

/**
 * Encode the entire app state to a URL hash
 */
export function encodeToURL(state: AppState): string {
  try {
    // Encode colors
    const colorPairs: string[] = [];
    const colorKeys: (keyof ColorScheme)[] = [
      'base00', 'base01', 'base02', 'base03',
      'base04', 'base05', 'base06', 'base07',
      'base08', 'base09', 'base0A', 'base0B',
      'base0C', 'base0D', 'base0E', 'base0F',
    ];

    for (const key of colorKeys) {
      colorPairs.push(encodeColor(state.colors[key]));
    }

    // Create URL parameters
    const params = new URLSearchParams();
    params.set('c', colorPairs.join('|'));
    params.set('mode', state.mode);

    // Add global filters if they're not default
    if (state.globalFilters.hueShift !== 0) {
      params.set('hs', state.globalFilters.hueShift.toString());
    }
    if (state.globalFilters.saturationScale !== 1) {
      params.set('ss', state.globalFilters.saturationScale.toString());
    }
    if (state.globalFilters.lightnessCurve !== 0) {
      params.set('lc', state.globalFilters.lightnessCurve.toString());
    }

    // Add metadata if provided
    if (state.metadata.name !== 'My Color Scheme') {
      params.set('name', state.metadata.name);
    }
    if (state.metadata.author !== 'Anonymous') {
      params.set('author', state.metadata.author);
    }

    return `#${params.toString()}`;
  } catch (e) {
    console.error('Failed to encode state to URL:', e);
    return '#';
  }
}

/**
 * Decode app state from URL hash
 */
export function decodeFromURL(hash: string): AppState | null {
  try {
    // Remove leading # if present
    const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
    if (!cleanHash) return null;

    const params = new URLSearchParams(cleanHash);

    // Decode colors
    const colorsStr = params.get('c');
    if (!colorsStr) return null;

    const colorStrings = colorsStr.split('|');
    if (colorStrings.length !== 16) return null;

    const colorKeys: (keyof ColorScheme)[] = [
      'base00', 'base01', 'base02', 'base03',
      'base04', 'base05', 'base06', 'base07',
      'base08', 'base09', 'base0A', 'base0B',
      'base0C', 'base0D', 'base0E', 'base0F',
    ];

    const colors: Partial<ColorScheme> = {};
    for (let i = 0; i < colorKeys.length; i++) {
      const color = decodeColor(colorStrings[i]);
      if (!color) return null;
      colors[colorKeys[i]] = color;
    }

    // Decode other parameters
    const mode = params.get('mode') || 'manual';
    const hueShift = parseFloat(params.get('hs') || '0');
    const saturationScale = parseFloat(params.get('ss') || '1');
    const lightnessCurve = parseFloat(params.get('lc') || '0');
    const name = params.get('name') || 'My Color Scheme';
    const author = params.get('author') || 'Anonymous';

    return {
      mode: mode as AppState['mode'],
      colors: colors as ColorScheme,
      globalFilters: {
        hueShift,
        saturationScale,
        lightnessCurve,
      },
      metadata: {
        name,
        author,
      },
    };
  } catch (e) {
    console.error('Failed to decode state from URL:', e);
    return null;
  }
}

/**
 * Update the browser URL without reloading
 */
export function updateURLHash(state: AppState): void {
  const hash = encodeToURL(state);
  if (window.history.replaceState) {
    window.history.replaceState(null, '', hash);
  } else {
    window.location.hash = hash;
  }
}

/**
 * Load state from current URL or return default
 */
export function loadStateFromURL(): AppState {
  const hash = window.location.hash;
  if (!hash || hash === '#') {
    return defaultAppState;
  }

  const decoded = decodeFromURL(hash);
  return decoded || defaultAppState;
}
