declare module 'culori' {
  export interface Oklch {
    mode: 'oklch';
    l: number;
    c: number;
    h?: number;
  }

  export function oklch(color: string | Oklch): Oklch | undefined;
  export function formatHex(color: Oklch | string): string | undefined;
  export function wcagContrast(color1: string, color2: string): number;
  export function clampChroma(color: Oklch, mode: string): Oklch;
  export function toGamut(mode?: string, method?: string): (color: Oklch) => Oklch;
  export function displayable(color: Oklch | string): boolean;
  export function inGamut(mode: string): (color: Oklch | string) => boolean;
}
