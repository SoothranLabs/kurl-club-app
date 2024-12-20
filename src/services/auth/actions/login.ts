'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { createSession, deleteSession } from '@/services/auth/session';
import { API_BASE_URL } from '@/lib/utils';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        loginType: 'Standard',
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    // Save the refresh token in an HTTP-only cookie
    await createSession(data.refreshToken);

    return { success: true, token: data.token, userDetails: data.userDetails };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Invalid credentials' };
  }
};

export async function logout() {
  await deleteSession();
  return { success: true };
}
