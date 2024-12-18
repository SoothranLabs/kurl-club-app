import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload extends JWTPayload {
  token: string;
}

// Encrypt the session token
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

// Decrypt the session token
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error(`Failed to verify session: ${error}`);
    return null;
  }
}

// Create a session and save it in cookies
export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const authToken = await encrypt({ token });
  const cookieStore = await cookies();

  cookieStore.set('auth_token', authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  });
}

// Delete the session
export async function deleteSession() {
  const cookieStore = await cookies();

  // Remove the 'auth_token' cookie
  cookieStore.delete('auth_token');
}
