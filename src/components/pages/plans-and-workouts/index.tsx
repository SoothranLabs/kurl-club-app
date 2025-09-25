'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { KTabs, TabItem } from '@/components/shared/form/k-tabs';

import { PackageManager } from './tabs/membership-planner';
import { WorkoutPlanner } from './tabs/workout-planner';

const tabs: TabItem[] = [
  {
    id: 'membership-plans',
    label: 'Membership Plans',
  },
  {
    id: 'workout-plans',
    label: 'Workout Plans',
  },
];

export default function PlansAndWorkoutsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultTab = 'membership-plans';
  const queryTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(
    tabs.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    router.push(url.toString(), { scroll: false });
  };

  useEffect(() => {
    if (!queryTab && activeTab === defaultTab) {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', defaultTab);
      router.replace(url.toString(), { scroll: false });
    } else if (queryTab !== activeTab) {
      setActiveTab(
        tabs.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

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
