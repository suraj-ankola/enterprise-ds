'use client';
import React, { useState } from 'react';
import {
  SparkleIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CaretDownIcon,
  CheckIcon,
  CircleNotchIcon,
  WarningIcon,
  LightbulbIcon,
  MagicWandIcon,
  RobotIcon,
  PaperPlaneRightIcon,
  ArrowsCounterClockwiseIcon,
} from '@phosphor-icons/react';

// ─────────────────────────────────────────────────────────────────────────────
// AIConfidencePanel
// ─────────────────────────────────────────────────────────────────────────────

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface AIConfidenceProps {
  /** 0–100 */
  score:     number;
  label?:    string;
  rationale?: string;
  /** Show breakdown bars per signal */
  signals?:  { label: string; score: number }[];
  className?: string;
}

const LEVEL_META: Record<ConfidenceLevel, { label: string; color: string; bg: string; border: string }> = {
  high:   { label: 'High confidence',   color: 'text-[var(--ds-success-text)]',  bg: 'bg-[var(--ds-success-bg)]',  border: 'border-[var(--ds-success-border)]' },
  medium: { label: 'Medium confidence', color: 'text-[var(--ds-warning-text)]',  bg: 'bg-[var(--ds-warning-bg)]',  border: 'border-[var(--ds-warning-border)]' },
  low:    { label: 'Low confidence',    color: 'text-[var(--ds-danger-text)]',   bg: 'bg-[var(--ds-danger-bg)]',   border: 'border-[var(--ds-danger-border)]'  },
};

function scoreToLevel(score: number): ConfidenceLevel {
  if (score >= 75) return 'high';
  if (score >= 45) return 'medium';
  return 'low';
}

