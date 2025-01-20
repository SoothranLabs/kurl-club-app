import * as z from 'zod';
import { api } from '@/lib/api';
import { CreateGymSchema } from '@/schemas';

export const createGym = async (
  values: z.infer<typeof CreateGymSchema> & { gymAdminId: string }
) => {
  const { gymAdminId, ProfilePicture, ...schemaValues } = values;

  // Validate input schema
  const validationResult = CreateGymSchema.safeParse(schemaValues);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors
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
