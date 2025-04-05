'use client';

import { KTabs, TabItem } from '@/components/form/k-tabs';
import { useState } from 'react';
import ConfigSettings from '@/components/settings/general-settings/config-settings';
import { GymSettings } from '@/components/settings/general-settings/gym-settings';
import { Button } from '@/components/ui/button';

export default function GeneralSettings() {
  const [activeTab, setActiveTab] = useState<string>('gym_settings');

  const tabs: TabItem[] = [
    { id: 'gym_settings', label: 'Gym settings' },
    { id: 'config', label: 'Configuration setting' },
  ];

  return (
    <div className="">
      <div className="pt-10 px-8 pb-[34px] flex items-center justify-between">
        <h4 className="text-white font-medium leading-normal text-xl">
          General settings
        </h4>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="h-[46px] rounded-lg">
            Cancel
          </Button>
          <Button className="h-[46px] rounded-lg">Save changes</Button>
        </div>
      </div>
      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={setActiveTab}
        className="px-2 border-secondary-blue-500"
      />
      <div className="p-8">
        {activeTab === 'gym_settings' ? <GymSettings /> : <ConfigSettings />}
      </div>
    </div>
  );
}
