import { IndianRupee, Users } from 'lucide-react';

import { useGymBranch } from '@/providers/gym-branch-provider';
import { useFilteredPayments } from '@/services/payments';
import { outstandingPaymentFilters } from '@/lib/filters';

import InfoCard from '../cards/info-card';
import { TableView } from './table-view';
import { historyColumns } from './table-columns';

const Outstanding = () => {
  const stats = [
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
  ];

  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { outstandingPayments, isLoading } = useFilteredPayments(gymId!);

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-3 gap-4 h-[74px]">
        {stats.map((stat) => (
          <InfoCard item={stat} key={stat.id} />
        ))}
      </div>

      {isLoading ? (
        <p className="text-center">Loading details...</p>
      ) : (
        <TableView
          payments={outstandingPayments}
          columns={historyColumns}
          filters={outstandingPaymentFilters}
        />
      )}
    </div>
  );
};

export default Outstanding;
