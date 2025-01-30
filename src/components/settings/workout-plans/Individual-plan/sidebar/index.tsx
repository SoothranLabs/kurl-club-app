'use client';

import { Breadcrumb } from '@/components/breadcrumbs';
import { Search } from '@/components/search';
import React, { useEffect, useState } from 'react';
import UserCard from './user-card';
import { usePathname } from 'next/navigation';
import { User } from '@/types/user';

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeUserId, setActiveUserId] = React.useState<string | null>(null);
  const handleUserClick = (userId: string) => {
    setActiveUserId(userId);
  };

  const pathname = usePathname();
  const segments = pathname.split('/');
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const pageTitle = capitalizeFirstLetter(
    segments[segments.length - 1].replace(/-/g, ' ')
  );

  const users: User[] = [
    {
      name: 'Alice',
      user_id: '#A1234',
      package: 'Monthly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    { name: 'Bob', user_id: '#B5678', package: 'Quarterly' },
    {
      name: 'Charlie',
      user_id: '#C9101',
      package: 'Yearly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    {
      name: 'David',
      user_id: '#D1121',
      package: 'Monthly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    { name: 'Arjun Verma', user_id: '#E3141', package: 'Quarterly' },
    {
      name: 'Frank',
      user_id: '#F5161',
      package: 'Yearly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    { name: 'Grace', user_id: '#G7181', package: 'Monthly' },
    {
      name: 'Hank',
      user_id: '#H9202',
      package: 'Quarterly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    {
      name: 'Ivy',
      user_id: '#I1222',
      package: 'Yearly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    { name: 'Jack Arjun Verma', user_id: '#J3242', package: 'Monthly' },
    {
      name: 'Kara',
      user_id: '#K5262',
      package: 'Quarterly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    {
      name: 'Leo',
      user_id: '#L7282',
      package: 'Yearly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
    {
      name: 'Mona',
      user_id: '#M9303',
      package: 'Monthly',
      picture: '/assets/svg/Trainer-pic.svg',
    },
  ];

  useEffect(() => {
    setActiveUserId(users[0].user_id);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border-r sticky left-0 top-[80px] border-secondary-blue-500 min-w-[336px] max-w-[336px] pb-8 h-[calc(100vh-80px)] bg-primary-blue-500 overflow-y-auto">
      <div className="p-8 pb-4 sticky top-0 bg-primary-blue-500 z-10">
        <Breadcrumb
          items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Workout plans' },
          ]}
        />
        <h5 className="mt-2 text-white text-2xl font-medium leading-normal">
          {pageTitle}
        </h5>

        <Search
          className="h-10 mt-8"
          onSearch={(value) => setSearchQuery(value)}
        />
      </div>

      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              onClick={handleUserClick}
              key={user.user_id}
              user={user}
              active={activeUserId === user.user_id}
            />
          ))
        ) : (
          <p className="text-white text-center mt-4 text-[14px] font-medium leading-normal">
            No users found!
          </p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
