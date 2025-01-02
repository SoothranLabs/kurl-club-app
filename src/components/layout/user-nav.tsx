'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut, Settings, User } from 'lucide-react';

import { logout } from '@/services/auth/actions';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function UserNav() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/assets/svg/gym-dp.svg" alt="Profile picture" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-secondary-blue-700/80 backdrop-blur-xl border border-primary-blue-400 text-white"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary-blue-400" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="shad-drop-item">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <Link href="/settings">
            <DropdownMenuItem className="shad-drop-item">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary-blue-400" />
        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            'text-alert-red-500 shad-drop-item',
            isPending && 'opacity-50 pointer-events-none'
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isPending ? 'Logging out...' : 'Log out'}</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
