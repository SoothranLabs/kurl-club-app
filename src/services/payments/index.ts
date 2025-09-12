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
  today.setHours(0, 0, 0, 0);

  // Outstanding: Partial payments with active buffer or within due date
  const outstandingPayments = data
    .filter((p) => {
      if (p.pendingAmount <= 0) return false;

      const dueDate = new Date(p.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      // If has buffer, check buffer end date
      if (p.bufferEndDate) {
        const bufferEndDate = new Date(p.bufferEndDate);
        bufferEndDate.setHours(0, 0, 0, 0);
        return today <= bufferEndDate;
      }

      // No buffer, check due date
      return today <= dueDate;
    })
    .sort((a, b) => {
      // Sort by urgency: buffer end date or due date
      const aDate = a.bufferEndDate
        ? new Date(a.bufferEndDate)
        : new Date(a.dueDate);
      const bDate = b.bufferEndDate
        ? new Date(b.bufferEndDate)
        : new Date(b.dueDate);
      return aDate.getTime() - bDate.getTime();
    });

  // Expired: Payments past due date and buffer (if any)
  const expiredPayments = data
    .filter((p) => {
      if (p.pendingAmount <= 0) return false;

      const dueDate = new Date(p.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      // If has buffer, check if buffer expired
      if (p.bufferEndDate) {
        const bufferEndDate = new Date(p.bufferEndDate);
        bufferEndDate.setHours(0, 0, 0, 0);
        return today > bufferEndDate;
      }

      // No buffer, check if past due date
      return today > dueDate;
    })
    .sort((a, b) => {
      // Sort by most overdue first
      const aDate = a.bufferEndDate
        ? new Date(a.bufferEndDate)
        : new Date(a.dueDate);
      const bDate = b.bufferEndDate
        ? new Date(b.bufferEndDate)
        : new Date(b.dueDate);
      return aDate.getTime() - bDate.getTime();
    });

  // Completed: No pending amount
  const completedPayments = data
    .filter((p) => p.pendingAmount === 0)
    .sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    );

  // History: All payments sorted by recent
  const historyPayments = data.sort(
    (a, b) =>
      new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
  );

  return {
    isLoading,
    error,
    outstandingPayments,
    expiredPayments,
    completedPayments,
    historyPayments,
  };
};
