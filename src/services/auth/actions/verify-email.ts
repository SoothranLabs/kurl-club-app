import { api } from '@/lib/api';

type VerifyEmailResponse = {
  status: string;
  message: string;
};

export const verifyEmail = async (
  token: string
): Promise<{ success?: string; error?: string }> => {
  if (!token) {
    return { error: 'Missing Token! Token is required!' };
  }

  try {
    const response = await api.get<VerifyEmailResponse>('/auth/verify-email', {
      params: { token },
    });

    return response.status === 'Success'
      ? { success: 'Your email has been successfully verified!' }
      : { error: 'Email verification failed!' };
  } catch (error: unknown) {
    console.error('Email verification error:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred!',
    };
  }
};
