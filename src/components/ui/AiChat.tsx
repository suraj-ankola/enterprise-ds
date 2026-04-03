import React, { useEffect, useRef, useState } from 'react';
import { PaperPlaneTiltIcon, RobotIcon, UserIcon, StopIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatSource {
  label: string;
  url?:  string;
}

export interface ChatAction {
  label:   string;
  onClick: () => void;
}

export interface ChatMessage {
  id:           string;
  role:         MessageRole;
  content:      string;
  timestamp?:   Date;
  isStreaming?: boolean;
  sources?:     ChatSource[];
  actions?:     ChatAction[];
}

export interface ChatWindowProps {
  messages:     ChatMessage[];
  onSend:       (content: string) => void;
  onStop?:      () => void;
  isLoading?:   boolean;
  placeholder?: string;
  /** Chips shown in the empty state */
  suggestions?: string[];
  header?:      React.ReactNode;
  emptyState?:  React.ReactNode;
  className?:   string;
  /** User's display name or initials for avatar */
  userName?:    string;
}

// ─── ChatWindow ───────────────────────────────────────────────────────────────

export function ChatWindow({
  messages,
  onSend,
  onStop,
  isLoading     = false,
  placeholder   = 'Ask anything…',
  suggestions,
  header,
  emptyState,
  className     = '',
  userName      = 'You',
}: ChatWindowProps) {
  const bottomRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState('');

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleSend() {
    const text = draft.trim();
    if (!text || isLoading) return;
    setDraft('');
    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = 'auto';
    onSend(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
    setDraft(el.value);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className={[
      'flex flex-col bg-[var(--ds-bg-base)] overflow-hidden',
      className,
    ].filter(Boolean).join(' ')}>

      {/* Header */}
      {header && (
        <div className="shrink-0 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
          {header}
        </div>
      )}

      {/* Message list */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <EmptyState emptyState={emptyState} suggestions={suggestions} onSend={onSend} />
        ) : (
          <div className="flex flex-col gap-6 px-4 py-6 max-w-3xl mx-auto">
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} userName={userName} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className={[
            'flex items-end gap-2 rounded-xl border px-4 py-3',
            'bg-[var(--ds-bg-surface)] transition-colors',
            'focus-within:border-[var(--ds-brand-600)] focus-within:ring-2 focus-within:ring-[var(--ds-brand-500)] focus-within:ring-offset-0',
            'border-[var(--ds-border-strong)]',
          ].join(' ')}>
            <textarea
              ref={inputRef}
              value={draft}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className={[
                'flex-1 resize-none bg-transparent outline-none text-sm',
                'text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)]',
                'leading-relaxed max-h-[180px] overflow-y-auto',
              ].join(' ')}
              aria-label="Message input"
            />
            {isLoading && onStop ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generating"
                className={[
                  'shrink-0 h-8 w-8 flex items-center justify-center rounded-lg',
                  'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)]',
                  'hover:bg-[var(--ds-border-base)] transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                ].join(' ')}
              >
                <StopIcon size={16} weight="fill" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim() || isLoading}
                aria-label="Send message"
                className={[
                  'shrink-0 h-8 w-8 flex items-center justify-center rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                  draft.trim() && !isLoading
                    ? 'bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)]'
                    : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)] cursor-not-allowed',
                ].join(' ')}
              >
                <PaperPlaneTiltIcon size={16} weight="fill" />
              </button>
            )}
          </div>
          <p className="mt-1.5 text-[10px] text-center text-[var(--ds-text-muted)]">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({ message, userName }: { message: ChatMessage; userName: string }) {
  const isUser      = message.role === 'user';
  const isSystem    = message.role === 'system';
  const initials    = userName.slice(0, 2).toUpperCase();

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <p className="text-xs text-[var(--ds-text-muted)] italic px-4 py-1 rounded-full bg-[var(--ds-bg-subtle)]">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className={['flex items-end gap-3', isUser ? 'flex-row-reverse' : 'flex-row'].join(' ')}>

      {/* Avatar */}
      <div className={[
        'shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold',
        isUser
          ? 'bg-[var(--ds-brand-600)] text-white'
          : 'bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] text-[var(--ds-text-muted)]',
      ].join(' ')}>
        {isUser
          ? <span>{initials}</span>
          : <RobotIcon size={14} weight="fill" />
        }
      </div>

      {/* Bubble + meta */}
      <div className={['flex flex-col gap-2 max-w-[75%]', isUser ? 'items-end' : 'items-start'].join(' ')}>
        <div className={[
          'px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-[var(--ds-brand-600)] text-white rounded-2xl rounded-br-sm'
            : 'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] text-[var(--ds-text-primary)] rounded-2xl rounded-bl-sm shadow-xs',
        ].join(' ')}>
          <MessageContent content={message.content} isUser={isUser} />
          {message.isStreaming && (
            <span
              className="inline-block w-0.5 h-3.5 ml-0.5 align-middle bg-current animate-pulse"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.sources.map((src, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-base)]"
              >
                {src.label}
              </span>
            ))}
          </div>
        )}

        {/* Suggested actions */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                className={[
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  'border border-[var(--ds-brand-600)] text-[var(--ds-brand-600)]',
                  'hover:bg-[var(--ds-brand-100)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                ].join(' ')}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        {message.timestamp && (
          <span className="text-[10px] text-[var(--ds-text-muted)]">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── MessageContent — basic text + code block rendering ──────────────────────

function MessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  // Split on ```code blocks```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const inner = part.slice(3, -3).replace(/^\w+\n/, ''); // strip language hint
          return (
            <pre
              key={i}
              className={[
                'mt-2 mb-1 p-3 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed',
                isUser
                  ? 'bg-black/20 text-white'
                  : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] border border-[var(--ds-border-base)]',
              ].join(' ')}
            >
              <code>{inner.trim()}</code>
            </pre>
          );
        }
        // Render plain text preserving newlines
        return (
          <span key={i} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      })}
    </>
  );
}

// ─── TypingIndicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] text-[var(--ds-text-muted)]">
        <RobotIcon size={14} weight="fill" />
      </div>
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-2xl rounded-bl-sm px-4 py-3 shadow-xs">
        <div className="flex items-center gap-1.5" aria-label="AI is thinking">
          {[0, 150, 300].map(delay => (
            <span
              key={delay}
              className="h-2 w-2 rounded-full bg-[var(--ds-text-muted)] animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({
  emptyState,
  suggestions,
  onSend,
}: {
  emptyState?: React.ReactNode;
  suggestions?: string[];
  onSend: (s: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-6 px-4 py-12 max-w-xl mx-auto text-center">
      {emptyState ?? (
        <>
          <div className="h-14 w-14 rounded-2xl bg-[var(--ds-brand-100)] flex items-center justify-center">
            <RobotIcon size={28} weight="fill" className="text-[var(--ds-brand-600)]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[var(--ds-text-primary)]">How can I help you?</p>
            <p className="text-sm text-[var(--ds-text-muted)]">
              Ask me anything or choose a suggestion below.
            </p>
          </div>
        </>
      )}
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onSend(s)}
              className={[
                'px-4 py-2 rounded-xl text-sm border transition-colors',
                'border-[var(--ds-border-strong)] text-[var(--ds-text-secondary)] bg-[var(--ds-bg-surface)]',
                'hover:border-[var(--ds-brand-600)] hover:text-[var(--ds-brand-600)] hover:bg-[var(--ds-brand-100)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
              ].join(' ')}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
