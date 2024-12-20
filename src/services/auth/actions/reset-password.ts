'use server';

import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { API_BASE_URL } from '@/lib/utils';

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send reset email');
    }

    return {
      success:
        'Please check your email for a password reset link. You may now close this tab.',
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { error: 'Something went wrong, please try again.' };
  }
};
