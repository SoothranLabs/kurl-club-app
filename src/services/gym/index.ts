import { z } from 'zod/v4';
import { api } from '@/lib/api';
import { CreateGymSchema } from '@/schemas';
import { GymResponse, GymDetails } from '@/types/gym';

export const createGym = async (
  values: z.infer<typeof CreateGymSchema> & { gymAdminId: string }
) => {
  const { gymAdminId, ProfilePicture, ...schemaValues } = values;

  // Validate input schema
  const validationResult = CreateGymSchema.safeParse(schemaValues);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err) => err.message)
      .join(', ');
    return { error: errorMessages };
  }

  // FormData for multipart/form-data
  const formData = new FormData();
  formData.append('GymAdminId', gymAdminId);

  if (ProfilePicture instanceof File) {
    formData.append('ProfilePicture', ProfilePicture);
  }

  Object.entries(validationResult.data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  try {
    await api.post('/Gym', formData);

    return {
      success: 'Gym created successfully!',
    };
  } catch (error) {
    console.error('Error during gym creation:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during gym creation.';
    return { error: errorMessage };
  }
};

export const fetchGymById = async (gymId: number): Promise<GymDetails> => {
  const response = await api.get<GymResponse>(`/Gym/${gymId}`);
  return response.data;
};

export const updateGym = async (gymId: number, data: FormData) => {
  try {
    await api.put(`/Gym/${gymId}`, data);
    return { success: 'Gym updated successfully!' };
  } catch (error) {
    console.error('Error updating gym:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during gym update.';
    return { error: errorMessage };
  }
};

export const fetchGymProfilePicture = async (gymId: number) => {
  try {
    const response = await api.get(`/Gym/${gymId}/profile-picture`);
    return response;
  } catch (error) {
    console.error('Error fetching gym profile picture:', error);
    throw error;
  }
};
