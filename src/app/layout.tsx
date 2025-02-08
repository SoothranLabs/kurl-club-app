import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { GymBranchProvider } from '@/providers/gym-branch-provider';
import { DialogProvider } from '@/providers/dialog-context';
import { Toaster } from 'sonner';
import './globals.css';
import AppLayout from '@/components/layout/app-layout';

const figtree = localFont({
  src: [
    {
      path: '/fonts/Figtree-VariableFont_wght.ttf',
      weight: '100 900',
    },
    {
      path: '/fonts/static/Figtree-Light.ttf',
      weight: '300',
    },
    {
      path: '/fonts/static/Figtree-Regular.ttf',
      weight: '400',
    },
    {
      path: '/fonts/static/Figtree-Medium.ttf',
      weight: '500',
    },
    {
      path: '/fonts/static/Figtree-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '/fonts/static/Figtree-Bold.ttf',
      weight: '700',
    },
    {
      path: '/fonts/static/Figtree-Black.ttf',
      weight: '800',
    },
  ],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: 'Kurl Club',
  description: 'Gym App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.className} bg-background-dark antialiased`}>
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
                  <AppLayout>{children}</AppLayout>
                </ThemeProvider>
              </DialogProvider>
            </GymBranchProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
