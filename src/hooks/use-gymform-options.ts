import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export type FormOptionsResponse = {
  workoutPlans: { id: number; name: string; isDefault?: boolean }[];
  packageOptions: { id: number; name: string }[];
  trainers: { id: number; trainerName: string }[];
};

export const useGymFormOptions = (gymId?: number) => {
  const [formOptions, setFormOptions] = useState<FormOptionsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormOptions = async () => {
      if (!gymId) return;

      try {
        setLoading(true);
        const response = await api.get<{
          success: boolean;
          data: FormOptionsResponse;
        }>(`/Gym/${gymId}/formData`);

        if (response.success) {
          setFormOptions(response.data);
        } else {
          setError('Failed to load form options.');
        }
      } catch {
        setError('An error occurred while fetching form options.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormOptions();
  }, [gymId]);

  return { formOptions, loading, error };
};
