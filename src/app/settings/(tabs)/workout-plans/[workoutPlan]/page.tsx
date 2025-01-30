import Header from '@/components/settings/workout-plans/Individual-plan/header';
import Sidebar from '@/components/settings/workout-plans/Individual-plan/sidebar';
import { WorkoutPlans } from '@/components/settings/workout-plans/Individual-plan/workout-plans';
import React from 'react';

function WorkoutPlan() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full max-w-[calc(100%-336px)]">
        <Header />
        <WorkoutPlans />
      </div>
    </div>
  );
}

export default WorkoutPlan;
