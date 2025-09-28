'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  BusinessProfileTab,
  CommunicationTab,
  OperationsTab,
  SecurityAndPrivacyTab,
} from '@/components/pages/general-settings/tabs';
import { TabItem } from '@/components/shared/form/k-tabs';
import { StudioLayout } from '@/components/shared/layout';

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
    if (!queryTab && activeTab === defaultTab) {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', defaultTab);
      router.replace(url.toString(), { scroll: false });
    } else if (queryTab !== activeTab) {
      setActiveTab(
        tabs.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

  return (
    <StudioLayout
      title="General Settings"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      maxContentWidth="wide"
    >
      <div className="max-w-4xl">
        {activeTab === 'business_profile' && <BusinessProfileTab />}
        {activeTab === 'communication' && <CommunicationTab />}
        {activeTab === 'operations' && <OperationsTab />}
        {activeTab === 'security_and_privacy' && <SecurityAndPrivacyTab />}
      </div>
    </StudioLayout>
  );
}
