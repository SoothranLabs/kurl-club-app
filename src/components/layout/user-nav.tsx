'use client';
import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Check, LogOut, Plus, Settings, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, getInitials } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';

export function UserNav() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
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
  };

  const gymList = [
    {
      key: 1,
      avatar: '/assets/svg/gym-dp.svg',
      name: 'Gold’s Gym',
      gymId: '#go2224',
    },
    // {
    //   key: 2,
    //   avatar: '',
    //   name: 'Monolith gym',
    //   gymId: '#go2225',
    // },
    // {
    //   key: 3,
    //   avatar: '',
    //   name: 'Smart gym',
    //   gymId: '#go2226',
    // },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hidden md:flex"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="/assets/svg/gym-dp.svg" alt="Profile picture" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[292px] bg-secondary-blue-700 border border-secondary-blue-400 text-white p-0"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="flex gap-3 items-center bg-secondary-blue-500 p-6">
          <Avatar className="h-10 w-h-10">
            <AvatarImage src="/assets/svg/gym-dp.svg" alt="Profile picture" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h6 className="text-[20px] font-medium leading-normal text-white">
              Gold’s Gym
            </h6>
            <p className="text-[15px] font-normal leading-normal text-primary-blue-100">
              #go2224
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2.5 px-4 h-[44px] cursor-pointer hover:bg-secondary-blue-800 k-transition">
            <User className="mr-2.5 !h-6 !w-6" />
            <span className="text-white font-semibold text-xs leading-normal">
              Profile
            </span>
          </DropdownMenuItem>
          <Link href="/settings">
            <DropdownMenuItem className="py-2.5 px-4 h-[44px] cursor-pointer hover:bg-secondary-blue-800 k-transition">
              <Settings className="mr-2.5 !h-6 !w-6" />
              <span className="text-white font-semibold text-xs leading-normal">
                Settings
              </span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary-blue-400 my-[6px]" />

        <DropdownMenuGroup>
          {gymList.map((gym, index) => (
            <DropdownMenuItem
              key={gym.key}
              className="py-2.5 px-4 h-[54px] cursor-pointer hover:bg-secondary-blue-800 k-transition justify-between"
            >
              <div className="flex items-center gap-3 mr-2">
                <Avatar className="h-[32px] w-[32px] bg-secondary-blue-500">
                  <AvatarImage src={gym.avatar} alt="Profile picture" />
                  <AvatarFallback>{getInitials(gym.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h6 className="text-white font-normal text-[15px] leading-normal">
                    {gym.name}
                  </h6>
                  <p className="text-sm text-primary-blue-100 font-semibold leading-normal">
                    {gym.gymId}
                  </p>
                </div>
              </div>
              {index === 0 && (
                <Check className="!h-6 !w-6 text-primary-green-500" />
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem className="p-4 cursor-pointer hover:bg-secondary-blue-800 k-transition">
            <Plus className="mr-3 !h-6 !w-6" />
            <span className="text-white font-semibold text-sm leading-normal">
              Add account
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary-blue-400 py-0" />
        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            'p-4 cursor-pointer hover:bg-secondary-blue-800 k-transition',
            isPending && 'opacity-50 pointer-events-none'
          )}
        >
          <LogOut className="mr-3 !h-6 !w-6" />
          <span className="text-white font-semibold text-sm leading-normal">
            {isPending ? 'Logging out...' : 'Logout'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
