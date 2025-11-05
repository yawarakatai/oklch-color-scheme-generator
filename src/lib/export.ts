// Export functionality for color schemes
import type { ColorScheme, SchemeMetadata } from '../types/scheme';
import { oklchToHex } from './colors';

/**
 * Export color scheme as Base16 YAML format
 */
export function exportBase16Yaml(
  scheme: ColorScheme,
  metadata: SchemeMetadata
): string {
  const colors: Record<string, string> = {};

  // Convert all colors to hex (without # prefix for Base16 format)
  const colorKeys: (keyof ColorScheme)[] = [
    'base00', 'base01', 'base02', 'base03',
    'base04', 'base05', 'base06', 'base07',
    'base08', 'base09', 'base0A', 'base0B',
    'base0C', 'base0D', 'base0E', 'base0F',
  ];

  for (const key of colorKeys) {
    const hex = oklchToHex(scheme[key]);
    // Remove # prefix for Base16 format
    colors[key] = hex.substring(1);
  }

  // Color descriptions for Base16
  const descriptions: Record<string, string> = {
    base00: 'Default Background',
    base01: 'Lighter Background (Used for status bars, line number and folding marks)',
    base02: 'Selection Background',
    base03: 'Comments, Invisibles, Line Highlighting',
    base04: 'Dark Foreground (Used for status bars)',
    base05: 'Default Foreground, Caret, Delimiters, Operators',
    base06: 'Light Foreground (Not often used)',
    base07: 'Light Background (Not often used)',
    base08: 'Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted',
    base09: 'Integers, Boolean, Constants, XML Attributes, Markup Link Url',
    base0A: 'Classes, Markup Bold, Search Text Background',
    base0B: 'Strings, Inherited Class, Markup Code, Diff Inserted',
    base0C: 'Support, Regular Expressions, Escape Characters, Markup Quotes',
    base0D: 'Functions, Methods, Attribute IDs, Headings',
    base0E: 'Keywords, Storage, Selector, Markup Italic, Diff Changed',
    base0F: 'Deprecated, Opening/Closing Embedded Language Tags',
  };

  // Build YAML content
  const lines: string[] = [
    `scheme: "${metadata.name}"`,
    `author: "${metadata.author}"`,
  ];

  for (const key of colorKeys) {
    lines.push(`${key}: "${colors[key]}" # ${descriptions[key]}`);
  }

  return lines.join('\n');
}

/**
 * Download a file with the given content
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export scheme as Base16 YAML and trigger download
 */
export function exportAndDownload(scheme: ColorScheme, metadata: SchemeMetadata): void {
  const yaml = exportBase16Yaml(scheme, metadata);
  const filename = `${metadata.name.toLowerCase().replace(/\s+/g, '-')}.yaml`;
  downloadFile(yaml, filename, 'text/yaml');
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Generate a share URL for the current state
 */
export function generateShareURL(): string {
  return window.location.href;
}
