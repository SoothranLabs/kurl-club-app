'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { MembersHeader } from '@/components/members/members-header';
import { columns } from '@/components/members/table/columns';
import { TableSkeleton } from '@/components/shared/table-skeleton';
import { DataTable } from '@/components/shared/table/data-table';
import { DataTableToolbar } from '@/components/shared/table/data-table-toolbar';
import { ImportCSVModal } from '@/components/shared/table/import-csv-modal';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';
import { filters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { bulkImportMembers, useGymMembers } from '@/services/member';
import { Member } from '@/types/members';

export default function Members() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const { isOpen, openSheet, closeSheet } = useSheet();

  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { data: gymMembers = [], isLoading } = useGymMembers(gymId!);
  const queryClient = useQueryClient();

  const { items: filteredMembers, search } = useFilterableList<Member>(
    gymMembers,
    searchItems
  );

  const requiredFields = [
    'name',
    'package',
    'email',
    'phone',
    'feeStatus',
    'address',
    'bloodGroup',
    'dob',
    'gender',
  ];

  const memberTransformations = (row: Partial<Member>): Partial<Member> => {
    const { ...memberData } = row;
    return {
      ...memberData,
      gymId: gymId?.toString(),
      avatar: row.avatar || '/placeholder.svg?height=32&width=32',
      package: row.package || 'Monthly',
      feeStatus: row.feeStatus
        ? ((['paid', 'unpaid', 'partially_paid'].includes(
            row.feeStatus.toLowerCase()
          )
            ? row.feeStatus.toLowerCase().replace(/\s/g, '_')
            : 'unpaid') as 'paid' | 'partially_paid' | 'unpaid')
        : 'unpaid',
    };
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex container">
      <MembersHeader
        onImportClick={() => setIsImportModalOpen(true)}
        onAddNewClick={openSheet}
        isOpen={isOpen}
        closeSheet={closeSheet}
        gymId={gymId}
      />

      {isLoading ? (
        <TableSkeleton rows={12} columns={8} showToolbar />
      ) : (
        <DataTable
          columns={columns}
          data={filteredMembers}
          toolbar={(table) => (
            <DataTableToolbar
              table={table}
              onSearch={search}
              filters={filters}
            />
          )}
        />
      )}

      <ImportCSVModal<Member>
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={async (items) => {
          const result = await bulkImportMembers(items);
          if (result.success) {
            await queryClient.invalidateQueries({
              queryKey: ['gymMembers', gymId],
            });
          } else {
            throw new Error(result.error);
          }
        }}
        requiredFields={requiredFields}
        transformations={memberTransformations}
      />
    </div>
  );
}
