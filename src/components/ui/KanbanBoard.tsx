'use client';

import React, { useState, useCallback, useId } from 'react';
import { PlusIcon, DotsThreeIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type KanbanPriority = 'low' | 'medium' | 'high' | 'critical';

export interface KanbanAssignee {
  initials: string;
  name:     string;
  color?:   string;
}

export interface KanbanTag {
  label:   string;
  color?:  string;
}

export interface KanbanCardData {
  id:          string;
  title:       string;
  description?: string;
  priority?:   KanbanPriority;
  assignee?:   KanbanAssignee;
  tags?:       KanbanTag[];
  /** ISO date string */
  dueDate?:    string;
}

export interface KanbanColumnData {
  id:     string;
  title:  string;
  /** Accent colour for the column header strip */
  color?: string;
  /** WIP limit — card count shown in red when exceeded */
  limit?: number;
  cards:  KanbanCardData[];
}

export interface KanbanBoardProps {
  columns:       KanbanColumnData[];
  /** Fired whenever cards are reordered or moved between columns */
  onChange?:     (columns: KanbanColumnData[]) => void;
  onCardClick?:  (card: KanbanCardData, columnId: string) => void;
  onAddCard?:    (columnId: string) => void;
  className?:    string;
}

// ─── Priority map ─────────────────────────────────────────────────────────────

const PRIORITY_DOT: Record<KanbanPriority, string> = {
  low:      'bg-[var(--ds-success-icon)]',
  medium:   'bg-[var(--ds-warning-icon)]',
  high:     'bg-[var(--ds-danger-icon)]',
  critical: 'bg-[var(--ds-danger-text)]',
};

const PRIORITY_LABEL: Record<KanbanPriority, string> = {
  low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical',
};

// ─── KanbanCard ───────────────────────────────────────────────────────────────

interface CardProps {
  card:       KanbanCardData;
  columnId:   string;
  isDragging: boolean;
  onDragStart: () => void;
  onClick?:    () => void;
}

function Card({ card, isDragging, onDragStart, onClick }: CardProps) {
  const overdue = card.dueDate
    ? new Date(card.dueDate) < new Date()
    : false;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        // slight delay so the ghost image renders before opacity change
        setTimeout(onDragStart, 0);
      }}
      onClick={onClick}
      className={[
        'group flex flex-col gap-2 p-3 rounded-lg cursor-grab active:cursor-grabbing',
        'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)]',
        'shadow-[var(--ds-shadow-xs)] hover:shadow-[var(--ds-shadow-sm)]',
        'transition-all duration-150 select-none',
        isDragging ? 'opacity-40 scale-[0.98]' : '',
      ].filter(Boolean).join(' ')}
    >
      {/* Priority + title */}
      <div className="flex items-start gap-2">
        {card.priority && (
          <span
            className={['mt-1.5 shrink-0 h-2 w-2 rounded-full', PRIORITY_DOT[card.priority]].join(' ')}
            title={PRIORITY_LABEL[card.priority]}
          />
        )}
        <p className="flex-1 text-sm font-medium text-[var(--ds-text-primary)] leading-snug">
          {card.title}
        </p>
      </div>

      {/* Description */}
      {card.description && (
        <p className="text-xs text-[var(--ds-text-muted)] leading-relaxed line-clamp-2">
          {card.description}
        </p>
      )}

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {card.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={
                tag.color
                  ? { backgroundColor: `${tag.color}20`, color: tag.color }
                  : undefined
              }
              // fallback when no custom colour
              {...(!tag.color && {
                className: 'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)]',
              })}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Footer: due date + assignee */}
      {(card.dueDate || card.assignee) && (
        <div className="flex items-center justify-between gap-2 mt-0.5">
          {card.dueDate && (
            <span className={['text-[10px]', overdue ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]'].join(' ')}>
              {new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
          {card.assignee && (
            <span
              className="shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ml-auto"
              style={{ backgroundColor: card.assignee.color ?? 'var(--ds-brand-600)' }}
              title={card.assignee.name}
            >
              {card.assignee.initials}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── DropZone sentinel ────────────────────────────────────────────────────────

interface DropZoneProps {
  isActive:    boolean;
  onDragOver:  (e: React.DragEvent) => void;
  onDrop:      (e: React.DragEvent) => void;
}

function DropZone({ isActive, onDragOver, onDrop }: DropZoneProps) {
  return (
    <div
      className={[
        'transition-all duration-100 rounded-md mx-0.5',
        isActive
          ? 'h-10 bg-[var(--ds-brand-100)] border-2 border-dashed border-[var(--ds-brand-400,#93c5fd)]'
          : 'h-1',
      ].join(' ')}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
}

// ─── KanbanBoard ──────────────────────────────────────────────────────────────

export function KanbanBoard({
  columns,
  onChange,
  onCardClick,
  onAddCard,
  className = '',
}: KanbanBoardProps) {
  const [dragging, setDragging] = useState<{ cardId: string; colId: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<{ colId: string; index: number } | null>(null);

  const handleDragStart = useCallback((cardId: string, colId: string) => {
    setDragging({ cardId, colId });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, colId: string, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget((prev) =>
      prev?.colId === colId && prev?.index === index ? prev : { colId, index },
    );
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, toColId: string, toIndex: number) => {
    e.preventDefault();
    if (!dragging) return;

    const cols = columns.map((c) => ({ ...c, cards: [...c.cards] }));
    const fromCol = cols.find((c) => c.id === dragging.colId)!;
    const toCol   = cols.find((c) => c.id === toColId)!;
    const cardIdx = fromCol.cards.findIndex((c) => c.id === dragging.cardId);
    if (cardIdx === -1) return;

    const [card] = fromCol.cards.splice(cardIdx, 1);

    // Adjust index when moving down within the same column
    let adjustedIndex = toIndex;
    if (dragging.colId === toColId && cardIdx < toIndex) adjustedIndex = Math.max(0, toIndex - 1);

    toCol.cards.splice(Math.min(adjustedIndex, toCol.cards.length), 0, card);
    onChange?.(cols);
    setDragging(null);
    setDropTarget(null);
  }, [columns, dragging, onChange]);

  const handleDragEnd = useCallback(() => {
    setDragging(null);
    setDropTarget(null);
  }, []);

  return (
    <div
      className={['flex gap-4 overflow-x-auto pb-4 min-h-[400px]', className].filter(Boolean).join(' ')}
      onDragEnd={handleDragEnd}
    >
      {columns.map((col) => {
        const isOverLimit  = col.limit !== undefined && col.cards.length > col.limit;
        const isDropTarget = dropTarget?.colId === col.id;

        return (
          <div
            key={col.id}
            className={[
              'flex flex-col shrink-0 w-64 rounded-xl',
              'bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)]',
              'transition-colors duration-150',
              isDropTarget && !dragging ? '' : '',
            ].filter(Boolean).join(' ')}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 pt-3 pb-2">
              {col.color && (
                <span
                  className="shrink-0 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: col.color }}
                />
              )}
              <span className="flex-1 text-xs font-semibold text-[var(--ds-text-primary)] uppercase tracking-wide truncate">
                {col.title}
              </span>
              <span
                className={[
                  'text-xs font-semibold px-1.5 py-0.5 rounded-full',
                  isOverLimit
                    ? 'bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)]'
                    : 'bg-[var(--ds-border-base)] text-[var(--ds-text-muted)]',
                ].join(' ')}
              >
                {col.cards.length}
                {col.limit !== undefined && `/${col.limit}`}
              </span>
            </div>

            {/* Card list + drop zones */}
            <div className="flex flex-col flex-1 px-2 pb-2 overflow-y-auto gap-0">
              {/* Drop zone before first card */}
              <DropZone
                isActive={isDropTarget && dropTarget?.index === 0 && !!dragging}
                onDragOver={(e) => handleDragOver(e, col.id, 0)}
                onDrop={(e) => handleDrop(e, col.id, 0)}
              />

              {col.cards.map((card, cardIdx) => (
                <React.Fragment key={card.id}>
                  <Card
                    card={card}
                    columnId={col.id}
                    isDragging={dragging?.cardId === card.id}
                    onDragStart={() => handleDragStart(card.id, col.id)}
                    onClick={() => onCardClick?.(card, col.id)}
                  />
                  {/* Drop zone after this card */}
                  <DropZone
                    isActive={isDropTarget && dropTarget?.index === cardIdx + 1 && !!dragging}
                    onDragOver={(e) => handleDragOver(e, col.id, cardIdx + 1)}
                    onDrop={(e) => handleDrop(e, col.id, cardIdx + 1)}
                  />
                </React.Fragment>
              ))}

              {/* Empty column drop zone when no cards */}
              {col.cards.length === 0 && (
                <div
                  className={[
                    'flex-1 rounded-lg border-2 border-dashed min-h-[80px] transition-colors',
                    isDropTarget && dragging
                      ? 'border-[var(--ds-brand-400,#93c5fd)] bg-[var(--ds-brand-100)]'
                      : 'border-[var(--ds-border-base)]',
                  ].join(' ')}
                  onDragOver={(e) => handleDragOver(e, col.id, 0)}
                  onDrop={(e) => handleDrop(e, col.id, 0)}
                />
              )}
            </div>

            {/* Add card button */}
            {onAddCard && (
              <button
                type="button"
                onClick={() => onAddCard(col.id)}
                className={[
                  'flex items-center gap-1.5 mx-2 mb-2 px-2 py-1.5 rounded-lg text-xs',
                  'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                  'hover:bg-[var(--ds-border-base)] transition-colors',
                ].join(' ')}
              >
                <PlusIcon size={14} /> Add card
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
