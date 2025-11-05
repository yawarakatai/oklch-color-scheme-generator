import { useState, useEffect, useMemo, useCallback } from 'react';
import type { AppState, GenerationMode, BaseColorKey, OKLCHColor, GlobalFilters, SchemeMetadata, ColorScheme } from './types/scheme';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { loadStateFromURL, updateURLHash } from './lib/urlState';
import { schemeToHex, applyFiltersToScheme } from './lib/colors';
import { generateMonochromatic, generateAnalogous, generateComplementary, generateTriadic, generateRandomScheme } from './lib/generators';
import { exportAndDownload, copyToClipboard, generateShareURL } from './lib/export';
import { defaultColorScheme, defaultGlobalFilters as defaultFiltersImport } from './data/defaultScheme';

function App() {
  // Load initial state from URL or use defaults
  const [state, setState] = useState<AppState>(() => loadStateFromURL());
  const [copySuccess, setCopySuccess] = useState(false);

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

  // Handle filters enabled change
  const handleFiltersEnabledChange = useCallback((enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      filtersEnabled: enabled,
    }));
  }, []);

  // Handle metadata change
  const handleMetadataChange = useCallback((metadata: SchemeMetadata) => {
    setState((prev) => ({
      ...prev,
      metadata,
    }));
  }, []);

  // Export handlers
  const handleExport = useCallback(() => {
    exportAndDownload(state.colors, state.metadata);
  }, [state.colors, state.metadata]);

  const handleCopyURL = useCallback(async () => {
    const url = generateShareURL();
    const success = await copyToClipboard(url);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, []);

  // Handle randomize
  const handleRandomize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mode: 'manual',
      colors: generateRandomScheme(),
    }));
  }, []);

  // Handle reset
  const handleReset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mode: 'manual',
      colors: defaultColorScheme,
      globalFilters: defaultFiltersImport,
      filtersEnabled: true,
    }));
  }, []);

  // Apply global filters to colors and convert to hex
  const displayColors = useMemo(() => {
    // Only apply filters if they are enabled
    const filteredColors = state.filtersEnabled
      ? applyFiltersToScheme(state.colors, state.globalFilters)
      : state.colors;
    return schemeToHex(filteredColors);
  }, [state.colors, state.globalFilters, state.filtersEnabled]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Header with Export */}
      <header className="bg-neutral-800 border-b border-neutral-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-neutral-100">OKLCH Color Scheme Generator</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Create beautiful color schemes for Linux ricing using OKLCH color space
            </p>
          </div>

          {/* Export Panel */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={state.metadata.name}
              onChange={(e) => handleMetadataChange({ ...state.metadata, name: e.target.value })}
              className="w-32 px-2 py-1 text-xs bg-neutral-700 text-neutral-200 rounded border border-neutral-600 focus:outline-none focus:border-blue-500"
              placeholder="Scheme Name"
            />
            <input
              type="text"
              value={state.metadata.author}
              onChange={(e) => handleMetadataChange({ ...state.metadata, author: e.target.value })}
              className="w-24 px-2 py-1 text-xs bg-neutral-700 text-neutral-200 rounded border border-neutral-600 focus:outline-none focus:border-blue-500"
              placeholder="Author"
            />
            <button
              onClick={handleExport}
              className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            >
              Export YAML
            </button>
            <button
              onClick={handleCopyURL}
              className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
            >
              {copySuccess ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      </header>

      {/* Main content with responsive max-width constraint */}
      <div className="mx-auto w-[95%] lg:w-[90%] xl:max-w-[1600px]">
        <div className="flex" style={{ height: 'calc(100vh - 58px)' }}>
          {/* Control Panel (Left) - 40% */}
          <div className="w-2/5 border-r border-neutral-700 overflow-hidden">
            <ControlPanel
              mode={state.mode}
              colors={state.colors}
              globalFilters={state.globalFilters}
              filtersEnabled={state.filtersEnabled}
              onModeChange={handleModeChange}
              onColorChange={handleColorChange}
              onGlobalFiltersChange={handleGlobalFiltersChange}
              onFiltersEnabledChange={handleFiltersEnabledChange}
              onRandomize={handleRandomize}
              onReset={handleReset}
            />
          </div>

          {/* Preview Panel (Right) - 60% */}
          <div className="w-3/5 overflow-hidden">
            <PreviewPanel colors={displayColors} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
