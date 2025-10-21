'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Clock, Edit, Eye, MoreHorizontal } from 'lucide-react';

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
import type { AttendanceRecord } from '@/types/attendance';

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    present:
      'bg-neutral-green-500/10 border-neutral-green-500 text-neutral-green-500',
    'checked-in':
      'bg-primary-green-500/10 border-primary-green-500 text-primary-green-500',
    'checked-out':
      'bg-semantic-blue-500/10 border-semantic-blue-500 text-semantic-blue-500',
    late: 'bg-neutral-ochre-600/10 border-neutral-ochre-500 text-neutral-ochre-500',
    absent: 'bg-alert-red-500/10 border-alert-red-500 text-alert-red-500',
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-[35px] h-[30px] ${variants[status as keyof typeof variants] || variants.present}`}
    >
      {status.replace('-', ' ')}
    </Badge>
  );
};

const ActionsCell = ({
  record,
  onEdit,
}: {
  record: AttendanceRecord;
  onEdit?: (record: AttendanceRecord) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="shad-select-content">
      <DropdownMenuItem
        className="shad-select-item"
        onClick={() => onEdit?.(record)}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit Record
      </DropdownMenuItem>
      <DropdownMenuItem className="shad-select-item">
        <Eye className="h-4 w-4 mr-2" />
        View Details
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const createAttendanceColumns = (
  onEdit?: (record: AttendanceRecord) => void
): ColumnDef<AttendanceRecord>[] => [
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
    accessorKey: 'memberName',
    header: 'Member',
    cell: ({ row }) => {
      const name = row.getValue<string>('memberName') || 'Unknown';
      const avatarStyle = getAvatarColor(name);
      const initials = getInitials(name);

      return (
        <div className="flex items-center gap-2 w-[180px]">
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
          <div>
            <span className="text-white">{name}</span>
            {row.original.biometricId && (
              <div className="text-xs text-primary-blue-200">
                Bio: {row.original.biometricId}
              </div>
            )}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return (
        <div className="min-w-[100px]">
          <div className="text-white text-sm">
            {date.toLocaleDateString('en-GB')}
          </div>
          <div className="text-xs text-primary-blue-100">
            {date.toLocaleDateString('en-GB', { weekday: 'short' })}
          </div>
        </div>
      );
    },
  },
  {
    id: 'checkInTime',
    accessorKey: 'checkInTime',
    header: 'Check In',
    cell: ({ row }) => {
      const checkIn = row.original.checkInTime;
      return (
        <div className="min-w-[80px]">
          {checkIn ? (
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-primary-green-500" />
              <span className="text-white text-sm">{checkIn}</span>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">--</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'checkOutTime',
    accessorKey: 'checkOutTime',
    header: 'Check Out',
    cell: ({ row }) => {
      const checkOut = row.original.checkOutTime;
      return (
        <div className="min-w-[80px]">
          {checkOut ? (
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-semantic-blue-500" />
              <span className="text-white text-sm">{checkOut}</span>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Active</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'duration',
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      const duration = row.original.duration;
      return (
        <div className="min-w-[80px]">
          {duration ? (
            <span className="text-white text-sm">
              {Math.floor(duration / 60)}h {duration % 60}m
            </span>
          ) : (
            <span className="text-gray-400 text-sm">--</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[100px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    id: 'deviceId',
    accessorKey: 'deviceId',
    header: 'Device',
    cell: ({ row }) => {
      const deviceId = row.original.deviceId;
      return (
        <div className="min-w-[100px]">
          {deviceId ? (
            <span className="text-primary-blue-200 text-sm">{deviceId}</span>
          ) : (
            <span className="text-gray-400 text-sm">Manual</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell record={row.original} onEdit={onEdit} />,
  },
];
