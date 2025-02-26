'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import type { WorkoutPlan } from '@/types/workoutplan';
import { useSheet } from '@/hooks/use-sheet';

import { Button } from '@/components/ui/button';
import { WorkoutCard } from './workout-card';
import { WorkoutPlanSheet } from './workout-plan-sheet';

export function WorkoutPlanner() {
  const [plans, setPlans] = useState<WorkoutPlan[] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const { isOpen, openSheet, closeSheet } = useSheet();

  // Load plans from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlans = localStorage.getItem('workoutplans');
      setPlans(savedPlans ? JSON.parse(savedPlans) : []);
    }
  }, []);

  // Update localStorage when plans change (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && plans !== null) {
      localStorage.setItem('workoutplans', JSON.stringify(plans));
    }
  }, [plans]);

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    openSheet();
  };

  const handleSaveNewPlan = (newPlan: WorkoutPlan) => {
    setPlans((prev) => (prev ? [...prev, newPlan] : [newPlan]));
    openSheet();
  };

  const handleUpdatePlan = (updatedPlan: WorkoutPlan) => {
    if (plans === null) return;
    setPlans(
      plans.map((p) => (p.gymId === updatedPlan.gymId ? updatedPlan : p))
    );
  };

  const handleDeletePlan = (planId: number) => {
    if (plans === null) return;
    setPlans(plans.filter((p) => p.gymId !== planId));
    closeSheet();
  };

  if (plans === null) {
    return (
      <p className="text-center text-gray-400">Loading workout plans...</p>
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
          {plans.map((plan, index) => (
            <WorkoutCard
              key={index}
              plan={plan}
              onClick={() => {
                setSelectedPlan(plan);
                openSheet();
              }}
            />
          ))}
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
