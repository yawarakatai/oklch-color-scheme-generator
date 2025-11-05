# OKLCH Color Scheme Generator

A web-based color scheme generator for Linux ricing using the OKLCH color space. Create beautiful terminal and editor color schemes with real-time preview and Base16 export functionality.

## Features

- **OKLCH Color Space**: Perceptually uniform color adjustments with Hue, Chroma, and Lightness controls
- **Multiple Generation Modes**:
  - Manual: Fine-tune each of the 16 colors individually
  - Monochromatic: Single hue with varying lightness
  - Analogous: Colors within 30° of each other on the color wheel
  - Complementary: Opposite colors on the color wheel (180°)
  - Triadic: Three colors evenly spaced around the color wheel (120°)
- **Real-time Preview**:
  - Terminal output with neofetch and ls -la examples
  - Code editor with syntax highlighting for 7 languages (C++, HTML/CSS, TypeScript, Python, Rust, Go, Nix)
  - WCAG contrast ratio checker
- **Global Filters**:
  - Hue shift (±180°)
  - Saturation scaling (0-200%)
  - Lightness curve adjustment (±0.3)
- **Export & Share**:
  - Export as Base16 YAML format
  - Share color schemes via URL
  - URL-based state persistence

## Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Color Library**: culori (OKLCH color space operations)
- **Deployment**: GitHub Pages

## Development

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yawarakatai/oklch-color-scheme-generator.git
cd oklch-color-scheme-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy

```bash
npm run deploy
```

This will build and deploy to GitHub Pages.

## Usage

### Creating a Color Scheme

1. **Choose a Generation Mode**:
   - Start with a preset mode (Monochromatic, Analogous, etc.) for quick generation
   - Or use Manual mode for full control

2. **Adjust Individual Colors**:
   - Each color has three sliders:
     - **H (Hue)**: 0-360° - The color angle on the color wheel
     - **C (Chroma)**: 0-0.4 - The color intensity/saturation
     - **L (Lightness)**: 0-1 - The perceived brightness

3. **Apply Global Filters**:
   - **Hue Shift**: Rotate all colors around the color wheel
   - **Saturation Scale**: Increase or decrease color intensity for all colors
   - **Lightness Curve**: Brighten or darken the entire scheme

4. **Preview**:
   - See your scheme in action with terminal and code editor previews
   - Check contrast ratios to ensure readability

5. **Export**:
   - Enter a scheme name and author
   - Click "Export Base16 YAML" to download
   - Click "Copy Share URL" to share your scheme

### Base16 Color Assignments

- `base00` - Default Background
- `base01` - Lighter Background (status bars, line numbers)
- `base02` - Selection Background
- `base03` - Comments, Invisibles, Line Highlighting
- `base04` - Dark Foreground (status bars)
- `base05` - Default Foreground, Caret, Delimiters
- `base06` - Light Foreground
- `base07` - Light Background
- `base08` - Variables, XML Tags, Markup Link Text (Red)
- `base09` - Integers, Boolean, Constants, XML Attributes (Orange)
- `base0A` - Classes, Markup Bold, Search Text Background (Yellow)
- `base0B` - Strings, Inherited Class, Markup Code (Green)
- `base0C` - Support, Regular Expressions, Escape Characters (Cyan)
- `base0D` - Functions, Methods, Attribute IDs, Headings (Blue)
- `base0E` - Keywords, Storage, Selector, Markup Italic (Magenta)
- `base0F` - Deprecated, Opening/Closing Embedded Language Tags (Brown)

## OKLCH Color Space

OKLCH (Oklab cylindrical coordinates) is a perceptually uniform color space that makes it easier to create harmonious color schemes:

- **Perceptually Uniform**: Equal changes in values produce equal perceived color differences
- **Predictable Lightness**: The L value directly corresponds to perceived brightness
- **Better Chroma**: Colors maintain their perceived intensity across different hues
- **Human-Centric**: Designed to match how humans actually perceive color

This makes OKLCH ideal for creating color schemes where relationships between colors matter.

## Project Structure

```
src/
├── components/          # React components
│   ├── ColorSlider.tsx         # Individual color control
│   ├── ControlPanel.tsx        # Left panel (controls & export)
│   ├── TerminalPreview.tsx     # Terminal output preview
│   ├── CodeEditor.tsx          # Code syntax highlighting preview
│   ├── ContrastChecker.tsx     # WCAG contrast analysis
│   └── PreviewPanel.tsx        # Right panel container
├── lib/                 # Core functionality
│   ├── colors.ts               # OKLCH↔Hex conversion, contrast
│   ├── generators.ts           # Color scheme generators
│   ├── export.ts               # Base16 export & sharing
│   └── urlState.ts             # URL encoding/decoding
├── types/
│   └── scheme.ts               # TypeScript type definitions
├── data/
│   ├── defaultScheme.ts        # Default color scheme
│   └── codeSnippets.ts         # Example code for preview
├── App.tsx              # Main application
└── main.tsx             # Entry point
```

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Base16](https://github.com/chriskempson/base16) - Color scheme architecture
- [culori](https://culorijs.org/) - OKLCH color space implementation
- [OKLCH Color Picker](https://oklch.com/) - Inspiration for OKLCH-based tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Enhancements

- Import existing Base16 schemes
- Color picker integration
- Additional export formats (Alacritty, kitty, Xresources, iTerm2)
- Scheme presets library
- Undo/redo functionality
- Local storage for saving schemes
- More code languages for preview
