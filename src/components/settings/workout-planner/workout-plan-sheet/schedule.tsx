import { Dumbbell } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
  const firstWorkoutDay = plan.workouts.find((w) => DAYS.includes(w.day))?.day;

  return (
    <Accordion
      defaultValue={firstWorkoutDay}
      type="single"
      collapsible
      className="w-full my-4 space-y-4"
    >
      {DAYS.map((day) => {
        const dayPlan = plan.workouts.find((w) => w.day === day);
        return (
          <AccordionItem
            key={day}
            value={day}
            className="border-none rounded-md px-4 bg-secondary-blue-500"
          >
            <AccordionTrigger className="hover:no-underline">
              {day}
            </AccordionTrigger>
            <AccordionContent>
              {dayPlan ? (
                <ExerciseList dayPlan={dayPlan} isEditMode={isEditMode} />
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm text-primary-blue-100">
                  <Dumbbell className="w-4 h-4 text-gray-400" />
                  No exercises added yet.
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                {isEditMode && (
                  <div
                    className="w-full bg-secondary-blue-200/10 flex items-center justify-center p-2 rounded-md border border-secondary-blue-300 border-dashed cursor-pointer hover:border-secondary-blue-200 transition-colors hover:text-primary-green-100"
                    onClick={() => onEditDay(day)}
                  >
                    {dayPlan ? 'Edit Workout' : 'Add Workout'}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
