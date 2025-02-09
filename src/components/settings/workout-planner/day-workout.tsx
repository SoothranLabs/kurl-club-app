import { Exercise } from '@/types/workoutplan';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface DayWorkoutProps {
  exercises: Exercise[];
  onEdit: () => void;
}

export function DayWorkout({ exercises, onEdit }: DayWorkoutProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Exercises</h3>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
      <div className="space-y-2">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div>
              <p className="font-medium">{exercise.name}</p>
              {exercise.muscleGroup && (
                <p className="text-sm text-muted-foreground">
                  {exercise.muscleGroup}
                </p>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {exercise.sets} sets × {exercise.reps} reps
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
