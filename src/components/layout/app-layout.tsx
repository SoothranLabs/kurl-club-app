'use client';

import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import Navbar from './navbar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const hideNavbarRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset',
    '/auth/activate',
  ];

  return (
    <main>
      {!hideNavbarRoutes.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppLayout;
