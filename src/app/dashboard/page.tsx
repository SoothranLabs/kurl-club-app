'use client';

import React from 'react';
import Banner from '@/components/dashboard/banner';
import CardList from '@/components/dashboard/card-list';
import Header from '@/components/dashboard/header';
import { useAuth } from '@/providers/auth-provider';
import { AttendanceChats } from '@/components/dashboard/insights/attendance-chats';
import Payments from '@/components/dashboard/insights/payments';
import SkipperStats from '@/components/dashboard/insights/skipper-stats';
import OutstandingPayment from '@/components/dashboard/insights/outstanding-payment';

function Dashboard() {
  const { appUser } = useAuth();

  return (
    <div className="container py-8">
      <Header />
      <CardList />
      {appUser?.gyms.length === 0 && <Banner />}
      <div className="flex flex-col gap-4 mt-7">
        <h2 className="text-white font-medium text-2xl leading-normal">
          Insights
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(680px,1fr))] gap-4 justify-center">
          <Payments />
          <OutstandingPayment />
          <SkipperStats />
          <AttendanceChats />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
