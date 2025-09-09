'use client';

import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import Loading from '@/app/loading';
import { useAuth } from '@/providers/auth-provider';

import Navbar from './navbar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthLoading, appUser } = useAuth();

  const hideNavbarRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset',
    '/auth/activate',
  ];

  const isAuthRoute = hideNavbarRoutes.includes(pathname);

  // Show loading only if we have no cached data and Firebase is still loading
  if (isAuthLoading && !appUser && !isAuthRoute) {
    return <Loading />;
  }

  return (
    <main>
      {!isAuthRoute && <Navbar />}
      {children}
    </main>
  );
};

export default AppLayout;
