'use client';

import { useState } from 'react';
import { WorkoutPlans } from './workout-plans';
import { DietPlans } from './diet-plans';
import { KTabs, TabItem } from '@/components/form/k-tabs';

export default function WorkoutPlanner() {
  const [activeTab, setActiveTab] = useState<string>('workout');

  const tabs: TabItem[] = [
    { id: 'workout', label: 'Workout plans' },
    { id: 'diet', label: 'Diet plans' },
  ];

  return (
    <div className="min-h-screen bg-secondary-blue-500 text-white p-6">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-normal">Diet & Workouts</h1>
          <button className="text-primary-green-500 hover:text-primary-green-700 transition-colors">
            View More
          </button>
        </div>

        <KTabs
          items={tabs}
          variant="underline"
          value={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'workout' ? <WorkoutPlans /> : <DietPlans />}
      </div>
    </div>
  );
}
