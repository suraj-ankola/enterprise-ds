'use client';

import React from 'react';
import {
  CreditCardIcon,
  DownloadSimpleIcon,
  CheckCircleIcon,
  ArrowUpRightIcon,
  SparkleIcon,
  ClockIcon,
  XCircleIcon,
  LightningIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BillingPlan {
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
  nextBillingDate: string;
}

export interface UsageMeter {
  unit: string;
  current: number;
  limit: number;
}

export type InvoiceStatus = 'paid' | 'pending' | 'failed';

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
  downloadUrl?: string;
}

export interface BillingPageProps {
  plan: BillingPlan;
  usage: UsageMeter[];
  invoices: Invoice[];
  onUpgrade: () => void;
  onDownload: (invoiceId: string) => void;
  onUpdatePayment: () => void;
  /** Masked card number e.g. "**** **** **** 4242" */
  cardLast4?: string;
  cardExpiry?: string;
  cardBrand?: string;
}

// ─── Invoice status config ────────────────────────────────────────────────────

const INVOICE_STATUS: Record<
  InvoiceStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  paid: {
    label: 'Paid',
    icon: <CheckCircleIcon size={13} weight="fill" />,
    className: 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]',
  },
  pending: {
    label: 'Pending',
    icon: <ClockIcon size={13} weight="fill" />,
    className: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
  },
  failed: {
    label: 'Failed',
    icon: <XCircleIcon size={13} weight="fill" />,
    className: 'bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)]',
  },
};

// ─── Usage meter bar ──────────────────────────────────────────────────────────

function UsageBar({ meter }: { meter: UsageMeter }) {
  const pct = Math.min(100, Math.round((meter.current / meter.limit) * 100));
  const isHigh = pct >= 90;
  const isMid  = pct >= 70 && pct < 90;

  const barColor = isHigh
    ? 'bg-[var(--ds-danger-icon)]'
    : isMid
    ? 'bg-[var(--ds-warning-icon)]'
    : 'bg-[var(--ds-brand-600)]';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[var(--ds-text-primary)]">{meter.unit}</span>
        <span className="text-xs text-[var(--ds-text-muted)]">
          {meter.current.toLocaleString()} / {meter.limit.toLocaleString()}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--ds-bg-subtle)] overflow-hidden">
        <div
          className={['h-full rounded-full transition-all duration-500', barColor].join(' ')}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={meter.current}
          aria-valuemin={0}
          aria-valuemax={meter.limit}
          aria-label={`${meter.unit} usage`}
        />
      </div>
      {isHigh && (
        <p className="text-xs text-[var(--ds-danger-text)]">{pct}% used — approaching limit</p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BillingPage({
  plan,
  usage,
  invoices,
  onUpgrade,
  onDownload,
  onUpdatePayment,
  cardLast4 = '**** **** **** 4242',
  cardExpiry = '09/27',
  cardBrand = 'Visa',
}: BillingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] flex flex-col">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] sticky top-0 z-[var(--ds-z-sticky)]">
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CreditCardIcon size={22} className="text-[var(--ds-brand-600)] shrink-0" />
            <h1 className="text-xl font-bold text-[var(--ds-text-primary)] leading-tight">
              Billing &amp; plan
            </h1>
          </div>

          <button
            type="button"
            onClick={onUpgrade}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm font-semibold rounded-lg bg-[var(--ds-brand-600)] text-[var(--ds-brand-text)] border border-[var(--ds-brand-600)] hover:bg-[var(--ds-brand-700)] hover:border-[var(--ds-brand-700)] active:bg-[var(--ds-brand-800)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2"
          >
            <LightningIcon size={15} weight="fill" />
            Upgrade plan
          </button>
        </div>
      </header>

      {/* ── Content ───────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-6 max-w-6xl w-full mx-auto space-y-6">

        {/* ── Top row: Plan card + Usage ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Plan card */}
          <div className="lg:col-span-1 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-6 shadow-[var(--ds-shadow-sm)] flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <SparkleIcon size={16} className="text-[var(--ds-brand-600)]" weight="fill" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ds-brand-600)]">
                    Current plan
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--ds-text-primary)]">{plan.name}</h2>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-[var(--ds-text-primary)]">{plan.price}</p>
                <p className="text-xs text-[var(--ds-text-muted)]">per {plan.billingCycle}</p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-[var(--ds-text-secondary)]">
                  <CheckCircleIcon
                    size={15}
                    weight="fill"
                    className="text-[var(--ds-success-icon)] shrink-0 mt-0.5"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Next billing */}
            <div className="pt-4 border-t border-[var(--ds-border-base)]">
              <p className="text-xs text-[var(--ds-text-muted)]">
                Next billing on{' '}
                <span className="font-semibold text-[var(--ds-text-secondary)]">
                  {plan.nextBillingDate}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={onUpgrade}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-semibold rounded-lg bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border border-[var(--ds-border-strong)] hover:bg-[var(--ds-bg-subtle)] active:bg-[var(--ds-border-base)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <ArrowUpRightIcon size={15} />
              Compare plans
            </button>
          </div>

          {/* Usage meters */}
          <div className="lg:col-span-2 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-6 shadow-[var(--ds-shadow-sm)]">
            <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-5">
              Usage this cycle
            </h2>
            <div className="space-y-5">
              {usage.map((meter) => (
                <UsageBar key={meter.unit} meter={meter} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Payment method ──────────────────────────────────────── */}
        <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-6 shadow-[var(--ds-shadow-sm)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">
                Payment method
              </h2>
              <p className="text-sm text-[var(--ds-text-muted)]">
                Used for subscription charges and invoice payments.
              </p>
            </div>
            <button
              type="button"
              onClick={onUpdatePayment}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <PencilSimpleIcon size={13} />
              Update
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4 p-4 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
            {/* Card icon */}
            <div className="h-10 w-16 rounded-md border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] flex items-center justify-center shrink-0">
              <CreditCardIcon size={20} className="text-[var(--ds-text-muted)]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)]">
                {cardBrand} {cardLast4}
              </p>
              <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">
                Expires {cardExpiry}
              </p>
            </div>
          </div>
        </div>

        {/* ── Invoices ────────────────────────────────────────────── */}
        <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden shadow-[var(--ds-shadow-sm)]">
          <div className="px-6 py-4 border-b border-[var(--ds-border-base)]">
            <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">
              Recent invoices
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Download
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--ds-border-base)]">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-sm text-[var(--ds-text-muted)]">No invoices yet</p>
                    </td>
                  </tr>
                ) : invoices.map((invoice) => {
                  const statusCfg = INVOICE_STATUS[invoice.status];
                  return (
                    <tr
                      key={invoice.id}
                      className="hover:bg-[var(--ds-bg-subtle)] transition-colors"
                    >
                      <td className="px-6 py-3 font-mono text-xs text-[var(--ds-text-secondary)]">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-3 text-sm text-[var(--ds-text-primary)]">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold text-[var(--ds-text-primary)]">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-3">
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
                      <td className="px-6 py-3 text-right">
                        {invoice.downloadUrl ? (
                          <button
                            type="button"
                            onClick={() => onDownload(invoice.id)}
                            className="inline-flex items-center gap-1.5 h-7 px-2.5 text-xs font-medium rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                          >
                            <DownloadSimpleIcon size={13} />
                            PDF
                          </button>
                        ) : (
                          <span className="text-xs text-[var(--ds-text-muted)]">—</span>
                        )}
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
