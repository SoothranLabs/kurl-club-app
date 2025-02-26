import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
  // Calculate the number of days with workouts
  const daysWithWorkouts = plan.workouts?.length || 0;

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
      className="cursor-pointer transition-all hover:shadow-lg bg-secondary-blue-300/20 backdrop-blur-lg border-white/20 hover:border-primary-green-500/30 text-white"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{plan.planName}</CardTitle>
            <CardDescription className="mt-2 text-gray-300">
              {plan.description}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className={`${getDifficultyColor(plan.difficultyLevel)} text-xs`}
          >
            {plan.difficultyLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {daysWithWorkouts} days
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            {totalExercises} exercises
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
