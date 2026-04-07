import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current page (1-indexed)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'How many page numbers to show on each side of the current page',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Button size variant',
    },
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total item count — enables the "1–25 of 120" range label when combined with `pageSize`',
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description: 'Items per page — used with `totalItems` to compute the range label',
    },
    onChange: {
      control: false,
      description: 'Callback fired with the new page number',
    },
  },
  args: {
    page:        1,
    totalPages:  10,
    siblingCount: 1,
    size:        'md',
  },
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

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return <Pagination {...args} page={page} onChange={setPage} />;
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const FewPages: Story = {
  name: 'Few pages (no ellipsis)',
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} totalPages={5} onChange={setPage} />;
  },
};

export const ManyPages: Story = {
  name: 'Many pages (with ellipsis)',
  render: () => {
    const [page, setPage] = useState(6);
    return <Pagination page={page} totalPages={20} onChange={setPage} />;
  },
};

export const NearLastPage: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination page={page} totalPages={12} onChange={setPage} />;
  },
};

export const WithRangeInfo: Story = {
  name: 'With range info label',
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination page={page} totalPages={20} onChange={setPage} totalItems={487} pageSize={25} />;
  },
};

export const SmallSize: Story = {
  name: 'Size — sm',
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination page={page} totalPages={8} onChange={setPage} size="sm" />;
  },
};

export const FirstPage: Story = {
  name: 'First page (Prev disabled)',
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onChange={setPage} />;
  },
};

export const LastPage: Story = {
  name: 'Last page (Next disabled)',
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination page={page} totalPages={10} onChange={setPage} />;
  },
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

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
