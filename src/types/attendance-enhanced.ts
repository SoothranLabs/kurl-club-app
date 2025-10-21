// Enhanced Market-Ready Attendance Types

export type AttendanceStatus =
  | 'checked-in'
  | 'checked-out'
  | 'in-class'
  | 'no-show'
  | 'late-arrival';

export type VisitPurpose =
  | 'general-workout'
  | 'group-class'
  | 'personal-training'
  | 'pool'
  | 'sauna'
  | 'consultation';

export type MembershipTier = 'basic' | 'premium' | 'vip' | 'day-pass';

// Enhanced Attendance Record
export type AttendanceRecord = {
  id: string;
  memberId: string;
  memberName: string;
  memberIdentifier: string;
  membershipTier: MembershipTier;

  // Visit Details
  checkInTime: string;
  checkOutTime?: string;
  visitPurpose: VisitPurpose;
  duration?: number; // in minutes

  // Location & Device
  entryPoint: string; // 'main-entrance', 'pool-entrance', etc.
  deviceId?: string;

  // Class/Session Info (if applicable)
  classId?: string;
  className?: string;
  trainerId?: string;

  // Status & Flags
  status: AttendanceStatus;
  isFirstVisit: boolean;
  isVipAccess: boolean;

  // Timestamps
  date: string;
  timestamp: string;

  // Member Info
  profilePicture?: string;
  memberPhone?: string;
};

// Real-time Gym Capacity
export type GymCapacity = {
  current: number;
  maximum: number;
  percentage: number;
  status: 'low' | 'moderate' | 'high' | 'full';
  lastUpdated: string;
};

// Class Attendance
export type ClassAttendance = {
  classId: string;
  className: string;
  instructorName: string;
  scheduledTime: string;
  capacity: number;
  registered: number;
  checkedIn: number;
  noShows: number;
  waitlist: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
};

// Member Visit Analytics
export type MemberVisitStats = {
  memberId: string;
  memberName: string;

  // Visit Patterns
  totalVisits: number;
  visitsThisMonth: number;
  averageVisitsPerWeek: number;
  longestStreak: number;
  currentStreak: number;

  // Time Patterns
  averageDuration: number;
  preferredTimeSlots: string[];
  mostActiveDay: string;

  // Usage Patterns
  favoriteActivities: VisitPurpose[];
  classAttendanceRate: number;

  // Engagement
  lastVisit: string;
  memberSince: string;
  riskLevel: 'low' | 'medium' | 'high'; // churn risk
};

// Peak Hours Analytics
export type PeakHoursData = {
  hour: number;
  dayOfWeek: string;
  averageCapacity: number;
  peakCapacity: number;
  popularActivities: VisitPurpose[];
};

// Enhanced Device with IoT capabilities
export type SmartDevice = {
  id: string;
  name: string;
  type: 'entry-scanner' | 'class-scanner' | 'equipment-tracker';
  location: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'maintenance';

  // IoT Features
  batteryLevel?: number;
  temperature?: number;
  lastMaintenance?: string;

  // Analytics
  dailyScans: number;
  errorRate: number;

  lastSeen: string;
};

// Dashboard Analytics
export type AttendanceDashboard = {
  // Real-time
  currentCapacity: GymCapacity;
  activeMembers: number;

  // Today's Stats
  todayStats: {
    totalCheckIns: number;
    uniqueMembers: number;
    classAttendance: number;
    peakHour: string;
    averageDuration: number;
  };

  // Trends
  weeklyTrend: number; // percentage change
  monthlyTrend: number;

  // Alerts
  alerts: {
    type: 'capacity-warning' | 'device-offline' | 'class-overbooked';
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
  }[];

  // Quick Actions Needed
  actionItems: {
    noShows: number;
    deviceIssues: number;
    capacityAlerts: number;
  };
};
