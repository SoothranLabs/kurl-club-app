'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Receipt } from 'lucide-react';

import { FeeStatusBadge } from '@/components/badges/fee-status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getProfilePictureSrc } from '@/lib/utils';
import { Payment } from '@/types/payment';

const ActionsCell: React.FC<{
  user: Payment;
  onRecord?: (payment: Payment) => void;
}> = ({ user, onRecord }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="shad-select-content">
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="shad-select-item">
          <Link
            href={`/members/${user.memberId}`}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View member
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="shad-select-item"
          onClick={() => onRecord?.(user)}
        >
          <Receipt className="h-4 w-4 mr-2" />
          Record payment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const createPaymentColumns = (
  onRecord?: (payment: Payment) => void
): ColumnDef<Payment>[] => [
  {
    accessorKey: 'memberIdentifier',
    header: 'GymNo',
    cell: ({ row }) => (
      <div className="w-[100px] uppercase">
        {row.getValue('memberIdentifier')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'memberName',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue<string>('memberName') || 'Unknown';
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
    cell: ({ row }) => {
      const bufferDaysRemaining = row.original.bufferDaysRemaining;
      const pendingAmount = row.original.pendingAmount;

      // Only show buffer if there's pending amount and active buffer
      if (pendingAmount === 0 || bufferDaysRemaining === 0) {
        return <div className="min-w-[180px]">No buffer</div>;
      }

      const bufferEndDate = new Date(row.original.bufferEndDate);
      const formattedDate = bufferEndDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      return (
        <div className="min-w-[180px]">
          <div className="bg-secondary-green-500/20 w-fit px-2 py-1 rounded-lg text-xs">
            {bufferDaysRemaining} days • till {formattedDate}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'pendingAmount',
    header: 'Pending amount',
    cell: ({ row }) => (
      <div className="min-w-[120px]">₹{row.getValue('pendingAmount')}</div>
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
        | 'Partially Paid'
        | 'Fully Paid';
      return (
        <div className="min-w-[120px]">
          <FeeStatusBadge
            status={status === 'Fully Paid' ? 'paid' : 'partially_paid'}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'packageName',
    header: 'Package',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('packageName')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} onRecord={onRecord} />,
  },
];
