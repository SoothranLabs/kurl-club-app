'use client';

import { useEffect, useState } from 'react';

import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';

import { useGymBranch } from '@/providers/gym-branch-provider';
import { filters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';

import { Member } from '@/types';
import { getAllMembers } from '@/services/member';

import { MembersHeader } from '@/components/members/members-header';
import { DataTable } from '@/components/members/table/data-table';
import { columns } from '@/components/members/table/columns';
import { ImportCSVModal } from '@/components/table/import-csv-modal';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';

export default function MembersPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gymMembers, setGymMembers] = useState<Member[]>([]);

  const {
    items: members,
    addItems,
    search,
  } = useFilterableList<Member>(gymMembers, searchItems);
  const { isOpen, openSheet, closeSheet } = useSheet();

  const { gymBranch } = useGymBranch();

  const gymId = gymBranch?.gymId;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (gymId) {
          const response = await getAllMembers(gymId);
          setGymMembers(response as Member[]);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [gymId]);

  // Required fields for the members table
  const requiredFields = [
    'gymNo',
    'name',
    'package',
    'feeStatus',
    'email',
    'phone',
  ];

  // Field transformations for the members table
  const memberTransformations = (
    row: Partial<Member>,
    index: number
  ): Partial<Member> => {
    // Normalize feeStatus
    if (row.feeStatus) {
      switch (row.feeStatus.toLowerCase()) {
        case 'paid':
          row.feeStatus = 'paid';
          break;
        case 'unpaid':
          row.feeStatus = 'unpaid';
          break;
        case 'partially paid':
        case 'partially_paid':
          row.feeStatus = 'partially_paid';
          break;
        default:
          row.feeStatus = 'unpaid';
      }
    }

    // Auto-generate Gym No if missing
    //TODO: Find a way to generate this based on the last gymid used
    if (!row.gymNo) {
      row.gymNo = `GYM-${(index + 1).toString().padStart(3, '0')}`;
    }

    // Set default values for missing fields
    row.id = row.id || `imported-${index + 1}`;
    row.avatar = row.avatar || '/placeholder.svg?height=32&width=32';
    row.package = row.package || 'Monthly';

    return row;
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex container">
      <MembersHeader
        onImportClick={() => setIsImportModalOpen(true)}
        onAddNewClick={() => openSheet()}
        isOpen={isOpen}
        closeSheet={closeSheet}
        gymId={gymId}
      />

      {loading ? (
        <p className="text-center">Loading members...</p>
      ) : (
        <DataTable
          columns={columns}
          data={members}
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
        onImport={addItems}
        requiredFields={requiredFields}
        transformations={memberTransformations}
      />
    </div>
  );
}
