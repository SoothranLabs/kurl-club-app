'use client';

import { ReactNode } from 'react';

import { useAuth } from '@/providers/auth-provider';

interface GymRequiredGuardProps {
  children: ReactNode;
}

export function GymRequiredGuard({ children }: GymRequiredGuardProps) {
  const { appUser, isAppUserLoading } = useAuth();

  // Show a skeleton placeholder or disabled state while loading
  if (isAppUserLoading || !appUser) {
    return (
      <div className="pointer-events-none opacity-50 animate-pulse">
        {children}
      </div>
    );
  }

  // Disable if no gyms
  if (appUser.gyms.length === 0) {
    return <div className="pointer-events-none opacity-50">{children}</div>;
  }

  return <>{children}</>;
}
