export const verifyEmail = async (
  token: string
): Promise<{ success?: string; error?: string }> => {
  if (!token) {
    return { error: 'Missing Token! Token is required!' };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email?token=${token}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      console.log(message);

      return { error: 'The verification link is invalid or has expired.' };
    }

    const { status } = await response.json();
    return status === 'Success'
      ? { success: 'Your email has been successfully verified!' }
      : { error: 'Email verification failed!' };
  } catch (error: unknown) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred!',
    };
  }
};
