'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, isTokenExpired } from '@/services/auth/helpers';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      if (!accessToken || (await isTokenExpired(accessToken))) {
        const newToken = await getAccessToken();
        if (newToken) setAccessToken(newToken);
      }
    };

    refreshToken(); // Initial token refresh
    const interval = setInterval(refreshToken, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
