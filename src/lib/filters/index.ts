import {
  AlertCircle,
  CircleUserRound,
  Minus,
  PersonStanding,
} from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  columnId: string;
  title: string;
  options: FilterOption[];
}

// Payment Status Filter (static)
export const paymentStatusFilter = {
  columnId: 'feeStatus',
  title: 'Payment Status',
  options: [
    { label: 'Pending', value: 'Pending', icon: AlertCircle },
    { label: 'Partial', value: 'Partial', icon: Minus },
    { label: 'Completed', value: 'Completed', icon: CircleUserRound },
    { label: 'Arrears', value: 'Arrears', icon: AlertCircle },
  ],
};

// Helper function to create package filter with dynamic options
export const createPackageFilter = (
  membershipPlans: Array<{ planName: string }>
) => ({
  columnId: 'packageName',
  title: 'Package Type',
  options: membershipPlans.map((plan) => ({
    label: plan.planName,
    value: plan.planName,
  })),
});

// Helper functions to get filters for each tab
export const getPaymentFilters = (
  membershipPlans: Array<{ planName: string }> = []
) => [paymentStatusFilter, createPackageFilter(membershipPlans)];

export const getCompletedPaymentFilters = (
  membershipPlans: Array<{ planName: string }> = []
) => [createPackageFilter(membershipPlans)];

// Staff filters
export const staffFilters = [
  {
    columnId: 'role',
    title: 'Designation',
    options: [
      { label: 'Trainer', value: 'Trainer', icon: PersonStanding },
      { label: 'Staff', value: 'Staff', icon: CircleUserRound },
    ],
  },
  {
    columnId: 'bloodGroup',
    title: 'Blood Group',
    options: [
      { label: 'A+', value: 'A+' },
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' },
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' },
    ],
  },
];
