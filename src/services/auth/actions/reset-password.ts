'use server';

import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { api } from '@/lib/api';

type ResetPasswordResponse = {
  status: string;
  message: string;
};

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    const response = await api.post<ResetPasswordResponse>(
      '/Auth/forgot-password',
      { email: values.email }
    );

    if (response.status !== 'Success') {
      return { error: response.message || 'Failed to send reset email.' };
    }

    return {
      success:
        'Please check your email for a password reset link. You may now close this tab.',
    };
  } catch (error: unknown) {
    console.error('Forgot password error:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Something went wrong, please try again.',
    };
  }
};
