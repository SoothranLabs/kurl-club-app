import { useGymBranch } from '@/providers/gym-branch-provider';
import { useFilteredPayments } from '@/services/payments';
import { outstandingPaymentFilters } from '@/lib/filters';

import { TableView } from './table-view';
import { expiredColumns } from './table-columns';

const Expired = () => {
  const { gymBranch } = useGymBranch();
  const gymId = gymBranch?.gymId;

  const { expiredPayments, isLoading } = useFilteredPayments(gymId!);

  return (
    <div className="flex flex-col gap-7">
      {isLoading ? (
        <p className="text-center">Loading details...</p>
      ) : (
        <TableView
          payments={expiredPayments}
          columns={expiredColumns}
          filters={outstandingPaymentFilters}
        />
      )}
    </div>
  );
};

export default Expired;
