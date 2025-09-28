'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skippers } from '@/types';

export const SkipperColumns: ColumnDef<Skippers>[] = [
  {
    accessorKey: 'gymNo',
    header: 'Gym no',
    cell: ({ row }) => <div className="w-[70px]">{row.getValue('gymNo')}</div>,
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
          <Avatar className="h-6 w-6">
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
    accessorKey: 'lastCheckIn',
    header: 'Last check in',
    cell: ({ row }) => <div>{row.getValue('lastCheckIn')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'sinceLastCheckIn',
    header: 'Days since last check-in',
    cell: ({ row }) => <div>{row.getValue('sinceLastCheckIn')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
