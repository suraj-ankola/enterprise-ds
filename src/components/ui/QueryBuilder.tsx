'use client';
import React, { useId, useState } from 'react';
import { PlusIcon, TrashIcon, CaretDownIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterOperator =
  | 'equals' | 'not_equals'
  | 'contains' | 'not_contains' | 'starts_with' | 'ends_with'
  | 'gt' | 'gte' | 'lt' | 'lte'
  | 'is_empty' | 'is_not_empty'
  | 'in' | 'not_in';

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'boolean';
export type GroupLogic = 'AND' | 'OR';

export interface QueryField {
  key:       string;
  label:     string;
  type:      FieldType;
  options?:  { value: string; label: string }[];
}

export interface FilterCondition {
  id:       string;
  field:    string;
  operator: FilterOperator;
  value:    string;
}

export interface FilterGroup {
  id:       string;
  logic:    GroupLogic;
  conditions: FilterCondition[];
}

export interface QueryBuilderProps {
  fields:       QueryField[];
  value:        FilterGroup[];
  onChange:     (groups: FilterGroup[]) => void;
  maxGroups?:   number;
  className?:   string;
}

// ─── Operator maps ────────────────────────────────────────────────────────────

const TEXT_OPS: { value: FilterOperator; label: string }[] = [
  { value: 'equals',       label: 'equals' },
  { value: 'not_equals',   label: 'does not equal' },
  { value: 'contains',     label: 'contains' },
  { value: 'not_contains', label: 'does not contain' },
  { value: 'starts_with',  label: 'starts with' },
  { value: 'ends_with',    label: 'ends with' },
  { value: 'is_empty',     label: 'is empty' },
  { value: 'is_not_empty', label: 'is not empty' },
];

const NUMBER_OPS: { value: FilterOperator; label: string }[] = [
  { value: 'equals',     label: '=' },
  { value: 'not_equals', label: '≠' },
  { value: 'gt',         label: '>' },
  { value: 'gte',        label: '≥' },
  { value: 'lt',         label: '<' },
  { value: 'lte',        label: '≤' },
  { value: 'is_empty',   label: 'is empty' },
];

const DATE_OPS = NUMBER_OPS;

const SELECT_OPS: { value: FilterOperator; label: string }[] = [
  { value: 'equals',       label: 'is' },
  { value: 'not_equals',   label: 'is not' },
  { value: 'in',           label: 'is any of' },
  { value: 'not_in',       label: 'is none of' },
  { value: 'is_empty',     label: 'is empty' },
  { value: 'is_not_empty', label: 'is not empty' },
];

const BOOL_OPS: { value: FilterOperator; label: string }[] = [
  { value: 'equals',     label: 'is' },
  { value: 'not_equals', label: 'is not' },
];

function opsForType(type: FieldType) {
  if (type === 'number') return NUMBER_OPS;
  if (type === 'date')   return DATE_OPS;
  if (type === 'select') return SELECT_OPS;
  if (type === 'boolean') return BOOL_OPS;
  return TEXT_OPS;
}

const NO_VALUE_OPS: FilterOperator[] = ['is_empty', 'is_not_empty'];

let _id = 0;
function nextId() { return `f${++_id}`; }
function newCondition(fieldKey: string, type: FieldType): FilterCondition {
  return { id: nextId(), field: fieldKey, operator: opsForType(type)[0].value, value: '' };
}
function newGroup(fields: QueryField[]): FilterGroup {
  const first = fields[0];
  return { id: nextId(), logic: 'AND', conditions: [newCondition(first.key, first.type)] };
}

// ─── ConditionRow ─────────────────────────────────────────────────────────────

interface ConditionRowProps {
  condition:  FilterCondition;
  fields:     QueryField[];
  isLast:     boolean;
  logic:      GroupLogic;
  onChange:   (c: FilterCondition) => void;
  onRemove:   () => void;
}

function ConditionRow({ condition, fields, isLast, logic, onChange, onRemove }: ConditionRowProps) {
  const field = fields.find(f => f.key === condition.field) ?? fields[0];
  const ops   = opsForType(field.type);
  const showValue = !NO_VALUE_OPS.includes(condition.operator);

  const inputCls = 'h-8 px-2.5 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]';
  const selectCls = `${inputCls} pr-7 appearance-none cursor-pointer`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Logic badge */}
      <span className="w-10 text-center text-[10px] font-bold text-[var(--ds-text-muted)] uppercase shrink-0">
        {isLast ? 'WHERE' : logic}
      </span>

      {/* Field */}
      <div className="relative">
        <select
          value={condition.field}
          onChange={e => {
            const f = fields.find(x => x.key === e.target.value)!;
            onChange({ ...condition, field: e.target.value, operator: opsForType(f.type)[0].value, value: '' });
          }}
          className={[selectCls, 'min-w-[120px]'].join(' ')}
        >
          {fields.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
        </select>
        <CaretDownIcon size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ds-text-muted)]" />
      </div>

      {/* Operator */}
      <div className="relative">
        <select
          value={condition.operator}
          onChange={e => onChange({ ...condition, operator: e.target.value as FilterOperator, value: '' })}
          className={[selectCls, 'min-w-[130px]'].join(' ')}
        >
          {ops.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
        <CaretDownIcon size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ds-text-muted)]" />
      </div>

      {/* Value */}
      {showValue && (
        field.type === 'select' && field.options ? (
          <div className="relative">
            <select
              value={condition.value}
              onChange={e => onChange({ ...condition, value: e.target.value })}
              className={[selectCls, 'min-w-[120px]'].join(' ')}
            >
              <option value="">Select…</option>
              {field.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <CaretDownIcon size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ds-text-muted)]" />
          </div>
        ) : field.type === 'boolean' ? (
          <div className="relative">
            <select
              value={condition.value}
              onChange={e => onChange({ ...condition, value: e.target.value })}
              className={[selectCls, 'min-w-[100px]'].join(' ')}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <CaretDownIcon size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ds-text-muted)]" />
          </div>
        ) : (
          <input
            type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
            value={condition.value}
            placeholder="Value…"
            onChange={e => onChange({ ...condition, value: e.target.value })}
            className={[inputCls, 'min-w-[140px]'].join(' ')}
          />
        )
      )}

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove condition"
        className="p-1.5 rounded-lg text-[var(--ds-text-muted)] hover:text-[var(--ds-danger-icon)] hover:bg-[var(--ds-danger-bg)] transition-colors focus-visible:outline-none"
      >
        <TrashIcon size={14} />
      </button>
    </div>
  );
}

