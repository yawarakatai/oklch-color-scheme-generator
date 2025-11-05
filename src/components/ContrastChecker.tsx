import { useMemo } from 'react';
import type { BaseColorKey, ContrastResult } from '../types/scheme';
import { calculateContrast } from '../lib/colors';

interface ContrastCheckerProps {
  colors: Record<string, string>;
}

export function ContrastChecker({ colors }: ContrastCheckerProps) {
  const contrastResults = useMemo(() => {
    const background = colors.base00;
    const results: ContrastResult[] = [];

    // Check contrast for all foreground colors against base00
    const foregroundKeys: BaseColorKey[] = [
      'base03', 'base04', 'base05', 'base06', 'base07',
      'base08', 'base09', 'base0A', 'base0B',
      'base0C', 'base0D', 'base0E', 'base0F',
    ];

    for (const key of foregroundKeys) {
      const ratio = calculateContrast(colors[key], background);
      results.push({
        colorKey: key,
        ratio,
        passes: ratio >= 7, // WCAG AAA
        warning: ratio >= 4.5 && ratio < 7, // WCAG AA
      });
    }

    // Sort by ratio (descending)
    return results.sort((a, b) => b.ratio - a.ratio);
  }, [colors]);

  const getStatusIcon = (result: ContrastResult) => {
    if (result.passes) return '✓';
    if (result.warning) return '⚠';
    return '✗';
  };

  const getStatusColor = (result: ContrastResult) => {
    if (result.passes) return '#10b981'; // green
    if (result.warning) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: colors.base01, color: colors.base05 }}
    >
      <h3 className="text-sm font-semibold mb-3" style={{ color: colors.base05 }}>
        Contrast Checker
      </h3>

      <div className="text-xs mb-3" style={{ color: colors.base04 }}>
        <div>✓ WCAG AAA: ≥7:1</div>
        <div>⚠ WCAG AA: 4.5:1-7:1</div>
        <div>✗ Fail: &lt;4.5:1</div>
      </div>

      <div className="space-y-2">
        {contrastResults.map((result) => (
          <div
            key={result.colorKey}
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: colors.base00 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-lg"
                style={{ color: getStatusColor(result) }}
              >
                {getStatusIcon(result)}
              </span>
              <span className="font-mono text-sm" style={{ color: colors.base05 }}>
                {result.colorKey}
              </span>
              <div
                className="w-6 h-6 rounded border"
                style={{
                  backgroundColor: colors[result.colorKey],
                  borderColor: colors.base03,
                }}
              />
            </div>
            <span className="font-mono text-sm" style={{ color: colors.base04 }}>
              {result.ratio.toFixed(2)}:1
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs" style={{ color: colors.base03 }}>
        <p>All ratios calculated against base00 (background)</p>
      </div>
    </div>
  );
}
