import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import type { DayPlan, Exercise } from '@/types/workoutplan';

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
    <div className="space-y-4">
      {dayPlan.exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <div className="flex-1">
            <p className="font-medium">{exercise.name}</p>
            <p className="text-sm text-muted-foreground">
              {exercise.muscleGroup} {exercise.isCustom && '(Custom)'}
            </p>
          </div>
          {isEditMode && onUpdateExercise && onRemoveExercise ? (
            <div className="flex items-center gap-2">
              <div className="space-x-2">
                <Input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) =>
                    onUpdateExercise(exercise.id, {
                      sets: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-16 text-center"
                  min="0"
                />
                <span className="text-sm text-muted-foreground">sets</span>
              </div>
              <div className="space-x-2">
                <Input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) =>
                    onUpdateExercise(exercise.id, {
                      reps: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-16 text-center"
                  min="0"
                />
                <span className="text-sm text-muted-foreground">reps</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveExercise(exercise.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {exercise.sets} sets × {exercise.reps} reps
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
