import { useState } from 'react';
import type { ColorScheme, GlobalFilters, GenerationMode, SchemeMetadata, BaseColorKey, OKLCHColor } from '../types/scheme';
import { ColorSlider } from './ColorSlider';
import { exportAndDownload, copyToClipboard, generateShareURL } from '../lib/export';

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

  const colorKeys: BaseColorKey[] = [
    'base00', 'base01', 'base02', 'base03',
    'base04', 'base05', 'base06', 'base07',
    'base08', 'base09', 'base0A', 'base0B',
    'base0C', 'base0D', 'base0E', 'base0F',
  ];

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-900">
      {/* Generation Mode */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Generation Mode</h3>
        <div className="space-y-2">
          {(['manual', 'monochromatic', 'analogous', 'complementary', 'triadic'] as GenerationMode[]).map((m) => (
            <label key={m} className="flex items-center text-sm text-gray-300 cursor-pointer hover:text-white">
              <input
                type="radio"
                name="mode"
                value={m}
                checked={mode === m}
                onChange={(e) => onModeChange(e.target.value as GenerationMode)}
                className="mr-2"
              />
              <span className="capitalize">{m}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Global Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Global Filters</h3>
        <div className="space-y-3 bg-gray-800 p-3 rounded-lg">
          <div>
            <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Hue Shift</span>
              <span className="font-mono">{globalFilters.hueShift.toFixed(0)}°</span>
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={globalFilters.hueShift}
              onChange={(e) => onGlobalFiltersChange({ ...globalFilters, hueShift: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Saturation Scale</span>
              <span className="font-mono">{(globalFilters.saturationScale * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={globalFilters.saturationScale}
              onChange={(e) => onGlobalFiltersChange({ ...globalFilters, saturationScale: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Lightness Curve</span>
              <span className="font-mono">{globalFilters.lightnessCurve > 0 ? '+' : ''}{globalFilters.lightnessCurve.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="-0.3"
              max="0.3"
              step="0.01"
              value={globalFilters.lightnessCurve}
              onChange={(e) => onGlobalFiltersChange({ ...globalFilters, lightnessCurve: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Individual Colors */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Individual Colors</h3>
        <div className="space-y-2">
          {colorKeys.map((key) => (
            <ColorSlider
              key={key}
              colorKey={key}
              color={colors[key]}
              onChange={onColorChange}
              label={COLOR_LABELS[key]}
            />
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Export</h3>
        <div className="space-y-3 bg-gray-800 p-3 rounded-lg">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Scheme Name</label>
            <input
              type="text"
              value={metadata.name}
              onChange={(e) => onMetadataChange({ ...metadata, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="My Color Scheme"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Author</label>
            <input
              type="text"
              value={metadata.author}
              onChange={(e) => onMetadataChange({ ...metadata, author: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>

          <button
            onClick={handleExport}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
          >
            Export Base16 YAML
          </button>

          <button
            onClick={handleCopyURL}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
          >
            {copySuccess ? 'Copied!' : 'Copy Share URL'}
          </button>
        </div>
      </div>
    </div>
  );
}
