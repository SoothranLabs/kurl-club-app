'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { createSession, deleteSession } from '@/services/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

    // Use createSession to save the token in a secure HTTP-only cookie
    await createSession(data.token);

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Invalid credentials' };
  }
};

export async function logout() {
  // Delete the session using the existing utility
  await deleteSession();
  return { success: true };
}
