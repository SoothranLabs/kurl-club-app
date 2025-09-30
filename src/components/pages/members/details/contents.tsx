'use client';

import React from 'react';

// import { Clock4 } from 'lucide-react';

// import InfoCard from '@/components/shared/cards/info-card';
import { FormOptionsResponse } from '@/hooks/use-gymform-options';
import { MemberDetails } from '@/types/members';

import { Chart } from './chart';
import Header from './header';
import PaymentCard from './payment-card';
import PlannerSection from './planner-section';
import { Sidebar } from './sidebar';

function Contents({
  memberId,
  isEditing,
  handleSave,
  toggleEdit,
  details,
  originalDetails,
  formOptions,
  updateMemberDetail,
}: {
  memberId: string;
  isEditing: boolean;
  handleSave: () => Promise<boolean>;
  toggleEdit: () => void;
  details: MemberDetails | null;
  originalDetails: MemberDetails | null;
  formOptions?: FormOptionsResponse;
  updateMemberDetail: <K extends keyof MemberDetails>(
    key: K,
    value: MemberDetails[K]
  ) => void;
}) {
  return (
    <div className="md:px-8 pt-0 w-full">
      <Header
        memberId={memberId}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
      />
      <Sidebar
        memberId={memberId || ''}
        isEditing={isEditing}
        details={details}
        updateMemberDetail={updateMemberDetail}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
        formOptions={formOptions || undefined}
      />
      <div className="grid grid-cols-1 [@media(max-width:900px)]:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4 mt-3">
        <Chart />
        <PaymentCard memberId={memberId} formOptions={formOptions} />
      </div>
      <PlannerSection memberDetails={originalDetails || details} />
    </div>
  );
}

export default Contents;
