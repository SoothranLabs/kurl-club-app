'use client';

import { useState } from 'react';
import { WorkoutPlans } from './workout-plans';
import { DietPlans } from './diet-plans';
import { KTabs, TabItem } from '@/components/form/k-tabs';
import { Button } from '@/components/ui/button';

export default function WorkoutPlanner() {
  const [activeTab, setActiveTab] = useState<string>('workout');

  const tabs: TabItem[] = [
    { id: 'workout', label: 'Workout plans' },
    { id: 'diet', label: 'Diet plans' },
  ];

  return (
    <div className="bg-secondary-blue-500 text-white mt-4 rounded-lg">
      <div className="flex justify-between items-center px-6 pt-3 pb-4">
        <h6 className="text-base leading-normal font-normal text-white">
          Diet & workouts
        </h6>
        <Button variant="secondary" className="h-[46px] px-5 py-4">
          {' '}
          View more
        </Button>
      </div>

      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'workout' ? <WorkoutPlans /> : <DietPlans />}
    </div>
  );
}
