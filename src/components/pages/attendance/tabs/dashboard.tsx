'use client';

import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import {
  Activity,
  Clock,
  Timer,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { InfoBadge } from '@/components/shared/badges';
import InfoCard from '@/components/shared/cards/info-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';

// TYPES
interface LiveData {
  currentCapacity: { current: number; maximum: number; percentage: number };
  todayStats: {
    totalCheckIns: number;
    uniqueMembers: number;
    averageDuration: number;
    peakHour: string;
    currentlyActive: number;
    todayCheckOuts: number;
  };
  recentActivity: Array<{
    memberName: string;
    action: string;
    time: string;
    duration: string | null;
  }>;
  peakHours: Array<{ time: string; capacity: number; trend: string }>;
}

// MOCK DATA
const mockLiveData: LiveData = {
  currentCapacity: { current: 87, maximum: 150, percentage: 58 },
  todayStats: {
    totalCheckIns: 142,
    uniqueMembers: 98,
    averageDuration: 72,
    peakHour: '6:00 PM',
    currentlyActive: 87,
    todayCheckOuts: 55,
  },
  recentActivity: [
    {
      memberName: 'Sarah Johnson',
      action: 'checked-in',
      time: '2 min ago',
      duration: null,
    },
    {
      memberName: 'Mike Chen',
      action: 'checked-out',
      time: '5 min ago',
      duration: '1h 25m',
    },
    {
      memberName: 'Emma Davis',
      action: 'checked-in',
      time: '8 min ago',
      duration: null,
    },
    {
      memberName: 'John Wilson',
      action: 'checked-out',
      time: '12 min ago',
      duration: '45m',
    },
    {
      memberName: 'Lisa Brown',
      action: 'checked-in',
      time: '15 min ago',
      duration: null,
    },
  ],
  peakHours: [
    { time: '6AM', capacity: 45, trend: 'up' },
    { time: '12PM', capacity: 32, trend: 'down' },
    { time: '6PM', capacity: 89, trend: 'up' },
    { time: '9PM', capacity: 67, trend: 'down' },
  ],
};

// WIDGETS
function LiveStatusHeader({ currentTime }: { currentTime: Date }) {
  return (
    <div className="flex items-center justify-between">
      <InfoBadge variant="success">All Systems Operational</InfoBadge>
      <div className="text-gray-400 text-sm">
        {format(currentTime, 'MMM dd, yyyy • HH:mm:ss')}
      </div>
    </div>
  );
}

function StatsCards({ liveData }: { liveData: LiveData }) {
  const stats = [
    {
      id: 1,
      icon: <Users size={20} strokeWidth={1.75} color="#151821" />,
      color: 'primary-green-500',
      title: 'Currently Active',
      count: liveData.currentCapacity.current,
    },
    {
      id: 2,
      icon: <UserCheck size={20} strokeWidth={1.75} color="#151821" />,
      color: 'semantic-blue-500',
      title: "Today's Check-ins",
      count: liveData.todayStats.totalCheckIns,
    },
    {
      id: 3,
      icon: <UserX size={20} strokeWidth={1.75} color="#151821" />,
      color: 'secondary-yellow-150',
      title: "Today's Check-outs",
      count: liveData.todayStats.todayCheckOuts,
    },
    {
      id: 4,
      icon: <Timer size={20} strokeWidth={1.75} color="#151821" />,
      color: 'alert-red-400',
      title: 'Avg Session',
      count: `${liveData.todayStats.averageDuration}m`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <InfoCard item={stat} key={stat.id} />
      ))}
    </div>
  );
}

