import { Check, Minus, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FeeStatusBadgeProps {
  status: 'paid' | 'partially_paid' | 'unpaid';
}

export const FeeStatusBadge = ({ status }: FeeStatusBadgeProps) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'paid':
        return 'bg-neutral-green-500/10 text-neutral-green-700 border-neutral-green-500';
      case 'partially_paid':
        return 'bg-neutral-ochre-600/10 text-neutral-ochre-700 border-neutral-ochre-500';
      case 'unpaid':
        return 'bg-alert-red-500/10 text-alert-red-700 border-alert-red-500';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'paid':
        return <Check className="mr-1 h-3 w-3" />;
      case 'partially_paid':
        return <Minus className="mr-1 h-3 w-3" />;
      case 'unpaid':
        return <AlertCircle className="mr-1 h-3 w-3" />;
    }
  };

  return (
    <Badge variant="outline" className={cn('rounded-[30px]', getBadgeStyles())}>
      {getIcon()}
      {status === 'paid'
        ? 'Paid'
        : status === 'partially_paid'
          ? 'Partially paid'
          : 'Unpaid'}
    </Badge>
  );
};
