'use client';

import React, { createContext, useEffect, useState, useContext } from 'react';
import {
  onAuthStateChanged,
  getIdToken,
  User as FirebaseUser,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createSession, deleteSession } from '@/services/auth/session';
import { api } from '@/lib/api';

const AuthContext = createContext<
  | {
      firebaseUser: FirebaseUser | null;
      appUser: AppUser | null;
      signIn: (options: SignInOptions) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

type SignInOptions =
  | { method: 'register'; email: string; password: string }
  | { method: 'login'; email: string; password: string }
  | { method: 'oauth'; provider: 'google' };

interface AppUser {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: string;
  gyms: {
    gymId: number;
    gymName: string;
    gymLocation: string;
  }[];
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);

  // Fetch the appUser from the backend
  const fetchAppUser = async (uid: string) => {
    try {
      const response = await api.get<{
        status: string;
        message: string;
        data: AppUser;
      }>(`/User/GetUserById/${uid}`);
      setAppUser(response.data);
      if (response.data.gyms.length > 0) {
        localStorage.setItem(
          'gymBranch',
          JSON.stringify(response.data.gyms[0])
        );
      }
    } catch (error) {
      console.error('Failed to fetch app user:', error);
      setAppUser(null);
    }
  };

  // Watch Firebase user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        try {
          const idToken = await getIdToken(firebaseUser);
          await createSession(idToken);
          await fetchAppUser(firebaseUser.uid);
        } catch (error) {
          console.error('Failed to handle Firebase user change:', error);
        }
      } else {
        setAppUser(null);
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
          await fetchAppUser(user.uid);
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
          await fetchAppUser(user.uid);
          break;
        }
        case 'oauth': {
          if (options.provider === 'google') {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const idToken = await getIdToken(user);
            await createSession(idToken);
            await fetchAppUser(user.uid);
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
    setAppUser(null);
  };

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, signIn, logout }}>
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
