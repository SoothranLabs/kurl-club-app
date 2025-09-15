import type { Metadata } from 'next';

import StaffManagement from '@/components/settings/staff-management';

export const metadata: Metadata = {
  title: 'Staff Management',
  description: 'Manage gym staff, roles, and permissions',
};

export default function StaffManagementPage() {
  return <StaffManagement />;
}
