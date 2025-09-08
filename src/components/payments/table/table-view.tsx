'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/table/data-table';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { FilterConfig } from '@/lib/filters';
import { searchItems } from '@/lib/utils';
import { Payment } from '@/types/payment';

type Props = {
  payments: Payment[];
  columns: ColumnDef<Payment, unknown>[];
  filters?: FilterConfig[];
};

export const TableView = ({ payments, columns, filters }: Props) => {
  const { items: filteredPayments, search } = useFilterableList<Payment>(
    payments,
    searchItems
  );

  return (
    <DataTable
      columns={columns}
      data={filteredPayments}
      toolbar={(table) => (
        <DataTableToolbar
          table={table}
          onSearch={search}
          filters={filters ?? []}
        />
      )}
    />
  );
};
