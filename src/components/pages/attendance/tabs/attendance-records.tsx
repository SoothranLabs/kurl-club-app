'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import { Download, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { AttendanceRecord } from '@/types/attendance';

import { BaseTable, createAttendanceColumns } from '../table';

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
  const [attendanceRecords] = useState(mockAttendanceData);

  const handleEditRecord = (record: AttendanceRecord) => {
    console.log('Edit record:', record);
  };

  const columns = createAttendanceColumns(handleEditRecord);

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
          <h3 className="text-white text-lg font-medium">Visit Records</h3>
          <p className="text-gray-400 text-sm">
            Track member visits and gym usage patterns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-1" />
            Manual Check-in
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-1" />
            Export Data
          </Button>
        </div>
      </div>

      <BaseTable data={attendanceRecords} columns={columns} filters={filters} />
    </div>
  );
}
