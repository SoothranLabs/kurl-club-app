'use client';

import { KTabs, TabItem } from '@/components/form/k-tabs';
import React, { useState } from 'react';
import Header from './header';
import Permissions from './permissions';

export default function Contents() {
  const [activeTab, setActiveTab] = useState<string>('roles');

  const tabs: TabItem[] = [
    { id: 'roles', label: 'Roles & permissions' },
    { id: 'members', label: 'Assigned members' },
  ];

  return (
    <div className="w-full">
      <Header />
      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={setActiveTab}
        className="px-2 border-secondary-blue-500"
      />
      <div className="p-8">
        {activeTab === 'roles' ? <Permissions /> : 'Table'}
      </div>
    </div>
  );
}
