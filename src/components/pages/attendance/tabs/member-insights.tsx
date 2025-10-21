'use client';

import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Award, Calendar, TrendingDown } from 'lucide-react';

import { DataTable } from '@/components/shared/table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';

type MemberInsight = {
  id: string;
  name: string;
  membershipTier: string;
  totalVisits: number;
  visitsThisMonth: number;
  currentStreak: number;
  longestStreak: number;
  averageDuration: number;
  favoriteTime: string;
  favoriteActivity: string;
  lastVisit: string;
  riskLevel: string;
  attendanceRate: number;
  profilePicture: string | null;
};

const mockMemberInsights: MemberInsight[] = [
  {
    id: 'M001',
    name: 'Sarah Johnson',
    membershipTier: 'premium',
    totalVisits: 45,
    visitsThisMonth: 12,
    currentStreak: 7,
    longestStreak: 14,
    averageDuration: 85,
    favoriteTime: '6:00 AM',
    favoriteActivity: 'Group Classes',
    lastVisit: '2024-01-15',
    riskLevel: 'low',
    attendanceRate: 92,
    profilePicture: null,
  },
  {
    id: 'M002',
    name: 'Mike Chen',
    membershipTier: 'basic',
    totalVisits: 23,
    visitsThisMonth: 4,
    currentStreak: 0,
    longestStreak: 8,
    averageDuration: 65,
    favoriteTime: '7:00 PM',
    favoriteActivity: 'General Workout',
    lastVisit: '2024-01-10',
    riskLevel: 'high',
    attendanceRate: 45,
    profilePicture: null,
  },
  {
    id: 'M003',
    name: 'Emma Davis',
    membershipTier: 'vip',
    totalVisits: 67,
    visitsThisMonth: 18,
    currentStreak: 12,
    longestStreak: 21,
    averageDuration: 95,
    favoriteTime: '12:00 PM',
    favoriteActivity: 'Personal Training',
    lastVisit: '2024-01-15',
    riskLevel: 'low',
    attendanceRate: 98,
    profilePicture: null,
  },
];

const mockTopPerformers = [
  { name: 'Emma Davis', streak: 12, visits: 18 },
  { name: 'Sarah Johnson', streak: 7, visits: 12 },
  { name: 'John Wilson', streak: 5, visits: 15 },
];

const mockAtRiskMembers = [
  { name: 'Mike Chen', lastVisit: '5 days ago', visits: 4 },
  { name: 'Lisa Brown', lastVisit: '8 days ago', visits: 2 },
  { name: 'Tom Anderson', lastVisit: '12 days ago', visits: 1 },
];

const memberColumns: ColumnDef<MemberInsight>[] = [
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => {
      const name = row.getValue<string>('name');
      const avatarStyle = getAvatarColor(name);
      const initials = getInitials(name);
      const tier = row.original.membershipTier;
      const risk = row.original.riskLevel;

      const getTierColor = (tier: string) => {
        switch (tier) {
          case 'vip':
            return 'bg-purple-500/10 border-purple-500 text-purple-400';
          case 'premium':
            return 'bg-primary-green-500/10 border-primary-green-500 text-primary-green-500';
          case 'basic':
            return 'bg-semantic-blue-500/10 border-semantic-blue-500 text-semantic-blue-500';
          default:
            return 'bg-gray-500/10 border-gray-500 text-gray-400';
        }
      };

      const getRiskColor = (risk: string) => {
        switch (risk) {
          case 'low':
            return 'bg-primary-green-500/10 border-primary-green-500 text-primary-green-500';
          case 'medium':
            return 'bg-secondary-yellow-150/10 border-secondary-yellow-150 text-secondary-yellow-150';
          case 'high':
            return 'bg-alert-red-500/10 border-alert-red-500 text-alert-red-400';
          default:
            return 'bg-gray-500/10 border-gray-500 text-gray-400';
        }
      };

      return (
        <div className="flex items-center gap-3 w-[250px]">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="font-medium" style={avatarStyle}>
              {initials}
            </AvatarFallback>
            <AvatarImage src={row.original.profilePicture || undefined} />
          </Avatar>
          <div>
            <div className="text-white font-medium">{name}</div>
            <div className="flex gap-1 mt-1">
              <Badge
                variant="outline"
                className={`text-xs ${getTierColor(tier)}`}
              >
                {tier.toUpperCase()}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${getRiskColor(risk)}`}
              >
                {risk}
              </Badge>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'attendanceRate',
    header: 'Attendance',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="text-white font-bold text-lg">
          {row.getValue('attendanceRate')}%
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'visitsThisMonth',
    header: 'This Month',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="text-white font-medium">
          {row.getValue('visitsThisMonth')}
        </div>
        <div className="text-gray-400 text-xs">
          of {row.original.totalVisits} total
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'currentStreak',
    header: 'Streak',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="text-primary-green-500 font-bold">
          {row.getValue('currentStreak')} days
        </div>
        <div className="text-gray-400 text-xs">
          Best: {row.original.longestStreak}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'averageDuration',
    header: 'Avg Duration',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="text-white font-medium">
          {row.getValue('averageDuration')}m
        </div>
        <div className="text-gray-400 text-xs">{row.original.favoriteTime}</div>
      </div>
    ),
  },
  {
    accessorKey: 'favoriteActivity',
    header: 'Preference',
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <div className="text-white text-sm">
          {row.getValue('favoriteActivity')}
        </div>
        <div className="text-gray-400 text-xs">
          Last: {row.original.lastVisit}
        </div>
      </div>
    ),
  },
];

export default function MemberInsights() {
  const [memberInsights] = useState(mockMemberInsights);
  const [topPerformers] = useState(mockTopPerformers);
  const [atRiskMembers] = useState(mockAtRiskMembers);

  return (
    <div className="flex flex-col gap-6">
      {/* Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[minmax(200px,1fr)] gap-4">
        <Card className="row-span-1 bg-secondary-blue-500 border-secondary-blue-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Award size={18} />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] overflow-hidden">
            <div className="space-y-2 h-full overflow-y-auto">
              {topPerformers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-secondary-blue-600 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0
                          ? 'bg-yellow-500 text-black'
                          : index === 1
                            ? 'bg-gray-400 text-black'
                            : 'bg-orange-500 text-black'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-white text-sm truncate">
                      {member.name}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-primary-green-500 text-sm font-bold">
                      {member.streak}d
                    </div>
                    <div className="text-gray-400 text-xs">
                      {member.visits}v
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="row-span-1 bg-secondary-blue-500 border-secondary-blue-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <TrendingDown size={18} />
              At Risk Members
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] overflow-hidden">
            <div className="space-y-2 h-full overflow-y-auto">
              {atRiskMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-secondary-blue-600 rounded"
                >
                  <span className="text-white text-sm truncate">
                    {member.name}
                  </span>
                  <div className="text-right flex-shrink-0">
                    <div className="text-alert-red-400 text-sm font-bold">
                      {member.lastVisit}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {member.visits} visits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Details Table */}
      <div>
        <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Member Analytics
        </h3>
        <DataTable columns={memberColumns} data={memberInsights} />
      </div>
    </div>
  );
}
