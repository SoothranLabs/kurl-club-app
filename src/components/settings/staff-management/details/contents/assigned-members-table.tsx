'use client';

import { useGymMembers } from '@/services/member';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { searchItems } from '@/lib/utils';
import { Member } from '@/types/members';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/members/table/columns';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { filters } from '@/lib/dummy/fiters';

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
    return <p className="text-center">Loading members...</p>;
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
