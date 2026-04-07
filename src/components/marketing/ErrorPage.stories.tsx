import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
  title: 'Marketing/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '5 pre-configured error variants: 404, 500, 503, maintenance, forbidden. Pass `variant="custom"` with your own code/title/description for anything else. Dark and light themes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorPage>;

const HomeBtn = ({ dark = false }: { dark?: boolean }) => (
  <a
    href="#"
    className="h-10 px-5 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors inline-flex items-center"
  >
    Go back home
  </a>
);
const BackBtn = ({ dark = false }: { dark?: boolean }) => (
  <a
    href="#"
    className={['h-10 px-5 rounded-xl border text-sm font-semibold transition-colors inline-flex items-center', dark ? 'border-white/20 text-white/70 hover:bg-white/10' : 'border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)]'].join(' ')}
  >
    ← Go back
  </a>
);

export const NotFound: Story = {
  name: '404 — Not found',
  render: () => (
    <ErrorPage
      variant="404"
      actions={<><HomeBtn /><BackBtn /></>}
    />
  ),
};

export const ServerError: Story = {
  name: '500 — Server error',
  render: () => (
    <ErrorPage
      variant="500"
      actions={
        <>
          <button
            onClick={() => window.location.reload()}
            className="h-10 px-5 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors"
          >
            Try again
          </button>
          <HomeBtn />
        </>
      }
    />
  ),
};

export const Maintenance: Story = {
  name: 'Maintenance',
  render: () => (
    <ErrorPage
      variant="maintenance"
      dark
      actions={
        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-2">
          Follow status updates →
        </a>
      }
    />
  ),
};

export const Forbidden: Story = {
  name: '403 — Forbidden',
  render: () => (
    <ErrorPage
      variant="forbidden"
      actions={
        <>
          <HomeBtn />
          <a href="#" className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors">
            Contact support
          </a>
        </>
      }
    />
  ),
};

export const ServiceUnavailable: Story = {
  name: '503 — Service unavailable',
  render: () => (
    <ErrorPage
      variant="503"
      dark
      actions={
        <button
          onClick={() => window.location.reload()}
          className="h-10 px-5 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors"
        >
          Retry
        </button>
      }
    />
  ),
};

export const Custom: Story = {
  name: 'Custom error',
  render: () => (
    <ErrorPage
      variant="custom"
      code="🔒"
      title="Session expired"
      description="Your session has timed out for security reasons. Please sign in again to continue."
      actions={
        <a
          href="#"
          className="h-10 px-5 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors inline-flex items-center"
        >
          Sign in
        </a>
      }
    />
  ),
};
