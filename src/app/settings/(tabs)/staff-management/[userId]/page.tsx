'use client';

import { useState, useEffect } from 'react';
import Contents from '@/components/settings/staff-management/details/contents';
import { Sidebar } from '@/components/settings/staff-management/details/sidebar';
import { useStaffDetails } from '@/hooks/use-staff-details';

interface StaffDetailsPageProps {
  params: Promise<{ userId: string }>;
}

export default function StaffDetailsPage({ params }: StaffDetailsPageProps) {
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
    updateStaffDetail,
  } = useStaffDetails(userId!);

  if (!userId) return <p>Loading...</p>;
  if (loading) return <p>Loading staff details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex flex-auto">
      <Sidebar
        isEditing={isEditing}
        details={details}
        updateStaffDetail={updateStaffDetail}
      />
      <Contents
        staffId={userId}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
      />
    </main>
  );
}
