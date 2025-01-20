'use client';

import React from 'react';
import Banner from '@/components/dashboard/banner';
import CardList from '@/components/dashboard/card-list';
import Header from '@/components/dashboard/header';
import { useAuth } from '@/providers/auth-provider';

function Dashboard() {
  const { appUser } = useAuth();

  return (
    <div className="container py-8">
      <Header />
      <CardList />
      {appUser?.gyms.length === 0 && <Banner />}
    </div>
  );
}

export default Dashboard;
