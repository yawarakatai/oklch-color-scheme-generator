import { useState } from 'react';
import type { ColorScheme, GlobalFilters, GenerationMode, SchemeMetadata, BaseColorKey, OKLCHColor } from '../types/scheme';
import { ColorSlider } from './ColorSlider';
import { exportAndDownload, copyToClipboard, generateShareURL } from '../lib/export';
import { defaultColorScheme, defaultGlobalFilters } from '../data/defaultScheme';

interface ControlPanelProps {
  mode: GenerationMode;
  colors: ColorScheme;
  globalFilters: GlobalFilters;
  metadata: SchemeMetadata;
  onModeChange: (mode: GenerationMode) => void;
  onColorChange: (colorKey: BaseColorKey, color: OKLCHColor) => void;
  onGlobalFiltersChange: (filters: GlobalFilters) => void;
  onMetadataChange: (metadata: SchemeMetadata) => void;
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
  metadata,
  onModeChange,
  onColorChange,
  onGlobalFiltersChange,
  onMetadataChange,
}: ControlPanelProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [filtersEnabled, setFiltersEnabled] = useState(true);

  const handleExport = () => {
    exportAndDownload(colors, metadata);
  };

  const handleCopyURL = async () => {
    const url = generateShareURL();
    const success = await copyToClipboard(url);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const resetFilters = () => {
    onGlobalFiltersChange(defaultGlobalFilters);
  };

  const colorKeys: BaseColorKey[] = [
    'base00', 'base01', 'base02', 'base03',
    'base04', 'base05', 'base06', 'base07',
    'base08', 'base09', 'base0A', 'base0B',
    'base0C', 'base0D', 'base0E', 'base0F',
  ];

  // If filters are disabled, use default values
  const effectiveFilters = filtersEnabled ? globalFilters : defaultGlobalFilters;

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Export Panel - Top Right */}
      <div className="p-4 border-b border-gray-800">
        <div className="space-y-3 bg-gray-800 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Scheme Name</label>
              <input
                type="text"
                value={metadata.name}
                onChange={(e) => onMetadataChange({ ...metadata, name: e.target.value })}
                className="w-full px-2 py-1.5 text-xs bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="My Color Scheme"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Author</label>
              <input
                type="text"
                value={metadata.author}
                onChange={(e) => onMetadataChange({ ...metadata, author: e.target.value })}
                className="w-full px-2 py-1.5 text-xs bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            >
              Export YAML
            </button>

            <button
              onClick={handleCopyURL}
              className="px-3 py-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
            >
              {copySuccess ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Generation Mode - Dropdown */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Generation Mode</h3>
          <select
            value={mode}
            onChange={(e) => onModeChange(e.target.value as GenerationMode)}
            className="w-full px-3 py-2 bg-gray-800 text-gray-200 rounded border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
          >
            {(['manual', 'monochromatic', 'analogous', 'complementary', 'triadic'] as GenerationMode[]).map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-gray-400">
            {MODE_DESCRIPTIONS[mode]}
          </p>
        </div>

        {/* Global Filters with Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">Global Filters</h3>
            <label className="flex items-center cursor-pointer">
              <span className="text-xs text-gray-400 mr-2">Enable</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filtersEnabled}
                  onChange={(e) => setFiltersEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filtersEnabled ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filtersEnabled ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </label>
          </div>

          <div className={`space-y-3 bg-gray-800 p-3 rounded-lg ${!filtersEnabled ? 'opacity-50' : ''}`}>
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Hue Shift</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{effectiveFilters.hueShift.toFixed(0)}°</span>
                  <button
                    onClick={() => onGlobalFiltersChange({ ...globalFilters, hueShift: 0 })}
                    className="text-xs px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
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
                value={effectiveFilters.hueShift}
                onChange={(e) => onGlobalFiltersChange({ ...globalFilters, hueShift: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                disabled={!filtersEnabled}
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Saturation Scale</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{(effectiveFilters.saturationScale * 100).toFixed(0)}%</span>
                  <button
                    onClick={() => onGlobalFiltersChange({ ...globalFilters, saturationScale: 1 })}
                    className="text-xs px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
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
                value={effectiveFilters.saturationScale}
                onChange={(e) => onGlobalFiltersChange({ ...globalFilters, saturationScale: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                disabled={!filtersEnabled}
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Lightness Curve</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{effectiveFilters.lightnessCurve > 0 ? '+' : ''}{effectiveFilters.lightnessCurve.toFixed(2)}</span>
                  <button
                    onClick={() => onGlobalFiltersChange({ ...globalFilters, lightnessCurve: 0 })}
                    className="text-xs px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
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
                value={effectiveFilters.lightnessCurve}
                onChange={(e) => onGlobalFiltersChange({ ...globalFilters, lightnessCurve: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                disabled={!filtersEnabled}
              />
            </div>

            <button
              onClick={resetFilters}
              className="w-full mt-2 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
              disabled={!filtersEnabled}
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Individual Colors - Collapsible */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Individual Colors</h3>
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
    </div>
  );
}
