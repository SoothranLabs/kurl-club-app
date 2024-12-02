// you types for project comes here
export type MultiStepFormData = {
  // Step 1: Verify Phone
  phone: string;

  // Step 2: OTP
  otp: string;

  // Step 3: Gym Details
  gymName: string;
  gymAddress: string;
  gymCity: string;
  gymState: string;
  gymZip: string;
  facilities: string[];

  // Step 4: Trainers
  trainers: {
    name: string;
    specialization: string;
    experience: string;
  }[];
};
