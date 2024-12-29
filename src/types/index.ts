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

export type Trainer = {
  id: string;
  trainerId: string;
  name: string;
  avatar: string;
  designation: 'Admin' | 'Trainer' | 'Regular_User';
  email: string;
  phone: string;
};

export type ApiResponse<T = void> = {
  success?: T;
  error?: string;
};