function TodaysSummary({ liveData }: { liveData: LiveData }) {
  const chartData = [
    {
      name: 'Check-ins',
      value: liveData.todayStats.totalCheckIns,
      fill: '#EBFB8B',
    },
    {
      name: 'Check-outs',
      value: liveData.todayStats.todayCheckOuts,
      fill: '#90A8ED',
    },
    {
      name: 'Currently Active',
      value: liveData.currentCapacity.current,
      fill: '#96AF01',
    },
  ];

  const chartConfig = {
    value: { label: 'Count' },
    checkins: { label: 'Check-ins', color: '#EBFB8B' },
    checkouts: { label: 'Check-outs', color: '#90A8ED' },
    active: { label: 'Currently Active', color: '#96AF01' },
  } satisfies ChartConfig;

  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-white text-base font-normal leading-normal flex items-center gap-2">
          <Clock size={16} />
          Today&apos;s Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-4 p-5 pt-0">
        <div className="w-[160px] h-[160px] relative flex-shrink-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={75}
                strokeWidth={0}
              />
            </PieChart>
          </ChartContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center pointer-events-none">
            <div className="text-2xl font-bold">
              {liveData.todayStats.totalCheckIns}
            </div>
            <div className="text-[10px] text-gray-400">Total Check-ins</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 w-full justify-center gap-2 text-white">
          <div className="bg-primary-blue-400 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EBFB8B]"></span>
                <span className="text-xs text-gray-300">Check-ins</span>
              </div>
              <span className="font-semibold text-sm">
                {liveData.todayStats.totalCheckIns}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#90A8ED]"></span>
                <span className="text-xs text-gray-300">Check-outs</span>
              </div>
              <span className="font-semibold text-sm">
                {liveData.todayStats.todayCheckOuts}
              </span>
            </div>
          </div>
          <div className="bg-primary-blue-400 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#96AF01]"></span>
                <span className="text-xs text-gray-300">Currently Active</span>
              </div>
              <span className="font-semibold text-sm">
                {liveData.currentCapacity.current}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#96AF01]"></span>
                <span className="text-xs text-gray-300">Unique Members</span>
              </div>
              <span className="font-semibold text-sm">
                {liveData.todayStats.uniqueMembers}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LiveActivityFeed({ liveData }: { liveData: LiveData }) {
  return (
    <Card className="relative border-none bg-secondary-blue-500 rounded-lg overflow-hidden">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-white text-base font-normal leading-normal flex items-center gap-2">
          <Activity size={16} />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
          {liveData.recentActivity.map((activity, index) => {
            const avatarStyle = getAvatarColor(activity.memberName);
            const initials = getInitials(activity.memberName);
            const isCheckIn = activity.action === 'checked-in';
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 bg-secondary-blue-600 rounded-lg hover:bg-secondary-blue-700 transition-colors"
              >
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback className="text-xs" style={avatarStyle}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate leading-tight">
                    {activity.memberName}
                  </p>
                  <p className="text-gray-400 text-xs leading-tight mt-0.5">
                    {activity.time}{' '}
                    {activity.duration && `• ${activity.duration}`}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0.5 flex-shrink-0 ${
                    isCheckIn
                      ? 'bg-primary-green-500/10 border-primary-green-500 text-primary-green-500'
                      : 'bg-semantic-blue-500/10 border-semantic-blue-500 text-semantic-blue-500'
                  }`}
                >
                  {isCheckIn ? 'IN' : 'OUT'}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-secondary-blue-500 via-secondary-blue-500/70 to-transparent rounded-b-lg pointer-events-none z-10" />
    </Card>
  );
}

function PeakHoursAnalysis({ liveData }: { liveData: LiveData }) {
  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-white text-base font-normal leading-normal flex items-center gap-2">
          <TrendingUp size={16} />
          Peak Hours Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {liveData.peakHours.map((hour, index) => {
            const isHighest =
              hour.capacity ===
              Math.max(...liveData.peakHours.map((h) => h.capacity));
            const percentage = Math.round((hour.capacity / 150) * 100);
            return (
              <div
                key={index}
                className={`relative p-3 sm:p-4 rounded-lg transition-all ${
                  isHighest
                    ? 'bg-primary-green-500/10 border border-primary-green-500/30'
                    : 'bg-primary-blue-400 hover:bg-secondary-blue-600'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      {hour.time}
                    </span>
                    {isHighest && (
                      <span className="bg-primary-green-500 text-black text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                        PEAK
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div
                      className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 ${
                        isHighest ? 'text-primary-green-400' : 'text-white'
                      }`}
                    >
                      {hour.capacity}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3">
                      members
                    </div>
                    <Progress
                      value={percentage}
                      className="h-1.5 sm:h-2 mb-1.5 sm:mb-2"
                    />
                    <div className="text-[10px] sm:text-xs text-gray-400">
                      {percentage}% capacity
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [liveData] = useState(mockLiveData);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <LiveStatusHeader currentTime={currentTime} />
      <StatsCards liveData={liveData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TodaysSummary liveData={liveData} />
        <LiveActivityFeed liveData={liveData} />
      </div>
      <PeakHoursAnalysis liveData={liveData} />
    </div>
  );
}
