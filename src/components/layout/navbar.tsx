'use client';

import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const navLink = [
    {
      id: 1,
      title: 'Dashboard',
      url: '/',
    },
    {
      id: 1,
      title: 'members',
      url: '/members',
    },
    {
      id: 1,
      title: 'Payments & attendance',
      url: '#',
    },
    {
      id: 1,
      title: 'Chats',
      url: '#',
    },
  ];

  return (
    <div className="w-full border-b-[1px] border-secondary-blue-500 bg-primary-blue-500 h-20 sticky top-0 z-50">
      <div className="container py-5 h-full grid grid-cols-[1.6fr_1fr]">
        <div className="flex justify-between items-center">
          <span
            onClick={() => {
              router.push('/');
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
          <ul className="flex items-center gap-8">
            {navLink.map((link) => (
              <Link href={link.url} key={link.id}>
                <li
                  className={`rounded-[35px] h-[35px]  cursor-pointer py-2 px-3 text-whites text-[15px] font-normal capitalize ${pathname === link.url ? 'text-primary-blue-900 bg-primary-green-100' : ''}`}
                >
                  {link.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6 justify-end">
          <div className="flex items-center gap-[14px]">
            <span className="w-8 h-8 cursor-pointer flex items-center justify-center">
              <Search size={20} />
            </span>
            <span className="w-8 h-8 cursor-pointer flex items-center justify-center">
              <Bell size={20} />
            </span>
          </div>
          <span className="cursor-pointer w-[40px] h-[40px]">
            <Image
              width={40}
              height={40}
              className="w-full h-full object-cover"
              src="/assets/svg/gym-dp.svg"
              alt="dp"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
