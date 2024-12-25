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
  footer,
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
        <SheetHeader className="border-b-[1px] border-primary-blue-400 px-5 py-[30px] sticky top-0 z-20 bg-secondary-blue-700 h-[80px]">
          {title && (
            <SheetTitle className="text-xl font-medium text-white leading-normal ">
              {title}
            </SheetTitle>
          )}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="px-5 pt-10 pb-5">{children}</div>
        {footer && (
          <div className="flex h-[80px] justify-end sticky bottom-0 bg-secondary-blue-700 px-3 py-4 z-20 border-t-[1px] border-primary-blue-400">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
