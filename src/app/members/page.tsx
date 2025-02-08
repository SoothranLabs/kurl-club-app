'use client';

import { useState } from 'react';

import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';

import { useGymBranch } from '@/providers/gym-branch-provider';
import { filters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';

import { useGymMembers } from '@/services/member';
import { Member } from '@/types/members';

import { MembersHeader } from '@/components/members/members-header';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/members/table/columns';
import { ImportCSVModal } from '@/components/table/import-csv-modal';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';

export default function MembersPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const { isOpen, openSheet, closeSheet } = useSheet();

  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { data: gymMembers = [], isLoading } = useGymMembers(gymId!);

  const { items: filteredMembers, search } = useFilterableList<Member>(
    gymMembers,
    searchItems
  );

  const requiredFields = [
    'gymNo',
    'name',
    'package',
    'feeStatus',
    'email',
    'phone',
  ];

  const memberTransformations = (
    row: Partial<Member>,
    index: number
  ): Partial<Member> => ({
    ...row,
    id: row.id || `imported-${index + 1}`,
    avatar: row.avatar || '/placeholder.svg?height=32&width=32',
    package: row.package || 'Monthly',
    feeStatus: row.feeStatus
      ? ((['paid', 'unpaid', 'partially_paid'].includes(
          row.feeStatus.toLowerCase()
        )
          ? row.feeStatus.toLowerCase().replace(/\s/g, '_')
          : 'unpaid') as 'paid' | 'partially_paid' | 'unpaid')
      : 'unpaid',
  });

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
        <p className="text-center">Loading members...</p>
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
        onImport={(items) => {
          searchItems([...gymMembers, ...items], '');
        }}
        requiredFields={requiredFields}
        transformations={memberTransformations}
      />
    </div>
  );
}
