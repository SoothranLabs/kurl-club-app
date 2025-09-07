import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import { Payment } from '@/types/payment';

export const fetchGymPayments = async (gymId: number | string) => {
  const response = await api.get<ApiResponse<Payment[]>>(
    `/Transaction/GetPaymentDetailsByGymId/${gymId}`
  );

  return response.data || [];
};

export const useGymPayments = (gymId: number | string) => {
  return useQuery({
    queryKey: ['gymPayments', gymId],
    queryFn: () => fetchGymPayments(gymId),

    enabled: !!gymId,
  });
};

export const useFilteredPayments = (gymId: number | string) => {
  const { data = [], isLoading, error } = useGymPayments(gymId);

  const outstandingPayments = data
    .filter((p) => p.pendingAmount > 0 && p.bufferDaysRemaining > 0)
    .sort(
      (a, b) =>
        new Date(a.bufferEndDate).getTime() -
        new Date(b.bufferEndDate).getTime()
    );

  const expiredPayments = data.filter((p) => {
    const today = new Date();
    const bufferEndDate = new Date(p.bufferEndDate);
    return (
      p.pendingAmount > 0 && p.bufferDaysRemaining > 0 && today > bufferEndDate
    );
  });

  const historyPayments = data;

  return {
    isLoading,
    error,
    outstandingPayments,
    expiredPayments,
    historyPayments,
  };
};
