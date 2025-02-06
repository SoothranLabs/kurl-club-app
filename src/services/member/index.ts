import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import { Member, MemberDetails } from '@/types/members';

export const createMember = async (data: FormData) => {
  try {
    const response = await api.post('/Member', data);

    return { success: 'Member created successfully!', data: response };
  } catch (error) {
    console.error('Error during member creation:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during member creation.';

    return { error: errorMessage };
  }
};

export const fetchGymMembers = async (gymId: number | string) => {
  const response = await api.get<ApiResponse<Member[]>>(`/Member/gym/${gymId}`);

  return response.data || [];
};

export const useGymMembers = (gymId: number | string) => {
  return useQuery({
    queryKey: ['gymMembers', gymId],
    queryFn: () => fetchGymMembers(gymId),
    enabled: !!gymId,
  });
};

export const fetchMemberByID = async (id: string | number) => {
  const response = await api.get<{ status: string; data: MemberDetails }>(
    `/Member/${id}`
  );

  return response.data;
};

export const useMemberByID = (id: string | number) => {
  return useQuery({
    queryKey: ['member', id],
    queryFn: () => fetchMemberByID(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const updateMember = async (id: string | number, data: FormData) => {
  try {
    const response = await api.put<ApiResponse>(`/Member/${id}`, data);

    return response;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};
