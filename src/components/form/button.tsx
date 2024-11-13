// CButton.tsx
'use client';

import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ButtonType = 'primary' | 'secondary';

interface CButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  auto?: boolean;
  type?: ButtonType;
  className?: string;
}

// The main CButton component
function CButton({
  icon,
  children,
  auto = false,
  type = 'primary',
  className = '',
}: CButtonProps) {
  return (
    <Button
      className={cn(
        'px-4 py-3 font-semibold rounded-md', //TODO:do centering
        auto ? 'w-auto' : 'w-fit',
        type === 'primary'
          ? 'bg-primary-green-500 text-primary-blue-500'
          : 'bg-secondary-blue-500 text-primary-green-500',
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
}

export default CButton;
