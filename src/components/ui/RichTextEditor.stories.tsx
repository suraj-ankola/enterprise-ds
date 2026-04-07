import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Forms/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Browser-native `contenteditable` rich text editor. Uses `document.execCommand` with zero heavy dependencies. Toolbar covers bold, italic, underline, strikethrough, H2, blockquote, code block, bullet list, numbered list, link insertion, undo/redo. DS-themed formatting, placeholder via CSS, word count footer, error/helper text, and disabled state.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof RichTextEditor>;

const INITIAL_HTML = `<p>This audit report covers the <strong>ISO 27001:2022</strong> compliance assessment for Acme Corp.</p>
<h2>Scope</h2>
<ul>
  <li>Access control (A.9)</li>
  <li>Cryptography (A.10)</li>
  <li>Physical security (A.11)</li>
</ul>
<blockquote>Three minor observations raised — none are blocking certification renewal.</blockquote>`;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [html, setHtml] = useState(INITIAL_HTML);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl space-y-4">
        <RichTextEditor
          label="Audit notes"
          value={html}
          onChange={setHtml}
          placeholder="Write your audit findings…"
          showWordCount
        />
        <details className="text-xs text-[var(--ds-text-muted)]">
          <summary className="cursor-pointer select-none">View HTML output</summary>
          <pre className="mt-2 p-3 rounded-lg bg-[var(--ds-bg-subtle)] overflow-x-auto whitespace-pre-wrap break-all">{html}</pre>
        </details>
      </div>
    );
  },
};

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl space-y-8">

      <RichTextEditor
        label="Default"
        placeholder="Start writing…"
        helperText="Supports bold, italic, lists, links, code blocks, and blockquotes."
        showWordCount
      />

      <RichTextEditor
        label="With initial content"
        value={INITIAL_HTML}
        onChange={() => {}}
        showWordCount
      />

      <RichTextEditor
        label="Error state"
        value="<p>Incomplete description.</p>"
        onChange={() => {}}
        error="Audit notes must be at least 50 words."
      />

      <RichTextEditor
        label="Disabled"
        value={INITIAL_HTML}
        disabled
        helperText="Read-only — editing is disabled."
      />

    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl space-y-8">

      <RichTextEditor
        size="sm"
        label="size='sm' — comment box"
        placeholder="Add a comment…"
        minHeight={60}
      />

      <RichTextEditor
        size="md"
        label="size='md' — default"
        placeholder="Describe the finding…"
      />

      <RichTextEditor
        size="lg"
        label="size='lg' — long-form report"
        placeholder="Write the full audit report…"
        maxHeight={400}
        showWordCount
      />

    </div>
  ),
};

// ─── Compliance use case ──────────────────────────────────────────────────────

export const ComplianceReport: Story = {
  name: 'Use case — Compliance gap description',
  render: () => {
    const [html, setHtml] = useState('');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">
            Document gap remediation plan
          </h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-5">
            Control A.9.2.3 — Privileged access management
          </p>
          <RichTextEditor
            label="Remediation plan"
            value={html}
            onChange={setHtml}
            placeholder="Describe the steps to address this control gap…"
            showWordCount
            helperText="Include owner, timeline, and evidence of remediation."
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="h-9 px-4 text-sm rounded-lg border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] transition-colors">
              Cancel
            </button>
            <button type="button" className="h-9 px-4 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors">
              Save plan
            </button>
          </div>
        </div>
      </div>
    );
  },
};
