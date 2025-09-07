'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  partialPayment,
  fullPayment,
  extendBuffer,
  getPaymentHistory,
  type PaymentRequest,
  type ExtendBufferRequest,
} from '@/services/transaction';

export function usePaymentManagement() {
  const queryClient = useQueryClient();

  const partialPaymentMutation = useMutation({
    mutationFn: (data: PaymentRequest) => partialPayment(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['gymPayments'] });
        queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
        toast.success(result.success);
      } else if (result.error) {
        toast.error(result.error);
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to record partial payment'
      );
    },
  });

  const fullPaymentMutation = useMutation({
    mutationFn: (data: PaymentRequest) => fullPayment(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['gymPayments'] });
        queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
        toast.success(result.success);
      } else if (result.error) {
        toast.error(result.error);
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to record full payment'
      );
    },
  });

  const extendBufferMutation = useMutation({
    mutationFn: (data: ExtendBufferRequest) => extendBuffer(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['gymPayments'] });
        toast.success(result.success);
      } else if (result.error) {
        toast.error(result.error);
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to extend buffer'
      );
    },
  });

  return {
    recordPartialPayment: partialPaymentMutation.mutateAsync,
    recordFullPayment: fullPaymentMutation.mutateAsync,
    extendBuffer: extendBufferMutation.mutateAsync,
    isProcessing:
      partialPaymentMutation.isPending ||
      fullPaymentMutation.isPending ||
      extendBufferMutation.isPending,
  };
}

export function usePaymentHistory(memberId: number) {
  return useQuery({
    queryKey: ['paymentHistory', memberId],
    queryFn: () => getPaymentHistory(memberId),
    enabled: !!memberId,
  });
}
