'use client';

import { useState } from 'react';
import type { Member } from '@/types/members';

const initialMemberState: Member = {
  name: 'Prasoon Mohan',
  memberSince: '14/03/2024',
  gymNo: '290897',
  email: 'magikmike@gmail.com',
  mobile: '+919656746975',
  dob: '2001-12-11T18:30:00.000Z',
  height: '157',
  weight: '80',
  workoutPlan: 'Weight loss',
  assignedTo: 'Hafiz',
  bloodGroup: 'O+',
  address: '221B , Trump towers Broadway, New Jersey Newyork',
  pin: '673612',
};

export function useMemberDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<Member>(initialMemberState);

  const updateMemberDetail = <K extends keyof Member>(
    key: K,
    value: Member[K]
  ) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the data
      setIsEditing(false);
      return true;
    } catch (error) {
      console.error('Failed to save member details:', error);
      return false;
    }
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  return {
    details,
    isEditing,
    updateMemberDetail,
    handleSave,
    toggleEdit,
  };
}
