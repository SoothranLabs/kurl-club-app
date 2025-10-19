'use client';

import { useState } from 'react';

import { format, subDays } from 'date-fns';
import { Download, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { AttendanceRecord } from '@/types/attendance';

import { AttendanceTableView, createAttendanceColumns } from '../table';

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
    status: 'present',
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
  {
    id: '3',
    memberId: 'M003',
    memberName: 'Mike Johnson',
    memberIdentifier: 'GYM003',
    biometricId: 'BIO003',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    status: 'absent',
    eventType: 'check-in',
    timestamp: subDays(new Date(), 1).toISOString(),
  },
  {
    id: '4',
    memberId: 'M004',
    memberName: 'Sarah Wilson',
    memberIdentifier: 'GYM004',
    biometricId: 'BIO004',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    checkInTime: '08:45',
    checkOutTime: '10:15',
    status: 'late',
    eventType: 'check-out',
    timestamp: subDays(new Date(), 1).toISOString(),
    deviceId: 'Gym Floor',
    duration: 90,
  },
];

export default function AttendanceRecords() {
  const [attendanceRecords] = useState(mockAttendanceData);

  const handleEditRecord = (record: AttendanceRecord) => {
    console.log('Edit record:', record);
  };

  const columns = createAttendanceColumns(handleEditRecord);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-medium">Attendance Records</h3>
          <p className="text-gray-400 text-sm">
            Manage and track member attendance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-2" />
            Manual Entry
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <AttendanceTableView records={attendanceRecords} columns={columns} />
    </div>
  );
}
