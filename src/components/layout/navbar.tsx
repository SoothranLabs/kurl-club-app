'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, LogOut, Menu, Settings, User, X } from 'lucide-react';
import { UserNav } from './user-nav';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function Navbar() {
  const [isActive, setActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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
    },
  ];

  return (
    <>
      <div className="w-full border-b-[1px] border-secondary-blue-500 bg-primary-blue-500 h-20 sticky top-0 z-50">
        <div className="container py-5 h-full grid sm:grid-cols-[3fr_1fr] lg:grid-cols-[1.6fr_1fr]">
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
              {navLink.map((link) => (
                <Link href={link.url} key={link.id}>
                  <li
                    className={`rounded-[35px] h-[35px] cursor-pointer py-2 px-3 text-whites text-[15px] font-normal capitalize ${
                      pathname === link.url ||
                      pathname.startsWith(`${link.url}/`)
                        ? 'text-primary-blue-900 bg-primary-green-100'
                        : ''
                    }`}
                  >
                    {link.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4 md:gap-6 justify-end">
            <div className="flex items-center gap-[14px]">
              <span className="w-8 h-8 cursor-pointer flex items-center justify-center">
                <Bell size={20} />
              </span>
            </div>
            <UserNav />
            <span
              onClick={() => setActive(true)}
              className="w-10 h-10 flex justify-center items-center md:hidden"
            >
              <Menu size={30} />
            </span>
          </div>
        </div>
      </div>
      {/* responsive */}
      <div
        className={`h-screen max-w-[400px] w-full fixed top-0 right-0 md:hidden bg-primary-blue-700 z-[100] transform transition-transform duration-300 flex flex-col pt-7  gap-8
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
            <AccordionTrigger className="[&>svg]:hidden py-2 hover:bg-primary-green-500 hover:bg-primary-blue-500under data-[state=open]:bg-primary-green-500 data-[state=open]:text-primary-blue-500 px-2 rounded-md !no-underline">
              Dashboard
            </AccordionTrigger>
          </AccordionItem>

          {/* Payment Section */}
          <AccordionItem value="payment" className="border-0 mt-3">
            <AccordionTrigger className="py-2 hover:bg-primary-green-500 hover:bg-primary-blue-500under data-[state=open]:bg-primary-green-500 data-[state=open]:text-primary-blue-500 px-2 rounded-md !no-underline">
              Payment
            </AccordionTrigger>
            <AccordionContent className="pb-0 py-2">
              <ul className="ml-4 text-sm flex flex-col gap-1 text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer p-2 rounded-md hover:bg-primary-blue-400 text-primary-green-500">
                  abc
                </li>
                <li className="hover:text-foreground cursor-pointer p-2 rounded-md hover:bg-primary-blue-400">
                  cde
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Settings Section */}
          <AccordionItem value="settings" className="border-0 mt-3">
            <AccordionTrigger className="py-2 hover:bg-primary-green-500 hover:text-primary-blue-500 data-[state=open]:bg-primary-green-500 data-[state=open]:text-primary-blue-500 px-2 rounded-md !no-underline">
              Settings
            </AccordionTrigger>
            <AccordionContent className="pb-0 py-2">
              <ul className="ml-4 flex flex-col text-sm text-muted-foreground gap-1">
                <li className="hover:text-foreground cursor-pointer p-2 rounded-md hover:bg-primary-blue-400">
                  zyx
                </li>
                <li className="hover:text-foreground cursor-pointer p-2 rounded-md hover:bg-primary-blue-400">
                  xyz
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
            <span>
              <User size={20} />
            </span>
            <span>
              <Settings size={20} />
            </span>
            <span>
              <LogOut size={20} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
