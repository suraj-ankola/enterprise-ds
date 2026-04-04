'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TextBolderIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextStrikethroughIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  LinkIcon,
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
  TextHIcon,
  CodeIcon,
  QuotesIcon,
  XIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RichTextEditorSize = 'sm' | 'md' | 'lg';

export interface RichTextEditorProps {
  /** HTML string value */
  value?:        string;
  onChange?:     (html: string) => void;
  placeholder?:  string;
  label?:        string;
  helperText?:   string;
  error?:        string;
  /** Min height in px */
  minHeight?:    number;
  /** Max height before scroll (px) */
  maxHeight?:    number;
  disabled?:     boolean;
  /** Show word count in footer */
  showWordCount?: boolean;
  size?:         RichTextEditorSize;
  className?:    string;
}

// ─── Toolbar button ───────────────────────────────────────────────────────────

interface ToolbarBtnProps {
  icon:      React.ReactNode;
  title:     string;
  command?:  string;
  value?:    string;
  active?:   boolean;
  onClick?:  () => void;
  disabled?: boolean;
}

function ToolbarBtn({ icon, title, command, value, active, onClick, disabled = false }: ToolbarBtnProps) {
  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault(); // prevent editor blur
    if (disabled) return;
    if (onClick) { onClick(); return; }
    if (command) {
      document.execCommand(command, false, value);
    }
  }

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      className={[
        'h-7 w-7 flex items-center justify-center rounded-md text-sm',
        'transition-colors duration-[var(--ds-duration-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : active
            ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]'
            : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
      ].join(' ')}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <span className="w-px h-5 bg-[var(--ds-border-base)] mx-0.5 shrink-0" aria-hidden="true" />;
}

// ─── Link dialog ──────────────────────────────────────────────────────────────

interface LinkDialogProps {
  onConfirm: (url: string) => void;
  onCancel:  () => void;
}

function LinkDialog({ onConfirm, onCancel }: LinkDialogProps) {
  const [url, setUrl] = useState('https://');
  const inputRef      = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="absolute top-full left-0 mt-1 z-[var(--ds-z-dropdown)] bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-lg p-3 min-w-[280px]">
      <p className="text-xs font-semibold text-[var(--ds-text-primary)] mb-2">Insert link</p>
      <input
        ref={inputRef}
        type="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter')  { e.preventDefault(); onConfirm(url); }
          if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
        }}
        className={[
          'w-full h-8 px-3 text-sm rounded-lg border',
          'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
          'border-[var(--ds-border-base)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-brand-500)]',
        ].join(' ')}
        placeholder="https://example.com"
      />
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); onConfirm(url); }}
          className="flex-1 h-7 text-xs rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors"
        >
          Insert
        </button>
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); onCancel(); }}
          className="h-7 w-7 flex items-center justify-center rounded-lg border border-[var(--ds-border-base)] text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] transition-colors"
          aria-label="Cancel"
        >
          <XIcon size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const MIN_H: Record<RichTextEditorSize, number> = { sm: 80, md: 140, lg: 220 };
const PROSE_SIZE: Record<RichTextEditorSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

// ─── RichTextEditor ───────────────────────────────────────────────────────────

