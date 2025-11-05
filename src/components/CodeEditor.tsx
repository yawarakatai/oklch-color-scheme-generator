import { useState } from 'react';
import type { SupportedLanguage } from '../types/scheme';
import { codeSnippets, languageNames } from '../data/codeSnippets';

interface CodeEditorProps {
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

export function CodeEditor({ colors }: CodeEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>('cpp');

  const languages: SupportedLanguage[] = ['cpp', 'html', 'javascript', 'python', 'rust', 'go', 'nix'];

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: colors.base00, color: colors.base05 }}
    >
      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: colors.base02 }}>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLanguage(lang)}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeLanguage === lang ? colors.base01 : colors.base00,
              color: activeLanguage === lang ? colors.base05 : colors.base04,
              borderBottom: activeLanguage === lang ? `2px solid ${colors.base0D}` : 'none',
            }}
          >
            {languageNames[lang]}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="p-4 overflow-auto font-mono text-sm" style={{ maxHeight: '400px' }}>
        {highlightCode(codeSnippets[activeLanguage], activeLanguage, colors)}
      </div>
    </div>
  );
}
