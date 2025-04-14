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
  bufferStatus: string;
  paymentMethod: string;
  feeStatus: 'Partially Paid' | 'Fully Paid';
  profilePicture: string | File | null;
};
