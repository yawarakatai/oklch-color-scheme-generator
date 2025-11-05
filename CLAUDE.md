# OKLCH Color Scheme Generator - Specification & Implementation Plan

## Project Overview
A web-based color scheme generator for Linux ricing using OKLCH color space, featuring real-time preview of terminal and code editor appearances with Base16 export functionality.

## Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Color Library**: culori (OKLCH color space operations)
- **Syntax Highlighting**: Prism.js or Shiki
- **Deployment**: GitHub Pages (client-side only)

## Core Requirements

### 1. Color Model
- **Color Space**: OKLCH (Oklab cylindrical coordinates)
  - H (Hue): 0-360°
  - C (Chroma): 0-0.4
  - L (Lightness): 0-1
- **Format**: Base16 (16 colors)
  - base00-07: Grayscale/background variations
  - base08-0F: Accent colors (red, orange, yellow, green, cyan, blue, magenta, brown)

### 2. User Interface Layout

```
┌────────────────────────────────────────────────────────────────┐
│                     OKLCH Scheme Generator                      │
├─────────────────────────┬──────────────────────────────────────┤
│   Controls (40%)        │        Preview (60%)                 │
├─────────────────────────┼──────────────────────────────────────┤
│                         │                                      │
│ ┌─ Generation Mode ───┐ │  ┌─ Terminal Preview ─────────────┐ │
│ │ ○ Manual            │ │  │ user@hostname:~$               │ │
│ │ ○ Monochromatic     │ │  │ $ neofetch                     │ │
│ │ ○ Analogous         │ │  │ [Colored ASCII art + sys info] │ │
│ │ ○ Complementary     │ │  │ $ ls -la                       │ │
│ │ ○ Triadic           │ │  │ drwxr-xr-x  file1.txt         │ │
│ └─────────────────────┘ │  │ -rw-r--r--  file2.md          │ │
│                         │  └────────────────────────────────┘ │
│ ┌─ Individual Colors ──┐ │                                      │
│ │ base00 ████          │ │  ┌─ Code Editor Preview ──────────┐ │
│ │   H [━━━━○━━━━] 240  │ │  │ 1  // C++ Example            │ │
│ │   C [━━○━━━━━━] 0.05 │ │  │ 2  #include <iostream>       │ │
│ │   L [━━○━━━━━━] 0.15 │ │  │ 3  int main() {              │ │
│ │                      │ │  │ 4    std::string msg = "Hi"; │ │
│ │ base01 ████          │ │  │ 5    return 0;               │ │
│ │   H [━━━━○━━━━]      │ │  │ 6  }                         │ │
│ │   ...                │ │  │                              │ │
│ │ base08 (Red) ████    │ │  │ [Python] [Rust] [Go] ...     │ │
│ │   H [━━━━○━━━━]      │ │  └────────────────────────────┘ │
│ │   ...                │ │                                      │
│ │ [16 colors total]    │ │  ┌─ Contrast Checker ───────────┐ │
│ └─────────────────────┘ │  │ ✓ base05/base00: 8.2:1       │ │
│                         │  │ ✓ base08/base00: 7.5:1       │ │
│ ┌─ Global Filters ────┐ │  │ ⚠ base0A/base00: 4.2:1       │ │
│ │ Hue Shift            │ │  │ ✗ base03/base00: 2.1:1       │ │
│ │   [━━━━━○━━━━] +15°  │ │  │ (WCAG AAA: 7:1 required)     │ │
│ │ Saturation Scale     │ │  └────────────────────────────┘ │
│ │   [━━━━━○━━━━] 100%  │ │                                      │
│ │ Lightness Curve      │ │                                      │
│ │   [━━━━━○━━━━] 0     │ │                                      │
│ └─────────────────────┘ │                                      │
│                         │                                      │
│ ┌─ Export ────────────┐ │                                      │
│ │ Scheme Name: [____] │ │                                      │
│ │ Author: [________]  │ │                                      │
│ │ [Export Base16]     │ │                                      │
│ │ [Copy Share URL]    │ │                                      │
│ └─────────────────────┘ │                                      │
└─────────────────────────┴──────────────────────────────────────┘
```

### 3. Features

#### A. Color Adjustment (Priority 1)
1. **Individual Color Sliders**
   - Each of 16 colors has H, C, L sliders
   - Real-time preview updates
   - Color swatch display with hex value

2. **Global Filters**
   - Hue Shift: ±180° adjustment for all colors
   - Saturation Scale: 0-200% multiplier for chroma
   - Lightness Curve: ±0.3 adjustment for lightness

3. **Generation Presets**
   - Monochromatic: Single hue with varying lightness
   - Analogous: ±30° hue variation
   - Complementary: 180° hue pairs
   - Triadic: 120° hue intervals

