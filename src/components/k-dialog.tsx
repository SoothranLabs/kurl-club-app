import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface KDialogProps {
  title?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  closable?: boolean;
}

const KDialog: React.FC<KDialogProps> = ({
  title,
  closable = true,
  trigger,
  children,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        closable={closable}
        className={`bg-primary-blue-500 border-secondary-blue-500 !rounded-lg max-w-full ${className}`}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default KDialog;
