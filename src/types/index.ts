export type ApiResponse<T = void> = {
  status: string;
  message?: string;
  data?: T;
  error?: string;
};

export type Member = {
  id: string;
  gymNo: string;
  name: string;
  avatar: string;
  package: 'Monthly' | 'Yearly' | 'Special' | 'Quarterly' | 'Half_Yearly';
  feeStatus: 'paid' | 'partially_paid' | 'unpaid';
  email: string;
  phone: string;
  bloodGroup: string;
  gender?: string;
  doj?: string;
  dob?: string;
};
