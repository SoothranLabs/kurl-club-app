'use client';

import { useState } from 'react';

import { TabItem } from '@/components/shared/form/k-tabs';
import { StudioLayout } from '@/components/shared/layout';

import {
  AttendanceDashboard,
  AttendanceRecords,
  DeviceManagement,
  MemberAttendance,
} from './tabs';

const TABS: TabItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'records', label: 'Attendance Records' },
  { id: 'members', label: 'Member Attendance' },
  { id: 'devices', label: 'Device Management' },
];

export default function AttendanceMain() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <StudioLayout
      title="Attendance Management"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {
        {
          dashboard: <AttendanceDashboard />,
          records: <AttendanceRecords />,
          members: <MemberAttendance />,
          devices: <DeviceManagement />,
        }[activeTab]
      }
    </StudioLayout>
  );
}
