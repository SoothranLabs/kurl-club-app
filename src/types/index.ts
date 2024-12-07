export type Member = {
  id: string;
  gymNo: string;
  name: string;
  avatar: string;
  package: 'Monthly' | 'Yearly' | 'Special';
  feeStatus: 'paid' | 'partially_paid' | 'unpaid';
  email: string;
  phone: string;
  bloodGroup: string;
  gender?: string;
  doj?: string;
  dob?: string;
};
