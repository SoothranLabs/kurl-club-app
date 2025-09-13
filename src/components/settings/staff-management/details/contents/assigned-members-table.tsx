'use client';

import { columns } from '@/components/members/table/columns';
import { TableSkeleton } from '@/components/shared/table-skeleton';
import { DataTable } from '@/components/shared/table/data-table';
import { DataTableToolbar } from '@/components/shared/table/data-table-toolbar';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { filters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { useGymMembers } from '@/services/member';
import { Member } from '@/types/members';

interface AssignedMembersTableProps {
  trainerId: string;
}

export default function AssignedMembersTable({
  trainerId,
}: AssignedMembersTableProps) {
  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { data: gymMembers = [], isLoading } = useGymMembers(gymId!);

  // Filter members assigned to this trainer
  const assignedMembers = gymMembers.filter(
    (member: Member) => member.personalTrainer === parseInt(trainerId)
  );

  const { items: filteredMembers, search } = useFilterableList<Member>(
    assignedMembers,
    searchItems
  );

  if (isLoading) {
    return <TableSkeleton rows={8} columns={6} showToolbar />;
  }

  return (
    <DataTable
      columns={columns}
      data={filteredMembers}
      toolbar={(table) => (
        <DataTableToolbar table={table} onSearch={search} filters={filters} />
      )}
    />
  );
}
