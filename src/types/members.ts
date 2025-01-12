export interface Member {
  name: string;
  memberSince: string;
  gymNo: string;
  email: string;
  mobile: string;
  dob: string;
  height: string;
  weight: string;
  workoutPlan: WorkoutPlan;
  assignedTo: Trainer;
  bloodGroup: BloodGroup;
  address: string;
  pin: string;
}

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
  details: Member;
  onUpdate: <K extends keyof Member>(key: K, value: Member[K]) => void;
  memberSince?: string;
  gymNo?: string;
}
