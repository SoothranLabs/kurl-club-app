'use client';

import { useState } from 'react';

import { format } from 'date-fns';

import { Switch } from '@/components/ui/switch';
import type { AttendanceRecord } from '@/types/attendance';

import { AttendanceConfirmationDialog } from '../attendance-confirmation-dialog';
import { MemberSearchCommand } from '../member-search-command';
import {
  AttendanceTableView,
  attendanceColumns,
  manualModeColumns,
} from '../table';

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: '1',
    memberId: 'M001',
    memberName: 'John Doe',
    memberIdentifier: 'GYM001',
    biometricId: 'BIO001',
    date: format(new Date(), 'yyyy-MM-dd'),
    checkInTime: '06:30',
    checkOutTime: '08:00',
    status: 'checked-out',
    eventType: 'check-out',
    timestamp: new Date().toISOString(),
    deviceId: 'Main Entrance',
    duration: 90,
  },
  {
    id: '2',
    memberId: 'M002',
    memberName: 'Jane Smith',
    memberIdentifier: 'GYM002',
    biometricId: 'BIO002',
    date: format(new Date(), 'yyyy-MM-dd'),
    checkInTime: '07:15',
    status: 'checked-in',
    eventType: 'check-in',
    timestamp: new Date().toISOString(),
    deviceId: 'Main Entrance',
  },
];

export default function AttendanceRecords() {
  const [attendanceRecords, setAttendanceRecords] =
    useState(mockAttendanceData);
  const [isManualMode, setIsManualMode] = useState(() => {
    const saved = localStorage.getItem('attendance-manual-mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [checkedInMembers, setCheckedInMembers] = useState<Set<string>>(
    new Set(['M002'])
  );
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    member: { name: string; identifier: string } | null;
    action: 'checkin' | 'checkout';
    time: string;
  }>({ open: false, member: null, action: 'checkin', time: '' });

  const handleManualModeToggle = (checked: boolean) => {
    setIsManualMode(checked);
    localStorage.setItem('attendance-manual-mode', JSON.stringify(checked));
  };

  const handleCheckIn = (member: {
    id: string;
    name: string;
    identifier: string;
  }) => {
    const newRecord: AttendanceRecord = {
      id: `${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      memberIdentifier: member.identifier,
      date: format(new Date(), 'yyyy-MM-dd'),
      checkInTime: format(new Date(), 'HH:mm'),
      status: 'checked-in',
      eventType: 'check-in',
      timestamp: new Date().toISOString(),
      deviceId: 'Manual',
    };
    setAttendanceRecords([newRecord, ...attendanceRecords]);
    setCheckedInMembers(new Set(checkedInMembers).add(member.id));
    setConfirmDialog({
      open: true,
      member: { name: member.name, identifier: member.identifier },
      action: 'checkin',
      time: format(new Date(), 'h:mm a'),
    });
  };

  const handleCheckOut = (member: {
    id: string;
    name: string;
    identifier: string;
  }) => {
    setAttendanceRecords(
      attendanceRecords.map((record) => {
        if (record.memberId === member.id && record.status === 'checked-in') {
          const checkInTime = new Date(`${record.date} ${record.checkInTime}`);
          const checkOutTime = new Date();
          const duration = Math.floor(
            (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)
          );
          return {
            ...record,
            checkOutTime: format(checkOutTime, 'HH:mm'),
            status: 'checked-out' as const,
            eventType: 'check-out' as const,
            duration,
          };
        }
        return record;
      })
    );
    const newCheckedIn = new Set(checkedInMembers);
    newCheckedIn.delete(member.id);
    setCheckedInMembers(newCheckedIn);
    setConfirmDialog({
      open: true,
      member: { name: member.name, identifier: member.identifier },
      action: 'checkout',
      time: format(new Date(), 'h:mm a'),
    });
  };

  const handleQuickCheckOut = (memberId: string) => {
    setAttendanceRecords(
      attendanceRecords.map((record) => {
        if (record.memberId === memberId && record.status === 'checked-in') {
          const checkInTime = new Date(`${record.date} ${record.checkInTime}`);
          const checkOutTime = new Date();
          const duration = Math.floor(
            (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)
          );
          return {
            ...record,
            checkOutTime: format(checkOutTime, 'HH:mm'),
            status: 'checked-out' as const,
            eventType: 'check-out' as const,
            duration,
          };
        }
        return record;
      })
    );
    const newCheckedIn = new Set(checkedInMembers);
    newCheckedIn.delete(memberId);
    setCheckedInMembers(newCheckedIn);
    const member = attendanceRecords.find((r) => r.memberId === memberId);
    if (member) {
      setConfirmDialog({
        open: true,
        member: {
          name: member.memberName,
          identifier: member.memberIdentifier,
        },
        action: 'checkout',
        time: format(new Date(), 'h:mm a'),
      });
    }
  };

  const filters = [
    {
      columnId: 'status',
      title: 'Status',
      options: [
        { label: 'Checked In', value: 'checked-in' },
        { label: 'Checked Out', value: 'checked-out' },
        { label: 'Present', value: 'present' },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900 dark:text-white text-lg font-medium">
            Visit Records
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Track member visits and gym usage patterns
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isManualMode && (
            <MemberSearchCommand
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              checkedInMembers={checkedInMembers}
            />
          )}
          <div className="flex items-center gap-2">
            <Switch
              checked={isManualMode}
              onCheckedChange={handleManualModeToggle}
              className="data-[state=checked]:bg-primary-green-500"
            />
            <span className="text-sm text-gray-900 dark:text-white">
              Manual Mode
            </span>
          </div>
        </div>
      </div>

      <AttendanceTableView
        records={attendanceRecords}
        columns={
          isManualMode
            ? manualModeColumns(handleQuickCheckOut)
            : attendanceColumns
        }
        filters={filters}
      />

      <AttendanceConfirmationDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        member={confirmDialog.member}
        action={confirmDialog.action}
        time={confirmDialog.time}
      />
    </div>
  );
}
