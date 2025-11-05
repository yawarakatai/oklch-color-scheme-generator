import { useState } from 'react';
import type { OKLCHColor, BaseColorKey } from '../types/scheme';
import { oklchToHex } from '../lib/colors';

interface ColorSliderProps {
  colorKey: BaseColorKey;
  color: OKLCHColor;
  onChange: (colorKey: BaseColorKey, color: OKLCHColor) => void;
  label: string;
  initialColor: OKLCHColor;
}

export function ColorSlider({ colorKey, color, onChange, label, initialColor }: ColorSliderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const resetHue = () => {
    onChange(colorKey, { ...color, h: initialColor.h });
  };

  const resetChroma = () => {
    onChange(colorKey, { ...color, c: initialColor.c });
  };

  const resetLightness = () => {
    onChange(colorKey, { ...color, l: initialColor.l });
  };

  const resetAll = () => {
    onChange(colorKey, initialColor);
  };

  return (
    <div className="mb-2 bg-neutral-800 rounded-lg">
      {/* Color swatch header - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center gap-3 hover:bg-neutral-750 transition-colors rounded-lg"
      >
        <div
          className="w-12 h-12 rounded border-2 border-neutral-600 flex-shrink-0"
          style={{ backgroundColor: hexColor }}
        />
        <div className="flex-1 text-left">
          <div className="font-mono text-xs font-semibold text-neutral-200">{label}</div>
          <div className="font-mono text-xs text-neutral-400">{hexColor}</div>
        </div>
        <div className="text-neutral-400">
          {isExpanded ? '▼' : '▶'}
        </div>
      </button>

      {/* Sliders - shown when expanded */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>H (Hue)</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{Math.round(color.h)}°</span>
                <button
                  onClick={resetHue}
                  className="text-xs px-2 py-0.5 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                  title="Reset to initial value"
                >
                  ↺
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={color.h}
              onChange={handleHueChange}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider-hue"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>C (Chroma)</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{color.c.toFixed(2)}</span>
                <button
                  onClick={resetChroma}
                  className="text-xs px-2 py-0.5 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                  title="Reset to initial value"
                >
                  ↺
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={color.c}
              onChange={handleChromaChange}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>L (Lightness)</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{color.l.toFixed(2)}</span>
                <button
                  onClick={resetLightness}
                  className="text-xs px-2 py-0.5 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                  title="Reset to initial value"
                >
                  ↺
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={color.l}
              onChange={handleLightnessChange}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={resetAll}
            className="w-full mt-2 px-3 py-1.5 text-xs bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded transition-colors"
          >
            Reset All
          </button>
        </div>
      )}
    </div>
  );
}
