import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Dumbbell, Timer } from 'lucide-react';
import type { WorkoutPlan } from '@/types/workoutplan';

interface WorkoutCardProps {
  plan: WorkoutPlan;
  onClick: () => void;
}

export function WorkoutCard({ plan, onClick }: WorkoutCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'advanced':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

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
            <Dumbbell className="w-4 h-4" />
            {plan.type}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {plan.durationInDays} days
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            {plan.workouts.reduce(
              (acc, workout) => acc + workout.exercises.length,
              0
            )}{' '}
            exercises
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
