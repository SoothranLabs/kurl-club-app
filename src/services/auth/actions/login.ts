'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { createSession, deleteSession } from '@/services/auth/session';
import { api } from '@/lib/api';

type LoginResponse = {
  token: string;
  refreshToken: string;
  userDetails: {
    id: string;
    name: string;
    email: string;
  };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    const data = await api.post<LoginResponse>('/Auth/login', {
      email: values.email,
      password: values.password,
      loginType: 'Standard',
    });

    // Save refresh token in a secure HTTP-only cookie
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
