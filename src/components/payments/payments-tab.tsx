'use client';

import { useState } from 'react';

import { IndianRupee, Users } from 'lucide-react';

import { TableSkeleton } from '@/components/shared/table-skeleton';
import { useGymFormOptions } from '@/hooks/use-gymform-options';
import { useSheet } from '@/hooks/use-sheet';
import { getCompletedPaymentFilters, getPaymentFilters } from '@/lib/filters';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { useFilteredPayments } from '@/services/payments';
import type { Payment } from '@/types/payment';

import InfoCard from '../shared/cards/info-card';
import { ManagePaymentSheet } from './manage-payment';
import { createPaymentColumns } from './table/columns';
import { TableView } from './table/table-view';

type PaymentTabType = 'outstanding' | 'expired' | 'completed' | 'history';

type Props = {
  type: PaymentTabType;
};

const getStatsConfig = (payments: Payment[], type: PaymentTabType) => {
  const totalOutstanding = payments.reduce(
    (sum, p) => sum + p.pendingAmount,
    0
  );
  const totalRevenue = payments.reduce((sum, p) => sum + p.totalAmountPaid, 0);

  const configs = {
    outstanding: [
      {
        id: 1,
        icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
        color: 'primary-green-500',
        title: 'Members with dues',
        count: payments.length,
      },
      {
        id: 2,
        icon: <IndianRupee size={20} strokeWidth={1.75} color="#151821" />,
        color: 'secondary-pink-500',
        title: 'Total outstanding',
        count: totalOutstanding,
      },
    ],
    expired: [
      {
        id: 1,
        icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
        color: 'alert-red-400',
        title: 'Overdue members',
        count: payments.length,
      },
      {
        id: 2,
        icon: <IndianRupee size={20} strokeWidth={1.75} color="#151821" />,
        color: 'secondary-pink-500',
        title: 'Overdue amount',
        count: totalOutstanding,
      },
    ],
    completed: [
      {
        id: 1,
        icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
        color: 'primary-green-500',
        title: 'Paid members',
        count: payments.length,
      },
      {
        id: 2,
        icon: <IndianRupee size={20} strokeWidth={1.75} color="#151821" />,
        color: 'primary-green-500',
        title: 'Revenue collected',
        count: totalRevenue,
      },
    ],
    history: [
      {
        id: 1,
        icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
        color: 'primary-green-500',
        title: 'Total members',
        count: payments.length,
      },
      {
        id: 2,
        icon: <IndianRupee size={20} strokeWidth={1.75} color="#151821" />,
        color: 'primary-green-500',
        title: 'Total revenue',
        count: totalRevenue,
      },
    ],
  };

  return configs[type] || [];
};

export function PaymentsTab({ type }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { isOpen, openSheet, closeSheet } = useSheet();

  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const {
    outstandingPayments,
    expiredPayments,
    completedPayments,
    historyPayments,
    isLoading,
  } = useFilteredPayments(gymId!);

  const handleRecord = (payment: Payment) => {
    setSelectedPayment(payment);
    openSheet();
  };

  const columns = createPaymentColumns(handleRecord);

  const getPaymentsData = () => {
    switch (type) {
      case 'outstanding':
        return outstandingPayments;
      case 'expired':
        return expiredPayments;
      case 'completed':
        return completedPayments;
      case 'history':
        return historyPayments;
      default:
        return [];
    }
  };

  const stats = getStatsConfig(getPaymentsData(), type);

  // Get dynamic package options from gym configuration
  const { formOptions } = useGymFormOptions(gymId);

  const getFilters = () => {
    const membershipPlans = formOptions?.membershipPlans || [];

    switch (type) {
      case 'outstanding':
      case 'expired':
      case 'history':
        return getPaymentFilters(membershipPlans);
      case 'completed':
        return getCompletedPaymentFilters(membershipPlans);
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col gap-7">
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <InfoCard item={stat} key={stat.id} />
          ))}
        </div>
      )}

      {isLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : (
        <>
          <TableView
            payments={getPaymentsData()}
            columns={columns}
            filters={getFilters()}
          />
          <ManagePaymentSheet
            open={isOpen}
            onOpenChange={closeSheet}
            member={selectedPayment}
          />
        </>
      )}
    </div>
  );
}
