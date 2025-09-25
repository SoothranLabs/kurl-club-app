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
      <div className="p-5 pt-6 h-full">
        <div
          className="prose prose-sm flex flex-col gap-2 prose-invert max-w-none
             prose-h1:text-2xl
             prose-p:text-white prose-p:leading-relaxed
             prose-ul:flex prose-ul:flex-col prose-ul:gap-4 prose-ul:list-none
             prose-li:list-none prose-li:text-white prose-li:font-medium prose-li:text-sm
             *:m-0 *:p-0 [&_li]:m-0 [&_li]:p-0
             [&_li]:relative [&_li]:pl-5
             [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-[4px]
             [&_li::before]:w-3 [&_li::before]:h-3 [&_li::before]:rounded-full
             [&_li::before]:border-[3px] [&_li::before]:border-primary-green-100
             [&_li::before]:bg-transparent [&_ul>li>p]:m-0 [&_ul>li>p]:p-0"
          dangerouslySetInnerHTML={{ __html: plan.details }}
        />
      </div>
    </Card>
  );
}
