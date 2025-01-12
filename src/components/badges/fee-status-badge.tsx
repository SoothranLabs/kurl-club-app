import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { KBadgeCheck, KBadgeClose, KBadgeFlag, KBadgeMinus } from '../icons';

interface FeeStatusBadgeProps {
  status?: 'paid' | 'partially_paid' | 'unpaid';
  days?: number;
}

export const FeeStatusBadge = ({
  status = 'paid',
  days,
}: FeeStatusBadgeProps) => {
  const isLongDay = days && days > 14 ? true : false;

  const getBadgeStyles = () => {
    if (days) {
      if (isLongDay) return 'bg-alert-red-500/10 border-alert-red-500';
      if (!isLongDay) return 'bg-semantic-blue-500/10 border-semantic-blue-500';
    }

    switch (status) {
      case 'paid':
        return 'bg-neutral-green-500/10 border-neutral-green-500';
      case 'partially_paid':
        return 'bg-neutral-ochre-600/10 border-neutral-ochre-500';
      case 'unpaid':
        return 'bg-alert-red-500/10 border-alert-red-500';
      default:
        return '';
    }
  };

  const getIcon = () => {
    if (days)
      return (
        <KBadgeFlag
          className={`${isLongDay ? 'text-alert-red-500' : 'text-semantic-blue-400'}`}
        />
      );

    switch (status) {
      case 'paid':
        return <KBadgeCheck />;
      case 'partially_paid':
        return <KBadgeMinus />;
      case 'unpaid':
        return <KBadgeClose />;
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn('rounded-[35px] h-[30px] gap-2', getBadgeStyles())}
    >
      {getIcon()}
      {(() => {
        if (days) return `${days} days`;

        switch (status) {
          case 'paid':
            return 'Paid';
          case 'partially_paid':
            return 'Partially paid';
          default:
            return 'Unpaid';
        }
      })()}
    </Badge>
  );
};
