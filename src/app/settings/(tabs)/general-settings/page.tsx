'use client';

import { KTabs, TabItem } from '@/components/form/k-tabs';
import { useState } from 'react';
import {
  BusinessProfileTab,
  CommunicationTab,
  OperationsTab,
  SecurityAndPrivacyTab,
} from '@/components/settings/general-settings/tabs';

export default function GeneralSettings() {
  const [activeTab, setActiveTab] = useState<string>('business_profile');

  const tabs: TabItem[] = [
    { id: 'business_profile', label: 'Business Profile' },
    { id: 'communication', label: 'Communication' },
    { id: 'operations', label: 'Operations' },
    { id: 'security_and_privacy', label: 'Security & Privacy' },
  ];

  return (
    <div className="">
      <div className="p-8 flex items-center justify-between">
        <h4 className="text-white font-medium leading-normal text-xl">
          General settings
        </h4>
      </div>
      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={setActiveTab}
        className="px-2 border-secondary-blue-500"
      />
      <div className="p-8 max-w-[960px]">
        {activeTab === 'business_profile' && <BusinessProfileTab />}
        {activeTab === 'communication' && <CommunicationTab />}
        {activeTab === 'operations' && <OperationsTab />}
        {activeTab === 'security_and_privacy' && <SecurityAndPrivacyTab />}
      </div>
    </div>
  );
}
