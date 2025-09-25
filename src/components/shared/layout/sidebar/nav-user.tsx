'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';
import { useAuth } from '@/providers/auth-provider';

export function NavUser() {
  const router = useRouter();
  const { logout, appUser, gymDetails } = useAuth();
  const [isPending, startTransition] = useTransition();
  const { showConfirm } = useAppDialog();
  const { state } = useSidebar();

  const handleLogout = () => {
    showConfirm({
      title: 'Confirm Logout',
      description: 'Are you sure you want to log out of your account?',
      variant: 'destructive',
      confirmLabel: 'Logout',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        startTransition(() => {
          logout()
            .then(() => {
              router.push('/auth/login');
              toast.success('Logged out successfully!');
            })
            .catch((error) => {
              toast.error('Failed to log out. Please try again.');
              console.error('Logout error:', error);
            });
        });
      },
    });
  };

  const gymList = appUser?.gyms || [];
  const currentGym =
    gymDetails ||
    (gymList.length > 0
      ? {
          gymName: gymList[0].gymName,
          id: gymList[0].gymId,
          location: gymList[0].gymLocation,
          gymIdentifier: gymList[0].gymIdentifier,
        }
      : null);

  const avatarStyle = getAvatarColor(currentGym?.gymName || 'KC');

  if (state === 'collapsed') {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default">
            <Avatar className="h-8 w-8 rounded-lg border border-sidebar-border">
              <AvatarImage src="" alt={currentGym?.gymName || 'User'} />
              <AvatarFallback
                className="rounded-lg font-semibold text-sm"
                style={avatarStyle}
              >
                {currentGym ? getInitials(currentGym.gymName) : 'KC'}
              </AvatarFallback>
            </Avatar>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            disabled={isPending}
            tooltip="Logout"
          >
            <LogOut className="h-5 w-5" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-3 p-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 rounded-lg border border-sidebar-border">
              <AvatarImage src="" alt={currentGym?.gymName || 'User'} />
              <AvatarFallback
                className="rounded-lg font-semibold text-sm"
                style={avatarStyle}
              >
                {currentGym ? getInitials(currentGym.gymName) : 'KC'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left leading-tight">
              <div className="truncate font-semibold text-sm">
                {currentGym?.gymName || 'No Gym Selected'}
              </div>
              <div className="truncate text-xs text-sidebar-foreground/60">
                {currentGym ? `#${currentGym.gymIdentifier}` : ''}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isPending}
            className="w-full justify-start gap-2 bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            {isPending ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
