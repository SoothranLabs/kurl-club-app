'use client';

import { ReactNode } from 'react';

import { useAuth } from '@/providers/auth-provider';

interface GymRequiredGuardProps {
  children: ReactNode;
}

export function GymRequiredGuard({ children }: GymRequiredGuardProps) {
  const { appUser } = useAuth();

  if (appUser?.gyms.length === 0) {
    return <div className="pointer-events-none opacity-50">{children}</div>;
  }

  return <>{children}</>;
}
