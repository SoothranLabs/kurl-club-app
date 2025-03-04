'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Member } from '@/types/members';
import { getProfilePictureSrc } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FeeStatusBadge } from '@/components/badges/fee-status-badge';

const ActionsCell: React.FC<{ user: Member }> = ({ user }) => {
  return (
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">View member profile</span>
      <Link href={`/members/${user.id}`}>
        <Eye className="h-4 w-4 text-primary-green-600" />
      </Link>
    </Button>
  );
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'memberIdentifier',
    header: 'Member ID',
    cell: ({ row }) => (
      <div className="w-[100px] uppercase">
        {row.getValue('memberIdentifier')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue<string>('name') || 'Unknown';
      return (
        <div className="flex items-center gap-2 w-[200px]">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary-blue-400/70">
              {name.slice(0, 2)}
            </AvatarFallback>
            <AvatarImage
              src={getProfilePictureSrc(
                row.original.profilePicture,
                row.original.avatar
              )}
              alt={name}
            />
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'package',
    header: 'Package',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('package')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'feeStatus',
    header: 'Fee status',
    cell: ({ row }) => {
      const status = row.getValue('feeStatus') as
        | 'paid'
        | 'partially_paid'
        | 'unpaid';
      return (
        <div className="min-w-[120px]">
          <FeeStatusBadge status={status} />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="min-w-[200px]">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="min-w-[150px]">{row.getValue('phone')}</div>
    ),
  },
  {
    accessorKey: 'bloodGroup',
    header: 'Blood group',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('bloodGroup')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => (
      <div className="min-w-[100px] capitalize">{row.getValue('gender')}</div>
    ),
  },
  {
    accessorKey: 'doj',
    header: 'Date of Joining',
    cell: ({ row }) => {
      const date = row.getValue<string>('doj');
      return (
        <div className="min-w-[120px]">
          {date
            ? new Intl.DateTimeFormat('en-GB').format(new Date(date))
            : 'N/A'}
        </div>
      );
    },
  },
  {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ row }) => {
      const date = row.getValue<string>('dob');
      return (
        <div className="min-w-[120px]">
          {date
            ? new Intl.DateTimeFormat('en-GB').format(new Date(date))
            : 'N/A'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
