'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { KTabs, TabItem } from '@/components/form/k-tabs';
import { Expired, History, Outstanding } from '@/components/payments';

const TABS: TabItem[] = [
  { id: 'outstanding-payments', label: 'Outstanding Payments' },
  { id: 'expired-payments', label: 'Expired Payments' },
  { id: 'history', label: 'History' },
];

export default function Payments() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultTab = 'outstanding-payments';
  const queryTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(
    TABS.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
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
        TABS.some((tab) => tab.id === queryTab) ? queryTab! : defaultTab
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

  return (
    <div>
      <div className="p-8 flex items-center justify-between">
        <h4 className="text-white font-medium leading-normal text-xl">
          Payments
        </h4>
      </div>

      <KTabs
        items={TABS}
        variant="underline"
        value={activeTab}
        onTabChange={handleTabChange}
        className="px-2 border-secondary-blue-500"
      />

      <div className="p-8 max-w-[calc(100vw-342px)]">
        {
          {
            'outstanding-payments': <Outstanding />,
            'expired-payments': <Expired />,
            history: <History />,
          }[activeTab]
        }
      </div>
    </div>
  );
}
