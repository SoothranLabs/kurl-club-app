import {
  Minus,
  AlertCircle,
  PersonStanding,
  CircleUserRound,
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

export const outstandingPaymentFilters = [
  {
    columnId: 'feeStatus',
    title: 'Fee Status',
    options: [
      { label: 'Partially Paid', value: 'partially_paid', icon: Minus },
      { label: 'Unpaid', value: 'unpaid', icon: AlertCircle },
    ],
  },
  {
    columnId: 'packageName',
    title: 'Package',
    options: [
      { label: 'Partially Paid', value: 'partially_paid', icon: Minus },
      { label: 'Unpaid', value: 'unpaid', icon: AlertCircle },
    ],
  },
];

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
