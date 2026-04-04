'use client';

import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';

// Register the languages used in enterprise apps — keeps bundle small
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python      from 'highlight.js/lib/languages/python';
import bash        from 'highlight.js/lib/languages/bash';
import json        from 'highlight.js/lib/languages/json';
import xml         from 'highlight.js/lib/languages/xml';
import yaml        from 'highlight.js/lib/languages/yaml';
import sql         from 'highlight.js/lib/languages/sql';
import cssLang     from 'highlight.js/lib/languages/css';
import go          from 'highlight.js/lib/languages/go';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python',     python);
hljs.registerLanguage('bash',       bash);
hljs.registerLanguage('json',       json);
hljs.registerLanguage('xml',        xml);
hljs.registerLanguage('yaml',       yaml);
hljs.registerLanguage('sql',        sql);
hljs.registerLanguage('css',        cssLang);
hljs.registerLanguage('go',         go);
// aliases
hljs.registerLanguage('js',   javascript);
hljs.registerLanguage('ts',   typescript);
hljs.registerLanguage('sh',   bash);
hljs.registerLanguage('html', xml);

// ─── DS theme (injected once into <head>) ─────────────────────────────────────
// Uses CSS variables → follows dark mode and brand theme automatically.

const HLJS_STYLE_ID = 'ds-hljs-theme';

const HLJS_CSS = `
.ds-hljs code.hljs        { color: var(--ds-text-primary);    background: transparent; display:block; overflow-x:auto; }
.ds-hljs .hljs-keyword,
.ds-hljs .hljs-built_in   { color: var(--ds-brand-600);       font-weight: 600; }
.ds-hljs .hljs-string,
.ds-hljs .hljs-attr       { color: var(--ds-success-text); }
.ds-hljs .hljs-number,
.ds-hljs .hljs-literal    { color: var(--ds-warning-text); }
.ds-hljs .hljs-comment    { color: var(--ds-text-muted);      font-style: italic; }
.ds-hljs .hljs-function,
.ds-hljs .hljs-title      { color: var(--ds-info-text); }
.ds-hljs .hljs-variable,
.ds-hljs .hljs-name       { color: var(--ds-text-primary); }
.ds-hljs .hljs-tag        { color: var(--ds-danger-text); }
.ds-hljs .hljs-selector   { color: var(--ds-brand-600); }
.ds-hljs .hljs-type       { color: var(--ds-warning-text); }
.ds-hljs .hljs-meta       { color: var(--ds-text-muted); }
`;

function injectTheme() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(HLJS_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = HLJS_STYLE_ID;
  style.textContent = HLJS_CSS;
  document.head.appendChild(style);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type CodeBlockLanguage =
  | 'javascript' | 'typescript' | 'python' | 'bash' | 'json'
  | 'xml' | 'yaml' | 'sql' | 'css' | 'go'
  | 'js' | 'ts' | 'sh' | 'html' | 'text';

export interface CodeBlockProps {
  /** The source code string */
  code:             string;
  /** Language for syntax highlighting */
  language?:        CodeBlockLanguage;
  /** File name shown in the header bar */
  filename?:        string;
  /** Show line numbers in the gutter */
  lineNumbers?:     boolean;
  /** 1-indexed line numbers to highlight in yellow */
  highlightLines?:  number[];
  /** Show copy-to-clipboard button */
  showCopy?:        boolean;
  /** Max height before vertical scroll kicks in */
  maxHeight?:       number | string;
  /** Remove the card frame (for inline/embedded use) */
  bare?:            boolean;
  className?:       string;
}

// ─── Language display label ───────────────────────────────────────────────────

const LANG_LABEL: Record<string, string> = {
  javascript: 'JavaScript', js: 'JS',
  typescript: 'TypeScript', ts: 'TS',
  python: 'Python', bash: 'Bash', sh: 'Shell',
  json: 'JSON', xml: 'XML', html: 'HTML',
  yaml: 'YAML', sql: 'SQL', css: 'CSS', go: 'Go',
  text: 'Plain text',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CodeBlock({
  code,
  language        = 'text',
  filename,
  lineNumbers     = false,
  highlightLines  = [],
  showCopy        = true,
  maxHeight,
  bare            = false,
  className       = '',
}: CodeBlockProps) {
  const [copied, setCopied]   = useState(false);
  const codeRef               = useRef<HTMLElement>(null);

  useEffect(() => { injectTheme(); }, []);

  // Re-highlight whenever code or language changes
  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    el.removeAttribute('data-highlighted');
    if (language !== 'text') {
      hljs.highlightElement(el);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trimEnd());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const langLabel  = LANG_LABEL[language] ?? language;
  const showHeader = filename !== undefined || showCopy;
  const lines      = code.split('\n');

  const scrollStyle: React.CSSProperties = maxHeight
    ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, overflowY: 'auto' }
    : {};

  return (
    <div
      className={[
        'ds-hljs overflow-hidden font-mono text-[0.8125rem] leading-6',
        bare ? '' : 'rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-raised)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* ── Header bar ─────────────────────────────────────────────── */}
      {showHeader && (
        <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] font-sans">
          <div className="flex items-center gap-2 min-w-0">
            {filename ? (
              <>
                <span className="text-xs font-mono text-[var(--ds-text-secondary)] truncate">{filename}</span>
                <span className="text-xs text-[var(--ds-border-strong)]">·</span>
                <span className="text-xs text-[var(--ds-text-muted)]">{langLabel}</span>
              </>
            ) : (
              <span className="text-xs font-medium text-[var(--ds-text-muted)]">{langLabel}</span>
            )}
          </div>
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className={[
                'shrink-0 text-xs px-2.5 py-1 rounded-md border transition-all duration-[var(--ds-duration-base)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                copied
                  ? 'border-[var(--ds-success-border)] text-[var(--ds-success-text)] bg-[var(--ds-success-bg)]'
                  : 'border-[var(--ds-border-base)] text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:border-[var(--ds-border-strong)]',
              ].join(' ')}
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}

      {/* ── Code area ──────────────────────────────────────────────── */}
      <div className="overflow-x-auto" style={scrollStyle}>
        {lineNumbers ? (
          // Line-numbers mode: table layout, hljs highlight spans per line
          <table className="w-full border-collapse" aria-label="Code">
            <tbody>
              {lines.map((line, i) => {
                const lineNum  = i + 1;
                const isActive = highlightLines.includes(lineNum);
                return (
                  <tr
                    key={i}
                    className={[
                      isActive
                        ? 'bg-[var(--ds-warning-bg)] border-l-2 border-[var(--ds-warning-icon)]'
                        : 'hover:bg-[var(--ds-bg-subtle)]',
                    ].join(' ')}
                  >
                    {/* Line number gutter */}
                    <td
                      className="select-none text-right pl-4 pr-3 py-0 w-10 text-[var(--ds-text-muted)] align-top"
                      aria-hidden="true"
                    >
                      <span className="leading-6 inline-block">{lineNum}</span>
                    </td>
                    {/* Code cell */}
                    <td className="pr-4 py-0 align-top">
                      <span
                        className="block leading-6 whitespace-pre"
                        dangerouslySetInnerHTML={{
                          __html: language !== 'text'
                            ? hljs.highlight(line || ' ', { language, ignoreIllegals: true }).value
                            : (line || '\u00a0'),
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          // Default mode: single pre/code block, hljs highlights the whole block
          <pre className="m-0 p-4">
            <code
              ref={codeRef}
              className={language !== 'text' ? `language-${language}` : ''}
            >
              {code}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
