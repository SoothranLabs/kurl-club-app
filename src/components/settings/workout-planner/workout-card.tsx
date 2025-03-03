import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Timer } from 'lucide-react';
import type { WorkoutPlan } from '@/types/workoutplan';
import { getDifficultyColor } from '@/lib/utils';

interface WorkoutCardProps {
  plan: WorkoutPlan;
  onClick: () => void;
}

export function WorkoutCard({ plan, onClick }: WorkoutCardProps) {
  // Calculate the total number of exercises safely
  const totalExercises =
    plan.workouts?.reduce(
      (acc, workout) =>
        acc +
        (workout.categories?.reduce(
          (catAcc, category) => catAcc + (category.exercises?.length || 0),
          0
        ) || 0),
      0
    ) || 0;

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg bg-secondary-blue-300/20 backdrop-blur-lg border-white/10 hover:border-primary-green-500/30 text-white"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl md:text-2xl">{plan.planName}</CardTitle>
          <Badge
            variant="secondary"
            className={`${getDifficultyColor(plan.difficultyLevel)} capitalize text-xs rounded-full px-3 py-1`}
          >
            {plan.difficultyLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300">
          {plan.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {plan.duration} days
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            {totalExercises} exercises
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
