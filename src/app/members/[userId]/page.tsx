'use client';

import { useEffect, useState } from 'react';

import Loading from '@/app/loading';
import Contents from '@/components/members/details/contents';
import { Loading } from '@/components/members/details/loading';
import { Sidebar } from '@/components/members/details/sidebar';
import { useMemberDetails } from '@/hooks/use-member-details';

interface MemberDetailsPageProps {
  params: Promise<{ userId: string }>;
}

export default function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ userId }) => setUserId(userId));
  }, [params]);

  const {
    isEditing,
    handleSave,
    toggleEdit,
    details,
    originalDetails,
    loading,
    error,
    updateMemberDetail,
  } = useMemberDetails(userId!);

  if (!userId) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container p-0 flex flex-auto gap-4 md:gap-0">
      <Sidebar
        memberId={userId}
        isEditing={isEditing}
        details={details}
        updateMemberDetail={updateMemberDetail}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
      />
      <Contents
        memberId={userId}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
        details={details}
        originalDetails={originalDetails}
      />
    </main>
  );
}
