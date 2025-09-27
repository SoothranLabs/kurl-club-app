'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="cursor-pointer hover:bg-sidebar-accent/50 transition-all duration-200 group relative justify-center"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8 rounded-xl border-2 border-sidebar-border/30 shadow-md group-hover:border-sidebar-accent/50 transition-colors">
                    <AvatarImage src="" alt={currentGym?.gymName || 'User'} />
                    <AvatarFallback
                      className="rounded-xl font-semibold text-sm bg-gradient-to-br from-sidebar-accent/20 to-sidebar-accent/10"
                      style={avatarStyle}
                    >
                      {currentGym ? getInitials(currentGym.gymName) : 'KC'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-accent shadow-sm" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-background-dark/95 backdrop-blur-md border border-sidebar-border/50 shadow-xl rounded-xl"
              align="end"
              side="right"
              sideOffset={8}
            >
              <DropdownMenuLabel className="text-sidebar-foreground p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-xl border-2 border-sidebar-border/30">
                    <AvatarImage src="" alt={currentGym?.gymName || 'User'} />
                    <AvatarFallback
                      className="rounded-xl font-semibold text-sm"
                      style={avatarStyle}
                    >
                      {currentGym ? getInitials(currentGym.gymName) : 'KC'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">
                      {currentGym?.gymName || 'No Gym Selected'}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60">
                      {currentGym
                        ? `#${currentGym.gymIdentifier}`
                        : 'Select a gym'}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-sidebar-border/30 mx-2" />
              <div className="p-2">
                <DropdownMenuItem
                  onClick={() =>
                    router.push('/general-settings?tab=business_profile')
                  }
                  className="cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent/20 rounded-lg px-3 py-2 transition-colors"
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isPending}
                  className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg px-3 py-2 transition-colors mt-1"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  {isPending ? 'Logging out...' : 'Logout'}
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sidebar-accent/5 to-sidebar-accent/10 border border-sidebar-border/30 backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-4">
            {/* User Info Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 rounded-xl border-2 border-sidebar-border/50 shadow-lg">
                  <AvatarImage src="" alt={currentGym?.gymName || 'User'} />
                  <AvatarFallback
                    className="rounded-xl font-semibold text-sm"
                    style={avatarStyle}
                  >
                    {currentGym ? getInitials(currentGym.gymName) : 'KC'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-sidebar-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-semibold text-sm text-sidebar-foreground">
                  {currentGym?.gymName || 'No Gym Selected'}
                </div>
                <div className="truncate text-xs text-sidebar-foreground/60">
                  {currentGym ? `#${currentGym.gymIdentifier}` : 'Select a gym'}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              disabled={isPending}
              className="w-full h-8 text-xs"
            >
              <LogOut className="h-3 w-3 mr-1" />
              {isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar-accent/5 to-transparent pointer-events-none" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
