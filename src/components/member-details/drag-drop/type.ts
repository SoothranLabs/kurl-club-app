import { DraggableProvided, DroppableProvided } from '@hello-pangea/dnd';

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  reps?: string;
  completed?: boolean;
}

export interface Meal {
  id: string;
  name: string;
  duration: string;
}

export interface DayPlan {
  id: string;
  day: string;
  date: string;
  exercises: Exercise[];
  meals: Meal[];
}

export interface DraggableItemProps {
  provided: DraggableProvided;
  item: Exercise | Meal;
  type: 'exercise' | 'meal';
}

export interface DroppableListProps {
  provided: DroppableProvided;
  items: Exercise[] | Meal[];
  type: 'exercise' | 'meal';
}
