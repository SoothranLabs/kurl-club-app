import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import { Payment } from '@/types/payment';

export const fetchGymPayments = async (gymId: number | string) => {
  const response = await api.get<ApiResponse<Payment[]>>(
    `/Gym/GetPaymentDetailsByGymId/${gymId}`
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

  const outstandingPayments = data.filter((p) => p.pendingAmount > 0);
  const expiredPayments = data.filter((p) => p.bufferStatus === 'Expired');
  const historyPayments = data;

  return {
    isLoading,
    error,
    outstandingPayments,
    expiredPayments,
    historyPayments,
  };
};
