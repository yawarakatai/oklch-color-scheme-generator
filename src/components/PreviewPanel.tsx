import { TerminalPreview } from './TerminalPreview';
import { CodeEditor } from './CodeEditor';
import { ContrastChecker } from './ContrastChecker';

interface PreviewPanelProps {
  colors: Record<string, string>;
}

export function PreviewPanel({ colors }: PreviewPanelProps) {
  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-900 space-y-6">
      {/* Terminal Preview */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-2">Terminal Preview</h2>
        <TerminalPreview colors={colors} />
      </div>

      {/* Code Editor Preview */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-2">Code Editor Preview</h2>
        <CodeEditor colors={colors} />
      </div>

      {/* Contrast Checker */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-2">Contrast Analysis</h2>
        <ContrastChecker colors={colors} />
      </div>
    </div>
  );
}
