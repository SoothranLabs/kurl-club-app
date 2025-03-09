'use client';

import { useSheet } from '@/hooks/use-sheet';
import { Staff } from '@/types';
import { initialStaffs } from '@/lib/dummy/data';
import { staffFilters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';

import { DataTable } from '@/components/table/data-table';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { columns } from '@/components/settings/staff-management/columns';
import { StaffsHeader } from '@/components/settings/staff-management/staff-header';

export default function StaffManagement() {
  const { isOpen, openSheet, closeSheet } = useSheet();
  const { items: staffs, search } = useFilterableList<Staff>(
    initialStaffs,
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
        data={staffs}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            onSearch={search}
            filters={staffFilters}
          />
        )}
      />
    </div>
  );
}
