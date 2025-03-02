'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getWorkoutPlans,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from '@/services/workoutplan';
import { useGymBranch } from '@/providers/gym-branch-provider';
import type { WorkoutPlan } from '@/types/workoutplan';
import { useAppDialog } from './use-app-dialog';

export function useWorkoutPlans() {
  const queryClient = useQueryClient();
  const { showAlert } = useAppDialog();
  const { gymBranch } = useGymBranch();

  // Get all workout plans
  const {
    data: plans = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['workoutPlans', gymBranch?.gymId],
    queryFn: () => {
      if (!gymBranch?.gymId) {
        throw new Error('No gym selected');
      }
      return getWorkoutPlans(gymBranch.gymId);
    },
    enabled: !!gymBranch?.gymId,
    staleTime: 1000 * 60 * 3,
  });

  // Create a new workout plan
  const createPlanMutation = useMutation({
    mutationFn: (newPlan: WorkoutPlan) => {
      if (!gymBranch?.gymId) {
        throw new Error('No gym selected');
      }
      return createWorkoutPlan({
        ...newPlan,
        gymId: gymBranch.gymId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workoutPlans', gymBranch?.gymId],
      });
      toast.success('Workout plan created successfully');
    },
    onError: (err) => {
      showAlert({
        title: 'Error creating workout plan',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  // Update an existing workout plan
  const updatePlanMutation = useMutation({
    mutationFn: ({ id, plan }: { id: number; plan: WorkoutPlan }) => {
      if (!gymBranch?.gymId) {
        throw new Error('No gym selected');
      }
      return updateWorkoutPlan(id, {
        ...plan,
        gymId: gymBranch.gymId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workoutPlans', gymBranch?.gymId],
      });
      toast.success('Workout plan updated successfully');
    },
    onError: (err) => {
      showAlert({
        title: 'Error updating workout plan',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  // Delete a workout plan
  const deletePlanMutation = useMutation({
    mutationFn: (id: number) => deleteWorkoutPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workoutPlans', gymBranch?.gymId],
      });
      toast.success('Workout plan deleted successfully');
    },
    onError: (err) => {
      showAlert({
        title: 'Error deleting workout plan',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  return {
    plans,
    isLoading,
    error,
    createPlan: createPlanMutation.mutate,
    updatePlan: updatePlanMutation.mutate,
    deletePlan: deletePlanMutation.mutate,
    isCreating: createPlanMutation.isPending,
    isUpdating: updatePlanMutation.isPending,
    isDeleting: deletePlanMutation.isPending,
  };
}

// export function useWorkoutPlan(id: number | null) {
//   const { showAlert } = useAppDialog();

//   const {
//     data: plan,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['workoutPlan', id],
//     queryFn: () => (id ? getWorkoutPlan(id) : null),
//     enabled: !!id,
//     staleTime: 1000 * 60 * 3,
//   });

//   if (error) {
//     showAlert({
//       title: 'Error loading workout plan',
//       description:
//         error instanceof Error ? error.message : 'An unknown error occurred',
//       variant: 'destructive',
//     });
//   }

//   return { plan, isLoading, error };
// }
