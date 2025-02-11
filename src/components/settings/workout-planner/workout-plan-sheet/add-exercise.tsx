'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dumbbell } from 'lucide-react';
import {
  type Exercise,
  type MuscleGroup,
  MUSCLE_GROUPS,
  DEFAULT_EXERCISES,
} from '@/types/workoutplan';

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
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Add Exercise</h3>
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
          <div className="flex gap-2">
            <Input
              placeholder="Enter custom exercise"
              value={customExercise}
              onChange={(e) => setCustomExercise(e.target.value)}
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
