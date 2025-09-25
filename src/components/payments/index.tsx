'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { KTabs, TabItem } from '@/components/shared/form/k-tabs';
import { useGymFormOptions } from '@/hooks/use-gymform-options';
import { useGymBranch } from '@/providers/gym-branch-provider';

import { PaymentsTab } from './payments-tab';

const TABS: TabItem[] = [
  { id: 'outstanding-payments', label: 'Outstanding Payments' },
  { id: 'expired-payments', label: 'Expired Payments' },
  { id: 'completed-payments', label: 'Completed' },
  { id: 'history', label: 'History' },
];

export default function Payments() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { gymBranch } = useGymBranch();
  const { formOptions } = useGymFormOptions(gymBranch?.gymId);

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
      <div className="px-4 py-5 md:p-8 flex items-center justify-between">
        <h4 className="text-white font-medium leading-normal text-xl">
          Payments
        </h4>
      </div>

      <KTabs
        items={TABS}
        variant="underline"
        value={activeTab}
        onTabChange={handleTabChange}
        className="p-0 md:px-2 border-secondary-blue-500"
      />

      <div className="px-4 py-5 md:p-8 max-w-[calc(100vw-200px)] md:max-w-[calc(100vw-250px)]">
        {
          {
            'outstanding-payments': (
              <PaymentsTab type="outstanding" formOptions={formOptions} />
            ),
            'expired-payments': (
              <PaymentsTab type="expired" formOptions={formOptions} />
            ),
            'completed-payments': (
              <PaymentsTab type="completed" formOptions={formOptions} />
            ),
            history: <PaymentsTab type="history" formOptions={formOptions} />,
          }[activeTab]
        }
      </div>
    </div>
  );
}
