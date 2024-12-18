import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // 1. Validate form fields
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((err) => err.message).join(', '),
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password, privacyConsent } = validatedFields.data;
  const payload = {
    email,
    password,
    privacyConsent,
    role: 'ADMIN',
  };

  try {
    // 3. Send a POST request using fetch
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    // 4. Parse the response data
    const responseData = await response.json();

    if (!response.ok || responseData?.value?.status !== 'Success') {
      return {
        error: responseData?.value?.message || 'Failed to register user.',
      };
    }

    // 5. Extract success message
    return {
      success: responseData?.value?.message || 'Registration successful!',
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
