'use client';

import { useEffect, useState } from 'react';

import Contents from '@/components/members/details/contents';
import { Sidebar } from '@/components/members/details/sidebar';
import { useGymFormOptions } from '@/hooks/use-gymform-options';
import { useMemberDetails } from '@/hooks/use-member-details';
import { useGymBranch } from '@/providers/gym-branch-provider';

interface MemberDetailsPageProps {
  params: Promise<{ userId: string }>;
}

export default function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const { gymBranch } = useGymBranch();
  const { formOptions } = useGymFormOptions(gymBranch?.gymId);

  useEffect(() => {
    params.then(({ userId }) => setUserId(userId));
  }, [params]);

  const {
    isEditing,
    handleSave,
    toggleEdit,
    details,
    originalDetails,
    error,
    updateMemberDetail,
  } = useMemberDetails(userId!);

  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container p-0 flex flex-auto gap-4 md:gap-0 rounded-[12px] bg-background-dark h-full">
      <Sidebar
        memberId={userId || ''}
        isEditing={isEditing}
        details={details}
        updateMemberDetail={updateMemberDetail}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
        formOptions={formOptions || undefined}
      />
      <Contents
        memberId={userId || ''}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
        details={details}
        originalDetails={originalDetails}
        formOptions={formOptions || undefined}
      />
    </main>
  );
}
