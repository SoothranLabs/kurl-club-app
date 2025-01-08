'use client';

import React, { createContext, useEffect, useState, useContext } from 'react';
import {
  onAuthStateChanged,
  getIdToken,
  User,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createSession, deleteSession } from '@/services/auth/session';

const AuthContext = createContext<
  | {
      user: User | null;
      signIn: (options: SignInOptions) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

type SignInOptions =
  | { method: 'register'; email: string; password: string }
  | { method: 'login'; email: string; password: string }
  | { method: 'oauth'; provider: 'google' };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const idToken = await getIdToken(user);
          await createSession(idToken);
        } catch (error) {
          console.error('Failed to create session:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (options: SignInOptions) => {
    try {
      switch (options.method) {
        case 'register': {
          const { email, password } = options;
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const idToken = await getIdToken(user);
          await createSession(idToken);
          break;
        }
        case 'login': {
          const { email, password } = options;
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const idToken = await getIdToken(user);
          await createSession(idToken);
          break;
        }
        case 'oauth': {
          if (options.provider === 'google') {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const idToken = await getIdToken(user);
            await createSession(idToken);
          }
          break;
        }
        default:
          throw new Error('Unsupported sign-in method');
      }
    } catch (error) {
      console.error('Failed to sign in:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    await deleteSession();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
