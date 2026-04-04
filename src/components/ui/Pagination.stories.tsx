import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Page navigator with smart ellipsis. `siblingCount` controls how many pages appear around the current page. `totalItems` + `pageSize` shows a "1–25 of 120" range label. Active page uses brand-600 fill. Prev/Next buttons disable at boundaries.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div className="flex flex-col gap-4">
        <Pagination page={page} totalPages={12} onChange={setPage} totalItems={287} pageSize={25} />
        <p className="text-xs text-[var(--ds-text-muted)]">Current page: {page}</p>
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [pages, setPages] = useState<Record<string, number>>({
      few: 2, many: 6, end: 10, sm: 3,
    });
    const set = (k: string) => (p: number) => setPages(prev => ({ ...prev, [k]: p }));

    return (
      <div className="flex flex-col gap-8">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Few pages (no ellipsis)</p>
          <Pagination page={pages.few} totalPages={5} onChange={set('few')} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Many pages (with ellipsis)</p>
          <Pagination page={pages.many} totalPages={20} onChange={set('many')} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Near last page</p>
          <Pagination page={pages.end} totalPages={12} onChange={set('end')} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">With range info</p>
          <Pagination page={pages.many} totalPages={20} onChange={set('many')} totalItems={487} pageSize={25} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Size: sm</p>
          <Pagination page={pages.sm} totalPages={8} onChange={set('sm')} size="sm" />
        </div>

      </div>
    );
  },
};
