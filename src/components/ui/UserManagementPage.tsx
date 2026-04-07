'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  DotsThreeIcon,
  CaretDownIcon,
  UserCircleIcon,
  ProhibitIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserStatus = 'active' | 'invited' | 'suspended';

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  lastLogin?: string;
  avatar?: string;
}

export interface UserManagementPageProps {
  users: User[];
  roles: string[];
  onInvite: () => void;
  onRoleChange: (userId: string | number, newRole: string) => void;
  onSuspend: (userId: string | number) => void;
  onRemove: (userId: string | number) => void;
  loading?: boolean;
}

// ─── Status badge config ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<UserStatus, { label: string; icon: React.ReactNode; className: string }> = {
  active: {
    label: 'Active',
    icon: <CheckCircleIcon size={13} weight="fill" />,
    className: 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]',
  },
  invited: {
    label: 'Invited',
    icon: <ClockIcon size={13} weight="fill" />,
    className: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
  },
  suspended: {
    label: 'Suspended',
    icon: <XCircleIcon size={13} weight="fill" />,
    className: 'bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)]',
  },
};

// ─── Avatar / Initials ────────────────────────────────────────────────────────

function UserAvatar({ name, avatar, size = 32 }: { name: string; avatar?: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="shrink-0 inline-flex items-center justify-center rounded-full bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)] font-semibold select-none"
      style={{ width: size, height: size, fontSize: size * 0.375 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

// ─── Actions dropdown (3-dot menu) ───────────────────────────────────────────

function ActionsMenu({
  user,
  onSuspend,
  onRemove,
}: {
  user: User;
  onSuspend: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
        aria-label="More actions"
        aria-expanded={open}
      >
        <DotsThreeIcon size={18} weight="bold" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-[var(--ds-z-popover)] w-44 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-lg)] py-1">
          {user.status !== 'suspended' && (
            <button
              type="button"
              onClick={() => { onSuspend(user.id); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--ds-warning-text)] hover:bg-[var(--ds-bg-subtle)] transition-colors"
            >
              <ProhibitIcon size={15} />
              Suspend user
            </button>
          )}
          <button
            type="button"
            onClick={() => { onRemove(user.id); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--ds-danger-text)] hover:bg-[var(--ds-bg-subtle)] transition-colors"
          >
            <TrashIcon size={15} />
            Remove user
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-[var(--ds-border-base)]">
      {/* Avatar + name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[var(--ds-bg-subtle)] animate-pulse shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3 w-28 rounded bg-[var(--ds-bg-subtle)] animate-pulse" />
            <div className="h-2.5 w-36 rounded bg-[var(--ds-bg-subtle)] animate-pulse" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-3 w-20 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-5 w-16 rounded-full bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-24 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-8 w-8 rounded-lg bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
    </tr>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function UserManagementPage({
  users,
  roles,
  onInvite,
  onRoleChange,
  onSuspend,
  onRemove,
  loading = false,
}: UserManagementPageProps) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] flex flex-col">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] sticky top-0 z-[var(--ds-z-sticky)]">
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <UserCircleIcon size={22} className="text-[var(--ds-brand-600)] shrink-0" />
            <h1 className="text-xl font-bold text-[var(--ds-text-primary)] leading-tight">
              Team members
            </h1>
            <span className="inline-flex items-center h-6 px-2 rounded-full text-xs font-semibold bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]">
              {users.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onInvite}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm font-semibold rounded-lg bg-[var(--ds-brand-600)] text-[var(--ds-brand-text)] border border-[var(--ds-brand-600)] hover:bg-[var(--ds-brand-700)] hover:border-[var(--ds-brand-700)] active:bg-[var(--ds-brand-800)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2"
          >
            <UserPlusIcon size={16} weight="bold" />
            Invite member
          </button>
        </div>
      </header>

      {/* ── Content ───────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
            <MagnifyingGlassIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-sm rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)] hover:border-[var(--ds-border-strong)] focus:outline-none focus:border-[var(--ds-brand-500)] focus:ring-2 focus:ring-[var(--ds-brand-500)]/20 transition-colors"
            />
          </div>

          {/* Role filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none h-9 pl-3 pr-8 text-sm rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] hover:border-[var(--ds-border-strong)] focus:outline-none focus:border-[var(--ds-brand-500)] focus:ring-2 focus:ring-[var(--ds-brand-500)]/20 transition-colors cursor-pointer"
            >
              <option value="">All roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <CaretDownIcon
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
            />
          </div>
        </div>

        {/* Table card */}
        <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden shadow-[var(--ds-shadow-sm)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Last login
                  </th>
                  <th className="px-4 py-3 w-12" />
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--ds-border-base)]">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                  : filtered.length === 0
                  ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <UserCircleIcon size={32} className="text-[var(--ds-text-muted)]" />
                          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">No users found</p>
                          <p className="text-xs text-[var(--ds-text-muted)]">Try adjusting your search or filter.</p>
                        </div>
                      </td>
                    </tr>
                  )
                  : filtered.map((user) => {
                    const statusCfg = STATUS_CONFIG[user.status];
                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-[var(--ds-bg-subtle)] transition-colors"
                      >
                        {/* User cell */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <UserAvatar name={user.name} avatar={user.avatar} />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[var(--ds-text-primary)] truncate leading-tight">
                                {user.name}
                              </p>
                              <p className="text-xs text-[var(--ds-text-muted)] truncate mt-0.5">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role dropdown */}
                        <td className="px-4 py-3">
                          <div className="relative inline-block">
                            <select
                              value={user.role}
                              onChange={(e) => onRoleChange(user.id, e.target.value)}
                              className="appearance-none text-sm pl-2.5 pr-7 py-1 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] hover:border-[var(--ds-border-strong)] focus:outline-none focus:border-[var(--ds-brand-500)] focus:ring-2 focus:ring-[var(--ds-brand-500)]/20 transition-colors cursor-pointer"
                            >
                              {roles.map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                            <CaretDownIcon
                              size={12}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
                            />
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3">
                          <span
                            className={[
                              'inline-flex items-center gap-1.5 h-6 px-2 rounded-full text-xs font-medium',
                              statusCfg.className,
                            ].join(' ')}
                          >
                            {statusCfg.icon}
                            {statusCfg.label}
                          </span>
                        </td>

                        {/* Last login */}
                        <td className="px-4 py-3 text-sm text-[var(--ds-text-muted)]">
                          {user.lastLogin ?? '—'}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <ActionsMenu user={user} onSuspend={onSuspend} onRemove={onRemove} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
