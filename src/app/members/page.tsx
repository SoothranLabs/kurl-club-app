'use client';

import { useState } from 'react';

import { useMember } from '@/hooks/use-member';
import { useSheet } from '@/hooks/use-sheet';

import { MembersHeader } from '@/components/members/members-header';
import { DataTable } from '@/components/members/table/data-table';
import { columns } from '@/components/members/table/columns';
import { ImportCSVModal } from '@/components/members/import-csv-modal';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';

import { initialData } from '@/lib/dummy/data';
import { filters } from '@/lib/dummy/fiters';

export default function MembersPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const { members, addMembers, search } = useMember(initialData);
  const { isOpen, openSheet, closeSheet } = useSheet();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <MembersHeader
        onImportClick={() => setIsImportModalOpen(true)}
        onAddNewClick={() => openSheet()}
        isOpen={isOpen}
        closeSheet={closeSheet}
      />

      <DataTable
        columns={columns}
        data={members}
        toolbar={(table) => (
          <DataTableToolbar table={table} onSearch={search} filters={filters} />
        )}
      />

      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={addMembers}
      />
    </div>
  );
}
