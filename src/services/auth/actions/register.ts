'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import { api } from '@/lib/api';

type RegisterResponse = {
  status: string;
  message: string;
  data: {
    userId: number;
    userEmail: string;
  };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((err) => err.message).join(', '),
    };
  }

  const { email, password, privacyConsent } = validatedFields.data;
  const payload = { email, password, privacyConsent, role: 'ADMIN' };

  try {
    const response = await api.post<RegisterResponse>(
      '/Auth/register',
      payload
    );

    if (response.status !== 'Success') {
      return { error: response.message || 'Failed to register user.' };
    }

    return { success: response.message || 'Registration successful!' };
  } catch (error: unknown) {
    console.error('Error during registration:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
    };
  }
};
