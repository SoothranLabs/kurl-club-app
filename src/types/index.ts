export type Staff = {
  id: string;
  trainerId: string;
  name: string;
  avatar: string;
  designation: 'Adminstrator' | 'Trainer';
  email: string;
  phone: string;
};

export type ApiResponse<T = void> = {
  status: string;
  message?: string;
  data?: T;
  error?: string;
};
