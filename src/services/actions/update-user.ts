'use server';

import * as z from 'zod';
import { UpdatePasswordSchema } from '@/schemas';

export const updatePassword = async (
  values: z.infer<typeof UpdatePasswordSchema>
) => {
  const validatedFields = UpdatePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return { success: 'Password updated successfully!' };
};
