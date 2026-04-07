import React, { createContext, useContext, useState } from 'react';
import { CaretRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreeNode {
  id:        string;
  label:     React.ReactNode;
  icon?:     React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  nodes:           TreeNode[];
  /** Controlled selected node id */
  selected?:       string;
  onSelect?:       (id: string) => void;
  /** Controlled expanded node ids */
  expanded?:       string[];
  onExpandChange?: (ids: string[]) => void;
  /** Initially expanded ids (uncontrolled) */
  defaultExpanded?: string[];
  className?:      string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface TreeCtx {
  selected:   string | undefined;
  expandedSet: Set<string>;
  onSelect:   (id: string) => void;
  toggleExpand: (id: string) => void;
}

const Ctx = createContext<TreeCtx | null>(null);

function useTree() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('TreeNode must be used inside Tree');
  return ctx;
}

// ─── TreeNodeRow ──────────────────────────────────────────────────────────────

interface NodeRowProps {
  node:  TreeNode;
  depth: number;
}

function TreeNodeRow({ node, depth }: NodeRowProps) {
  const { selected, expandedSet, onSelect, toggleExpand } = useTree();
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded  = expandedSet.has(node.id);
  const isSelected  = selected === node.id;
  const indent      = depth * 16; // 16px per level

  return (
    <>
      <li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined}>
        <button
          type="button"
          disabled={node.disabled}
          onClick={() => {
            if (!node.disabled) {
              onSelect(node.id);
              if (hasChildren) toggleExpand(node.id);
            }
          }}
          style={{ paddingLeft: `${indent + 8}px` }}
          className={[
            'w-full flex items-center gap-1.5 py-1.5 pr-3 rounded-md text-left',
            'text-sm transition-colors duration-[var(--ds-duration-base)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-0',
            isSelected
              ? 'bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)] font-medium'
              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
            node.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
        >
          {/* Caret or spacer */}
          <span className="shrink-0 w-4 h-4 flex items-center justify-center">
            {hasChildren ? (
              <CaretRightIcon
                size={12}
                weight="bold"
                aria-hidden="true"
                className={[
                  'transition-transform duration-[var(--ds-duration-base)]',
                  isExpanded ? 'rotate-90' : 'rotate-0',
                  isSelected ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]',
                ].join(' ')}
              />
            ) : null}
          </span>

          {/* Optional icon */}
          {node.icon && (
            <span aria-hidden="true" className="shrink-0 flex items-center text-[var(--ds-text-muted)]">
              {node.icon}
            </span>
          )}

          <span className="flex-1 min-w-0 truncate">{node.label}</span>
        </button>
      </li>

      {/* Children */}
      {hasChildren && isExpanded && (
        <li role="none">
          <ul role="group">
            {node.children!.map(child => (
              <TreeNodeRow key={child.id} node={child} depth={depth + 1} />
            ))}
          </ul>
        </li>
      )}
    </>
  );
}

// ─── Tree ─────────────────────────────────────────────────────────────────────

export function Tree({
  nodes,
  selected: controlledSelected,
  onSelect,
  expanded: controlledExpanded,
  onExpandChange,
  defaultExpanded = [],
  className       = '',
}: TreeProps) {
  const isSelectedControlled = controlledSelected !== undefined;
  const isExpandedControlled = controlledExpanded !== undefined;

  const [uncontrolledSelected, setUncontrolledSelected] = useState<string | undefined>(undefined);
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded),
  );

  const selected   = isSelectedControlled ? controlledSelected : uncontrolledSelected;
  const expandedSet = isExpandedControlled ? new Set(controlledExpanded) : uncontrolledExpanded;

  function handleSelect(id: string) {
    if (!isSelectedControlled) setUncontrolledSelected(id);
    onSelect?.(id);
  }

  function toggleExpand(id: string) {
    const next = new Set(expandedSet);
    next.has(id) ? next.delete(id) : next.add(id);
    if (!isExpandedControlled) setUncontrolledExpanded(next);
    onExpandChange?.([...next]);
  }

  return (
    <Ctx.Provider value={{ selected, expandedSet, onSelect: handleSelect, toggleExpand }}>
      <ul
        role="tree"
        className={['space-y-0.5', className].join(' ')}
      >
        {nodes.map(node => (
          <TreeNodeRow key={node.id} node={node} depth={0} />
        ))}
      </ul>
    </Ctx.Provider>
  );
}
