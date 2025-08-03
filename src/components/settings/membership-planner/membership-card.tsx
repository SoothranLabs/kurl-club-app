import { Card } from '@/components/ui/card';
import type { MembershipPlan } from '@/types/membership-plan';

interface WorkoutCardProps {
  plan: MembershipPlan;
  onClick: () => void;
}

export function MembershipCard({ plan, onClick }: WorkoutCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg backdrop-blur-lg border-white/10 hover:border-primary-green-500/30 text-white overflow-hidden"
      onClick={onClick}
    >
      <div className="p-5 flex flex-col gap-4 bg-secondary-blue-500">
        <div className="flex items-center justify-between">
          <h5 className="text-white font-medium text-2xl leading-normal">
            {plan.planName}
          </h5>
        </div>
        <h6 className="text-primary-green-200 font-medium text-[32px] leading-normal">
          &#8377;{new Intl.NumberFormat('en-IN').format(Number(plan.fee))}
        </h6>
      </div>

      <div className="p-5 pt-6">
        <p className="text-white text-sm font-medium leading-[130%]">
          {plan.details}
        </p>
      </div>
    </Card>
  );
}
