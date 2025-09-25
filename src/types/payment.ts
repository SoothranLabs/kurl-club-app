export interface PaymentResponse {
  status: string;
  data: MemberPaymentDetails[];
}

export interface PaymentCycle {
  cycleId: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  planFee: number;
  amountPaid: number;
  pendingAmount: number;
  status: 'Pending' | 'Completed' | 'Partial' | 'Debt';
  bufferEndDate: string | null;
  totalBufferDays: number;
  bufferEligible: boolean;
  lastAmountPaid: number;
  lastAmountPaidDate: string;
}

export interface MemberPaymentDetails {
  memberId: number;
  memberName: string;
  membershipPlanId: number;
  currentCycle: PaymentCycle;
  previousCycles: PaymentCycle[];
  totalDebtCycles: number;
  totalDebtAmount: number;
  memberStatus: 'Outstanding' | 'Expired' | 'Completed' | 'Debts';
  // Computed fields for backward compatibility
  memberIdentifier?: string;
}
