'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import { api } from '@/lib/api';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

  try {
    // Firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const payload = { user, privacyConsent, role: 'ADMIN' };

    const response = await api.post<{ value: RegisterResponse }>(
      '/Auth/register',
      payload
    );

    const { value } = response;

    if (value.status !== 'Success') {
      return { error: value.message || 'Failed to register user.' };
    }

    return {
      success:
        'Registration successful! Please check your email for verification.',
    };
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
