import type { OKLCHColor, BaseColorKey } from '../types/scheme';
import { oklchToHex } from '../lib/colors';

interface ColorSliderProps {
  colorKey: BaseColorKey;
  color: OKLCHColor;
  onChange: (colorKey: BaseColorKey, color: OKLCHColor) => void;
  label: string;
}

export function ColorSlider({ colorKey, color, onChange, label }: ColorSliderProps) {
  const hexColor = oklchToHex(color);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(colorKey, { ...color, h: parseFloat(e.target.value) });
  };

  const handleChromaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(colorKey, { ...color, c: parseFloat(e.target.value) });
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(colorKey, { ...color, l: parseFloat(e.target.value) });
  };

  return (
    <div className="mb-4 p-3 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-16 h-16 rounded border-2 border-gray-600 flex-shrink-0"
          style={{ backgroundColor: hexColor }}
        />
        <div className="flex-1">
          <div className="font-mono text-sm font-semibold text-gray-200">{label}</div>
          <div className="font-mono text-xs text-gray-400">{hexColor}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>H (Hue)</span>
            <span className="font-mono">{Math.round(color.h)}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={color.h}
            onChange={handleHueChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-hue"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>C (Chroma)</span>
            <span className="font-mono">{color.c.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.01"
            value={color.c}
            onChange={handleChromaChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>L (Lightness)</span>
            <span className="font-mono">{color.l.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color.l}
            onChange={handleLightnessChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
