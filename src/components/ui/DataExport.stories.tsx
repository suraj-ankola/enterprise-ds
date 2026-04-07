import type { Meta, StoryObj } from '@storybook/react';
import { DataExport } from './DataExport';

const meta: Meta<typeof DataExport> = {
  title: 'Data Display/DataExport',
  component: DataExport,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Self-contained export panel for tables and data grids. Lets users pick format (CSV, Excel, JSON), select which columns to include, then triggers a download. Shows a loading spinner during export and a success state on completion. Designed to be placed in a Popover, Drawer, or Modal.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    entityName: {
      description: 'Human name of the data being exported (e.g. "vendors", "transactions")',
      control: { type: 'text' },
    },
    totalRows: {
      description: 'Total count of exportable rows',
      control: { type: 'number' },
    },
    defaultFormat: {
      description: 'Pre-selected export format',
      control: { type: 'select' },
      options: ['csv', 'xlsx', 'json'],
    },
    columns: { control: false },
    onExport: { action: 'exported' },
  },
  args: {
    entityName:    'vendors',
    totalRows:     1284,
    defaultFormat: 'csv',
  },
};
export default meta;
type Story = StoryObj<typeof DataExport>;

const VENDOR_COLUMNS = [
  { key: 'name',       label: 'Vendor name'    },
  { key: 'risk_score', label: 'Risk score'      },
  { key: 'risk_tier',  label: 'Risk tier'       },
  { key: 'framework',  label: 'Framework'       },
  { key: 'last_audit', label: 'Last audit date' },
  { key: 'contact',    label: 'Contact email'   },
  { key: 'region',     label: 'Region'          },
  { key: 'created_at', label: 'Date added'      },
];

export const Playground: Story = {
  args: {
    columns: VENDOR_COLUMNS,
  },
  render: (args) => (
    <div className="max-w-sm">
      <DataExport
        {...args}
        onExport={async (format, cols) => {
          args.onExport?.(format, cols);
          await new Promise(r => setTimeout(r, 1500));
        }}
      />
    </div>
  ),
};

export const JSONDefault: Story = {
  name: 'JSON format pre-selected',
  render: () => (
    <div className="max-w-sm">
      <DataExport
        entityName="audit logs"
        totalRows={42000}
        columns={VENDOR_COLUMNS}
        defaultFormat="json"
        onExport={async () => { await new Promise(r => setTimeout(r, 1000)); }}
      />
    </div>
  ),
};

export const FewColumns: Story = {
  name: 'Few columns',
  render: () => (
    <div className="max-w-sm">
      <DataExport
        entityName="transactions"
        totalRows={320}
        columns={[
          { key: 'id',     label: 'ID'     },
          { key: 'amount', label: 'Amount' },
          { key: 'date',   label: 'Date'   },
        ]}
        onExport={async () => { await new Promise(r => setTimeout(r, 800)); }}
      />
    </div>
  ),
};
