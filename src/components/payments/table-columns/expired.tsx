'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Payment } from '@/types/payment';
import { getProfilePictureSrc } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FeeStatusBadge } from '@/components/badges/fee-status-badge';

const ActionsCell: React.FC<{ user: Payment }> = ({ user }) => {
  return (
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">View member profile</span>
      <Link href={`/members/${user.id}`}>
        <Eye className="h-4 w-4 text-primary-green-600" />
      </Link>
    </Button>
  );
};

export const expiredColumns: ColumnDef<Payment>[] = [
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
                name.slice(0, 2)
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
    accessorKey: 'bufferStatus',
    header: 'Buffer status',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('package')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'pendingAmount',
    header: 'Pending amount',
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
    accessorKey: 'feeStatus',
    header: 'Fee status',
    cell: ({ row }) => (
      <div className="min-w-[200px]">{row.getValue('email')}</div>
    ),
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
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
