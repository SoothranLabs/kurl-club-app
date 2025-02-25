'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DialogOptions = {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type DialogContextType = {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
    null
  );

  const openDialog = (options: DialogOptions) => {
    setDialogOptions(options);
  };

  const closeDialog = () => {
    setDialogOptions(null);
  };

  const handleConfirm = () => {
    dialogOptions?.onConfirm?.();
    closeDialog();
  };

  const handleCancel = () => {
    dialogOptions?.onCancel?.();
    closeDialog();
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={!!dialogOptions} onOpenChange={closeDialog}>
        <DialogContent className="bg-secondary-blue-700 border-primary-blue-400">
          <DialogHeader>
            <DialogTitle>{dialogOptions?.title}</DialogTitle>
            <DialogDescription>{dialogOptions?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {dialogOptions?.cancelLabel && (
              <Button variant="outline" onClick={handleCancel}>
                {dialogOptions.cancelLabel}
              </Button>
            )}
            {dialogOptions?.confirmLabel && (
              <Button
                variant={
                  dialogOptions.variant === 'destructive'
                    ? 'destructive'
                    : 'default'
                }
                onClick={handleConfirm}
              >
                {dialogOptions.confirmLabel}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
