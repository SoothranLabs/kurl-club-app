'use server';

import * as z from 'zod';
import { UpdatePasswordSchema } from '@/schemas';
import { api } from '@/lib/api';

type UpdatePasswordResponse = {
  status: string;
  message: string;
};

export const updatePassword = async (
  values: z.infer<typeof UpdatePasswordSchema> & { token: string }
) => {
  // 1. Validate the input fields
  const validatedFields = UpdatePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    // 2. Use `api.post` to make the request
    const response = await api.post<UpdatePasswordResponse>(
      '/Auth/update-password',
      {
        token: values.token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }
    );

    // 3. Handle response status
    if (response.status !== 'Success') {
      return { error: response.message || 'Failed to update password' };
    }

    return { success: response.message || 'Password updated successfully!' };
  } catch (error: unknown) {
    console.error('Error during password update:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred!',
    };
  }
};
