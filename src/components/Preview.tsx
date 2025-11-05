import { useState } from 'react';
import type { SupportedLanguage, PreviewTab } from '../types/scheme';
import { codeSnippets } from '../data/codeSnippets';

interface PreviewProps {
  colors: Record<string, string>;
}

// Simple syntax highlighter based on Base16 color assignments
function highlightCode(code: string, _language: SupportedLanguage, colors: Record<string, string>) {
  // Base16 color mappings
  const tokenColors = {
    comment: colors.base03,
    string: colors.base0B,
    number: colors.base09,
    keyword: colors.base0E,
    function: colors.base0D,
    class: colors.base0A,
    variable: colors.base08,
    operator: colors.base05,
    punctuation: colors.base05,
    tag: colors.base08,
    attribute: colors.base09,
    value: colors.base0B,
    constant: colors.base09,
    type: colors.base0A,
  };

  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    // Simple pattern matching for syntax highlighting
    const highlightedLine: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Preserve leading whitespace for indentation
    const leadingWhitespace = line.match(/^[\s]*/);
    if (leadingWhitespace && leadingWhitespace[0].length > 0) {
      highlightedLine.push(
        <span key={key++} style={{ whiteSpace: 'pre' }}>{leadingWhitespace[0]}</span>
      );
      remaining = remaining.slice(leadingWhitespace[0].length);
    }

    while (remaining.length > 0) {
      let matched = false;

      // Comments
      if (remaining.match(/^(\/\/|#|\/\*|\*\/)/)) {
        const match = remaining.match(/^(\/\/.*|#.*|\/\*[\s\S]*?\*\/)/);
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.comment }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // Strings
      if (!matched && remaining.match(/^["'`]/)) {
        const quote = remaining[0];
        const match = remaining.match(new RegExp(`^${quote}(?:\\\\.|[^${quote}\\\\])*${quote}`));
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.string }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // Numbers
      if (!matched && remaining.match(/^\d+(\.\d+)?/)) {
        const match = remaining.match(/^\d+(\.\d+)?/);
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.number }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // Keywords
      const keywords = [
        'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import',
        'export', 'from', 'async', 'await', 'new', 'this', 'typeof', 'interface', 'type', 'enum',
        'public', 'private', 'protected', 'static', 'void', 'int', 'string', 'bool', 'true', 'false',
        'null', 'undefined', 'extends', 'implements', 'def', 'self', 'None', 'True', 'False',
        'fn', 'struct', 'impl', 'use', 'pub', 'mod', 'mut', 'package', 'func', 'map', 'chan',
        'go', 'defer', 'select', 'case', 'switch', 'with', 'inherit', 'rec', 'in'
      ];

      if (!matched) {
        const keywordPattern = new RegExp(`^(${keywords.join('|')})\\b`);
        const match = remaining.match(keywordPattern);
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.keyword }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // Function calls
      if (!matched && remaining.match(/^[a-zA-Z_]\w*(?=\()/)) {
        const match = remaining.match(/^[a-zA-Z_]\w*/);
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.function }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // Types and classes (capitalized words)
      if (!matched && remaining.match(/^[A-Z][a-zA-Z0-9_]*/)) {
        const match = remaining.match(/^[A-Z][a-zA-Z0-9_]*/);
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.class }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // HTML/XML tags
      if (!matched && remaining.match(/^<\/?[a-zA-Z][a-zA-Z0-9-]*>/)) {
        const match = remaining.match(/^<\/?[a-zA-Z][a-zA-Z0-9-]*>/);
        if (match) {
          highlightedLine.push(
            <span key={key++} style={{ color: tokenColors.tag }}>{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
        }
      }

      // Default: add next character
      if (!matched) {
        highlightedLine.push(
          <span key={key++} style={{ color: tokenColors.operator }}>{remaining[0]}</span>
        );
        remaining = remaining.slice(1);
      }
    }

    return (
      <div key={lineIndex} style={{ whiteSpace: 'pre-wrap' }}>
        <span className="inline-block w-12 text-right pr-4 select-none" style={{ color: colors.base03 }}>
          {lineIndex + 1}
        </span>
        <span>{highlightedLine}</span>
      </div>
    );
  });
}

function TerminalContent({ colors }: { colors: Record<string, string> }) {
  return (
    <div className="font-mono text-sm">
      {/* Shell prompt */}
      <div className="mb-4">
        <span style={{ color: colors.base0B }}>user@hostname</span>
        <span style={{ color: colors.base05 }}>:</span>
        <span style={{ color: colors.base0D }}>~</span>
        <span style={{ color: colors.base05 }}>$ </span>
        <span style={{ color: colors.base05 }}>neofetch</span>
      </div>

      {/* Neofetch-style output */}
      <div className="mb-4 flex gap-4">
        {/* ASCII Art */}
        <pre style={{ color: colors.base0D }} className="flex-shrink-0">
{`       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`""""`}
        </pre>

        {/* System info */}
        <div className="flex-1 space-y-1">
          <div>
            <span style={{ color: colors.base0B }}>user</span>
            <span style={{ color: colors.base05 }}>@</span>
            <span style={{ color: colors.base0B }}>hostname</span>
          </div>
          <div style={{ color: colors.base03 }}>-----------------</div>
          <div>
            <span style={{ color: colors.base0D }}>OS:</span>{' '}
            <span style={{ color: colors.base05 }}>Arch Linux x86_64</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Kernel:</span>{' '}
            <span style={{ color: colors.base05 }}>6.6.10-arch1-1</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Uptime:</span>{' '}
            <span style={{ color: colors.base05 }}>2 hours, 34 mins</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Shell:</span>{' '}
            <span style={{ color: colors.base05 }}>zsh 5.9</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>WM:</span>{' '}
            <span style={{ color: colors.base05 }}>i3</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Terminal:</span>{' '}
            <span style={{ color: colors.base05 }}>alacritty</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>CPU:</span>{' '}
            <span style={{ color: colors.base05 }}>AMD Ryzen 9 5950X (32) @ 3.400GHz</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Memory:</span>{' '}
            <span style={{ color: colors.base05 }}>8192MiB / 32768MiB</span>
          </div>
          <div className="mt-2 flex gap-1">
            {[colors.base08, colors.base09, colors.base0A, colors.base0B,
              colors.base0C, colors.base0D, colors.base0E, colors.base0F].map((color, i) => (
              <div
                key={i}
                className="w-6 h-4"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ls -la output */}
      <div className="mb-2">
        <span style={{ color: colors.base0B }}>user@hostname</span>
        <span style={{ color: colors.base05 }}>:</span>
        <span style={{ color: colors.base0D }}>~</span>
        <span style={{ color: colors.base05 }}>$ </span>
        <span style={{ color: colors.base05 }}>ls -la</span>
      </div>

      <div className="space-y-1">
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 12 user user </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 15 10:30 </span>
          <span style={{ color: colors.base0D }}>.</span>
        </div>
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 24 root root </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 10 08:15 </span>
          <span style={{ color: colors.base0D }}>..</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>220</span>
          <span style={{ color: colors.base05 }}> Jan 01 12:00 </span>
          <span style={{ color: colors.base03 }}>.bash_logout</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>3526</span>
          <span style={{ color: colors.base05 }}> Jan 01 12:00 </span>
          <span style={{ color: colors.base03 }}>.bashrc</span>
        </div>
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 3 user user </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 14 15:22 </span>
          <span style={{ color: colors.base0D, fontWeight: 'bold' }}>.config</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>1024</span>
          <span style={{ color: colors.base05 }}> Jan 15 09:45 </span>
          <span style={{ color: colors.base05 }}>document.txt</span>
        </div>
        <div>
          <span style={{ color: colors.base0B }}>-rwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>8192</span>
          <span style={{ color: colors.base05 }}> Jan 14 18:30 </span>
          <span style={{ color: colors.base0B, fontWeight: 'bold' }}>my-script.sh</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>2048</span>
          <span style={{ color: colors.base05 }}> Jan 13 14:20 </span>
          <span style={{ color: colors.base05 }}>notes.md</span>
        </div>
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 5 user user </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 15 10:15 </span>
          <span style={{ color: colors.base0D, fontWeight: 'bold' }}>projects</span>
        </div>
        <div>
          <span style={{ color: colors.base08 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>0</span>
          <span style={{ color: colors.base05 }}> Jan 15 10:30 </span>
          <span style={{ color: colors.base08 }}>error.log</span>
        </div>
      </div>

      <div className="mt-4">
        <span style={{ color: colors.base0B }}>user@hostname</span>
        <span style={{ color: colors.base05 }}>:</span>
        <span style={{ color: colors.base0D }}>~</span>
        <span style={{ color: colors.base05 }}>$ </span>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}

export function Preview({ colors }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('cpp');

  const tabs: { value: PreviewTab; label: string }[] = [
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML/CSS' },
    { value: 'javascript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' },
    { value: 'nix', label: 'Nix' },
    { value: 'terminal', label: 'Terminal' },
  ];

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: colors.base00, color: colors.base05 }}
    >
      {/* Tabs */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: colors.base02 }}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className="px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
            style={{
              backgroundColor: activeTab === tab.value ? colors.base01 : colors.base00,
              color: activeTab === tab.value ? colors.base05 : colors.base04,
              borderBottom: activeTab === tab.value ? `2px solid ${colors.base0D}` : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-3 overflow-auto font-mono text-sm" style={{ maxHeight: '70vh' }}>
        {activeTab === 'terminal' ? (
          <TerminalContent colors={colors} />
        ) : (
          highlightCode(codeSnippets[activeTab as SupportedLanguage], activeTab as SupportedLanguage, colors)
        )}
      </div>
    </div>
  );
}
