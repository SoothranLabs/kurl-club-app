'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useStaffByID, updateStaff } from '@/services/staff';
import { StaffDetails } from '@/types/staff';

export function useStaffDetails(userId: string | number) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<StaffDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading: loading } = useStaffByID(userId);

  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);

  const updateStaffDetail = useCallback(
    <K extends keyof StaffDetails>(key: K, value: StaffDetails[K]) => {
      setDetails((prev) => (prev ? { ...prev, [key]: value } : null));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!details) return false;

    try {
      const formData = new FormData();

      for (const key in details) {
        const formKey = key === 'fullAddress' ? 'address' : key;
        const value = details[key as keyof StaffDetails];

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

      const response = await updateStaff(userId, formData);

      if (response.status === 'Success') {
        toast.success(response.message);
        setIsEditing(false);

        return true;
      } else {
        toast.error('Failed to update staff details.');

        return false;
      }
    } catch (error) {
      console.error('Failed to save staff details:', error);
      setError('Failed to save staff details');
      toast.error('An error occurred while updating the staff details.');
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
    updateStaffDetail,
    handleSave,
    toggleEdit,
    setIsEditing,
  };
}
