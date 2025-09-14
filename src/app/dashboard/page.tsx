'use client';

import Banner from '@/components/dashboard/banner';
import CardList from '@/components/dashboard/card-list';
import Header from '@/components/dashboard/header';
import { AttendanceChats } from '@/components/dashboard/insights/attendance-chats';
import OutstandingPayment from '@/components/dashboard/insights/outstanding-payment';
import Payments from '@/components/dashboard/insights/payments';
import SkipperStats from '@/components/dashboard/insights/skipper-stats';
import { GymRequiredGuard } from '@/components/shared/guards';
import { useAuth } from '@/providers/auth-provider';

function Dashboard() {
  const { appUser } = useAuth();

  return (
    <div className="container py-5 md:py-8">
      <GymRequiredGuard>
        <Header />
        <CardList />
      </GymRequiredGuard>
      {appUser?.gyms.length === 0 && <Banner />}
      <GymRequiredGuard>
        <div className="flex flex-col gap-4 mt-7">
          <h2 className="text-white font-medium text-2xl leading-normal">
            Insights
          </h2>
          <div className="grid [grid-template-columns:1fr] md:[grid-template-columns:repeat(auto-fit,minmax(680px,_1fr))] gap-4">
            <Payments />
            <OutstandingPayment />
            <SkipperStats />
            <AttendanceChats />
          </div>
        </div>
      </GymRequiredGuard>
    </div>
  );
}

export default Dashboard;
