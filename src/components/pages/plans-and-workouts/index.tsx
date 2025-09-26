'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { TabItem } from '@/components/shared/form/k-tabs';
import { StudioLayout } from '@/components/shared/layout';

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
    <StudioLayout
      title="Plans & Workouts"
      description="Manage membership plans and workout programs"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'membership-plans' && <PackageManager />}
      {activeTab === 'workout-plans' && <WorkoutPlanner />}
    </StudioLayout>
  );
}
