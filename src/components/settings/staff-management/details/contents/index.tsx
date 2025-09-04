'use client';

import { KTabs, TabItem } from '@/components/form/k-tabs';
import React, { useState, useEffect } from 'react';
import { StaffType } from '@/types/staff';
import Header from './header';
import Permissions from './permissions';

export default function Contents({
  staffId,
  staffRole,
  isEditing,
  handleSave,
  toggleEdit,
}: {
  staffId: string;
  staffRole: StaffType;
  isEditing: boolean;
  handleSave: () => Promise<boolean>;
  toggleEdit: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string>(
    staffRole === 'trainer' ? 'members' : 'roles'
  );

  // Reset active tab when staff role changes
  useEffect(() => {
    setActiveTab(staffRole === 'trainer' ? 'members' : 'roles');
  }, [staffRole]);

  const tabs: TabItem[] =
    staffRole === 'trainer'
      ? [{ id: 'members', label: 'Assigned members' }]
      : [{ id: 'roles', label: 'Roles & permissions' }];

  return (
    <div className="w-full">
      <Header
        staffId={staffId}
        staffRole={staffRole}
        isEditing={isEditing}
        handleSave={handleSave}
        toggleEdit={toggleEdit}
      />
      <KTabs
        items={tabs}
        variant="underline"
        value={activeTab}
        onTabChange={setActiveTab}
        className="px-2 border-secondary-blue-500"
      />
      <div className="p-8">
        {staffRole === 'trainer' ? (
          activeTab === 'members' ? (
            'Assigned Members Table'
          ) : null
        ) : activeTab === 'roles' ? (
          <Permissions />
        ) : null}
      </div>
    </div>
  );
}
