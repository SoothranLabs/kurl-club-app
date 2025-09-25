'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { CreditCard, Dumbbell } from 'lucide-react';

import { PackageManager } from '@/components/settings/membership-planner';
import { WorkoutPlanner } from '@/components/settings/workout-planner';
import { KTabs } from '@/components/shared/form/k-tabs';

const tabs = [
  {
    id: 'membership-plans',
    label: 'Membership Plans',
    icon: CreditCard,
  },
  {
    id: 'workout-plans',
    label: 'Workout Plans',
    icon: Dumbbell,
  },
];

function PlansAndWorkoutsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'membership-plans';

  const handleTabChange = (tabId: string) => {
    router.push(`/plans-and-workouts?tab=${tabId}`);
  };

  return (
    <main className="p-8 rounded-[12px] bg-background-dark h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Plans & Workouts</h1>
        <p className="text-muted-foreground">
          Manage membership plans and workout programs
        </p>
      </div>

      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />

      <div className="mt-6">
        {activeTab === 'membership-plans' && <PackageManager />}
        {activeTab === 'workout-plans' && <WorkoutPlanner />}
      </div>
    </main>
  );
}

export default function PlansAndWorkoutsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlansAndWorkoutsContent />
    </Suspense>
  );
}
