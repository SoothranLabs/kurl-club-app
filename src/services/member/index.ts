import { api } from '@/lib/api';

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

export const getAllMembers = async (gymId: number) => {
  try {
    const members = await api.get(`/api/Member/gym/${gymId}`);

    return members;
  } catch (error) {
    console.error('Error fetching gym members:', error);
    return { error: 'Unable to fetch gym members' };
  }
};
