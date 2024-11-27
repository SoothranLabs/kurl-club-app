'use server';

import * as z from 'zod';
import { ResetSchema } from '@/schemas';

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return {
    success:
      'Please check your email for a password reset link. You may now close this tab.',
  };
};
