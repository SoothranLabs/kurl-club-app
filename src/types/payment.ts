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
  amountPaid: number;
  pendingAmount: number;
  paymentDate: string;
  dueDate: string;
  bufferEndDate: string;
  bufferDaysRemaining: number;
  bufferStatus: string;
  paymentMethod: string;
  feeStatus: 'Partially Paid' | 'Fully Paid' | 'Paid';
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
  currentOutstandingAmount: number;
  lastPaidAmount: number;
  lastPaidDate: string;
  dueDate: string;
  paymentStatus: string;
  totalPaymentsMade: number;
  memberDOJ: string;
}
