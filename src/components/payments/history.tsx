import { Users } from 'lucide-react';

import { useGymBranch } from '@/providers/gym-branch-provider';
import { useFilteredPayments } from '@/services/payments';
import { outstandingPaymentFilters } from '@/lib/filters';

import InfoCard from '../cards/info-card';
import { TableView } from './table-view';
import { historyColumns } from './table-columns';

const History = () => {
  const stats = [
    {
      id: 1,
      icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
      color: 'primary-green-500',
      title: 'Total revenue last month',
      count: 230000,
    },
  ];

  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { historyPayments, isLoading } = useFilteredPayments(gymId!);

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
          payments={historyPayments}
          columns={historyColumns}
          filters={outstandingPaymentFilters}
        />
      )}
    </div>
  );
};

export default History;
