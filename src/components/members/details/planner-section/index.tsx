'use client';

import { useState } from 'react';
import { WorkoutPlans } from './workout-plans';
import { DietPlans } from './diet-plans';
import { KTabs, TabItem } from '@/components/form/k-tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function PlannerSection() {
  const [activeTab, setActiveTab] = useState<string>('workout');
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000);
  };

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
        <Button
          variant="secondary"
          onClick={handleClick}
          className="group h-[46px] px-5 py-4"
        >
          <RefreshCw
            className={`text-primary-blue-200 group-hover:text-primary-green-400 transition 
          ${isRotating ? 'animate-spin text-primary-green-400' : ''}`}
          />
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
