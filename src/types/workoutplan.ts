export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Core'
  | 'Custom';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  muscleGroup: MuscleGroup;
  isCustom?: boolean;
}

export interface DayPlan {
  day: string;
  duration: number;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  gymId: number;
  planName: string;
  description: string;
  type: 'strength' | 'cardio' | 'hybrid' | 'flexibility';
  durationInDays: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  cost: number;
  isDefault: boolean;
  workouts: DayPlan[];
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Core',
  'Custom',
];

export const DEFAULT_EXERCISES: Record<MuscleGroup, string[]> = {
  Chest: ['Bench Press', 'Incline Press', 'Dumbbell Flies', 'Push-Ups'],
  Back: ['Pull-Ups', 'Bent Over Rows', 'Lat Pulldowns', 'Deadlifts'],
  Legs: ['Squats', 'Leg Press', 'Lunges', 'Calf Raises'],
  Shoulders: ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Face Pulls'],
  Biceps: [
    'Barbell Curls',
    'Hammer Curls',
    'Preacher Curls',
    'Concentration Curls',
  ],
  Triceps: [
    'Tricep Pushdowns',
    'Skull Crushers',
    'Diamond Push-Ups',
    'Overhead Extensions',
  ],
  Core: ['Planks', 'Crunches', 'Russian Twists', 'Leg Raises'],
  Custom: [],
};

export const DEFAULT_PLAN: WorkoutPlan = {
  id: 'default',
  gymId: 1,
  planName: 'Default Plan',
  description: 'A default workout plan',
  type: 'strength',
  durationInDays: 7,
  difficultyLevel: 'beginner',
  cost: 0,
  isDefault: true,
  workouts: [
    {
      day: 'Monday',
      duration: 60,
      exercises: [
        {
          id: '1',
          name: 'Bench Press',
          sets: 3,
          reps: 10,
          muscleGroup: 'Chest',
        },
      ],
    },
  ],
};
