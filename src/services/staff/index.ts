import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import { Staff, StaffDetails } from '@/types/staff';

export const createStaff = async (
  data: FormData,
  type: 'staff' | 'trainer'
) => {
  try {
    const endpoint = type === 'staff' ? '/Staff/CreateStaff' : '/Trainer';
    const response = await api.post(endpoint, data);

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

export const fetchGymStaffs = async (gymId: number | string) => {
  const response = await api.get<ApiResponse<Staff[]>>(
    `/Gym/GetAllStaffByGymId/${gymId}`
  );

  return response.data || [];
};

export const useGymStaffs = (gymId: number | string) => {
  return useQuery({
    queryKey: ['gymStaffs', gymId],
    queryFn: () => fetchGymStaffs(gymId),
    enabled: !!gymId,
  });
};

export const fetchStaffByID = async (id: string | number) => {
  const response = await api.get<{ status: string; data: StaffDetails }>(
    `/Member/${id}`
  );

  return response.data;
};

export const useStaffByID = (id: string | number) => {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: () => fetchStaffByID(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const updateStaff = async (id: string | number, data: FormData) => {
  try {
    const response = await api.put<ApiResponse>(`/Member/${id}`, data);

    return response;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const deleteStaff = async (id: string | number) => {
  try {
    await api.delete(`/Member/${id}`);

    return { success: 'Member deleted successfully!' };
  } catch (error) {
    console.error('Error deleting member:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while deleting the member.';

    return { error: errorMessage };
  }
};
