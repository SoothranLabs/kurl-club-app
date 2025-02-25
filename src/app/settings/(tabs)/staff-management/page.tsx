'use client';

import { columns } from '@/components/settings/staff-management/columns';
import { DataTable } from '@/components/table/data-table';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { StaffsHeader } from '@/components/settings/staff-management/staff-header';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';
import { Trainer } from '@/types';
import { initialTrainers } from '@/lib/dummy/data';
import { trainerFilters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';

export default function StaffManagement() {
  const { isOpen, openSheet, closeSheet } = useSheet();
  const { items: trainers, search } = useFilterableList<Trainer>(
    initialTrainers,
    searchItems
  );

  return (
    <div className="flex-col gap-4 px-8 my-8 flex w-full">
      <StaffsHeader
        onAddNewClick={() => openSheet()}
        isOpen={isOpen}
        closeSheet={closeSheet}
      />
      <DataTable
        columns={columns}
        data={trainers}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            onSearch={search}
            filters={trainerFilters}
          />
        )}
      />
    </div>
  );
}
