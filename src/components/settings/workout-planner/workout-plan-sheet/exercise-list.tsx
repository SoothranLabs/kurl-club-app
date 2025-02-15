import { X } from 'lucide-react';

import type { DayPlan, Exercise } from '@/types/workoutplan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ExerciseListProps {
  dayPlan: DayPlan;
  isEditMode: boolean;
  onUpdateExercise?: (exerciseId: string, updates: Partial<Exercise>) => void;
  onRemoveExercise?: (exerciseId: string) => void;
}

export function ExerciseList({
  dayPlan,
  isEditMode,
  onUpdateExercise,
  onRemoveExercise,
}: ExerciseListProps) {
  return (
    <div className="space-y-3">
      {dayPlan.exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex items-center gap-4 px-3 py-2 bg-secondary-blue-400/50 rounded-md"
        >
          <div className="flex-1">
            <p className="text-[13.5px] font-medium">{exercise.name}</p>
            <p className="text-sm text-primary-blue-50">
              {exercise.muscleGroup} {exercise.isCustom && '(Custom)'}
            </p>
          </div>
          {isEditMode && onUpdateExercise && onRemoveExercise ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) =>
                    onUpdateExercise(exercise.id, {
                      sets: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-10 h-8 text-center bg-secondary-blue-500 p-1"
                  min="0"
                />
                <span className="mx-1 text-sm text-primary-blue-50">x</span>
                <Input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) =>
                    onUpdateExercise(exercise.id, {
                      reps: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-10 h-8 text-center bg-secondary-blue-500 p-1"
                  min="0"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveExercise(exercise.id)}
                className="ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-sm text-primary-blue-50">
              {exercise.sets} x {exercise.reps}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
