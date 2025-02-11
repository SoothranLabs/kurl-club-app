'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Edit2, Check, Trash2 } from 'lucide-react';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { KSheet } from '@/components/form/k-sheet';
import type { WorkoutPlan, Exercise } from '@/types/workoutplan';
import { Overview } from './overview';
import { Schedule } from './schedule';
import { ExerciseList } from './exercise-list';
import { AddExercise } from './add-exercise';

interface WorkoutPlanSheetProps {
  plan: WorkoutPlan | null;
  isOpen: boolean;
  onUpdate: (plan: WorkoutPlan) => void;
  onDelete: (planId: string) => void;
  onSaveNew: (plan: WorkoutPlan) => void;
  closeSheet: () => void;
}

const DEFAULT_PLAN: WorkoutPlan = {
  id: crypto.randomUUID(),
  gymId: 1,
  planName: 'New Workout Plan',
  description: 'Add a description for your workout plan',
  type: 'strength',
  durationInDays: 7,
  difficultyLevel: 'beginner',
  cost: 0,
  isDefault: false,
  workouts: [],
};

export function WorkoutPlanSheet({
  plan,
  isOpen,
  closeSheet,
  onUpdate,
  onDelete,
  onSaveNew,
}: WorkoutPlanSheetProps) {
  const [editedPlan, setEditedPlan] = useState<WorkoutPlan>(
    plan || DEFAULT_PLAN
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { showConfirm } = useAppDialog();

  useEffect(() => {
    setEditedPlan(plan || DEFAULT_PLAN);
    setIsEditMode(!plan); // Set to edit mode if it's a new plan
  }, [plan]);

  const handleSavePlan = () => {
    if (plan) {
      onUpdate(editedPlan);
    } else {
      onSaveNew(editedPlan);
    }
    setIsEditMode(false);
  };

  const handleDeletePlan = () => {
    showConfirm({
      title: `Are you absolutely sure?`,
      description: `This action cannot be undone. This will permanently delete your workout plan and remove it from our servers.`,
      variant: 'destructive',
      confirmLabel: 'Yes, delete plan',
      onConfirm: () => {
        if (plan) {
          onDelete(plan.id);
        }
        closeSheet();
      },
    });
  };

  const handleUpdateExercise = (
    day: string,
    exerciseId: string,
    updates: Partial<Exercise>
  ) => {
    setEditedPlan((prev) => ({
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
    }));
  };

  const handleRemoveExercise = (day: string, exerciseId: string) => {
    setEditedPlan((prev) => ({
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
    }));
  };

  const handleAddExercise = (day: string, exercise: Exercise) => {
    setEditedPlan((prev) => {
      const existingDayPlan = prev.workouts.find((w) => w.day === day);
      if (existingDayPlan) {
        return {
          ...prev,
          workouts: prev.workouts.map((w) =>
            w.day === day ? { ...w, exercises: [...w.exercises, exercise] } : w
          ),
        };
      } else {
        return {
          ...prev,
          workouts: [
            ...prev.workouts,
            { day, exercises: [exercise], duration: 0 },
          ],
        };
      }
    });
  };

  return (
    <KSheet
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
    >
      {selectedDay ? (
        <div className="mt-6 space-y-6">
          <ExerciseList
            dayPlan={
              editedPlan.workouts.find((w) => w.day === selectedDay) || {
                day: selectedDay,
                exercises: [],
                duration: 0,
              }
            }
            isEditMode={isEditMode}
            onUpdateExercise={(exerciseId, updates) =>
              handleUpdateExercise(selectedDay, exerciseId, updates)
            }
            onRemoveExercise={(exerciseId) =>
              handleRemoveExercise(selectedDay, exerciseId)
            }
          />
          {isEditMode && (
            <AddExercise
              onAddExercise={(exercise) =>
                handleAddExercise(selectedDay, exercise)
              }
            />
          )}
        </div>
      ) : (
        <Tabs defaultValue="overview" className="mt-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            <Button variant="destructive" onClick={handleDeletePlan}>
              <Trash2 />
            </Button>
          </div>

          <TabsContent value="overview">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Edit2 className="w-4 h-4 mr-2" />
                )}
                {isEditMode ? 'Save' : 'Edit'}
              </Button>
            </div>
            <Overview
              plan={editedPlan}
              isEditMode={isEditMode}
              onPlanChange={(updates) =>
                setEditedPlan((prev) => ({ ...prev, ...updates }))
              }
              onSave={handleSavePlan}
              onDelete={handleDeletePlan}
              onCancel={() => {
                setEditedPlan(plan || DEFAULT_PLAN);
                setIsEditMode(false);
              }}
            />
          </TabsContent>

          <TabsContent value="schedule">
            <Schedule
              plan={editedPlan}
              isEditMode={isEditMode}
              onEditDay={setSelectedDay}
            />
          </TabsContent>
        </Tabs>
      )}
    </KSheet>
  );
}
