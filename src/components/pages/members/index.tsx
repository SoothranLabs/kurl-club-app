'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { StudioLayout } from '@/components/shared/layout';
import {
  DataTable,
  DataTableToolbar,
  TableSkeleton,
} from '@/components/shared/table';
import { ImportCSVModal } from '@/components/shared/table/import-csv-modal';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';
import { filters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { bulkImportMembers, useGymMembers } from '@/services/member';
import { Member } from '@/types/members';

import { MembersHeader } from './members-header';
import { columns } from './table/columns';

export default function Members() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const { isOpen, openSheet, closeSheet } = useSheet();

  // Check if user returned from setup and should open dialog
  useEffect(() => {
    if (searchParams.get('setup') === 'true') {
      openSheet();
      // Clean up URL without page refresh
      window.history.replaceState({}, '', '/members');
    }
  }, [searchParams, openSheet]);

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
    <>
      <StudioLayout
        title="Members"
        headerActions={
          <MembersHeader
            onImportClick={() => setIsImportModalOpen(true)}
            onAddNewClick={openSheet}
            isOpen={isOpen}
            closeSheet={closeSheet}
            gymId={gymId}
          />
        }
      >
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
      </StudioLayout>

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
    </>
  );
}
