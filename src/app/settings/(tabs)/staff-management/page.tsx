'use client';

import { useSheet } from '@/hooks/use-sheet';
import { useGymStaffs } from '@/services/staff';
import { Staff } from '@/types/staff';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { staffFilters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';

import { DataTable } from '@/components/table/data-table';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { columns } from '@/components/settings/staff-management/columns';
import { StaffsHeader } from '@/components/settings/staff-management/staff-header';

export default function StaffManagement() {
  const { isOpen, openSheet, closeSheet } = useSheet();
  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { data: gymStaffs = [], isLoading } = useGymStaffs(gymId!);

  const { items: staffs, search } = useFilterableList<Staff>(
    gymStaffs,
    searchItems
  );

  return (
    <div className="flex-col gap-4 px-8 my-8 flex w-full">
      <StaffsHeader
        onAddNewClick={() => openSheet()}
        isOpen={isOpen}
        closeSheet={closeSheet}
      />

      {isLoading ? (
        <p className="text-center">Loading staffs...</p>
      ) : (
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
      )}
    </div>
  );
}
