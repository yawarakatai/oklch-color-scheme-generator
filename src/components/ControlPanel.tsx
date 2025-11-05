import type { ColorScheme, GlobalFilters, GenerationMode, BaseColorKey, OKLCHColor } from '../types/scheme';
import { ColorSlider } from './ColorSlider';
import { defaultColorScheme, defaultGlobalFilters } from '../data/defaultScheme';

interface ControlPanelProps {
  mode: GenerationMode;
  colors: ColorScheme;
  globalFilters: GlobalFilters;
  filtersEnabled: boolean;
  onModeChange: (mode: GenerationMode) => void;
  onColorChange: (colorKey: BaseColorKey, color: OKLCHColor) => void;
  onGlobalFiltersChange: (filters: GlobalFilters) => void;
  onFiltersEnabledChange: (enabled: boolean) => void;
  onRandomize: () => void;
  onReset: () => void;
}

const MODE_DESCRIPTIONS: Record<GenerationMode, string> = {
  manual: 'Adjust each color individually',
  monochromatic: 'Generate scheme from single hue with varying lightness',
  analogous: 'Use adjacent hues (±30°) for harmonious palette',
  complementary: 'Create contrast with opposite hues (180° apart)',
  triadic: 'Balance with three evenly-spaced hues (120° intervals)',
};

const COLOR_LABELS: Record<BaseColorKey, string> = {
  base00: 'base00 (Background)',
  base01: 'base01 (Lighter BG)',
  base02: 'base02 (Selection)',
  base03: 'base03 (Comments)',
  base04: 'base04 (Dark FG)',
  base05: 'base05 (Foreground)',
  base06: 'base06 (Light FG)',
  base07: 'base07 (Light BG)',
  base08: 'base08 (Red/Variables)',
  base09: 'base09 (Orange/Integers)',
  base0A: 'base0A (Yellow/Classes)',
  base0B: 'base0B (Green/Strings)',
  base0C: 'base0C (Cyan/Support)',
  base0D: 'base0D (Blue/Functions)',
  base0E: 'base0E (Magenta/Keywords)',
  base0F: 'base0F (Brown/Deprecated)',
};

export function ControlPanel({
  mode,
  colors,
  globalFilters,
  filtersEnabled,
  onModeChange,
  onColorChange,
  onGlobalFiltersChange,
  onFiltersEnabledChange,
  onRandomize,
  onReset,
}: ControlPanelProps) {
  const resetFilters = () => {
    onGlobalFiltersChange(defaultGlobalFilters);
  };

  const colorKeys: BaseColorKey[] = [
    'base00', 'base01', 'base02', 'base03',
    'base04', 'base05', 'base06', 'base07',
    'base08', 'base09', 'base0A', 'base0B',
    'base0C', 'base0D', 'base0E', 'base0F',
  ];

  return (
    <div className="h-full overflow-y-auto p-4 bg-neutral-900">
      {/* Generation Mode - Dropdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-neutral-300 mb-2">Generation Mode</h3>
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value as GenerationMode)}
          className="w-full px-3 py-2 bg-neutral-800 text-neutral-200 rounded border border-neutral-700 focus:outline-none focus:border-blue-500 text-sm"
        >
          {(['manual', 'monochromatic', 'analogous', 'complementary', 'triadic'] as GenerationMode[]).map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-neutral-400">
          {MODE_DESCRIPTIONS[mode]}
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={onRandomize}
            className="flex-1 px-3 py-2 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition-colors"
          >
            🎲 Randomize All
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all colors to default? This will clear all your changes.')) {
                onReset();
              }
            }}
            className="flex-1 px-3 py-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors"
          >
            ↺ Reset All
          </button>
        </div>
      </div>

      {/* Global Filters with Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-neutral-300">Global Filters</h3>
          <label className="flex items-center cursor-pointer">
            <span className="text-xs text-neutral-400 mr-2">Enable</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={filtersEnabled}
                onChange={(e) => onFiltersEnabledChange(e.target.checked)}
                className="sr-only"
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${filtersEnabled ? 'bg-blue-600' : 'bg-neutral-700'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filtersEnabled ? 'transform translate-x-4' : ''}`}></div>
            </div>
          </label>
        </div>

        <div className={`space-y-3 bg-neutral-800 p-3 rounded-lg ${!filtersEnabled ? 'opacity-50' : ''}`}>
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>Hue Shift</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{globalFilters.hueShift.toFixed(0)}°</span>
                <button
                  onClick={() => onGlobalFiltersChange({ ...globalFilters, hueShift: 0 })}
                  className="text-xs px-2 py-0.5 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                  disabled={!filtersEnabled}
                >
                  ↺
                </button>
              </div>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={globalFilters.hueShift}
              onChange={(e) => onGlobalFiltersChange({ ...globalFilters, hueShift: parseFloat(e.target.value) })}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              disabled={!filtersEnabled}
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>Saturation Scale</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{(globalFilters.saturationScale * 100).toFixed(0)}%</span>
                <button
                  onClick={() => onGlobalFiltersChange({ ...globalFilters, saturationScale: 1 })}
                  className="text-xs px-2 py-0.5 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                  disabled={!filtersEnabled}
                >
                  ↺
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={globalFilters.saturationScale}
              onChange={(e) => onGlobalFiltersChange({ ...globalFilters, saturationScale: parseFloat(e.target.value) })}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              disabled={!filtersEnabled}
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>Lightness Curve</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{globalFilters.lightnessCurve > 0 ? '+' : ''}{globalFilters.lightnessCurve.toFixed(2)}</span>
                <button
                  onClick={() => onGlobalFiltersChange({ ...globalFilters, lightnessCurve: 0 })}
                  className="text-xs px-2 py-0.5 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                  disabled={!filtersEnabled}
                >
                  ↺
                </button>
              </div>
            </div>
            <input
              type="range"
              min="-0.3"
              max="0.3"
              step="0.01"
              value={globalFilters.lightnessCurve}
              onChange={(e) => onGlobalFiltersChange({ ...globalFilters, lightnessCurve: parseFloat(e.target.value) })}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              disabled={!filtersEnabled}
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full mt-2 px-3 py-1.5 text-xs bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded transition-colors"
            disabled={!filtersEnabled}
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Individual Colors - Collapsible */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-neutral-300 mb-2">Individual Colors</h3>
        <div className="space-y-1">
          {colorKeys.map((key) => (
            <ColorSlider
              key={key}
              colorKey={key}
              color={colors[key]}
              onChange={onColorChange}
              label={COLOR_LABELS[key]}
              initialColor={defaultColorScheme[key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
