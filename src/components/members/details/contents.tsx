'use client';

import React from 'react';
import Header from './header';
import InfoCard from '@/components/cards/info-card';
import { Clock4 } from 'lucide-react';
import { Chart } from './chart';
import PaymentCard from './payment-card';
import PlannerSection from './planner-section';
import { MemberDetails } from '@/types/members';

function Contents({
  memberId,
  isEditing,
  handleSave,
  toggleEdit,
  details,
  originalDetails,
}: {
  memberId: string;
  isEditing: boolean;
  handleSave: () => Promise<boolean>;
  toggleEdit: () => void;
  details: MemberDetails | null;
  originalDetails: MemberDetails | null;
}) {
  return (
    <div className="md:px-8 pt-0 w-full max-w-[calc(100%-95px)] md:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-336px)]  ">
      <Header
        memberId={memberId}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
      />
      <InfoCard
        item={{
          id: 1,
          icon: <Clock4 className="text-black" />,
          color: 'primary-green-500',
          title: 'Total hours spent',
          count: 10,
        }}
        className="max-w-[332px]! w-full md:mt-4"
      />
      <div className="grid grid-cols-1 [@media(max-width:900px)]:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4 mt-3">
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
      <PlannerSection memberDetails={originalDetails || details} />
    </div>
  );
}

export default Contents;
