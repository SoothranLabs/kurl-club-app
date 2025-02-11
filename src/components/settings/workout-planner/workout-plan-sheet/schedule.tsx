import { Button } from '@/components/ui/button';
import type { WorkoutPlan } from '@/types/workoutplan';
import { ExerciseList } from './exercise-list';

interface ScheduleProps {
  plan: WorkoutPlan;
  isEditMode: boolean;
  onEditDay: (day: string) => void;
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function Schedule({ plan, isEditMode, onEditDay }: ScheduleProps) {
  return (
    <div className="space-y-4">
      {DAYS.map((day) => {
        const dayPlan = plan.workouts.find((w) => w.day === day);
        return (
          <div key={day} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{day}</h3>
              {isEditMode && (
                <Button variant="outline" onClick={() => onEditDay(day)}>
                  {dayPlan ? 'Edit Workout' : 'Add Workout'}
                </Button>
              )}
            </div>
            {dayPlan && (
              <ExerciseList dayPlan={dayPlan} isEditMode={isEditMode} />
            )}
          </div>
        );
      })}
    </div>
  );
}
