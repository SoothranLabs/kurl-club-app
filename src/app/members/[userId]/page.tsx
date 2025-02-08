'use client';

import { useState, useEffect } from 'react';
import Contents from '@/components/members/details/contents';
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
    loading,
    error,
    updateMemberDetail,
  } = useMemberDetails(userId!);

  if (!userId) return <p>Loading...</p>;
  if (loading) return <p>Loading member details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex flex-auto">
      <Sidebar
        memberId={userId}
        isEditing={isEditing}
        details={details}
        updateMemberDetail={updateMemberDetail}
      />
      <Contents
        memberId={userId}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
      />
    </main>
  );
}
