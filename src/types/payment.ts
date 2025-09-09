export interface PaymentResponse {
  status: string;
  data: Payment[];
}

export type Payment = {
  id: number;
  memberId: number;
  memberIdentifier: string;
  memberName: string;
  gymId: number;
  package: number;
  packageName: string;
  planFee: number;
  totalAmountPaid: number;
  amountPaid: number;
  pendingAmount: number;
  dueTodayAmount: number;
  paymentDate: string;
  dueDate: string;
  upcomingDueDate: string;
  bufferEndDate: string;
  bufferDaysRemaining: number;
  bufferStatus: string;
  paymentMethod: string;
  totalPayments: number;
  feeStatus: 'Pending' | 'Completed' | 'Partially Paid' | 'Fully Paid' | 'Paid';
  profilePicture: string | File | null;
};

export interface MemberPaymentDetails {
  memberId: number;
  memberName: string;
  memberIdentifier: string;
  membershipPlanId: number;
  membershipPlanName: string;
  planFee: number;
  totalAmountPaid: number;
  pendingAmount: number;
  lastPaidAmount: number;
  lastPaidDate: string;
  dueDate: string;
  paymentStatus: string;
  totalPaymentsMade: number;
  memberDOJ: string;
}
