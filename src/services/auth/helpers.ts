'use server';

import { api } from '@/lib/api';
import {
  getRefreshToken,
  createSession,
  deleteSession,
} from '@/services/auth/session';

type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
};

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const data = await api.post<RefreshTokenResponse>('/Auth/refresh-token', {
      refreshToken,
    });
    await createSession(data.refreshToken);
    return data.token;
  } catch (error: unknown) {
    console.error('Error refreshing token:', error);
    if (error instanceof Error && error.message.includes('401')) {
      console.error('Refresh token expired or invalid. Logging out...');
      await deleteSession();
    }
    return null;
  }
}

export async function isTokenExpired(token: string): Promise<boolean> {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;

    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Treat as expired if token is invalid
  }
}

export async function getAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const token = await refreshAccessToken();
    if (token) return token;
    console.error('Failed to fetch a new access token.');
    return null;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    return null;
  }
}
