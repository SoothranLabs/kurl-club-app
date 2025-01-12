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
import { cn } from '@/lib/utils';
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
        className="w-[405px] bg-secondary-blue-700 border border-secondary-blue-400 text-white p-0"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="flex flex-col gap-3 items-center bg-secondary-blue-500 p-6">
          <Avatar className="h-[52px] w-[52px]">
            <AvatarImage src="/assets/svg/gym-dp.svg" alt="Profile picture" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 items-center">
            <h6 className="text-[20px] font-medium leading-normal text-white">
              Gold’s Gym
            </h6>
            <p className="text-[15px] font-normal leading-normal text-primary-blue-100">
              #go2224
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem className="py-3 px-6 h-[48px] cursor-pointer hover:bg-secondary-blue-800 k-transition">
              <Settings className="mr-2.5 !h-5 !w-5" />
              <span className="text-white font-normal text-xs leading-normal">
                Settings
              </span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="py-3 px-6 h-[48px] cursor-pointer hover:bg-secondary-blue-800 k-transition">
            <User className="mr-2.5 !h-5 !w-5" />
            <span className="text-white font-normal text-xs leading-normal">
              Profile
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary-blue-400 my-3" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="py-4 pl-6 pr-[30px] h-[66px] cursor-pointer hover:bg-secondary-blue-800 k-transition justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage
                  src="/assets/svg/gym-dp.svg"
                  alt="Profile picture"
                />
                <AvatarFallback>KC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h6 className="text-white font-normal text-[15px] leading-normal">
                  Gold’s Gym
                </h6>
                <p className="text-sm text-primary-blue-100 font-semibold leading-normal">
                  #go2224
                </p>
              </div>
            </div>
            <Check className="!h-6 !w-6 text-primary-green-500" />
          </DropdownMenuItem>
          <DropdownMenuItem className="py-4 pl-6 pr-[30px] h-[66px] cursor-pointer hover:bg-secondary-blue-800 k-transition justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage
                  src="/assets/svg/gym-dp.svg"
                  alt="Profile picture"
                />
                <AvatarFallback>KC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h6 className="text-white font-normal text-[15px] leading-normal">
                  Monolith gym
                </h6>
                <p className="text-sm text-primary-blue-100 font-semibold leading-normal">
                  #go2224
                </p>
              </div>
            </div>
            {/* <Check className='!h-6 !w-6 text-primary-green-500' /> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="py-4 pl-6 pr-[30px] h-[66px] cursor-pointer hover:bg-secondary-blue-800 k-transition justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage
                  src="/assets/svg/gym-dp.svg"
                  alt="Profile picture"
                />
                <AvatarFallback>KC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h6 className="text-white font-normal text-[15px] leading-normal">
                  DMV fitness
                </h6>
                <p className="text-sm text-primary-blue-100 font-semibold leading-normal">
                  #go2224
                </p>
              </div>
            </div>
            {/* <Check className='!h-6 !w-6 text-primary-green-500' /> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3 px-6 cursor-pointer hover:bg-secondary-blue-800 k-transition">
            <Plus className="mr-2.5 !h-5 !w-5" />
            <span className="text-white font-semibold text-sm leading-normal">
              Add account
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary-blue-400 my-3" />
        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            'py-2 px-6 h-[48px] cursor-pointer hover:bg-secondary-blue-800 k-transition mb-4',
            isPending && 'opacity-50 pointer-events-none'
          )}
        >
          <LogOut className="mr-2.5 !h-5 !w-5" />
          <span className="text-white font-normal text-xs leading-normal">
            {isPending ? 'Logging out...' : 'Logout'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
