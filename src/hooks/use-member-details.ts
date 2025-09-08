'use client';

import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateMember, useMemberByID } from '@/services/member';
import { MemberDetails } from '@/types/members';

export function useMemberDetails(
  userId: string | number,
  initialData?: MemberDetails
) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<MemberDetails | null>(null);
  const [originalDetails, setOriginalDetails] = useState<MemberDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading: loading } = useMemberByID(userId);

  useEffect(() => {
    const memberData = data || initialData;
    if (memberData) {
      setDetails(memberData);
      setOriginalDetails(memberData);
    }
  }, [data, initialData]);

  const updateMemberDetail = useCallback(
    <K extends keyof MemberDetails>(key: K, value: MemberDetails[K]) => {
      setDetails((prev) => {
        if (!prev) return null;
        return { ...prev, [key]: value };
      });
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!details) return false;

    // Validate required fields
    if (!details.height || details.height <= 0) {
      toast.error('Height is required and must be greater than 0');
      return false;
    }

    if (!details.weight || details.weight <= 0) {
      toast.error('Weight is required and must be greater than 0');
      return false;
    }

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

        // Invalidate queries to refresh data
        await queryClient.invalidateQueries({ queryKey: ['gymMembers'] });
        await queryClient.invalidateQueries({ queryKey: ['member', userId] });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, userId]);

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => {
      // If canceling edit, restore original values
      if (prev && originalDetails) {
        setDetails(originalDetails);
      }
      // If starting edit, store current values as original
      if (!prev && details) {
        setOriginalDetails({ ...details });
      }
      return !prev;
    });
  }, [details, originalDetails]);

  return {
    details,
    originalDetails,
    isEditing,
    loading,
    error,
    updateMemberDetail,
    handleSave,
    toggleEdit,
    setIsEditing,
  };
}
