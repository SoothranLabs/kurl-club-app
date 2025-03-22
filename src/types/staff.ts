export type StaffType = 'trainer' | 'administrator';

export type Staff = {
  id: string;
  staffId: string;
  name: string;
  avatar: string;
  role: StaffType;
  email: string;
  phone: string;
  bloodGroup: string;
  gender?: string;
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

export interface EditableSectionProps {
  isEditing: boolean;
  details: StaffDetails | null;
  onUpdate: <K extends keyof StaffDetails>(
    key: K,
    value: StaffDetails[K]
  ) => void;
}
