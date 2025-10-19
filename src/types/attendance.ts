// Enums and Status Types
export type AttendanceStatus =
  | 'present'
  | 'absent'
  | 'late'
  | 'checked-in'
  | 'checked-out';

export type EventType = 'check-in' | 'check-out';
export type DeviceStatus = 'online' | 'offline';
export type MemberStatus = 'active' | 'inactive';

// Core Entity Types
export type AttendanceRecord = {
  id: string;
  memberId: string;
  memberName: string;
  memberIdentifier: string;
  biometricId?: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: AttendanceStatus;
  duration?: number;
  eventType: EventType;
  timestamp: string;
  deviceId?: string;
  profilePicture?: string;
};

export type BiometricDevice = {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  status: DeviceStatus;
  lastSeen: string;
  location?: string;
};

export type Member = {
  id: string;
  name: string;
  memberIdentifier: string;
  biometricId: string;
  department?: string;
  status: MemberStatus;
  profilePicture?: string;
};

// Statistics and Analytics Types
export type AttendanceStats = {
  totalMembers: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeave: number;
  checkedIn: number;
  averageAttendance: number;
};

// Base types for reusability
export type BaseEntity = {
  id: string;
  name: string;
};

export type TimestampedEntity = {
  timestamp: string;
  lastSeen?: string;
};
