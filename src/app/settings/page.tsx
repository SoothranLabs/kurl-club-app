import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings',
  description:
    'Configure gym settings, manage staff, and customize your gym management system',
};

export default function SettingsPage() {
  redirect('/settings/staff-management');
}
