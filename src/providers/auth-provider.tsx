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

type GymUser = {
  id: string;
  name: string;
};

import { createSession, deleteSession } from '@/services/auth/session';
import { api } from '@/lib/api';

const AuthContext = createContext<
  | {
      authUser: User | null;
      gymUser: GymUser[];
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
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [gymUser, setGymUser] = useState<GymUser[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setAuthUser(authUser);

      if (authUser) {
        try {
          const idToken = await getIdToken(authUser);
          await createSession(idToken);
        } catch (error) {
          console.error('Failed to create session:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchGymUser = async (user: User) => {
    console.log('Fetching gym user for UID:', user.uid);
    console.log('Full API URL:', `/User/GetUserById/${user.uid}`);
    try {
      const response = (await api.get(
        `/User/GetUserById/${user.uid}`
      )) as Response;
      if (!response.ok) {
        throw new Error('Failed to fetch gym user!');
      }
      const data = await response.json();
      setGymUser(data.gymUser || []);
    } catch (error) {
      console.error('Error fetching gym user:', error);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchGymUser(authUser);
    }
  }, [authUser]);

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
    <AuthContext.Provider value={{ gymUser, authUser, signIn, logout }}>
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
