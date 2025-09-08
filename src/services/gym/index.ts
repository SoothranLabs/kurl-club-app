import { api } from '@/lib/api';
import { GymDetails, GymResponse } from '@/types/gym';

export const createGym = async (values: {
  GymName: string;
  Location: string;
  ContactNumber1: string;
  ContactNumber2?: string;
  Email: string;
  SocialLinks?: string;
  ProfilePicture?: File | null;
  GymAdminId: string;
  Status?: string;
}) => {
  const { ProfilePicture, ...otherValues } = values;

  // FormData for multipart/form-data
  const formData = new FormData();

  if (ProfilePicture instanceof File) {
    formData.append('ProfilePicture', ProfilePicture);
  }

  Object.entries(otherValues).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  try {
    await api.post('/Gym', formData);

    return {
      success: 'Gym created successfully!',
    };
  } catch (error) {
    console.error('Error during gym creation:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during gym creation.';
    return { error: errorMessage };
  }
};

export const fetchGymById = async (gymId: number): Promise<GymDetails> => {
  const response = await api.get<GymResponse>(`/Gym/${gymId}`);
  return response.data;
};

export const updateGym = async (gymId: number, data: FormData) => {
  try {
    await api.put(`/Gym/${gymId}`, data);
    return { success: 'Gym updated successfully!' };
  } catch (error) {
    console.error('Error updating gym:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during gym update.';
    return { error: errorMessage };
  }
};

export const fetchGymProfilePicture = async (gymId: number) => {
  try {
    const response = await api.get(`/Gym/${gymId}/profile-picture`);
    return response;
  } catch (error) {
    console.error('Error fetching gym profile picture:', error);
    throw error;
  }
};
