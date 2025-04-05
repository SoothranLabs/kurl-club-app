export type ApiResponse<T = void> = {
  status: string;
  message?: string;
  data?: T;
  error?: string;
};
