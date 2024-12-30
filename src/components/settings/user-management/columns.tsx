'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';

import { Trainer } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KSheet } from '@/components/form/k-sheet';

import { ChatWindow } from '@/components/settings/user-management/chat-window';

const ActionsCell: React.FC<{ user: Trainer }> = ({ user }) => {
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
        <DropdownMenuContent className="shad-select-content" align="end">
          <DropdownMenuItem
            className="shad-select-item"
            onClick={() => setIsSheetOpen(true)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </DropdownMenuItem>
          <Link href={`/settings/user-management/${user.id}`}>
            <DropdownMenuItem className="shad-select-item">
              <FileText className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="text-red-600 shad-select-item">
            <Trash2 className="mr-2 h-4 w-4" />
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
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
