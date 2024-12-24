'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SheetProps } from '@/types/sheet';

export const KSheet = ({
  title,
  description,
  children,
  isOpen,
  onClose,
  position = 'right',
  className,
}: SheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side={position}
        className={`overflow-y-auto bg-secondary-blue-700 border-primary-blue-400 border p-0 !max-w-full ${className}`}
      >
        <SheetHeader className="border-b border-primary-blue-400 px-5 py-6">
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="px-5 py-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
};