export function RichTextEditor({
  value         = '',
  onChange,
  placeholder   = 'Start writing…',
  label,
  helperText,
  error,
  minHeight,
  maxHeight,
  disabled      = false,
  showWordCount = false,
  size          = 'md',
  className     = '',
}: RichTextEditorProps) {
  const editorRef     = useRef<HTMLDivElement>(null);
  const [linkOpen, setLinkOpen]     = useState(false);
  const [wordCount, setWordCount]   = useState(0);

  // Initialise content once
  useEffect(() => {
    const el = editorRef.current;
    if (!el || el.innerHTML === value) return;
    el.innerHTML = value;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const html = el.innerHTML;
    onChange?.(html === '<br>' ? '' : html);
    if (showWordCount) {
      const text = el.innerText.trim();
      setWordCount(text ? text.split(/\s+/).length : 0);
    }
  }, [onChange, showWordCount]);

  // active state polling
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  function updateActiveFormats() {
    const formats = new Set<string>();
    if (document.queryCommandState('bold'))          formats.add('bold');
    if (document.queryCommandState('italic'))        formats.add('italic');
    if (document.queryCommandState('underline'))     formats.add('underline');
    if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough');
    setActiveFormats(formats);
  }

  function insertLink(url: string) {
    setLinkOpen(false);
    if (!url) return;
    editorRef.current?.focus();
    document.execCommand('createLink', false, url);
  }

  const resolvedMin = minHeight ?? MIN_H[size];

  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-[var(--ds-text-primary)]">
          {label}
        </label>
      )}

      {/* Editor shell */}
      <div className={[
        'rounded-xl border overflow-hidden transition-colors',
        error
          ? 'border-[var(--ds-danger-border)] ring-1 ring-[var(--ds-danger-border)]'
          : 'border-[var(--ds-border-base)] focus-within:border-[var(--ds-brand-500)] focus-within:ring-2 focus-within:ring-[var(--ds-brand-500)] focus-within:ring-offset-0',
        disabled ? 'opacity-60 pointer-events-none' : '',
      ].filter(Boolean).join(' ')}>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] relative">
          <ToolbarBtn icon={<TextBolderIcon    size={14} weight="bold"   />} title="Bold (⌘B)"         command="bold"          active={activeFormats.has('bold')}          disabled={disabled} />
          <ToolbarBtn icon={<TextItalicIcon    size={14} weight="bold"   />} title="Italic (⌘I)"       command="italic"        active={activeFormats.has('italic')}        disabled={disabled} />
          <ToolbarBtn icon={<TextUnderlineIcon size={14} weight="bold"   />} title="Underline (⌘U)"    command="underline"     active={activeFormats.has('underline')}     disabled={disabled} />
          <ToolbarBtn icon={<TextStrikethroughIcon size={14} weight="bold" />} title="Strikethrough"   command="strikeThrough" active={activeFormats.has('strikeThrough')} disabled={disabled} />

          <ToolbarDivider />

          <ToolbarBtn icon={<TextHIcon  size={14} weight="bold" />} title="Heading 2"       command="formatBlock" value="h2"         disabled={disabled} />
          <ToolbarBtn icon={<QuotesIcon size={14} weight="bold" />} title="Blockquote"      command="formatBlock" value="blockquote" disabled={disabled} />
          <ToolbarBtn icon={<CodeIcon   size={14} weight="bold" />} title="Code"            command="formatBlock" value="pre"        disabled={disabled} />

          <ToolbarDivider />

          <ToolbarBtn icon={<ListBulletsIcon  size={14} weight="bold" />} title="Bullet list"    command="insertUnorderedList" disabled={disabled} />
          <ToolbarBtn icon={<ListNumbersIcon  size={14} weight="bold" />} title="Numbered list"  command="insertOrderedList"   disabled={disabled} />

          <ToolbarDivider />

          <ToolbarBtn
            icon={<LinkIcon size={14} weight="bold" />}
            title="Insert link"
            active={linkOpen}
            onClick={() => setLinkOpen(v => !v)}
            disabled={disabled}
          />

          <ToolbarDivider />

          <ToolbarBtn icon={<ArrowCounterClockwiseIcon size={14} weight="bold" />} title="Undo (⌘Z)"  command="undo"  disabled={disabled} />
          <ToolbarBtn icon={<ArrowClockwiseIcon        size={14} weight="bold" />} title="Redo (⌘Y)"  command="redo"  disabled={disabled} />

          {linkOpen && (
            <LinkDialog
              onConfirm={insertLink}
              onCancel={() => setLinkOpen(false)}
            />
          )}
        </div>

        {/* Content area */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onSelect={updateActiveFormats}
          aria-multiline="true"
          aria-label={label ?? placeholder}
          data-placeholder={placeholder}
          style={{
            minHeight: resolvedMin,
            maxHeight: maxHeight,
            overflowY: maxHeight ? 'auto' : undefined,
          }}
          className={[
            'px-4 py-3 outline-none',
            PROSE_SIZE[size],
            'text-[var(--ds-text-primary)] leading-relaxed',
            // Placeholder via CSS
            '[&:empty]:before:content-[attr(data-placeholder)]',
            '[&:empty]:before:text-[var(--ds-text-muted)]',
            '[&:empty]:before:pointer-events-none',
            // Inline formatting
            '[&_strong]:font-semibold',
            '[&_em]:italic',
            '[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1',
            '[&_ul]:list-disc   [&_ul]:ml-5 [&_ul]:my-1',
            '[&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-1',
            '[&_li]:my-0.5',
            '[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--ds-brand-400)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--ds-text-muted)] [&_blockquote]:my-2',
            '[&_pre]:bg-[var(--ds-bg-subtle)] [&_pre]:rounded-lg [&_pre]:px-3 [&_pre]:py-2 [&_pre]:text-xs [&_pre]:font-mono [&_pre]:my-2',
            '[&_a]:text-[var(--ds-brand-600)] [&_a]:underline',
          ].join(' ')}
        />

        {/* Footer: word count */}
        {showWordCount && (
          <div className="flex justify-end px-4 py-1.5 border-t border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
            <span className="text-xs text-[var(--ds-text-muted)]">{wordCount} words</span>
          </div>
        )}
      </div>

      {/* Helper / error text */}
      {(helperText || error) && (
        <p className={['text-xs', error ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]'].join(' ')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
