'use client';

import React from 'react';
import Header from './header';
import InfoCard from '@/components/cards/info-card';
import { Clock4 } from 'lucide-react';
import { Chart } from './chart';
import PaymentCard from './payment-card';
import WorkoutPlanner from './planner-section';

function Contents() {
  return (
    <div className="p-8 pt-[26px] w-full max-w-[calc(100%-336px)]">
      <Header />
      <InfoCard
        item={{
          id: 1,
          icon: <Clock4 className="text-black" />,
          color: 'primary-green-500',
          title: 'Total hours spent',
          count: 10,
        }}
        className="!w-[332px] mt-7"
      />
      <div className="grid grid-cols-2 mt-4 gap-4">
        <Chart />
        <PaymentCard
          info={{
            status: 'unpaid',
            delay: 1,
            outstanding: 10000,
            paid_amount: 0,
            package: 'Quarterly',
            due_data: '12/12/2024',
          }}
        />
      </div>
      <WorkoutPlanner />
    </div>
  );
}

export default Contents;
