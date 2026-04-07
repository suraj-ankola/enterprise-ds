'use client';
import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserCircleIcon,
  ChatCenteredTextIcon,
  CaretDownIcon,
  CircleIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'skipped';

export interface ApprovalStep {
  id:          string;
  label:       string;
  description?: string;
  status:      ApprovalStatus;
  assignee?:   { name: string; avatar?: React.ReactNode };
  decidedAt?:  string;
  comment?:    string;
}

export interface ApprovalFlowProps {
  steps:       ApprovalStep[];
  /** If provided, shows approve/reject action buttons on the current pending step */
  onApprove?:  (stepId: string, comment?: string) => void;
  onReject?:   (stepId: string, comment?: string) => void;
  /** Layout direction */
  direction?:  'vertical' | 'horizontal';
  className?:  string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_META: Record<ApprovalStatus, {
  icon:    React.ReactNode;
  label:   string;
  ring:    string;
  bg:      string;
  text:    string;
  border:  string;
}> = {
  pending:  {
    icon:   <ClockIcon      size={14} />,
    label:  'Pending',
    ring:   'border-[var(--ds-warning-border)]',
    bg:     'bg-[var(--ds-warning-bg)]',
    text:   'text-[var(--ds-warning-text)]',
    border: 'border-[var(--ds-warning-border)]',
  },
  approved: {
    icon:   <CheckCircleIcon size={14} weight="fill" />,
    label:  'Approved',
    ring:   'border-[var(--ds-success-border)]',
    bg:     'bg-[var(--ds-success-bg)]',
    text:   'text-[var(--ds-success-text)]',
    border: 'border-[var(--ds-success-border)]',
  },
  rejected: {
    icon:   <XCircleIcon     size={14} weight="fill" />,
    label:  'Rejected',
    ring:   'border-[var(--ds-danger-border)]',
    bg:     'bg-[var(--ds-danger-bg)]',
    text:   'text-[var(--ds-danger-text)]',
    border: 'border-[var(--ds-danger-border)]',
  },
  skipped:  {
    icon:   <CircleIcon      size={14} />,
    label:  'Skipped',
    ring:   'border-[var(--ds-border-base)]',
    bg:     'bg-[var(--ds-bg-subtle)]',
    text:   'text-[var(--ds-text-muted)]',
    border: 'border-[var(--ds-border-base)]',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ApprovalFlow({
  steps,
  onApprove,
  onReject,
  direction  = 'vertical',
  className  = '',
}: ApprovalFlowProps) {
  const [commentMap,  setCommentMap]  = useState<Record<string, string>>({});
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const currentStep = steps.find(s => s.status === 'pending');

  function toggleExpand(id: string) {
    setExpandedMap(p => ({ ...p, [id]: !p[id] }));
  }

  if (direction === 'horizontal') {
    return (
      <div className={['flex items-start gap-0', className].join(' ')}>
        {steps.map((step, i) => {
          const meta = STATUS_META[step.status];
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1 min-w-[80px] text-center">
                <div className={['h-8 w-8 rounded-full border-2 flex items-center justify-center', meta.ring, meta.bg, meta.text].join(' ')}>
                  {meta.icon}
                </div>
                <span className="text-xs font-medium text-[var(--ds-text-primary)] leading-tight">{step.label}</span>
                <span className={['text-xs', meta.text].join(' ')}>{meta.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-[var(--ds-border-base)] mt-4 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className={['space-y-0', className].join(' ')}>
      {steps.map((step, i) => {
        const meta       = STATUS_META[step.status];
        const isLast     = i === steps.length - 1;
        const isCurrent  = step.id === currentStep?.id;
        const isExpanded = expandedMap[step.id];

        return (
          <div key={step.id} className="flex gap-4">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div className={['h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0', meta.ring, meta.bg, meta.text].join(' ')}>
                {meta.icon}
              </div>
              {!isLast && <div className="w-px flex-1 bg-[var(--ds-border-base)] my-1" />}
            </div>

            {/* Content */}
            <div className={['pb-5 flex-1 min-w-0', isLast ? '' : ''].join(' ')}>
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--ds-text-primary)]">{step.label}</p>
                  {step.description && (
                    <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{step.description}</p>
                  )}
                </div>
                <span className={['text-xs px-2 py-0.5 rounded-full font-medium border', meta.bg, meta.border, meta.text].join(' ')}>
                  {meta.label}
                </span>
              </div>

              {/* Assignee + decided at */}
              {(step.assignee || step.decidedAt) && (
                <div className="flex items-center gap-3 mt-1.5">
                  {step.assignee && (
                    <div className="flex items-center gap-1 text-xs text-[var(--ds-text-muted)]">
                      {step.assignee.avatar ?? <UserCircleIcon size={13} />}
                      {step.assignee.name}
                    </div>
                  )}
                  {step.decidedAt && (
                    <span className="text-[11px] text-[var(--ds-text-muted)]">{step.decidedAt}</span>
                  )}
                </div>
              )}

              {/* Comment */}
              {step.comment && (
                <div className="mt-2 p-2.5 bg-[var(--ds-bg-subtle)] rounded-lg text-xs text-[var(--ds-text-secondary)] flex items-start gap-1.5">
                  <ChatCenteredTextIcon size={12} className="mt-0.5 shrink-0 text-[var(--ds-text-muted)]" />
                  {step.comment}
                </div>
              )}

              {/* Action area for current pending step */}
              {isCurrent && (onApprove || onReject) && (
                <div className="mt-3 space-y-2">
                  {isExpanded ? (
                    <>
                      <textarea
                        value={commentMap[step.id] ?? ''}
                        onChange={e => setCommentMap(p => ({ ...p, [step.id]: e.target.value }))}
                        placeholder="Add a comment (optional)…"
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                      />
                      <div className="flex gap-2">
                        {onApprove && (
                          <button
                            type="button"
                            onClick={() => onApprove(step.id, commentMap[step.id])}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--ds-success-bg)] text-[var(--ds-success-text)] border border-[var(--ds-success-border)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                          >
                            <CheckCircleIcon size={13} /> Approve
                          </button>
                        )}
                        {onReject && (
                          <button
                            type="button"
                            onClick={() => onReject(step.id, commentMap[step.id])}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)] border border-[var(--ds-danger-border)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                          >
                            <XCircleIcon size={13} /> Reject
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleExpand(step.id)}
                          className="text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleExpand(step.id)}
                      className="flex items-center gap-1 text-xs text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded"
                    >
                      <CaretDownIcon size={12} /> Review &amp; decide
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
