import { ColumnDef } from '@tanstack/react-table';

import { FilterConfig } from '@/lib/filters';
import type {
  AttendanceRecord,
  BiometricDevice,
  Member,
} from '@/types/attendance';

import { BaseTable } from './base-table';

// Base reusable table component
export { BaseTable } from './base-table';

// Column definitions
export { createAttendanceColumns } from './attendance-columns';
export { createDeviceColumns } from './device-columns';
export { createMemberColumns } from './member-columns';

// Specific table implementations
export const AttendanceTableView = ({
  records,
  columns,
  filters,
}: {
  records: AttendanceRecord[];
  columns: ColumnDef<AttendanceRecord, unknown>[];
  filters?: FilterConfig[];
}) => <BaseTable data={records} columns={columns} filters={filters} />;

export const DeviceTableView = ({
  devices,
  columns,
}: {
  devices: BiometricDevice[];
  columns: ColumnDef<BiometricDevice, unknown>[];
}) => <BaseTable data={devices} columns={columns} />;

export const MemberTableView = ({
  members,
  columns,
}: {
  members: Member[];
  columns: ColumnDef<Member, unknown>[];
}) => <BaseTable data={members} columns={columns} />;
