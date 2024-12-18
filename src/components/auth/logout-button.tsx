'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/services/actions/auth';
import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout().then(() => {
        router.push('/auth/login');
        toast.success('Logged out successfully!');
      });
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
};
