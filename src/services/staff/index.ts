import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import { Staff, StaffDetails, StaffType } from '@/types/staff';

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

export const fetchStaffByID = async (id: string | number, role: StaffType) => {
  const endpoint =
    role === 'staff' ? `/Staff/GetStaffById/${id}` : `/Trainer/${id}`;

  const response = await api.get<{ status: string; data: StaffDetails }>(
    endpoint
  );
  return response.data;
};

export const useStaffByID = (id: string | number, role: StaffType) => {
  return useQuery({
    queryKey: ['staff', id, role],
    queryFn: () => fetchStaffByID(id, role),
    enabled: !!id && !!role,
    staleTime: 1000 * 60 * 5,
  });
};

export const updateStaff = async (
  id: string | number,
  data: FormData,
  role: StaffType
) => {
  try {
    const endpoint =
      role === 'staff'
        ? `/Staff/UpdateStaff/${id}`
        : `/Trainer/UpdateTrainer/${id}`;

    const response = await api.put<ApiResponse>(endpoint, data);
    return response;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const deleteStaff = async (id: string | number, role: StaffType) => {
  try {
    const endpoint =
      role === 'staff' ? `/Staff/DeleteStaff/${id}` : `/Trainer/${id}`;

    await api.delete(endpoint);

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
