'use client';

import { useState } from 'react';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { useFilteredPayments } from '@/services/payments';
import { outstandingPaymentFilters } from '@/lib/filters';
import { useSheet } from '@/hooks/use-sheet';
import type { Payment } from '@/types/payment';
import { IndianRupee, Users } from 'lucide-react';

import InfoCard from '../cards/info-card';
import { TableView } from './table/table-view';
import { createPaymentColumns } from './table/columns';
import { ManagePaymentSheet } from './manage-payment';

type PaymentTabType = 'outstanding' | 'expired' | 'history';

type Props = {
  type: PaymentTabType;
};

const STATS_CONFIG = {
  outstanding: [
    {
      id: 1,
      icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
      color: 'primary-green-500',
      title: 'Active members',
      count: 190,
    },
    {
      id: 2,
      icon: <IndianRupee size={20} strokeWidth={1.75} color="#151821" />,
      color: 'secondary-pink-500',
      title: 'Outstanding payments',
      count: 30,
    },
  ],
  history: [
    {
      id: 1,
      icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
      color: 'primary-green-500',
      title: 'Total revenue last month',
      count: 230000,
    },
  ],
  expired: [],
};

export function PaymentsTab({ type }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { isOpen, openSheet, closeSheet } = useSheet();

  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { outstandingPayments, expiredPayments, historyPayments, isLoading } =
    useFilteredPayments(gymId!);

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
      case 'history':
        return historyPayments;
      default:
        return [];
    }
  };

  const stats = STATS_CONFIG[type];

  return (
    <div className="flex flex-col gap-7">
      {stats.length > 0 && (
        <div className="grid grid-cols-3 gap-4 h-[74px]">
          {stats.map((stat) => (
            <InfoCard item={stat} key={stat.id} />
          ))}
        </div>
      )}

      {isLoading ? (
        <p className="text-center">Loading details...</p>
      ) : (
        <>
          <TableView
            payments={getPaymentsData()}
            columns={columns}
            filters={outstandingPaymentFilters}
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
