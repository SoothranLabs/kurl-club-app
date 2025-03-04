'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import type { WorkoutPlan } from '@/types/workoutplan';
import { useSheet } from '@/hooks/use-sheet';
import { useWorkoutPlans } from '@/hooks/use-workout-plan';
import { useGymBranch } from '@/providers/gym-branch-provider';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WorkoutCard } from './workout-card';
import { WorkoutPlanSheet } from './workout-plan-sheet';

export function WorkoutPlanner() {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const { isOpen, openSheet, closeSheet } = useSheet();
  const { gymBranch } = useGymBranch();
  const { plans, isLoading, createPlan, updatePlan, deletePlan } =
    useWorkoutPlans();

  const handleCreatePlan = () => {
    if (!gymBranch?.gymId) {
      return;
    }
    setSelectedPlan(null);
    openSheet();
  };

  const handleSaveNewPlan = async (newPlan: WorkoutPlan) => {
    if (!gymBranch?.gymId) return;
    const planWithGymId = {
      ...newPlan,
      gymId: gymBranch.gymId,
    };
    const success = await createPlan(planWithGymId);
    if (success) {
      closeSheet();
    }
  };

  const handleUpdatePlan = async (updatedPlan: WorkoutPlan) => {
    if (!gymBranch?.gymId) return;
    const updatedPlanWithGymId = {
      ...updatedPlan,
      gymId: gymBranch.gymId,
    };
    const success = await updatePlan({
      id: updatedPlan.planId,
      plan: updatedPlanWithGymId,
    });
    if (success) {
      if (!updatedPlan.isDefault) {
        closeSheet();
      }
    }
  };

  const handleDeletePlan = async (planId: number) => {
    const success = await deletePlan(planId);
    if (success) {
      closeSheet();
    }
  };

  if (!gymBranch?.gymId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-400">
          Please select a gym to view workout plans
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-10 w-64 bg-secondary-blue-300/20" />
              <Skeleton className="h-5 w-96 mt-2 bg-secondary-blue-300/20" />
            </div>
            <Skeleton className="h-10 w-32 bg-secondary-blue-300/20" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-48 rounded-lg bg-secondary-blue-300/20"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Workout Plans
            </h1>
            <p className="text-gray-400 mt-2">
              Create and manage your personalized workout routines
            </p>
          </div>
          <Button onClick={handleCreatePlan}>
            <Plus className="w-5 h-5 mr-2" />
            Create Plan
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">
                No workout plans found. Create your first plan!
              </p>
            </div>
          ) : (
            plans.map((plan, index) => (
              <WorkoutCard
                key={index}
                plan={plan}
                onClick={() => {
                  setSelectedPlan(plan);
                  openSheet();
                }}
              />
            ))
          )}
        </div>

        <WorkoutPlanSheet
          plan={selectedPlan}
          isOpen={isOpen}
          closeSheet={closeSheet}
          onUpdate={handleUpdatePlan}
          onDelete={handleDeletePlan}
          onSaveNew={handleSaveNewPlan}
        />
      </div>
    </div>
  );
}
