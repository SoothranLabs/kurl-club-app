'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { Trainer } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Trainer>[] = [
  {
    accessorKey: 'trainerId',
    header: 'TrID',
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue('trainerId')}</div>
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
            <AvatarImage src={row.original.avatar} alt={name} />
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('designation')}</div>
    ),
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