#### B. Preview Panel (Priority 1)
1. **Terminal Preview**
   - Neofetch output (ASCII art + colored system info)
   - ls -la output (colored file listings)
   - Shell prompt with user@hostname

2. **Code Editor Preview**
   - Tabbed interface for languages: C/C++, HTML/CSS, JavaScript/TypeScript, Python, Rust, Go, Nix
   - Syntax highlighting using color scheme
   - Line numbers
   - Example code snippets for each language

3. **Contrast Checker**
   - Calculate contrast ratios between foreground colors and base00
   - Display pass/fail against WCAG AAA (7:1)
   - Visual indicators: ✓ (≥7:1), ⚠ (4.5:1-7:1), ✗ (<4.5:1)

#### C. Export & Sharing (Priority 1)
1. **Base16 YAML Export**
```yaml
scheme: "Scheme Name"
author: "Author Name"
base00: "1a1b26" # Background
base01: "24283b" # ...
# ... all 16 colors
```

2. **URL Sharing**
   - Encode color scheme in URL hash
   - Format: `#/scheme?colors=base00:1a1b26,base01:...`
   - Automatic load from URL on page load

#### D. Future Extensions (Priority 2-3)
- Color picker integration
- Import existing schemes
- Additional export formats (Alacritty, kitty, Xresources)
- Scheme library/presets

### 4. Technical Specifications

#### Color Space Operations
```typescript
import { oklch, formatHex, wcagContrast } from 'culori';

// OKLCH to Hex conversion
function oklchToHex(h: number, c: number, l: number): string {
  const color = oklch({ mode: 'oklch', l, c, h });
  return formatHex(color);
}

// Contrast calculation
function checkContrast(fg: string, bg: string): number {
  return wcagContrast(fg, bg);
}
```

#### URL Encoding/Decoding
```typescript
interface ColorScheme {
  base00: string;
  // ... base01-0F
  name: string;
  author: string;
}

function encodeScheme(scheme: ColorScheme): string {
  // Compress to URL-safe string
  const colors = Object.entries(scheme)
    .filter(([k]) => k.startsWith('base'))
    .map(([_, v]) => v.substring(1)) // Remove #
    .join('');
  return btoa(colors + '|' + scheme.name + '|' + scheme.author);
}

function decodeScheme(encoded: string): ColorScheme {
  // Parse from URL
}
```

#### State Management
```typescript
interface AppState {
  mode: 'manual' | 'monochromatic' | 'analogous' | 'complementary' | 'triadic';
  colors: {
    [key: string]: { h: number; c: number; l: number };
  };
  globalFilters: {
    hueShift: number;
    saturationScale: number;
    lightnessCurve: number;
  };
  metadata: {
    name: string;
    author: string;
  };
}
```

## Implementation Plan

### Phase 1: Project Setup & Core UI (Priority: HIGH)
**Estimated Time: 2-3 hours**

1. **Initialize Project**
   ```bash
   npm create vite@latest oklch-scheme-generator -- --template react-ts
   cd oklch-scheme-generator
   npm install
   npm install culori tailwindcss postcss autoprefixer
   npm install -D @types/culori
   npx tailwindcss init -p
   ```

2. **Project Structure**
   ```
   src/
   ├── components/
   │   ├── ControlPanel.tsx
   │   ├── ColorSlider.tsx
   │   ├── PreviewPanel.tsx
   │   ├── TerminalPreview.tsx
   │   ├── CodeEditor.tsx
   │   └── ContrastChecker.tsx
   ├── lib/
   │   ├── colors.ts          # Color operations
   │   ├── generators.ts      # Preset generators
   │   ├── export.ts          # Export functions
   │   └── urlState.ts        # URL encoding/decoding
   ├── types/
   │   └── scheme.ts          # TypeScript interfaces
   ├── data/
   │   ├── defaultScheme.ts
   │   └── codeSnippets.ts    # Example code for each language
   ├── App.tsx
   └── main.tsx
   ```

3. **Setup Tailwind Config**
   - Configure for dark mode
   - Add custom color utilities

4. **Create Type Definitions**
   ```typescript
   // src/types/scheme.ts
   export interface OKLCHColor {
     h: number; // 0-360
     c: number; // 0-0.4
     l: number; // 0-1
   }

   export interface ColorScheme {
     base00: OKLCHColor;
     base01: OKLCHColor;
     // ... base02-0F
   }

   export interface GlobalFilters {
     hueShift: number;
     saturationScale: number;
     lightnessCurve: number;
   }

   export type GenerationMode = 
     | 'manual' 
     | 'monochromatic' 
     | 'analogous' 
     | 'complementary' 
     | 'triadic';
   ```

