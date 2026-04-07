'use client';
import React from 'react';
import {
  UserIcon,
  BellIcon,
  LockSimpleIcon,
  PaletteIcon,
  PlugsConnectedIcon,
  BuildingsIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SettingsSection {
  id:       string;
  label:    string;
  icon:     React.ReactNode;
  description?: string;
}

export interface SettingsPageProps {
  sections:     SettingsSection[];
  activeSection?: string;
  onSectionChange?: (id: string) => void;
  /** Content area for the active section */
  children:     React.ReactNode;
  title?:       string;
  className?:   string;
}

// ─── SettingsPage ─────────────────────────────────────────────────────────────

export function SettingsPage({
  sections,
  activeSection,
  onSectionChange,
  children,
  title = 'Settings',
  className = '',
}: SettingsPageProps) {
  return (
    <div className={['min-h-screen bg-[var(--ds-bg-base)]', className].join(' ')}>
      {/* Page header */}
      <div className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] px-6 py-5">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6 flex gap-8 items-start">
        {/* Sidebar nav */}
        <nav className="w-52 shrink-0 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
          <ul className="py-1">
            {sections.map(section => {
              const isActive = section.id === activeSection;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => onSectionChange?.(section.id)}
                    className={[
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                      isActive
                        ? 'bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)]'
                        : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)]',
                    ].join(' ')}
                  >
                    <span className={isActive ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]'}>
                      {section.icon}
                    </span>
                    <span className="text-sm font-medium">{section.label}</span>
                    {isActive && <CaretRightIcon size={12} className="ml-auto text-[var(--ds-brand-400)]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── SettingsSection helper ───────────────────────────────────────────────────

export interface SettingsSectionCardProps {
  title:       string;
  description?: string;
  children:    React.ReactNode;
  action?:     React.ReactNode;
  className?:  string;
}

export function SettingsSectionCard({ title, description, children, action, className = '' }: SettingsSectionCardProps) {
  return (
    <div className={['bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden', className].join(' ')}>
      <div className="flex items-start justify-between px-5 py-4 border-b border-[var(--ds-border-base)]">
        <div>
          <h2 className="text-sm font-semibold text-[var(--ds-text-primary)]">{title}</h2>
          {description && <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── SettingsField helper ─────────────────────────────────────────────────────

export interface SettingsFieldProps {
  label:        string;
  description?: string;
  children:     React.ReactNode;
  /** Inline layout: label left, control right */
  inline?:      boolean;
}

export function SettingsField({ label, description, children, inline = false }: SettingsFieldProps) {
  if (inline) {
    return (
      <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--ds-border-base)] last:border-0">
        <div>
          <p className="text-sm font-medium text-[var(--ds-text-primary)]">{label}</p>
          {description && <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{description}</p>}
        </div>
        <div className="shrink-0">{children}</div>
      </div>
    );
  }
  return (
    <div className="space-y-1.5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
      <label className="text-sm font-medium text-[var(--ds-text-primary)]">{label}</label>
      {description && <p className="text-xs text-[var(--ds-text-muted)]">{description}</p>}
      <div>{children}</div>
    </div>
  );
}

// ─── Default sections export for convenience ──────────────────────────────────

export const DEFAULT_SETTINGS_SECTIONS: SettingsSection[] = [
  { id: 'profile',       label: 'Profile',        icon: <UserIcon           size={16} /> },
  { id: 'organisation',  label: 'Organisation',   icon: <BuildingsIcon      size={16} /> },
  { id: 'notifications', label: 'Notifications',  icon: <BellIcon           size={16} /> },
  { id: 'security',      label: 'Security',       icon: <LockSimpleIcon     size={16} /> },
  { id: 'appearance',    label: 'Appearance',     icon: <PaletteIcon        size={16} /> },
  { id: 'integrations',  label: 'Integrations',   icon: <PlugsConnectedIcon size={16} /> },
];
