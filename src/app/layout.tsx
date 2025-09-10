import type { Metadata } from 'next';
import localFont from 'next/font/local';

import AppLayout from '@/components/shared/layout/app-layout';
import { AppProviders } from '@/providers';

import './globals.css';

const figtree = localFont({
  src: [
    { path: '/fonts/Figtree-VariableFont_wght.ttf', weight: '100 900' },
    { path: '/fonts/static/Figtree-Light.ttf', weight: '300' },
    { path: '/fonts/static/Figtree-Regular.ttf', weight: '400' },
    { path: '/fonts/static/Figtree-Medium.ttf', weight: '500' },
    { path: '/fonts/static/Figtree-SemiBold.ttf', weight: '600' },
    { path: '/fonts/static/Figtree-Bold.ttf', weight: '700' },
    { path: '/fonts/static/Figtree-Black.ttf', weight: '800' },
  ],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: 'Kurl Club',
  description: 'Gym App',
  icons: {
    icon: '/kurl-club.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.className} bg-background-dark antialiased`}>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
