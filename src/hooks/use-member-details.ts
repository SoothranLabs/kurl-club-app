'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useMemberByID, updateMember } from '@/services/member';
import { MemberDetails } from '@/types/members';

export function useMemberDetails(userId: string | number) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<MemberDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading: loading } = useMemberByID(userId);

  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);

  const updateMemberDetail = useCallback(
    <K extends keyof MemberDetails>(key: K, value: MemberDetails[K]) => {
      setDetails((prev) => (prev ? { ...prev, [key]: value } : null));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!details) return false;

    try {
      const formData = new FormData();

      for (const key in details) {
        let formKey = key === 'fullAddress' ? 'address' : key;
        const value = details[key as keyof MemberDetails];

        if (formKey === 'workoutPlan') {
          formKey = 'workoutPlanId';
        }

        if (value !== undefined && value !== null) {
          if (formKey === 'profilePicture' && value instanceof File) {
            formData.append(formKey, value);
          } else if (formKey === 'profilePicture' && value === null) {
            formData.append(formKey, 'null');
          } else {
            formData.append(formKey, String(value));
          }
        }
      }

      const response = await updateMember(userId, formData);

      if (response.status === 'Success') {
        toast.success(response.message);
        setIsEditing(false);

        return true;
      } else {
        toast.error('Failed to update member details.');

        return false;
      }
    } catch (error) {
      console.error('Failed to save member details:', error);
      setError('Failed to save member details');
      toast.error('An error occurred while updating the member details.');
      return false;
    }
  }, [details, userId]);

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return {
    details,
    isEditing,
    loading,
    error,
    updateMemberDetail,
    handleSave,
    toggleEdit,
    setIsEditing,
  };
}
