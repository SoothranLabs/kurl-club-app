'use client';

import { useState } from 'react';
import { Download, Plus } from 'lucide-react';

import { Member } from '@/types';
import { useSearch } from '@/hooks/use-search';

import { Button } from '@/components/ui/button';
import { Search } from '@/components/search';

import { ImportModal } from '@/components/members/import-modal';
import { columns } from '@/components/members/table/columns';
import { DataTable } from '@/components/members/table/data-table';

// Sample data
const initialData: Member[] = [
  {
    id: '1',
    gymNo: '#00001',
    name: 'Arnold Schwarzneger',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'partially_paid',
    email: 'schwarznager@gmail.com',
    phone: '+91 123 456 7890',
    bloodGroup: 'O+ve',
  },
  {
    id: '2',
    gymNo: '#00002',
    name: 'Amit Choudhury',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'paid',
    email: 'amit.choudhury@example.com',
    phone: '+91 987 654 3210',
    bloodGroup: 'A-',
  },
  {
    id: '3',
    gymNo: '#00003',
    name: 'Sneha Reddy',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Special',
    feeStatus: 'partially_paid',
    email: 'sneha.reddy@example.com',
    phone: '+91 456 789 0123',
    bloodGroup: 'B+',
  },
  {
    id: '4',
    gymNo: '#00004',
    name: 'Arjun Mehta',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'paid',
    email: 'arjun.mehta@example.com',
    phone: '+91 789 012 3456',
    bloodGroup: 'O-',
  },
  {
    id: '5',
    gymNo: '#00005',
    name: 'Karan Verma',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'partially_paid',
    email: 'karan.verma@example.com',
    phone: '+91 234 567 8901',
    bloodGroup: 'A+',
  },
];

const searchMembers = (members: Member[], term: string) => {
  return members.filter((member) =>
    Object.values(member).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(term.toLowerCase())
    )
  );
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialData);
  const { items: filteredMembers, search } = useSearch<Member>(
    members,
    searchMembers
  );
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleImport = (importedData: Member[]) => {
    setMembers([...members, ...importedData]);
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Members</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-10"
            onClick={() => setIsImportModalOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button className="h-10 bg-[#DAFF8B] text-black hover:bg-[#DAFF8B]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex items-center">
            <Search onSearch={search} />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline">Package</Button>
            <Button variant="outline">Fee Status</Button>
            <Button variant="outline">Blood Group</Button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredMembers} />
      </div>
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
