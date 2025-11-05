import { Preview } from './Preview';
import { ContrastChecker } from './ContrastChecker';

interface PreviewPanelProps {
  colors: Record<string, string>;
}

export function PreviewPanel({ colors }: PreviewPanelProps) {
  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-900 space-y-6">
      {/* Preview */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-2">Preview</h2>
        <Preview colors={colors} />
      </div>

      {/* Contrast Checker */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-2">Contrast Analysis</h2>
        <ContrastChecker colors={colors} />
      </div>
    </div>
  );
}
