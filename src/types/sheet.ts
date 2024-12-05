import { ReactNode } from 'react';

export interface SheetProps {
  title?: string;
  description?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'top' | 'right' | 'bottom' | 'left';
  onOpenChange?: (open: boolean) => void;
}

export interface UseSheetProps {
  defaultOpen?: boolean;
}

export interface UseSheetReturn {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}
