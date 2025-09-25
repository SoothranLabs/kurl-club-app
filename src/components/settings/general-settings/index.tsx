'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  BusinessProfileTab,
  CommunicationTab,
  OperationsTab,
  SecurityAndPrivacyTab,
} from '@/components/settings/general-settings/tabs';
import { KTabs, TabItem } from '@/components/shared/form/k-tabs';

const tabs: TabItem[] = [
  { id: 'business_profile', label: 'Business Profile' },
  { id: 'communication', label: 'Communication' },
  { id: 'operations', label: 'Operations' },
  { id: 'security_and_privacy', label: 'Security & Privacy' },
];

export default function GeneralSettings() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultTab = 'business_profile';
  const queryTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(
    tabs.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    router.push(url.toString(), { scroll: false });
  };

  useEffect(() => {
    if (queryTab !== activeTab) {
      setActiveTab(
        tabs.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

  return (
    <div className="rounded-[12px] bg-background-dark h-full">
      <div className="p-8 flex items-center justify-between">
        <h4 className="text-white font-medium leading-normal text-xl">
          General settings
        </h4>
      </div>
      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={handleTabChange}
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
