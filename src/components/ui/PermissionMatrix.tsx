'use client';
import React, { useState } from 'react';
import { CheckIcon, MinusIcon, LockSimpleIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PermissionValue = boolean | 'partial';

export interface PermissionResource {
  id:       string;
  label:    string;
  group?:   string;
}

export interface PermissionAction {
  id:     string;
  label:  string;
  short?: string;
}

export interface PermissionRole {
  id:       string;
  label:    string;
  /** Locked roles cannot be edited */
  locked?:  boolean;
  permissions: Record<string, Record<string, PermissionValue>>;
  // Shape: { [resourceId]: { [actionId]: PermissionValue } }
}

export interface PermissionMatrixProps {
  resources:  PermissionResource[];
  actions:    PermissionAction[];
  roles:      PermissionRole[];
  /** If omitted, matrix is read-only */
  onChange?:  (roles: PermissionRole[]) => void;
  className?: string;
}

// ─── Cell ─────────────────────────────────────────────────────────────────────

function PermCell({
  value,
  locked,
  onChange,
}: {
  value:    PermissionValue;
  locked:   boolean;
  onChange: (v: PermissionValue) => void;
}) {
  function cycle() {
    if (locked) return;
    if (value === false)    onChange('partial');
    else if (value === 'partial') onChange(true);
    else                     onChange(false);
  }

  const cls = value === true
    ? 'bg-[var(--ds-brand-600)] border-[var(--ds-brand-600)] text-white'
    : value === 'partial'
    ? 'bg-[var(--ds-brand-100)] border-[var(--ds-brand-400)] text-[var(--ds-brand-600)]'
    : 'bg-[var(--ds-bg-surface)] border-[var(--ds-border-base)] text-transparent hover:border-[var(--ds-brand-400)]';

  return (
    <button
      type="button"
      onClick={cycle}
      disabled={locked}
      aria-label={value === true ? 'Allowed' : value === 'partial' ? 'Partial' : 'Denied'}
      className={[
        'h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all mx-auto',
        cls,
        locked ? 'cursor-default' : 'cursor-pointer',
      ].join(' ')}
    >
      {value === true    && <CheckIcon size={12} weight="bold" />}
      {value === 'partial' && <MinusIcon size={12} weight="bold" />}
    </button>
  );
}

// ─── PermissionMatrix ─────────────────────────────────────────────────────────

export function PermissionMatrix({
  resources,
  actions,
  roles,
  onChange,
  className = '',
}: PermissionMatrixProps) {
  function toggleCell(roleId: string, resourceId: string, actionId: string, value: PermissionValue) {
    if (!onChange) return;
    onChange(roles.map(r => {
      if (r.id !== roleId || r.locked) return r;
      return {
        ...r,
        permissions: {
          ...r.permissions,
          [resourceId]: {
            ...(r.permissions[resourceId] ?? {}),
            [actionId]: value,
          },
        },
      };
    }));
  }

  // Group resources
  const groups = Array.from(new Set(resources.map(r => r.group ?? ''))).filter(Boolean);
  const ungrouped = resources.filter(r => !r.group);

  function renderResourceRows(res: PermissionResource[]) {
    return res.map(resource => (
      <tr key={resource.id} className="border-b border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]">
        <td className="sticky left-0 bg-inherit px-4 py-2.5 text-sm text-[var(--ds-text-primary)] whitespace-nowrap z-10">
          {resource.label}
        </td>
        {roles.map(role => (
          actions.map(action => (
            <td key={`${role.id}-${action.id}`} className="px-2 py-2.5 text-center">
              <PermCell
                value={role.permissions[resource.id]?.[action.id] ?? false}
                locked={!!role.locked || !onChange}
                onChange={v => toggleCell(role.id, resource.id, action.id, v)}
              />
            </td>
          ))
        ))}
      </tr>
    ));
  }

  return (
    <div className={['overflow-auto rounded-xl border border-[var(--ds-border-base)]', className].join(' ')}>
      <table className="w-full text-sm border-collapse">
        <thead>
          {/* Role header row */}
          <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
            <th className="sticky left-0 bg-[var(--ds-bg-subtle)] px-4 py-2.5 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide z-20 min-w-[160px]">
              Resource
            </th>
            {roles.map(role => (
              <th
                key={role.id}
                colSpan={actions.length}
                className="px-2 py-2.5 text-center text-xs font-semibold text-[var(--ds-text-primary)] border-l border-[var(--ds-border-base)]"
              >
                <div className="flex items-center justify-center gap-1">
                  {role.label}
                  {role.locked && <LockSimpleIcon size={11} className="text-[var(--ds-text-muted)]" />}
                </div>
              </th>
            ))}
          </tr>
          {/* Action header row */}
          <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
            <th className="sticky left-0 bg-[var(--ds-bg-subtle)] z-20" />
            {roles.map(role => (
              actions.map(action => (
                <th
                  key={`${role.id}-${action.id}`}
                  className={[
                    'px-2 py-1.5 text-[10px] font-medium text-[var(--ds-text-muted)] uppercase tracking-wide',
                    action.id === actions[0].id ? 'border-l border-[var(--ds-border-base)]' : '',
                  ].join(' ')}
                >
                  {action.short ?? action.label}
                </th>
              ))
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Ungrouped resources */}
          {renderResourceRows(ungrouped)}
          {/* Grouped resources */}
          {groups.map(group => (
            <React.Fragment key={group}>
              <tr className="bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
                <td
                  colSpan={1 + roles.length * actions.length}
                  className="sticky left-0 bg-[var(--ds-bg-subtle)] px-4 py-1.5 text-[10px] font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide z-10"
                >
                  {group}
                </td>
              </tr>
              {renderResourceRows(resources.filter(r => r.group === group))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
        {[
          { val: true,      label: 'Allowed'  },
          { val: 'partial', label: 'Partial'  },
          { val: false,     label: 'Denied'   },
        ].map(({ val, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={[
              'h-4 w-4 rounded border-2 flex items-center justify-center',
              val === true    ? 'bg-[var(--ds-brand-600)] border-[var(--ds-brand-600)]' :
              val === 'partial' ? 'bg-[var(--ds-brand-100)] border-[var(--ds-brand-400)]' :
                                 'bg-[var(--ds-bg-surface)] border-[var(--ds-border-base)]',
            ].join(' ')}>
              {val === true    && <CheckIcon size={10} weight="bold" className="text-white" />}
              {val === 'partial' && <MinusIcon size={10} weight="bold" className="text-[var(--ds-brand-600)]" />}
            </div>
            <span className="text-[11px] text-[var(--ds-text-muted)]">{label}</span>
          </div>
        ))}
        {onChange && (
          <span className="text-[11px] text-[var(--ds-text-muted)] ml-auto">Click cells to cycle permissions</span>
        )}
      </div>
    </div>
  );
}
