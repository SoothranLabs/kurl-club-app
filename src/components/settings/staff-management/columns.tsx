'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';

import { Staff } from '@/types/staff';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KSheet } from '@/components/form/k-sheet';

import { ChatWindow } from '@/components/settings/staff-management/chat-window';

const ActionsCell: React.FC<{ user: Staff }> = ({ user }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="shad-select-content p-4 rounded-[4px] border-primary-blue-400 flex flex-col gap-2"
          align="end"
        >
          <DropdownMenuItem
            className="shad-select-item p-1 h-8 text-[15px] leading-normal font-normal text-white rounded-[4px]"
            onClick={() => setIsSheetOpen(true)}
          >
            <MessageSquare className="mr-2 h-6 w-6" />
            Message
          </DropdownMenuItem>
          <Link
            href={`/settings/staff-management/${user.role.toLowerCase()}/${user.id}`}
          >
            <DropdownMenuItem className="shad-select-item p-1 h-8 text-[15px] leading-normal font-normal text-white rounded-[4px]">
              <FileText className="mr-2 h-6 w-6" />
              View details
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="shad-select-item p-1 h-8 text-[15px] leading-normal font-normal text-white rounded-[4px]">
            <Trash2 className="mr-2 h-6 w-6" />
            Delete trainer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <KSheet
        title={`Chat with ${user.name}`}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        className="w-[582px]"
      >
        <ChatWindow />
      </KSheet>
    </>
  );
};

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: 'identifier',
    header: 'TrID',
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue('identifier')}</div>
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
    accessorKey: 'role',
    header: 'Designation',
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.getValue('role')}</div>
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
    accessorKey: 'bloodGroup',
    header: 'Blood Group',
    cell: ({ row }) => (
      <div className="min-w-[150px]">{row.getValue('bloodGroup')}</div>
    ),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => (
      <div className="min-w-[150px] capitalize">{row.getValue('gender')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
