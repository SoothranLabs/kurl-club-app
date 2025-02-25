export type Trainer = {
  id: string;
  trainerId: string;
  name: string;
  avatar: string;
  designation: 'Admin' | 'Trainer' | 'Regular_User';
  email: string;
  phone: string;
};

export type ApiResponse<T = void> = {
  status: string;
  message?: string;
  data?: T;
  error?: string;
};
