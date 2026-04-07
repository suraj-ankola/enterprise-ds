'use client';
import React, { useState } from 'react';
import {
  CheckCircleIcon,
  CircleIcon,
  PlusIcon,
  CalendarBlankIcon,
  UserCircleIcon,
  FlagIcon,
  DotsThreeIcon,
  TrashIcon,
  PencilSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TaskPriority  = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus    = 'todo' | 'in_progress' | 'done';

export interface Task {
  id:         string;
  title:      string;
  status:     TaskStatus;
  priority?:  TaskPriority;
  dueDate?:   string;
  assignee?:  string;
  tags?:      string[];
}

export interface TaskPanelProps {
  tasks:      Task[];
  onChange:   (tasks: Task[]) => void;
  title?:     string;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRIORITY_META: Record<TaskPriority, { label: string; cls: string }> = {
  critical: { label: 'Critical', cls: 'text-[var(--ds-danger-text)]'   },
  high:     { label: 'High',     cls: 'text-[var(--ds-warning-text)]'  },
  medium:   { label: 'Medium',   cls: 'text-[var(--ds-brand-600)]'     },
  low:      { label: 'Low',      cls: 'text-[var(--ds-text-muted)]'    },
};

const STATUS_GROUPS: { id: TaskStatus; label: string }[] = [
  { id: 'todo',        label: 'To do'       },
  { id: 'in_progress', label: 'In progress' },
  { id: 'done',        label: 'Done'        },
];

let _tid = 0;
function nextId() { return `t${++_tid}`; }

// ─── Component ────────────────────────────────────────────────────────────────

export function TaskPanel({ tasks, onChange, title = 'Tasks', className = '' }: TaskPanelProps) {
  const [adding,   setAdding]   = useState<TaskStatus | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [menuId,   setMenuId]   = useState<string | null>(null);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [editVal,  setEditVal]  = useState('');

  function addTask(status: TaskStatus) {
    if (!newTitle.trim()) { setAdding(null); return; }
    onChange([...tasks, { id: nextId(), title: newTitle.trim(), status }]);
    setNewTitle('');
    setAdding(null);
  }

  function toggleDone(id: string) {
    onChange(tasks.map(t =>
      t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t,
    ));
  }

  function deleteTask(id: string) {
    onChange(tasks.filter(t => t.id !== id));
    setMenuId(null);
  }

  function startEdit(t: Task) {
    setEditId(t.id);
    setEditVal(t.title);
    setMenuId(null);
  }

  function commitEdit(id: string) {
    if (!editVal.trim()) return;
    onChange(tasks.map(t => t.id === id ? { ...t, title: editVal.trim() } : t));
    setEditId(null);
  }

  return (
    <div className={['bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden', className].join(' ')}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--ds-border-base)]">
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">{title}</h3>
        <span className="text-xs text-[var(--ds-text-muted)]">
          {tasks.filter(t => t.status === 'done').length}/{tasks.length} done
        </span>
      </div>

      {/* Groups */}
      <div className="divide-y divide-[var(--ds-border-base)]">
        {STATUS_GROUPS.map(group => {
          const groupTasks = tasks.filter(t => t.status === group.id);
          return (
            <div key={group.id}>
              <div className="flex items-center justify-between px-4 py-2 bg-[var(--ds-bg-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">{group.label}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[var(--ds-bg-raised)] text-[var(--ds-text-muted)]">{groupTasks.length}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setAdding(group.id); setNewTitle(''); }}
                  className="p-1 rounded text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                  aria-label={`Add task to ${group.label}`}
                >
                  <PlusIcon size={13} />
                </button>
              </div>

              <ul className="divide-y divide-[var(--ds-border-base)]">
                {groupTasks.map(task => (
                  <li key={task.id} className="flex items-start gap-3 px-4 py-2.5 group hover:bg-[var(--ds-bg-subtle)] relative">
                    {/* Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleDone(task.id)}
                      className="mt-0.5 shrink-0 text-[var(--ds-text-muted)] hover:text-[var(--ds-brand-600)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded-full"
                    >
                      {task.status === 'done'
                        ? <CheckCircleIcon size={16} weight="fill" className="text-[var(--ds-success-icon)]" />
                        : <CircleIcon      size={16} />}
                    </button>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      {editId === task.id ? (
                        <div className="flex gap-1">
                          <input
                            autoFocus
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') commitEdit(task.id);
                              if (e.key === 'Escape') setEditId(null);
                            }}
                            className="flex-1 text-sm px-2 py-0.5 rounded border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                          />
                          <button type="button" onClick={() => commitEdit(task.id)} className="p-1 rounded text-[var(--ds-success-icon)]"><CheckCircleIcon size={14} /></button>
                          <button type="button" onClick={() => setEditId(null)} className="p-1 rounded text-[var(--ds-text-muted)]"><XIcon size={14} /></button>
                        </div>
                      ) : (
                        <p className={['text-sm', task.status === 'done' ? 'line-through text-[var(--ds-text-muted)]' : 'text-[var(--ds-text-primary)]'].join(' ')}>
                          {task.title}
                        </p>
                      )}

                      {/* Meta row */}
                      {(task.priority || task.dueDate || task.assignee || task.tags?.length) && (
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          {task.priority && (
                            <span className={['flex items-center gap-0.5 text-[11px]', PRIORITY_META[task.priority].cls].join(' ')}>
                              <FlagIcon size={10} weight="fill" />{PRIORITY_META[task.priority].label}
                            </span>
                          )}
                          {task.dueDate && (
                            <span className="flex items-center gap-0.5 text-[11px] text-[var(--ds-text-muted)]">
                              <CalendarBlankIcon size={10} />{task.dueDate}
                            </span>
                          )}
                          {task.assignee && (
                            <span className="flex items-center gap-0.5 text-[11px] text-[var(--ds-text-muted)]">
                              <UserCircleIcon size={10} />{task.assignee}
                            </span>
                          )}
                          {task.tags?.map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] rounded text-[var(--ds-text-muted)]">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Context menu */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setMenuId(id => id === task.id ? null : task.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-raised)]"
                      >
                        <DotsThreeIcon size={16} />
                      </button>
                      {menuId === task.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-xl z-10 overflow-hidden py-1">
                          <button
                            type="button"
                            onClick={() => startEdit(task)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-[var(--ds-bg-subtle)]"
                          >
                            <PencilSimpleIcon size={12} /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--ds-danger-text)] hover:bg-[var(--ds-danger-bg)]"
                          >
                            <TrashIcon size={12} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}

                {/* New task input */}
                {adding === group.id && (
                  <li className="px-4 py-2 flex items-center gap-2">
                    <CircleIcon size={16} className="text-[var(--ds-text-muted)] shrink-0" />
                    <input
                      autoFocus
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') addTask(group.id);
                        if (e.key === 'Escape') setAdding(null);
                      }}
                      placeholder="Task title…"
                      className="flex-1 text-sm bg-transparent focus-visible:outline-none placeholder:text-[var(--ds-text-muted)]"
                    />
                    <button type="button" onClick={() => addTask(group.id)} className="px-2 py-1 text-xs rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]">Add</button>
                    <button type="button" onClick={() => setAdding(null)} className="p-1 rounded text-[var(--ds-text-muted)]"><XIcon size={13} /></button>
                  </li>
                )}

                {groupTasks.length === 0 && adding !== group.id && (
                  <li className="px-4 py-2 text-xs text-[var(--ds-text-muted)]">No tasks</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
