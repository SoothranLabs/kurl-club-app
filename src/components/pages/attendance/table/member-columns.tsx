'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';
import { getProfilePictureSrc } from '@/lib/utils';
import type { Member } from '@/types/attendance';

const ActionsCell = ({
  member,
  onEdit,
  onDelete,
}: {
  member: Member;
  onEdit?: (member: Member) => void;
  onDelete?: (memberId: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="shad-select-content">
      <DropdownMenuItem className="shad-select-item">
        <Eye className="h-4 w-4 mr-2" />
        View Profile
      </DropdownMenuItem>
      <DropdownMenuItem
        className="shad-select-item"
        onClick={() => onEdit?.(member)}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit Member
      </DropdownMenuItem>
      <DropdownMenuItem
        className="shad-select-item text-red-400"
        onClick={() => onDelete?.(member.id)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const createMemberColumns = (
  onEdit?: (member: Member) => void,
  onDelete?: (memberId: string) => void
): ColumnDef<Member>[] => [
  {
    accessorKey: 'memberIdentifier',
    header: 'Member ID',
    cell: ({ row }) => (
      <div className="w-[100px] uppercase">
        <span className="text-primary-blue-300 font-bold mr-0.5">#</span>
        {row.getValue('memberIdentifier')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => {
      const name = row.getValue<string>('name') || 'Unknown';
      const avatarStyle = getAvatarColor(name);
      const initials = getInitials(name);

      return (
        <div className="flex items-center gap-2 w-[200px]">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="font-medium" style={avatarStyle}>
              {initials}
            </AvatarFallback>
            <AvatarImage
              src={getProfilePictureSrc(
                row.original.profilePicture ?? null,
                initials
              )}
              alt={name}
            />
          </Avatar>
          <span className="text-white">{name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'biometricId',
    header: 'Biometric ID',
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <span className="text-primary-blue-200 font-mono text-sm">
          {row.getValue('biometricId')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <span className="text-white">
          {row.getValue('department') || 'General'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="min-w-[100px]">
          <Badge
            variant="outline"
            className={
              status === 'active'
                ? 'bg-neutral-green-500/10 border-neutral-green-500 text-neutral-green-500 rounded-[35px] h-[30px]'
                : 'bg-gray-500/10 border-gray-500 text-gray-500 rounded-[35px] h-[30px]'
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionsCell member={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