### Phase 2: Color Management (Priority: HIGH)
**Estimated Time: 3-4 hours**

1. **Color Operations Library**
   ```typescript
   // src/lib/colors.ts
   - oklchToHex()
   - hexToOklch()
   - applyGlobalFilters()
   - calculateContrast()
   - validateColor()
   ```

2. **Color Generators**
   ```typescript
   // src/lib/generators.ts
   - generateMonochromatic(baseColor: OKLCHColor)
   - generateAnalogous(baseColor: OKLCHColor)
   - generateComplementary(baseColor: OKLCHColor)
   - generateTriadic(baseColor: OKLCHColor)
   ```

3. **Default Scheme**
   - Create a pleasant default color scheme
   - Use as starting point

### Phase 3: Control Panel Components (Priority: HIGH)
**Estimated Time: 4-5 hours**

1. **ColorSlider Component**
   - Range input for H, C, L
   - Display current value
   - Color preview swatch
   - Label with base## name

2. **Mode Selector**
   - Radio buttons for generation modes
   - Triggers regeneration on change

3. **Global Filters Panel**
   - Three sliders with labels
   - Apply to all colors in real-time

4. **Export Panel**
   - Text inputs for name and author
   - Export button (downloads YAML)
   - Share URL button (copies to clipboard)

### Phase 4: Preview Panel Components (Priority: HIGH)
**Estimated Time: 5-6 hours**

1. **TerminalPreview Component**
   ```typescript
   // Displays:
   // - Neofetch-style output with ASCII art
   // - ls -la formatted file listing
   // - Shell prompt
   // Uses computed hex colors from scheme
   ```

2. **CodeEditor Component**
   ```typescript
   // Features:
   // - Tab navigation for languages
   // - Line numbers
   // - Syntax highlighting with scheme colors
   // - Pre-defined code snippets per language
   ```

3. **Syntax Highlighting**
   - Map Base16 colors to syntax categories:
     - base00: background
     - base05: foreground
     - base08: variables, keywords
     - base09: integers, booleans
     - base0A: classes, types
     - base0B: strings
     - base0C: regex, escapes
     - base0D: functions
     - base0E: statements
     - base0F: deprecated

