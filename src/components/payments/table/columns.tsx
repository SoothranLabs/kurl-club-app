'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Receipt } from 'lucide-react';

import { FeeStatusBadge } from '@/components/shared/badges/fee-status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';
import {
  calculateDaysRemaining,
  getPaymentBadgeStatus,
  getProfilePictureSrc,
  getUrgencyConfig,
} from '@/lib/utils';
import { Payment } from '@/types/payment';

const UrgencyIndicator = ({
  color,
}: {
  color: 'red' | 'orange' | 'yellow' | 'green';
}) => (
  <span className="relative flex justify-center items-center size-3">
    <span
      className={`absolute inline-flex h-full w-full animate-pulse rounded-full bg-${color}-400/45`}
    ></span>
    <span
      className={`relative inline-flex size-2 rounded-full bg-${color}-500`}
    ></span>
  </span>
);

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
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue<string>('memberName') || 'Unknown';
      const avatarStyle = getAvatarColor(name);
      const initials = getInitials(name);

      return (
        <div className="flex items-center gap-2 w-[160px]">
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
          <span>{name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      const { dueDate, bufferEndDate } = row.original;
      const daysDiff = calculateDaysRemaining(dueDate);
      const formattedDate = new Date(dueDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      });

      let statusColor = 'text-primary-blue-100';
      let statusText = '';

      if (daysDiff < 0) {
        statusColor = 'text-red-400';
        if (bufferEndDate) {
          statusText = 'On buffer period';
        } else {
          statusText = `${Math.abs(daysDiff)} days overdue`;
        }
      } else if (daysDiff === 0) {
        statusColor = 'text-orange-400';
        statusText = 'Due today';
      } else if (daysDiff <= 3) {
        statusColor = 'text-yellow-400';
        statusText = `${daysDiff} days left`;
      } else {
        statusText = `${daysDiff} days left`;
      }

      return (
        <div className="min-w-24">
          <div className="text-white text-sm">{formattedDate}</div>
          <div className={`text-xs ${statusColor}`}>{statusText}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'bufferStatus',
    header: 'Buffer',
    cell: ({ row }) => {
      const { bufferEndDate, pendingAmount } = row.original;

      if (pendingAmount === 0) {
        return (
          <div className="min-w-[120px] text-primary-blue-300 text-sm">
            Paid
          </div>
        );
      }

      // Only show buffer if bufferEndDate exists
      if (!bufferEndDate) {
        return (
          <div className="min-w-24 text-primary-blue-100 text-sm">
            No buffer
          </div>
        );
      }

      const daysRemaining = calculateDaysRemaining(bufferEndDate);

      const {
        bgColor,
        color,
        text: urgencyText,
      } = getUrgencyConfig(daysRemaining);

      return (
        <div className="min-w-24">
          <div
            className={`${bgColor} w-fit px-2 py-1 rounded-lg text-xs flex items-center gap-2 mb-1`}
          >
            <UrgencyIndicator color={color} />
            <span className="font-medium">{urgencyText}</span>
          </div>
          <div className="text-xs text-primary-blue-100">Buffer period</div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const aData = rowA.original;
      const bData = rowB.original;

      // Completed payments go to bottom
      if (aData.pendingAmount === 0 && bData.pendingAmount > 0) return 1;
      if (bData.pendingAmount === 0 && aData.pendingAmount > 0) return -1;
      if (aData.pendingAmount === 0 && bData.pendingAmount === 0) return 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // For sorting urgency: use buffer end date if exists, otherwise use due date
      const getUrgencyDate = (data: Payment) => {
        if (data.bufferEndDate) {
          return new Date(data.bufferEndDate);
        }
        return new Date(data.dueDate);
      };

      const aDate = getUrgencyDate(aData);
      const bDate = getUrgencyDate(bData);
      aDate.setHours(0, 0, 0, 0);
      bDate.setHours(0, 0, 0, 0);

      // Calculate days remaining for each
      const aDaysLeft = calculateDaysRemaining(aDate.toISOString());
      const bDaysLeft = calculateDaysRemaining(bDate.toISOString());

      // Sort by urgency: expired first, then by days remaining (ascending)
      return aDaysLeft - bDaysLeft;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'paymentSummary',
    header: 'Payment Summary',
    cell: ({ row }) => {
      const { pendingAmount, totalAmountPaid, expectedTotalFee } = row.original;
      const progress = (totalAmountPaid / expectedTotalFee) * 100;

      return (
        <div className="min-w-[180px] pr-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white">₹{totalAmountPaid}</span>
            <span className="text-primary-blue-200">₹{expectedTotalFee}</span>
          </div>
          <div className="w-full bg-primary-blue-300/30 rounded-full h-1.5 mb-1">
            <div
              className="bg-primary-green-400 h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          {pendingAmount > 0 && (
            <div className="text-xs text-red-300">₹{pendingAmount} pending</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'feeStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('feeStatus') as string;
      const pendingAmount = row.original.pendingAmount;

      const badgeStatus = getPaymentBadgeStatus(status, pendingAmount);

      return (
        <div className="min-w-24">
          <FeeStatusBadge status={badgeStatus} />
        </div>
      );
    },
  },
  {
    accessorKey: 'packageName',
    header: 'Package',
    cell: ({ row }) => {
      const { packageName, cyclesElapsed, planFee } = row.original;

      return (
        <div className="min-w-[120px]">
          <div className="text-white text-sm">{packageName}</div>
          <div className="text-xs text-primary-blue-100">
            {cyclesElapsed} cycle{cyclesElapsed !== 1 ? 's' : ''} • ₹{planFee}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue('packageName'));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} onRecord={onRecord} />,
  },
];
