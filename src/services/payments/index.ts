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
    refetchOnMount: true,
    retry: 1,
  });
};

export const useFilteredPayments = (gymId: number | string) => {
  const { data = [], isLoading, error } = useGymPayments(gymId);

  const today = new Date();

  const outstandingPayments = data
    .filter((p) => {
      const bufferEndDate = new Date(p.bufferEndDate);
      const dueDate = new Date(p.dueDate);
      return p.pendingAmount > 0 && today <= bufferEndDate && today <= dueDate;
    })
    .sort(
      (a, b) =>
        new Date(a.bufferEndDate).getTime() -
        new Date(b.bufferEndDate).getTime()
    );

  const expiredPayments = data.filter((p) => {
    const bufferEndDate = new Date(p.bufferEndDate);
    const dueDate = new Date(p.dueDate);
    return p.pendingAmount > 0 && (today > bufferEndDate || today > dueDate);
  });

  const completedPayments = data.filter((p) => p.pendingAmount === 0);

  const historyPayments = data;

  return {
    isLoading,
    error,
    outstandingPayments,
    expiredPayments,
    completedPayments,
    historyPayments,
  };
};
