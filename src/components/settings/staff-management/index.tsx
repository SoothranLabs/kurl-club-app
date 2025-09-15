'use client';

import { columns } from '@/components/settings/staff-management/columns';
import { StaffsHeader } from '@/components/settings/staff-management/staff-header';
import { TableSkeleton } from '@/components/shared/table-skeleton';
import { DataTable } from '@/components/shared/table/data-table';
import { DataTableToolbar } from '@/components/shared/table/data-table-toolbar';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';
import { staffFilters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { useGymStaffs } from '@/services/staff';
import { Staff } from '@/types/staff';

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
    <div>
      <StaffsHeader
        onAddNewClick={() => openSheet()}
        isOpen={isOpen}
        closeSheet={closeSheet}
      />

      <div className="p-8 max-w-[calc(100vw-342px)]">
        {isLoading ? (
          <TableSkeleton rows={8} columns={6} showToolbar />
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
    </div>
  );
}
