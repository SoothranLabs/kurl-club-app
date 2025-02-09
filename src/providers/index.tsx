'use client';

import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { GymBranchProvider } from '@/providers/gym-branch-provider';
import { DialogProvider } from '@/providers/dialog-context';
import { Toaster } from 'sonner';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <GymBranchProvider>
          <DialogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster richColors position="top-right" />
              {children}
            </ThemeProvider>
          </DialogProvider>
        </GymBranchProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
