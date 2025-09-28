import { Card, CardFooter } from '@/components/ui/card';
import type { MembershipPlan } from '@/types/membership-plan';

interface WorkoutCardProps {
  plan: MembershipPlan;
  onClick: () => void;
}

export function MembershipCard({ plan, onClick }: WorkoutCardProps) {
  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-primary-green-500/10 border border-white/5 hover:border-primary-green-500/30 bg-gradient-to-br from-secondary-blue-500 to-secondary-blue-600 overflow-hidden h-72 sm:h-80 backdrop-blur-sm flex flex-col"
      onClick={onClick}
    >
      {/* Header */}
      <div className="relative p-3 sm:p-4 bg-gradient-to-r from-primary-green-500/10 to-transparent border-b border-white/5 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-semibold text-base sm:text-lg leading-tight group-hover:text-primary-green-200 transition-colors duration-300 flex-1">
              {plan.planName}
            </h3>
            <span className="text-primary-green-100 text-xs bg-primary-green-500/20 px-2 py-1 rounded-full shrink-0">
              {plan.durationInDays} days
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-primary-green-200 font-bold text-xl sm:text-2xl tracking-tight">
              ₹{new Intl.NumberFormat('en-IN').format(Number(plan.fee))}
            </span>
            <span className="text-white/60 text-xs font-medium">
              /
              {Number(plan.durationInDays) <= 7
                ? 'week'
                : Number(plan.durationInDays) <= 31
                  ? 'month'
                  : 'period'}
            </span>
          </div>
        </div>
      </div>

      {/* Content with preserved prose styling */}
      <div className="p-3 sm:p-4 flex-1 relative overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
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
      </div>

      <CardFooter className="p-2 sm:p-3 mt-auto shrink-0 border-t border-white/5">
        <span className="text-white/40 text-xs group-hover:text-primary-green-200/60 transition-colors duration-300 mx-auto font-medium">
          Click to edit
        </span>
      </CardFooter>
    </Card>
  );
}
