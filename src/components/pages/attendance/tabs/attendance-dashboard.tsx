'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import {
  Activity,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Wifi,
  WifiOff,
} from 'lucide-react';

import InfoCard from '@/components/shared/cards/info-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';
import type {
  AttendanceRecord,
  AttendanceStats,
  BiometricDevice,
} from '@/types/attendance';

const mockStats: AttendanceStats = {
  totalMembers: 150,
  presentToday: 45,
  absentToday: 97,
  lateToday: 8,
  onLeave: 5,
  checkedIn: 38,
  averageAttendance: 78,
};

const mockRealtimeEvents: AttendanceRecord[] = [
  {
    id: '1',
    memberId: 'M001',
    memberName: 'John Doe',
    memberIdentifier: 'GYM001',
    biometricId: 'BIO001',
    date: new Date().toISOString().split('T')[0],
    checkInTime: '09:15',
    status: 'checked-in',
    eventType: 'check-in',
    timestamp: new Date().toISOString(),
    deviceId: 'Main Entrance',
  },
  {
    id: '2',
    memberId: 'M002',
    memberName: 'Jane Smith',
    memberIdentifier: 'GYM002',
    biometricId: 'BIO002',
    date: new Date().toISOString().split('T')[0],
    checkOutTime: '10:30',
    status: 'checked-out',
    eventType: 'check-out',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    deviceId: 'Main Entrance',
    duration: 75,
  },
];

const mockDevices: BiometricDevice[] = [
  {
    id: 'DEV001',
    name: 'Main Entrance',
    ipAddress: '192.168.1.100',
    port: 4370,
    status: 'online',
    lastSeen: new Date().toISOString(),
    location: 'Reception Area',
  },
  {
    id: 'DEV002',
    name: 'Gym Floor',
    ipAddress: '192.168.1.101',
    port: 4370,
    status: 'offline',
    lastSeen: new Date(Date.now() - 300000).toISOString(),
    location: 'Main Gym Area',
  },
];

export default function AttendanceDashboard() {
  const [realtimeEvents] = useState(mockRealtimeEvents);

  const stats = [
    {
      id: 1,
      icon: <UserCheck size={20} strokeWidth={1.75} color="#151821" />,
      color: 'primary-green-500',
      title: 'Present Today',
      count: mockStats.presentToday,
    },
    {
      id: 2,
      icon: <UserX size={20} strokeWidth={1.75} color="#151821" />,
      color: 'alert-red-400',
      title: 'Absent Today',
      count: mockStats.absentToday,
    },
    {
      id: 3,
      icon: <Calendar size={20} strokeWidth={1.75} color="#151821" />,
      color: 'secondary-yellow-150',
      title: 'On Leave',
      count: mockStats.onLeave,
    },
    {
      id: 4,
      icon: <Activity size={20} strokeWidth={1.75} color="#151821" />,
      color: 'semantic-blue-500',
      title: 'Currently In',
      count: mockStats.checkedIn,
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-4 gap-4 h-[74px]">
        {stats.map((stat) => (
          <InfoCard item={stat} key={stat.id} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-secondary-blue-500 border-secondary-blue-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity size={20} />
              Live Attendance Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {realtimeEvents.map((event) => {
                const avatarStyle = getAvatarColor(event.memberName);
                const initials = getInitials(event.memberName);

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-secondary-blue-600 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback
                          className="font-medium"
                          style={avatarStyle}
                        >
                          {initials}
                        </AvatarFallback>
                        <AvatarImage src={event.profilePicture} />
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">
                          {event.memberName}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {event.memberIdentifier}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-white text-sm">
                          {event.eventType === 'check-in'
                            ? event.checkInTime
                            : event.checkOutTime}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {event.deviceId}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          event.eventType === 'check-in'
                            ? 'bg-primary-green-500/10 border-primary-green-500 text-primary-green-500'
                            : 'bg-semantic-blue-500/10 border-semantic-blue-500 text-semantic-blue-500'
                        }
                      >
                        {event.eventType}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary-blue-500 border-secondary-blue-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wifi size={20} />
              Device Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 bg-secondary-blue-600 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {device.status === 'online' ? (
                      <Wifi size={16} className="text-primary-green-500" />
                    ) : (
                      <WifiOff size={16} className="text-alert-red-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">{device.name}</p>
                      <p className="text-gray-400 text-sm">
                        {device.ipAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-primary-green-500' : 'bg-alert-red-400'}`}
                    ></div>
                    <span
                      className={`text-sm ${device.status === 'online' ? 'text-primary-green-500' : 'text-alert-red-400'}`}
                    >
                      {device.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-secondary-blue-500 border-secondary-blue-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock size={20} />
            Today&apos;s Summary - {format(new Date(), 'MMM dd, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-secondary-blue-600 rounded-lg">
              <div className="text-2xl font-bold text-primary-green-500">
                {mockStats.presentToday}
              </div>
              <div className="text-sm text-gray-400">Present</div>
            </div>
            <div className="text-center p-4 bg-secondary-blue-600 rounded-lg">
              <div className="text-2xl font-bold text-alert-red-400">
                {mockStats.absentToday}
              </div>
              <div className="text-sm text-gray-400">Absent</div>
            </div>
            <div className="text-center p-4 bg-secondary-blue-600 rounded-lg">
              <div className="text-2xl font-bold text-secondary-yellow-150">
                {mockStats.lateToday}
              </div>
              <div className="text-sm text-gray-400">Late</div>
            </div>
            <div className="text-center p-4 bg-secondary-blue-600 rounded-lg">
              <div className="text-2xl font-bold text-semantic-blue-500">
                {mockStats.averageAttendance}%
              </div>
              <div className="text-sm text-gray-400">Avg Attendance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
