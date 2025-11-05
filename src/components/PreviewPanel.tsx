import { Preview } from './Preview';
import { ContrastChecker } from './ContrastChecker';

interface PreviewPanelProps {
  colors: Record<string, string>;
}

export function PreviewPanel({ colors }: PreviewPanelProps) {
  return (
    <div className="h-full overflow-y-auto p-2 bg-neutral-900 space-y-3">
      {/* Preview */}
      <div>
        <h2 className="text-sm font-semibold text-neutral-300 mb-1.5">Preview</h2>
        <Preview colors={colors} />
      </div>

      {/* Contrast Checker */}
      <div>
        <h2 className="text-sm font-semibold text-neutral-300 mb-1.5">Contrast Analysis</h2>
        <ContrastChecker colors={colors} />
      </div>
    </div>
  );
}
