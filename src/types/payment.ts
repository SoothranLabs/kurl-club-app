export interface PaymentResponse {
  status: string;
  data: Payment[];
}

export type Payment = {
  memberId: number;
  memberIdentifier: string;
  memberName: string;
  package: number;
  packageName: string;
  amountPaid: number;
  pendingAmount: number;
  paymentDate: string;
  id?: number;
  gymId?: number;
  planFee?: number;
  totalAmountPaid?: number;
  dueDate?: string;
  upcomingDueDate?: string;
  bufferEndDate?: string | null;
  bufferDaysRemaining?: number;
  paymentMethod?: string;
  totalPayments?: number;
  cyclesElapsed?: number;
  expectedTotalFee?: number;
  feeStatus?: 'Pending' | 'Completed' | 'Partial' | 'Arrears';
  profilePicture?: string | File | null;
};

export interface PaymentCycle {
  cycleId: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  planFee: number;
  amountPaid: number;
  pendingAmount: number;
  status: string;
  bufferEndDate: string | null;
  totalBufferDays?: number;
  bufferEligible: boolean;
  lastAmountPaid: number;
  lastAmountPaidDate: string;
}

export interface MemberPaymentDetails {
  memberId: number;
  memberIdentifier: string;
  memberName: string;
  membershipPlanId: number;
  currentCycle: PaymentCycle;
  previousCycles: PaymentCycle[];
  totalDebtCycles: number;
  totalDebtAmount: number;
  memberStatus: string;
}
