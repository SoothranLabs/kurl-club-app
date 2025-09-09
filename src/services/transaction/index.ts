import { api } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface PaymentRequest {
  memberId: number;
  gymId: number;
  membershipPlanId: number;
  amount: number;
  paymentMethod: string;
  paymentType: number;
}

export interface ExtendBufferRequest {
  memberId: number;
  daysToAdd: number;
}

export interface PaymentHistory {
  id: number;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  paymentType: number;
  isEdited: boolean;
  originalPaymentId: number | null;
  status: string;
}

export const partialPayment = async (data: PaymentRequest) => {
  try {
    const response = await api.post('/Transaction/partial-payment', data);
    return {
      success: 'Partial payment recorded successfully!',
      data: response,
    };
  } catch (error) {
    console.error('Error recording partial payment:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to record partial payment';
    return { error: errorMessage };
  }
};

export const fullPayment = async (data: PaymentRequest) => {
  try {
    const response = await api.post('/Transaction/full-payment', data);
    return { success: 'Full payment recorded successfully!', data: response };
  } catch (error) {
    console.error('Error recording full payment:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to record full payment';
    return { error: errorMessage };
  }
};

export const extendBuffer = async (data: ExtendBufferRequest) => {
  try {
    const response = await api.post('/Transaction/extend-buffer', data);
    return { success: 'Buffer extended successfully!', data: response };
  } catch (error) {
    console.error('Error extending buffer:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to extend buffer';
    return { error: errorMessage };
  }
};

export const getPaymentHistory = async (memberId: number) => {
  try {
    const response = await api.get<ApiResponse<PaymentHistory[]>>(
      `/Transaction/payment-history/${memberId}`
    );
    return response.data || [];
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};
