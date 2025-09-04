'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { MembershipPlan } from '@/types/membership-plan';
import { useSheet } from '@/hooks/use-sheet';
import { useMembershipPlans } from '@/hooks/use-membership-plan';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { Button } from '@/components/ui/button';
import { MembershipCard } from './membership-card';
import { MembershipPlanSheet } from './membership-plan-sheet';

export function PackageManager() {
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const { isOpen, openSheet, closeSheet } = useSheet();
  const { gymBranch } = useGymBranch();
  const { plans, createPlan, updatePlan, deletePlan } = useMembershipPlans();

  const handleCreatePlan = () => {
    if (!gymBranch?.gymId) {
      return;
    }
    setSelectedPlan(null);
    openSheet();
  };

  const handleSaveNewPlan = async (newPlan: MembershipPlan) => {
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

  const handleUpdatePlan = async (updatedPlan: MembershipPlan) => {
    if (!gymBranch?.gymId) return;
    const updatedPlanWithGymId = {
      ...updatedPlan,
      gymId: gymBranch.gymId,
    };
    const success = await updatePlan({
      id: updatedPlan.membershipPlanId,
      plan: updatedPlanWithGymId,
    });
    if (success) {
      if (!updatedPlan.isActive) {
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Membership Plans
            </h1>
            <p className="text-gray-400 mt-2">
              Create and manage your gym membership plans
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
                No membership plans available. Click &quot;Create Plan&quot; to
                add one.
              </p>
            </div>
          ) : (
            plans.map((plan, index) => (
              <MembershipCard
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

        <MembershipPlanSheet
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
