'use server';

import * as z from 'zod';
import { UpdatePasswordSchema } from '@/schemas';
import { API_BASE_URL } from '@/lib/utils';

export const updatePassword = async (
  values: z.infer<typeof UpdatePasswordSchema> & { token: string }
) => {
  const validatedFields = UpdatePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Auth/update-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: values.token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update password');
    }

    return { success: 'Password updated successfully!' };
  } catch (error) {
    console.error('Error during password update:', error);
    return { error: 'Failed to update password' };
  }
};
