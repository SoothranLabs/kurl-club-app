'use client';

import * as React from 'react';
import { Users, Settings, IndianRupee, Map } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  GeneralSettings,
  Packages,
  UserManagement,
  WorkoutPlans,
} from './(tabs)';

type Tab = 'users' | 'packages' | 'workouts' | 'settings';

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
  },
  {
    id: 'packages',
    label: 'Packages',
    icon: IndianRupee,
  },
  {
    id: 'workouts',
    label: 'Workout Plans',
    icon: Map,
  },
  {
    id: 'settings',
    label: 'General Settings',
    icon: Settings,
  },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>('users');

  return (
    <div className="grid h-[calc(100vh-80px)] container grid-cols-[250px_1fr]">
      <aside className="flex flex-col border-r border-[#21262D]">
        <div className="p-8">
          <h1 className="text-2xl">Settings</h1>
        </div>
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'relative flex items-center gap-2.5 px-8 py-2.5 text-[15px] transition-colors',
                  'hover:bg-secondary-blue-500',
                  activeTab === item.id
                    ? 'bg-secondary-blue-500 text-white before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-primary-green-100'
                    : 'text-white'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    activeTab === item.id
                      ? 'text-primary-green-200'
                      : 'text-white'
                  )}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <main>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'packages' && <Packages />}
        {activeTab === 'workouts' && <WorkoutPlans />}
        {activeTab === 'settings' && <GeneralSettings />}
      </main>
    </div>
  );
};

export default SettingsPage;
