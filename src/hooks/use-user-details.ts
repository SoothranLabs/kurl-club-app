'use client';

import { userDetail } from '@/types/user';
import { useState } from 'react';

const initialMemberState: userDetail = {
  name: 'Vignesh M',
  role: 'Trainer',
  trainerNo: '290897',
  email: 'magikmike@gmail.com',
  mobile: '+919656746975',
  dob: '2001-12-11T18:30:00.000Z',
  doj: '2025-01-11T18:30:00.000Z',
  bloodGroup: 'O+',
  gender: 'Male',
  address: '221B , Trump towers Broadway, New Jersey Newyork',
  pin: '673612',
};

export function useUserDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<userDetail>(initialMemberState);

  const updateMemberDetail = <K extends keyof userDetail>(
    key: K,
    value: userDetail[K]
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
    setIsEditing,
  };
}
