'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Dumbbell, Trash2, X } from 'lucide-react';

import { useAppDialog } from '@/hooks/use-app-dialog';
import {
  type WorkoutPlan,
  type Exercise,
  MUSCLE_GROUPS,
  DEFAULT_EXERCISES,
  type MuscleGroup,
  type DayPlan,
} from '@/types/workoutplan';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { KSheet } from '@/components/form/k-sheet';

interface WorkoutPlanSheetProps {
  plan: WorkoutPlan | null;
  isOpen: boolean;
  onUpdate: (plan: WorkoutPlan) => void;
  onDelete: (planId: string) => void;
  closeSheet: () => void;
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

export function WorkoutPlanSheet({
  plan,
  isOpen,
  closeSheet,
  onUpdate,
  onDelete,
}: WorkoutPlanSheetProps) {
  const [editedPlan, setEditedPlan] = useState<WorkoutPlan | null>(plan);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
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
  const { showConfirm } = useAppDialog();

  useEffect(() => {
    setEditedPlan(plan);
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('customExercises', JSON.stringify(customExercises));
  }, [customExercises]);

  if (!editedPlan) return null;

  const handleSavePlan = () => {
    if (editedPlan) {
      onUpdate(editedPlan);
      closeSheet();
    }
  };

  const handleDeletePlan = () => {
    showConfirm({
      title: `Are you absolutely sure?`,
      description: `This action cannot be undone. This will permanently delete your workout plan and remove it from our servers.`,
      variant: 'destructive',
      confirmLabel: 'Yes, delete plan',
      onConfirm: () => {
        if (editedPlan) {
          onDelete(editedPlan.id);
          closeSheet();
        }
      },
    });
  };

  const handleAddExercise = (
    name: string,
    muscleGroup: MuscleGroup,
    isCustom = false
  ) => {
    if (editedPlan && selectedDay) {
      const newExercise: Exercise = {
        id: crypto.randomUUID(),
        name,
        sets: 3,
        reps: 12,
        muscleGroup,
        isCustom,
      };

      setEditedPlan((prev) => {
        if (!prev) return prev;
        const existingDayPlan = prev.workouts.find(
          (w) => w.day === selectedDay
        );
        if (existingDayPlan) {
          return {
            ...prev,
            workouts: prev.workouts.map((w) =>
              w.day === selectedDay
                ? { ...w, exercises: [...w.exercises, newExercise] }
                : w
            ),
          };
        } else {
          return {
            ...prev,
            workouts: [
              ...prev.workouts,
              { day: selectedDay, exercises: [newExercise] },
            ],
          };
        }
      });

      if (isCustom) {
        setCustomExercises((prev) => ({
          ...prev,
          [muscleGroup]: [...prev[muscleGroup], name],
        }));
      }
    }
  };

  const handleUpdateExercise = (
    day: string,
    exerciseId: string,
    updates: Partial<Exercise>
  ) => {
    setEditedPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workouts: prev.workouts.map((w) =>
          w.day === day
            ? {
                ...w,
                exercises: w.exercises.map((e) =>
                  e.id === exerciseId ? { ...e, ...updates } : e
                ),
              }
            : w
        ),
      };
    });
  };

  const handleRemoveExercise = (day: string, exerciseId: string) => {
    setEditedPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workouts: prev.workouts
          .map((w) =>
            w.day === day
              ? {
                  ...w,
                  exercises: w.exercises.filter((e) => e.id !== exerciseId),
                }
              : w
          )
          .filter((w) => w.exercises.length > 0),
      };
    });
  };

  const renderExerciseList = (dayPlan: DayPlan) => (
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
          <div className="flex items-center gap-2">
            <div className="space-x-2">
              <Input
                type="number"
                value={exercise.sets}
                onChange={(e) =>
                  handleUpdateExercise(dayPlan.day, exercise.id, {
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
                  handleUpdateExercise(dayPlan.day, exercise.id, {
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
              onClick={() => handleRemoveExercise(dayPlan.day, exercise.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const footer = (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        onClick={() => {
          closeSheet();
        }}
        variant="secondary"
        className="h-[46px] min-w-[90px]"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="add-member-form"
        className="h-[46px] min-w-[73px]"
      >
        Add
      </Button>
    </div>
  );

  return (
    <KSheet
      className="w-[582px]"
      isOpen={isOpen}
      onClose={closeSheet}
      title={
        <>
          {selectedDay ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-2"
                onClick={() => setSelectedDay(null)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {selectedDay} Workout
            </div>
          ) : (
            editedPlan.planName
          )}
        </>
      }
      footer={footer}
    >
      {selectedDay ? (
        <div className="mt-6 space-y-6">
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
                          customExercises[selectedMuscleGroup].includes(
                            exercise
                          )
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
                        handleAddExercise(
                          customExercise,
                          selectedMuscleGroup,
                          true
                        );
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

          {renderExerciseList(
            editedPlan.workouts.find((w) => w.day === selectedDay) || {
              day: selectedDay,
              exercises: [],
            }
          )}
        </div>
      ) : (
        <Tabs defaultValue="overview">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            <Button variant="destructive" onClick={handleDeletePlan}>
              <Trash2 />
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={editedPlan.planName}
                onChange={(e) =>
                  setEditedPlan((prev) =>
                    prev ? { ...prev, planName: e.target.value } : null
                  )
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editedPlan.description}
                onChange={(e) =>
                  setEditedPlan((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select
                value={editedPlan.type}
                onValueChange={(value) =>
                  setEditedPlan((prev) =>
                    prev
                      ? { ...prev, type: value as WorkoutPlan['type'] }
                      : null
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select
                value={editedPlan.difficultyLevel}
                onValueChange={(value) =>
                  setEditedPlan((prev) =>
                    prev
                      ? {
                          ...prev,
                          difficultyLevel:
                            value as WorkoutPlan['difficultyLevel'],
                        }
                      : null
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Duration (days)</label>
              <Input
                type="number"
                value={editedPlan.durationInDays}
                onChange={(e) =>
                  setEditedPlan((prev) =>
                    prev
                      ? {
                          ...prev,
                          durationInDays: Number.parseInt(e.target.value),
                        }
                      : null
                  )
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Cost</label>
              <Input
                type="number"
                value={editedPlan.cost}
                onChange={(e) =>
                  setEditedPlan((prev) =>
                    prev
                      ? { ...prev, cost: Number.parseFloat(e.target.value) }
                      : null
                  )
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={editedPlan.isDefault}
                onChange={(e) =>
                  setEditedPlan((prev) =>
                    prev ? { ...prev, isDefault: e.target.checked } : null
                  )
                }
              />
              <label htmlFor="isDefault" className="text-sm font-medium">
                Is Default Plan
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeSheet}>
                Cancel
              </Button>
              <Button onClick={handleSavePlan}>Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            {DAYS.map((day) => {
              const dayPlan = editedPlan.workouts.find((w) => w.day === day);
              return (
                <div key={day} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{day}</h3>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedDay(day)}
                    >
                      {dayPlan ? 'Edit Workout' : 'Add Workout'}
                    </Button>
                  </div>
                  {dayPlan && renderExerciseList(dayPlan)}
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      )}
    </KSheet>
  );
}
