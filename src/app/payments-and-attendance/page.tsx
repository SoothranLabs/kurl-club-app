import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Payments & Attendance',
  description: 'Manage member payments and track attendance records',
};

export default function PayemntAndAttendancePage() {
  redirect('/payments-and-attendance/payments');
}
