import { useState, useEffect, useMemo, useCallback } from 'react';
import type { AppState, GenerationMode, BaseColorKey, OKLCHColor, GlobalFilters, SchemeMetadata, ColorScheme } from './types/scheme';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { loadStateFromURL, updateURLHash } from './lib/urlState';
import { schemeToHex, applyFiltersToScheme } from './lib/colors';
import { generateMonochromatic, generateAnalogous, generateComplementary, generateTriadic } from './lib/generators';

function App() {
  // Load initial state from URL or use defaults
  const [state, setState] = useState<AppState>(() => loadStateFromURL());

  // Debounce URL updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURLHash(state);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Handle mode change
  const handleModeChange = useCallback((mode: GenerationMode) => {
    setState((prev) => {
      if (mode === 'manual') {
        return { ...prev, mode };
      }

      // Generate new color scheme based on mode
      // Use base08 as the seed color for generation
      const seedColor = prev.colors.base08;
      let newColors: ColorScheme;

      switch (mode) {
        case 'monochromatic':
          newColors = generateMonochromatic(seedColor);
          break;
        case 'analogous':
          newColors = generateAnalogous(seedColor);
          break;
        case 'complementary':
          newColors = generateComplementary(seedColor);
          break;
        case 'triadic':
          newColors = generateTriadic(seedColor);
          break;
        default:
          newColors = prev.colors;
      }

      return { ...prev, mode, colors: newColors };
    });
  }, []);

  // Handle individual color change
  const handleColorChange = useCallback((colorKey: BaseColorKey, color: OKLCHColor) => {
    setState((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: color,
      },
    }));
  }, []);

  // Handle global filters change
  const handleGlobalFiltersChange = useCallback((filters: GlobalFilters) => {
    setState((prev) => ({
      ...prev,
      globalFilters: filters,
    }));
  }, []);

  // Handle metadata change
  const handleMetadataChange = useCallback((metadata: SchemeMetadata) => {
    setState((prev) => ({
      ...prev,
      metadata,
    }));
  }, []);

  // Apply global filters to colors and convert to hex
  const displayColors = useMemo(() => {
    const filteredColors = applyFiltersToScheme(state.colors, state.globalFilters);
    return schemeToHex(filteredColors);
  }, [state.colors, state.globalFilters]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-100">OKLCH Color Scheme Generator</h1>
        <p className="text-sm text-gray-400 mt-1">
          Create beautiful color schemes for Linux ricing using OKLCH color space
        </p>
      </header>

      {/* Main content */}
      <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Control Panel (Left) */}
        <div className="w-2/5 border-r border-gray-800 overflow-hidden">
          <ControlPanel
            mode={state.mode}
            colors={state.colors}
            globalFilters={state.globalFilters}
            metadata={state.metadata}
            onModeChange={handleModeChange}
            onColorChange={handleColorChange}
            onGlobalFiltersChange={handleGlobalFiltersChange}
            onMetadataChange={handleMetadataChange}
          />
        </div>

        {/* Preview Panel (Right) */}
        <div className="w-3/5 overflow-hidden">
          <PreviewPanel colors={displayColors} />
        </div>
      </div>
    </div>
  );
}

export default App;
