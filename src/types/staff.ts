export type Staff = {
  id: string;
  gymNo: string;
  name: string;
  avatar: string;
  package: 'Monthly' | 'Yearly' | 'Special' | 'Quarterly' | 'Half_Yearly';
  feeStatus: 'paid' | 'partially_paid' | 'unpaid';
  email: string;
  phone: string;
  bloodGroup: string;
  gender?: string;
  dob?: string;
  doj?: string;
};

export type StaffDetails = {
  id: number;
  memberIdentifier: string;
  name: string;
  dob: string;
  bloodGroup: string;
  gender?: string;
  package: string;
  feeStatus: string;
  doj: string;
  phone: string;
  email: string;
  height: number;
  weight: number;
  personalTrainer: number;
  fullAddress: string;
  workoutPlan: number;
  profilePicture: string | File | null;
};

export type WorkoutPlan = 'Weight loss' | 'Muscle gain' | 'General fitness';
export type BloodGroup =
  | 'A+'
  | 'B+'
  | 'O+'
  | 'AB+'
  | 'A-'
  | 'B-'
  | 'O-'
  | 'AB-';
export type Trainer = 'Hafiz' | 'John' | 'Sarah';

export interface EditableSectionProps {
  isEditing: boolean;
  details: StaffDetails | null;
  onUpdate: <K extends keyof StaffDetails>(
    key: K,
    value: StaffDetails[K]
  ) => void;
}
