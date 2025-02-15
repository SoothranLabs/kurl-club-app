'use client';

import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

import {
  type Exercise,
  type MuscleGroup,
  MUSCLE_GROUPS,
  DEFAULT_EXERCISES,
} from '@/types/workoutplan';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { KSelect } from '@/components/form/k-select';

interface AddExerciseProps {
  onAddExercise: (exercise: Exercise) => void;
}

export function AddExercise({ onAddExercise }: AddExerciseProps) {
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<MuscleGroup>('Chest');
  const [customExercise, setCustomExercise] = useState('');
  const [customExercises, setCustomExercises] = useState<
    Record<MuscleGroup, string[]>
  >(() => {
    const savedExercises = localStorage.getItem('customExercises');
    return savedExercises
      ? JSON.parse(savedExercises)
      : Object.fromEntries(MUSCLE_GROUPS.map((group) => [group, []]));
  });

  const handleAddExercise = (
    name: string,
    muscleGroup: MuscleGroup,
    isCustom = false
  ) => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name,
      sets: 3,
      reps: 12,
      muscleGroup,
      isCustom,
    };
    onAddExercise(newExercise);

    if (isCustom) {
      setCustomExercises((prev) => {
        const updated = {
          ...prev,
          [muscleGroup]: [...prev[muscleGroup], name],
        };
        localStorage.setItem('customExercises', JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="font-medium">Add Exercise</h3>
        <div>
          <KSelect
            label="Muscle Group"
            value={selectedMuscleGroup}
            onValueChange={(value) =>
              setSelectedMuscleGroup(value as MuscleGroup)
            }
            options={MUSCLE_GROUPS.map((group) => ({
              label: group,
              value: group,
            }))}
            className="w-[180px]"
          />
        </div>
      </div>

      <ScrollArea className="rounded-md border border-secondary-blue-400 p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              ...DEFAULT_EXERCISES[selectedMuscleGroup],
              ...customExercises[selectedMuscleGroup],
            ].map((exercise) => (
              <Button
                key={exercise}
                variant="outline"
                className="justify-start"
                onClick={() =>
                  handleAddExercise(
                    exercise,
                    selectedMuscleGroup,
                    customExercises[selectedMuscleGroup].includes(exercise)
                  )
                }
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                {exercise}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full">
            <Input
              placeholder="Add custom exercise"
              value={customExercise}
              onChange={(e) => setCustomExercise(e.target.value)}
              className="flex-1 rounded-md text-sm font-semibold text-white bg-secondary-blue-500 appearance-none border border-transparent hover:border-secondary-blue-400 focus:border-primary-green-700 shadow-none !ring-0 outline-none outline-transparent"
            />

            <Button
              size="sm"
              onClick={() => {
                if (customExercise) {
                  handleAddExercise(customExercise, selectedMuscleGroup, true);
                  setCustomExercise('');
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
