'use client';

import * as React from 'react';
import { Users, Settings, IndianRupee, Map } from 'lucide-react';
import {
  GeneralSettings,
  Packages,
  UserManagement,
  WorkoutPlans,
} from './(tabs)';
import { KTabs, TabItem } from '@/components/form/k-tabs';

type Tab = 'users' | 'packages' | 'workouts' | 'settings';

const navItems: TabItem[] = [
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

const TabContent = ({ activeTab }: { activeTab: Tab }) => {
  const components: Record<Tab, React.ReactNode> = {
    users: <UserManagement />,
    packages: <Packages />,
    workouts: <WorkoutPlans />,
    settings: <GeneralSettings />,
  };

  return components[activeTab];
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>('users');

  return (
    <div className="grid h-[calc(100vh-80px)] container grid-cols-[250px_1fr]">
      <aside className="flex flex-col border-r border-[#21262D]">
        <div className="p-8">
          <h1 className="text-2xl">Settings</h1>
        </div>
        <KTabs
          items={navItems}
          variant="vertical"
          value={activeTab}
          onChange={(value) => setActiveTab(value as Tab)}
        />
      </aside>
      <main>
        <TabContent activeTab={activeTab} />
      </main>
    </div>
  );
};

export default SettingsPage;
