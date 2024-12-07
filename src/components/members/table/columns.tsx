'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check, Minus, AlertCircle, MoreVertical } from 'lucide-react';

import { Member } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'gymNo',
    header: 'Gym no',
    cell: ({ row }) => <div className="w-[100px]">{row.getValue('gymNo')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue<string>('name') || 'Unknown';
      return (
        <div className="flex items-center gap-2 w-[200px]">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={row.original.avatar} alt={name} />
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'package',
    header: 'Package',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('package')}</div>
    ),
  },
  {
    accessorKey: 'feeStatus',
    header: 'Fee status',
    cell: ({ row }) => {
      const status = row.getValue('feeStatus') as string;
      return (
        <div className="min-w-[120px]">
          <Badge
            variant="outline"
            className={
              status === 'paid'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : status === 'partially_paid'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-red-50 text-red-700 border-red-200'
            }
          >
            {status === 'paid' ? (
              <Check className="mr-1 h-3 w-3" />
            ) : status === 'partially_paid' ? (
              <Minus className="mr-1 h-3 w-3" />
            ) : (
              <AlertCircle className="mr-1 h-3 w-3" />
            )}
            {status === 'paid'
              ? 'Paid'
              : status === 'partially_paid'
                ? 'Partially paid'
                : 'Unpaid'}
          </Badge>
        </div>
      );
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
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('gender')}</div>
    ),
  },
  {
    accessorKey: 'doj',
    header: 'Date of Joining',
    cell: ({ row }) => (
      <div className="min-w-[120px]">{row.getValue('doj')}</div>
    ),
  },
  {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ row }) => (
      <div className="min-w-[120px]">{row.getValue('dob')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => console.log('Selected Row:', row.original)}
      >
        <span className="sr-only">Open menu</span>
        <MoreVertical className="h-4 w-4" />
      </Button>
    ),
  },
];
