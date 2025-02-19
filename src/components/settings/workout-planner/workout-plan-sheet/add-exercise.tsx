'use client';

import { useState } from 'react';
import {
  type Exercise,
  type MuscleGroup,
  MUSCLE_GROUPS,
  DEFAULT_EXERCISES,
} from '@/types/workoutplan';
import { KSelect } from '@/components/form/k-select';

interface AddExerciseProps {
  onAddExercise: (exercise: Exercise) => void;
}

export function AddExercise({ onAddExercise }: AddExerciseProps) {
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<MuscleGroup>('Chest');
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
        <div>
          <KSelect
            label="Exercise"
            value=""
            onValueChange={(value) =>
              handleAddExercise(
                value,
                selectedMuscleGroup,
                customExercises[selectedMuscleGroup].includes(value)
              )
            }
            options={[
              ...new Set([
                ...DEFAULT_EXERCISES[selectedMuscleGroup],
                ...customExercises[selectedMuscleGroup],
              ]),
            ].map((exercise) => ({
              label: exercise,
              value: exercise,
            }))}
            className="w-[180px]"
          />
        </div>
      </div>
    </div>
  );
}
