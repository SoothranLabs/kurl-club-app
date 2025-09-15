import type { Metadata } from 'next';

import { PackageManager } from '@/components/settings/membership-planner';

export const metadata: Metadata = {
  title: 'Membership Plans',
  description: 'Configure gym membership plans, pricing, and packages',
};

export default function MembershipPlanPage() {
  return (
    <main className="p-8">
      <PackageManager />
    </main>
  );
}
