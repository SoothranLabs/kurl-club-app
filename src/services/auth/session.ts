import 'server-only';
import { cookies } from 'next/headers';

/**
 * Creates a session by storing the refresh token in an HTTP-only cookie.
 *
 * @param refreshToken - The refresh token to be stored in the cookie.
 *
 * Notes:
 * - The cookie is set with security options such as `httpOnly` and `sameSite`
 *   to protect it from client-side access and cross-site attacks.
 * - The cookie will expire in 30 days.
 */
export async function createSession(refreshToken: string) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  });
}

/**
 * Retrieves the refresh token stored in cookies.
 *
 * @returns The refresh token if it exists, or `null` if not found.
 *
 */
export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    console.error('Failed to decrypt refresh token.');
    return null;
  }

  return refreshToken || null;
}

/**
 * Deletes the session by removing the refresh token cookie.
 *
 * Notes:
 * - This function effectively logs the user out by clearing the token
 *   that is required for authentication.
 * - Ensures the `refresh_token` cookie is completely removed from the client.
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('refresh_token');
}
