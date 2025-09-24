'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { LogOut, Menu, Settings, User, X } from 'lucide-react';
import { toast } from 'sonner';

import { GymRequiredGuard } from '@/components/shared/guards';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import KDialog from '../form/k-dialog';
import { UserNav } from './user-nav';

function Navbar() {
  const [isActive, setActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isLogout, setLogout] = useState(false);
  const { logout } = useAuth();
  const [isPending, startTransition] = useTransition();
  const navLink = [
    {
      id: 1,
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      id: 2,
      title: 'members',
      url: '/members',
    },
    {
      id: 3,
      title: 'Payments & attendance',
      url: '/payments-and-attendance',
      subUrl: '/payments-and-attendance/payments',
    },
  ];
  const routeChange = (link: string) => {
    router.push(link);
    setActive(false);
  };

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
    <>
      <div className="w-full border-b-[1px] border-secondary-blue-500 bg-primary-blue-500 md:h-20 sticky top-0 z-50">
        <div className="container py-3 md:py-5 h-full flex items-center justify-between sm:grid sm:grid-cols-[3fr_1fr] lg:grid-cols-[1.6fr_1fr]">
          <GymRequiredGuard>
            <div className="flex justify-between items-center">
              <span
                onClick={() => {
                  router.push('/dashboard');
                }}
                className="max-w-[143px] cursor-pointer max-h-[20px] min-w-[143px] min-h-[20px]"
              >
                <Image
                  width={143}
                  height={20}
                  className="w-full object-cover h-full"
                  src="/assets/svg/logo-light.svg"
                  alt="logo"
                />
              </span>
              <ul className="items-center gap-8 hidden md:flex">
                {navLink.map((link) => {
                  const isActive =
                    pathname === link.url ||
                    pathname.startsWith(`${link.url}/`) ||
                    (link.subUrl && pathname.startsWith(link.subUrl));

                  return (
                    <li key={link.id}>
                      <Link
                        href={link?.subUrl || link.url}
                        className={`rounded-[35px] h-[35px] flex items-center cursor-pointer py-2 px-3 text-whites text-[15px] font-normal capitalize 
            ${isActive ? 'text-primary-blue-900 bg-primary-green-100' : ''}`}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </GymRequiredGuard>
          <div className="flex items-center gap-4 md:gap-6 justify-end">
            {/* TODO: add notification back */}
            {/* <div className="flex items-center gap-[14px]">
              <span className="w-8 h-8 cursor-pointer flex items-center justify-center">
                <Bell size={20} />
              </span>
            </div> */}
            <UserNav handleLogout={() => setLogout(true)} />
            <span
              onClick={() => setActive(true)}
              className="w-[30px] h-[30px] flex justify-center items-center md:hidden"
            >
              <Menu size={30} />
            </span>
          </div>
        </div>
      </div>
      {/* responsive */}
      <div
        className={`h-screen max-w-[400px] w-full fixed top-0 right-0 md:hidden bg-primary-blue-700 z-[100] transform transition-transform duration-300 flex flex-col pt-7 gap-8
    ${isActive ? 'translate-x-0' : 'translate-x-[100%]'}`}
      >
        <span
          onClick={() => setActive(false)}
          className="absolute right-4 top-5 w-10 h-10 flex justify-center items-center"
        >
          <X size={30} />
        </span>
        <span
          onClick={() => {
            router.push('/dashboard');
          }}
          className="max-w-[143px] cursor-pointer max-h-[18px] min-w-[143px] min-h-[18px] ml-5"
        >
          <Image
            width={143}
            height={18}
            className="w-full object-cover h-full"
            src="/assets/svg/logo-light.svg"
            alt="logo"
          />
        </span>
        <Accordion type="single" collapsible className="w-full p-5">
          <AccordionItem value="dashboard" className="border-0">
            <AccordionTrigger
              onClick={() => routeChange('/dashboard')}
              className={cn(
                '[&>svg]:hidden py-2 px-2 rounded-md !no-underline transition-colors',
                pathname === '/dashboard' || pathname.startsWith('/dashboard')
                  ? 'bg-primary-green-500 text-primary-blue-500'
                  : ''
              )}
            >
              Dashboard
            </AccordionTrigger>
          </AccordionItem>

          {/* Payment Section */}
          <AccordionItem value="payment" className="border-0 mt-3">
            <AccordionTrigger
              onClick={() => routeChange('/members')}
              className={cn(
                'py-2 px-2 rounded-md [&>svg]:hidden !no-underline transition-colors',
                pathname === '/members' || pathname.startsWith('/members')
                  ? 'bg-primary-green-500 text-primary-blue-500'
                  : ''
              )}
            >
              Members
            </AccordionTrigger>
          </AccordionItem>

          {/* Settings Section */}
          <AccordionItem value="settings" className="border-0 mt-3">
            <AccordionTrigger
              className={cn(
                'py-2 px-2 rounded-md !no-underline transition-colors',
                pathname === '/payments-and-attendance' ||
                  pathname.startsWith('/payments-and-attendance')
                  ? 'bg-primary-green-500 text-primary-blue-500'
                  : ''
              )}
            >
              Payments and attendance
            </AccordionTrigger>
            <AccordionContent className="pb-0 py-2">
              <ul className="ml-4 flex flex-col text-sm text-muted-foreground gap-1">
                <li
                  onClick={() =>
                    routeChange('/payments-and-attendance/payments')
                  }
                  className={cn(
                    'cursor-pointer p-2 rounded-md transition-colors',
                    pathname === '/payments' || pathname.endsWith('/payments')
                      ? 'bg-primary-blue-400 text-white'
                      : 'hover:bg-primary-blue-400 hover:text-foreground'
                  )}
                >
                  Payments
                </li>
                <li
                  onClick={() =>
                    routeChange('/payments-and-attendance/attendance')
                  }
                  className={cn(
                    'cursor-pointer p-2 rounded-md transition-colors',
                    pathname === '/attendance' ||
                      pathname.endsWith('/attendance')
                      ? 'bg-primary-blue-400 text-white'
                      : 'hover:bg-primary-blue-400 hover:text-foreground'
                  )}
                >
                  Attendance
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-col gap-5 p-5 mt-auto">
          <div className="flex items-center gap-3 p-3 bg-primary-blue-400 rounded-md">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/assets/svg/gym-dp.svg" alt="Profile picture" />
              <AvatarFallback>KC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <h6 className="text-[15px] font-medium leading-normal text-white">
                Gold’s Gym
              </h6>
              <p className="text-[13px] font-normal leading-normal text-primary-blue-100">
                #go2224
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GymRequiredGuard>
              <span
                onClick={() =>
                  routeChange('/settings/general-settings?tab=business_profile')
                }
              >
                <User size={20} />
              </span>
              <span onClick={() => routeChange('/settings/staff-management')}>
                <Settings size={20} />
              </span>
            </GymRequiredGuard>
            <span
              onClick={() => {
                setLogout(true);
                setActive(false);
              }}
            >
              <LogOut size={20} />
            </span>
          </div>
        </div>
      </div>
      <KDialog
        footer={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setLogout(false)}>
              Cancel
            </Button>
            <Button
              isLoading={isPending}
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        }
        open={isLogout}
        onOpenChange={() => setLogout(false)}
        title="Are you sure?"
        className="max-w-[500px]"
      >
        Logging out will end your current session.
      </KDialog>
    </>
  );
}

export default Navbar;
