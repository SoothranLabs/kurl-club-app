import type { Metadata } from 'next';

import { WorkoutPlanner } from '@/components/settings/workout-planner';

export const metadata: Metadata = {
  title: 'Workout Plans',
  description: 'Create and manage workout plans for gym members',
};

export default function WorkoutPlanPage() {
  return (
    <div className="p-8">
      <WorkoutPlanner />
    </div>
  );
}