// ─── QueryBuilder ─────────────────────────────────────────────────────────────

export function QueryBuilder({ fields, value: groups, onChange, maxGroups = 5, className = '' }: QueryBuilderProps) {
  function updateGroup(groupId: string, patch: Partial<FilterGroup>) {
    onChange(groups.map(g => g.id === groupId ? { ...g, ...patch } : g));
  }

  function addCondition(groupId: string) {
    const first = fields[0];
    const cond  = newCondition(first.key, first.type);
    const group = groups.find(g => g.id === groupId)!;
    updateGroup(groupId, { conditions: [...group.conditions, cond] });
  }

  function updateCondition(groupId: string, condId: string, patch: FilterCondition) {
    const group = groups.find(g => g.id === groupId)!;
    updateGroup(groupId, { conditions: group.conditions.map(c => c.id === condId ? patch : c) });
  }

  function removeCondition(groupId: string, condId: string) {
    const group = groups.find(g => g.id === groupId)!;
    if (group.conditions.length === 1) {
      onChange(groups.filter(g => g.id !== groupId));
    } else {
      updateGroup(groupId, { conditions: group.conditions.filter(c => c.id !== condId) });
    }
  }

  return (
    <div className={['space-y-3', className].join(' ')}>
      {groups.map((group, gi) => (
        <div key={group.id} className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
          {/* Group header */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
            {gi > 0 && (
              <span className="text-xs font-bold text-[var(--ds-text-muted)] uppercase mr-1">OR</span>
            )}
            <span className="text-xs font-semibold text-[var(--ds-text-muted)]">
              Group {gi + 1}
            </span>
            {/* Logic toggle */}
            <div className="flex rounded-md border border-[var(--ds-border-base)] overflow-hidden ml-2">
              {(['AND', 'OR'] as GroupLogic[]).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => updateGroup(group.id, { logic: l })}
                  className={[
                    'px-2.5 py-0.5 text-[10px] font-bold transition-colors',
                    group.logic === l
                      ? 'bg-[var(--ds-brand-600)] text-white'
                      : 'text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-raised)]',
                  ].join(' ')}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => onChange(groups.filter(g => g.id !== group.id))}
              className="text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-danger-text)] transition-colors"
            >
              Remove group
            </button>
          </div>

          {/* Conditions */}
          <div className="p-3 space-y-2">
            {group.conditions.map((cond, ci) => (
              <ConditionRow
                key={cond.id}
                condition={cond}
                fields={fields}
                logic={group.logic}
                isLast={ci === 0}
                onChange={patch => updateCondition(group.id, cond.id, patch)}
                onRemove={() => removeCondition(group.id, cond.id)}
              />
            ))}

            <button
              type="button"
              onClick={() => addCondition(group.id)}
              className="flex items-center gap-1.5 text-xs text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] mt-1 transition-colors focus-visible:outline-none"
            >
              <PlusIcon size={13} weight="bold" />
              Add condition
            </button>
          </div>
        </div>
      ))}

      {groups.length < maxGroups && (
        <button
          type="button"
          onClick={() => onChange([...groups, newGroup(fields)])}
          className="flex items-center gap-1.5 text-xs text-[var(--ds-text-secondary)] border border-dashed border-[var(--ds-border-base)] rounded-xl px-4 py-2.5 w-full hover:border-[var(--ds-brand-400)] hover:text-[var(--ds-brand-600)] transition-colors focus-visible:outline-none"
        >
          <PlusIcon size={13} weight="bold" />
          Add filter group
        </button>
      )}
    </div>
  );
}
