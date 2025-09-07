'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    gradient?: boolean;
  }
>(({ className, value, gradient = false, ...props }, ref) => {
  const safeValue = value ?? 0;

  const getColor = (val: number) => {
    if (gradient) {
      return 'linear-gradient(to right, #22A311 30%, #EBFB8B 85%, #FF0000 120%)';
    }
    if (val > 75) return '#22A311';
    if (val > 50) return '#EAB308';
    if (val > 25) return '#F97316';
    if (val > 0) return '#DC2626';
    return '#DC2626';
  };

  const isOverdue = safeValue <= 0;
  const adjustedValue = isOverdue ? 8 : safeValue; // force tiny strip when overdue

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-md bg-gray-600',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full flex-1 transition-all rounded-md"
        style={{
          transform: `translateX(-${100 - adjustedValue}%)`,
          background: getColor(safeValue),
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