4. **Code Snippets Data**
   ```typescript
   // src/data/codeSnippets.ts
   export const snippets = {
     cpp: `// C++ example...`,
     python: `# Python example...`,
     rust: `// Rust example...`,
     // ... etc for all 7 languages
   };
   ```

### Phase 5: Contrast Checker (Priority: HIGH)
**Estimated Time: 2-3 hours**

1. **ContrastChecker Component**
   - Calculate contrast for base05-0F against base00
   - Display ratio with visual indicator
   - Sort by passing/failing
   - Highlight problematic pairs

### Phase 6: State Management & URL Sharing (Priority: HIGH)
**Estimated Time: 3-4 hours**

1. **App State**
   - React Context or useState at App level
   - Centralize color scheme state

2. **URL State Management**
   ```typescript
   // src/lib/urlState.ts
   - encodeToURL(scheme: ColorScheme)
   - decodeFromURL(hash: string)
   - updateURLHash(scheme: ColorScheme)
   ```

3. **Load from URL on Mount**
   - Parse URL hash on initial load
   - Apply decoded scheme to state

4. **Update URL on Change**
   - Debounced update to avoid excessive history entries

### Phase 7: Export Functionality (Priority: HIGH)
**Estimated Time: 2-3 hours**

1. **Base16 YAML Export**
   ```typescript
   // src/lib/export.ts
   function exportBase16Yaml(
     scheme: ColorScheme, 
     metadata: { name: string; author: string }
   ): string {
     // Generate YAML format
     // Return as string
   }
   ```

2. **Download Trigger**
   - Create blob from YAML string
   - Trigger download with proper filename

3. **Extensible Export System**
   ```typescript
   interface Exporter {
     name: string;
     extension: string;
     generate: (scheme: ColorScheme) => string;
   }

   // Easy to add more formats later
   const exporters: Exporter[] = [
     { name: 'Base16 YAML', extension: '.yaml', generate: exportBase16Yaml },
     // Future: Alacritty, kitty, etc.
   ];
   ```

### Phase 8: Polish & Optimization (Priority: MEDIUM)
**Estimated Time: 2-3 hours**

1. **Responsive Design**
   - Ensure layout works on different screen sizes
   - Mobile-friendly controls

2. **Performance**
   - Memoize expensive color calculations
   - Debounce slider updates

3. **Accessibility**
   - Proper ARIA labels
   - Keyboard navigation
   - Focus indicators

4. **UX Improvements**
   - Loading states
   - Error handling
   - Tooltips/help text

### Phase 9: Deployment Setup (Priority: HIGH)
**Estimated Time: 1-2 hours**

1. **GitHub Pages Configuration**
   ```json
   // package.json
   {
     "scripts": {
       "build": "vite build",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **Vite Config for GitHub Pages**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/oklch-scheme-generator/', // Your repo name
     plugins: [react()],
   });
   ```

3. **Deploy**
   ```bash
   npm install -D gh-pages
   npm run deploy
   ```

### Phase 10: Testing & Documentation (Priority: MEDIUM)
**Estimated Time: 2-3 hours**

1. **Manual Testing**
   - Test all generation modes
   - Verify exports
   - Check URL sharing
   - Test contrast calculations

2. **README.md**
   - Usage instructions
   - Feature list
   - Screenshots
   - Development setup

## File-by-File Implementation Order

### Priority 1: Foundation
1. `vite.config.ts` - Build configuration
2. `tailwind.config.js` - Styling setup
3. `src/types/scheme.ts` - Type definitions
4. `src/data/defaultScheme.ts` - Default color scheme
5. `src/lib/colors.ts` - Core color operations
6. `src/lib/generators.ts` - Preset generators

### Priority 2: Components
7. `src/components/ColorSlider.tsx` - Individual color control
8. `src/components/ControlPanel.tsx` - Left panel container
9. `src/components/TerminalPreview.tsx` - Terminal mock
10. `src/components/CodeEditor.tsx` - Code preview
11. `src/components/ContrastChecker.tsx` - Contrast display
12. `src/components/PreviewPanel.tsx` - Right panel container

### Priority 3: Integration
13. `src/lib/urlState.ts` - URL encoding/decoding
14. `src/lib/export.ts` - Export functionality
15. `src/data/codeSnippets.ts` - Example code
16. `src/App.tsx` - Main application
17. `src/main.tsx` - Entry point

### Priority 4: Deployment
18. `package.json` - Add deployment scripts
19. `README.md` - Documentation
20. `.github/workflows/deploy.yml` - Optional: Auto-deploy on push

## Key Implementation Notes

### Color Space Handling
- Always work in OKLCH internally
- Convert to hex only for display and export
- Clamp values to valid ranges (H: 0-360, C: 0-0.4, L: 0-1)
- Handle edge cases (very low chroma, out-of-gamut colors)

### Performance Considerations
- Use `useMemo` for color conversions
- Debounce slider updates (100-200ms)
- Lazy load code snippets
- Optimize re-renders with `React.memo`

### Browser Compatibility
- Test OKLCH support (may need fallback)
- Use modern CSS features safely
- Ensure clipboard API works (for share URL)

### State Updates
```typescript
// Example state update flow
User moves slider 
  → Update OKLCH value in state
  → Apply global filters
  → Convert to hex
  → Update preview components
  → Update URL hash (debounced)
```

### Contrast Calculation Priority
Focus on these critical pairs:
1. base05 (default foreground) / base00 (background)
2. base08-0F (accent colors) / base00 (background)
3. base03 (comments) / base00 (background)

## Testing Checklist

### Functional Testing
- [ ] All sliders update colors correctly
- [ ] Global filters affect all colors
- [ ] Each generation mode produces expected results
- [ ] Terminal preview displays correctly
- [ ] Code editor shows all 7 languages
- [ ] Contrast checker shows accurate ratios
- [ ] Export produces valid Base16 YAML
- [ ] Share URL can be copied
- [ ] Loading from URL works correctly

### Visual Testing
- [ ] Layout is responsive
- [ ] Colors update in real-time
- [ ] No visual glitches during updates
- [ ] Proper spacing and alignment

### Browser Testing
- [ ] Chrome/Blink: Full functionality
- [ ] Firefox/Gecko: Full functionality

## Success Criteria
1. User can create a color scheme using OKLCH sliders
2. Real-time preview updates smoothly
3. Terminal and code editor accurately reflect the scheme
4. Contrast ratios are calculated and displayed
5. Export produces valid Base16 YAML
6. Share URL allows scheme sharing
7. Works on Chrome and Firefox
8. Deploys successfully to GitHub Pages

## Future Enhancements (Post-MVP)
- Import existing Base16 schemes
- Color picker integration
- Undo/redo functionality
- Scheme presets library
- Additional export formats (Alacritty, kitty, Xresources, iTerm2)
- Local storage for saving schemes
- Dark/light theme toggle for the app itself
- Accessibility mode (high contrast UI)
- Export as CSS custom properties
- Integration with terminal emulator APIs

---

## Implementation Command for Claude Code

When ready to implement, use:
```bash
# Initialize project
npm create vite@latest oklch-scheme-generator -- --template react-ts

# Follow the phase-by-phase implementation plan above
# Start with Phase 1, then proceed sequentially
```

All code comments and UI text should be in English.
