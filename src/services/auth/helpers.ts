'use server';

import { API_BASE_URL } from '@/lib/utils';
import {
  getRefreshToken,
  createSession,
  deleteSession,
} from '@/services/auth/session';

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/Auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Refresh token expired or invalid. Logging out...');
        await deleteSession();
      }
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    await createSession(data.refreshToken); // Update refreshToken if needed
    return data.token; // Return new accessToken
  } catch (error) {
    console.error('Error refreshing token:', error);
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
