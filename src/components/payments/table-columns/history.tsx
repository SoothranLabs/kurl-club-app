'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Payment } from '@/types/payment';
import { getProfilePictureSrc } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

export const historyColumns: ColumnDef<Payment>[] = [
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
    accessorKey: 'feeStatus',
    header: 'Payment order',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('feeStatus')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'amountPaid',
    header: 'Amount paid',
    cell: ({ row }) => (
      <div className="min-w-[100px]">&#8377; {row.getValue('amountPaid')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    accessorKey: 'paymentDate',
    header: 'Paid date',
    cell: ({ row }) => {
      const rawDate = row.getValue('paymentDate') as string;
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(
        new Date(rawDate)
      );

      return <div className="min-w-[200px]">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment mode',
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as string;
      const iconSrc =
        method.toLowerCase() === 'upi'
          ? '/assets/svg/upi-icon.svg'
          : '/assets/svg/wallet-icon.svg';

      return (
        <div className="min-w-[200px] flex items-center gap-2">
          <Image
            src={iconSrc}
            alt={method}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
