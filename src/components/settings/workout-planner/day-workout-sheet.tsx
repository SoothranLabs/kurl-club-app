'use client';

import { useState } from 'react';
import { X, Dumbbell } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  type Exercise,
  type MuscleGroup,
  MUSCLE_GROUPS,
  DEFAULT_EXERCISES,
} from '@/types/workoutplan';

interface AddWorkoutSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: string | null;
  initialWorkout?: {
    duration: number;
    exercises: Exercise[];
  };
  onSave: (day: string, duration: number, exercises: Exercise[]) => void;
}

export function AddWorkoutSheet({
  open,
  onOpenChange,
  day,
  initialWorkout,
  onSave,
}: AddWorkoutSheetProps) {
  const [duration, setDuration] = useState(initialWorkout?.duration || 60);
  const [exercises, setExercises] = useState<Exercise[]>(
    initialWorkout?.exercises || []
  );
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<MuscleGroup>('Chest');
  const [customExercise, setCustomExercise] = useState('');

  const handleAddExercise = (name: string) => {
    setExercises((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        sets: 3,
        reps: 12,
        muscleGroup: selectedMuscleGroup,
      },
    ]);
  };

  const handleUpdateExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, ...updates } : ex))
    );
  };

  const handleRemoveExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleSave = () => {
    if (day) {
      onSave(day, duration, exercises);
    }
  };

  if (!day) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Add workout for {day}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Duration (minutes)
            </label>
            <Select
              value={duration.toString()}
              onValueChange={(value) => setDuration(Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[30, 45, 60, 90, 120].map((mins) => (
                  <SelectItem key={mins} value={mins.toString()}>
                    {mins} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Exercises</h3>
              <Select
                value={selectedMuscleGroup}
                onValueChange={(value) =>
                  setSelectedMuscleGroup(value as MuscleGroup)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MUSCLE_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[200px] rounded-md border p-4">
              {selectedMuscleGroup === 'Custom' ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter exercise name"
                    value={customExercise}
                    onChange={(e) => setCustomExercise(e.target.value)}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (customExercise) {
                        handleAddExercise(customExercise);
                        setCustomExercise('');
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {DEFAULT_EXERCISES[selectedMuscleGroup].map((exercise) => (
                    <Button
                      key={exercise}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleAddExercise(exercise)}
                    >
                      <Dumbbell className="w-4 h-4 mr-2" />
                      {exercise}
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>

            <div className="space-y-2">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-4 p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.muscleGroup}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="space-x-2">
                      <Input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleUpdateExercise(exercise.id, {
                            sets: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-16 text-center"
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground">
                        sets
                      </span>
                    </div>
                    <div className="space-x-2">
                      <Input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleUpdateExercise(exercise.id, {
                            reps: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-16 text-center"
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground">
                        reps
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveExercise(exercise.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save workout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
