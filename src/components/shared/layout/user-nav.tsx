'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LogOut, Settings, User } from 'lucide-react';

import { GymRequiredGuard } from '@/components/shared/guards';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { fetchGymProfilePicture } from '@/services/gym';

interface UserNavProps {
  handleLogout?: () => void;
}

export function UserNav({ handleLogout }: UserNavProps) {
  const { appUser, gymDetails } = useAuth();

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
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (currentGym?.id) {
      try {
        const response = fetchGymProfilePicture(currentGym.id);
        if (response && typeof response === 'object' && 'data' in response) {
          setProfilePictureUrl((response as { data: string }).data);
        } else {
          setProfilePictureUrl(null);
        }
      } catch {
        setProfilePictureUrl(null);
      }
    }
  }, [currentGym?.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hidden md:flex cursor-pointer"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={profilePictureUrl || undefined}
              alt="Profile picture"
            />
            <AvatarFallback className="font-medium" style={avatarStyle}>
              {currentGym ? getInitials(currentGym.gymName) : 'KC'}
            </AvatarFallback>
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
            <AvatarImage
              src={profilePictureUrl || undefined}
              alt="Profile picture"
            />
            <AvatarFallback className="font-medium" style={avatarStyle}>
              {currentGym ? getInitials(currentGym.gymName) : 'KC'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h6 className="text-lg font-medium leading-normal text-white">
              {currentGym?.gymName || 'No Gym Selected'}
            </h6>
            <div className="bg-primary-green-100/50 w-fit px-2.5 py-0.5 rounded-md">
              <p className="text-sm font-normal leading-normal text-primary-blue-500">
                {currentGym ? `#${currentGym.gymIdentifier}` : ''}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <GymRequiredGuard>
          <DropdownMenuGroup>
            <Link href="/settings/general-settings?tab=business_profile">
              <DropdownMenuItem className="py-2.5 px-4 h-[44px] cursor-pointer hover:bg-secondary-blue-800 k-transition">
                <User className="mr-2.5 h-6! w-6!" />
                <span className="text-white font-semibold text-xs leading-normal">
                  Profile
                </span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings/staff-management">
              <DropdownMenuItem className="py-2.5 px-4 h-[44px] cursor-pointer hover:bg-secondary-blue-800 k-transition">
                <Settings className="mr-2.5 h-6! w-6!" />
                <span className="text-white font-semibold text-xs leading-normal">
                  Settings
                </span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </GymRequiredGuard>
        <DropdownMenuSeparator className="bg-primary-blue-400 my-[6px]" />

        {/* <DropdownMenuGroup>
          {gymList.map((gym, index) => (
            <DropdownMenuItem
              key={gym.gymId}
              className="py-2.5 px-4 h-[54px] cursor-pointer hover:bg-secondary-blue-800 k-transition justify-between"
            >
              <div className="flex items-center gap-3 mr-2">
                <Avatar className="h-[32px] w-[32px] bg-secondary-blue-500">
                  <AvatarImage
                    src="/assets/svg/gym-dp.svg"
                    alt="Profile picture"
                  />
                  <AvatarFallback>{getInitials(gym.gymName)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h6 className="text-white font-normal text-[15px] leading-normal">
                    {gym.gymName}
                  </h6>
                  <p className="text-sm text-primary-blue-100 font-semibold leading-normal">
                    #{gym.gymId}
                  </p>
                </div>
              </div>
              {index === 0 && (
                <Check className="h-6! w-6! text-primary-green-500" />
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem className="p-4 cursor-pointer hover:bg-secondary-blue-800 k-transition">
            <Plus className="mr-3 h-6! w-6!" />
            <span className="text-white font-semibold text-sm leading-normal">
              Add account
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary-blue-400 py-0" /> */}
        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            'p-4 cursor-pointer hover:bg-secondary-blue-800 k-transition'
          )}
        >
          <LogOut className="mr-3 h-6! w-6!" />
          <span className="text-white font-semibold text-sm leading-normal">
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
