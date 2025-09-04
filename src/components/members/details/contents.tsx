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
    <div className="p-8 pt-0 w-full max-w-[calc(100%-336px)]">
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
        className="w-[332px]! mt-4"
      />
      <div className="grid grid-cols-2 mt-3 gap-4">
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