export function AIConfidencePanel({ score, label, rationale, signals, className = '' }: AIConfidenceProps) {
  const level = scoreToLevel(score);
  const meta  = LEVEL_META[level];

  return (
    <div className={['rounded-xl border p-4 space-y-3', meta.bg, meta.border, className].join(' ')}>
      <div className="flex items-center gap-2">
        <SparkleIcon size={16} className={meta.color} weight="fill" />
        <span className={['text-sm font-semibold', meta.color].join(' ')}>{label ?? meta.label}</span>
        <span className={['ml-auto text-lg font-bold tabular-nums', meta.color].join(' ')}>{score}%</span>
      </div>

      {/* Score bar */}
      <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-current transition-all"
          style={{ width: `${score}%`, color: meta.color.replace('text-', '') }}
        />
      </div>

      {rationale && (
        <p className={['text-xs', meta.color, 'opacity-80'].join(' ')}>{rationale}</p>
      )}

      {signals && signals.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-current/10">
          {signals.map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={['text-[11px] flex-1', meta.color, 'opacity-70'].join(' ')}>{s.label}</span>
              <div className="w-20 h-1 rounded-full bg-black/10 overflow-hidden">
                <div className="h-full rounded-full bg-current" style={{ width: `${s.score}%` }} />
              </div>
              <span className={['text-[11px] tabular-nums w-7 text-right', meta.color].join(' ')}>{s.score}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AIModelSelector
// ─────────────────────────────────────────────────────────────────────────────

export interface AIModel {
  id:          string;
  name:        string;
  provider?:   string;
  description?: string;
  tags?:       string[];
  /** Cost tier: 1 (cheapest) – 3 (most expensive) */
  costTier?:   1 | 2 | 3;
  /** latency: 'fast' | 'medium' | 'slow' */
  latency?:    'fast' | 'medium' | 'slow';
}

export interface AIModelSelectorProps {
  models:      AIModel[];
  value:       string;
  onChange:    (id: string) => void;
  className?:  string;
}

const LATENCY_BADGE: Record<NonNullable<AIModel['latency']>, { label: string; cls: string }> = {
  fast:   { label: 'Fast',   cls: 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]'  },
  medium: { label: 'Medium', cls: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]'  },
  slow:   { label: 'Slow',   cls: 'bg-[var(--ds-danger-bg)]  text-[var(--ds-danger-text)]'   },
};

export function AIModelSelector({ models, value, onChange, className = '' }: AIModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const current = models.find(m => m.id === value) ?? models[0];

  return (
    <div className={['relative', className].join(' ')}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-subtle)] transition-colors"
      >
        <RobotIcon size={16} className="text-[var(--ds-brand-600)]" />
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-[var(--ds-text-primary)]">{current.name}</p>
          {current.provider && <p className="text-[10px] text-[var(--ds-text-muted)]">{current.provider}</p>}
        </div>
        <CaretDownIcon size={12} className={['text-[var(--ds-text-muted)] transition-transform', open ? 'rotate-180' : ''].join(' ')} />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-xl overflow-hidden">
          <div className="px-3 py-2 border-b border-[var(--ds-border-base)]">
            <p className="text-[10px] font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Select model</p>
          </div>
          <ul className="py-1">
            {models.map(m => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => { onChange(m.id); setOpen(false); }}
                  className={[
                    'w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors',
                    m.id === value ? 'bg-[var(--ds-bg-subtle)]' : 'hover:bg-[var(--ds-bg-subtle)]',
                  ].join(' ')}
                >
                  <RobotIcon size={15} className="text-[var(--ds-brand-500)] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-medium text-[var(--ds-text-primary)]">{m.name}</span>
                      {m.latency && (
                        <span className={['text-[10px] px-1.5 py-0.5 rounded-full font-medium', LATENCY_BADGE[m.latency].cls].join(' ')}>
                          {LATENCY_BADGE[m.latency].label}
                        </span>
                      )}
                      {m.costTier && (
                        <span className="text-[10px] text-[var(--ds-text-muted)]">
                          {'$'.repeat(m.costTier)}
                        </span>
                      )}
                    </div>
                    {m.description && <p className="text-[11px] text-[var(--ds-text-muted)] mt-0.5 leading-snug">{m.description}</p>}
                    {m.tags && m.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {m.tags.map(t => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] rounded text-[var(--ds-text-muted)]">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.id === value && <CheckIcon size={14} className="text-[var(--ds-brand-600)] shrink-0 mt-1" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AIFeedback
// ─────────────────────────────────────────────────────────────────────────────

export type FeedbackValue = 'positive' | 'negative' | null;

export interface AIFeedbackProps {
  onFeedback:  (value: FeedbackValue, comment?: string) => void;
  /** Show a comment textarea after a rating is selected */
  allowComment?: boolean;
  className?:  string;
}

export function AIFeedback({ onFeedback, allowComment = true, className = '' }: AIFeedbackProps) {
  const [rating,  setRating]  = useState<FeedbackValue>(null);
  const [comment, setComment] = useState('');
  const [sent,    setSent]    = useState(false);

  function submit() {
    onFeedback(rating, comment || undefined);
    setSent(true);
  }

  if (sent) {
    return (
      <div className={['flex items-center gap-1.5 text-xs text-[var(--ds-text-muted)]', className].join(' ')}>
        <CheckIcon size={12} className="text-[var(--ds-success-icon)]" />
        Thanks for your feedback
      </div>
    );
  }

  return (
    <div className={['space-y-2', className].join(' ')}>
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--ds-text-muted)]">Was this helpful?</span>
        <button
          type="button"
          onClick={() => setRating(r => r === 'positive' ? null : 'positive')}
          aria-label="Thumbs up"
          className={[
            'p-1.5 rounded-lg transition-colors',
            rating === 'positive'
              ? 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]'
              : 'text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
          ].join(' ')}
        >
          <ThumbsUpIcon size={14} weight={rating === 'positive' ? 'fill' : 'regular'} />
        </button>
        <button
          type="button"
          onClick={() => setRating(r => r === 'negative' ? null : 'negative')}
          aria-label="Thumbs down"
          className={[
            'p-1.5 rounded-lg transition-colors',
            rating === 'negative'
              ? 'bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)]'
              : 'text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
          ].join(' ')}
        >
          <ThumbsDownIcon size={14} weight={rating === 'negative' ? 'fill' : 'regular'} />
        </button>
        {rating && !allowComment && (
          <button
            type="button"
            onClick={submit}
            className="text-xs text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] transition-colors"
          >
            Submit
          </button>
        )}
      </div>

      {rating && allowComment && (
        <div className="flex gap-2">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={rating === 'positive' ? "What did you like?" : "What could be improved?"}
            rows={2}
            className="flex-1 text-xs rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] px-2.5 py-1.5 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
          />
          <button
            type="button"
            onClick={submit}
            className="px-3 py-1 text-xs rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] self-end"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AIPromptBuilder
// ─────────────────────────────────────────────────────────────────────────────

export interface PromptTemplate {
  id:       string;
  label:    string;
  template: string;
  icon?:    React.ReactNode;
}

export interface AIPromptBuilderProps {
  templates?:    PromptTemplate[];
  onSubmit:      (prompt: string) => void | Promise<void>;
  placeholder?:  string;
  maxLength?:    number;
  className?:    string;
}

const DEFAULT_TEMPLATES: PromptTemplate[] = [
  { id: 'summarize', label: 'Summarise',     template: 'Summarise the following in 3 bullet points:',       icon: <LightbulbIcon size={13} /> },
  { id: 'risks',     label: 'Find risks',    template: 'Identify potential risks and issues in:',            icon: <WarningIcon   size={13} /> },
  { id: 'improve',   label: 'Suggest improvements', template: 'Suggest improvements for:',                  icon: <MagicWandIcon size={13} /> },
  { id: 'rewrite',   label: 'Rewrite',       template: 'Rewrite the following more clearly and concisely:', icon: <ArrowsCounterClockwiseIcon size={13} /> },
];

export function AIPromptBuilder({
  templates  = DEFAULT_TEMPLATES,
  onSubmit,
  placeholder = 'Ask anything…',
  maxLength   = 2000,
  className   = '',
}: AIPromptBuilderProps) {
  const [prompt,  setPrompt]  = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      await onSubmit(prompt.trim());
    } finally {
      setLoading(false);
    }
  }

  function applyTemplate(t: PromptTemplate) {
    setPrompt(prev => {
      const selected = prev.trim();
      if (selected) return `${t.template}\n\n${selected}`;
      return `${t.template} `;
    });
  }

  return (
    <div className={['space-y-2', className].join(' ')}>
      {/* Quick templates */}
      {templates.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {templates.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTemplate(t)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:border-[var(--ds-brand-400)] hover:text-[var(--ds-brand-600)] hover:bg-[var(--ds-brand-50)] transition-colors"
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Textarea */}
      <div className="relative rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] focus-within:ring-2 focus-within:ring-[var(--ds-brand-500)] focus-within:border-[var(--ds-brand-500)] transition-all">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value.slice(0, maxLength))}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleSubmit(); }
          }}
          placeholder={placeholder}
          rows={4}
          className="w-full px-4 pt-3 pb-10 text-sm text-[var(--ds-text-primary)] bg-transparent resize-none focus-visible:outline-none placeholder:text-[var(--ds-text-muted)]"
        />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] text-[var(--ds-text-muted)]">
            {prompt.length}/{maxLength} · ⌘↵ to send
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!prompt.trim() || loading}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? <><CircleNotchIcon size={12} className="animate-spin" /> Running…</>
              : <><PaperPlaneRightIcon size={12} weight="fill" /> Send</>}
          </button>
        </div>
      </div>
    </div>
  );
}
