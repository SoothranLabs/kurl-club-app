import { ColumnDef } from '@tanstack/react-table';

import { FilterConfig } from '@/lib/filters';
import type {
  AttendanceRecord,
  BiometricDevice,
  MemberInsight,
} from '@/types/attendance';

import { BaseTable } from './base-table';

// Column definitions
export { attendanceColumns } from './attendance-columns';
export { deviceColumns } from './device-columns';
export { memberInsightsColumns as insightsColumns } from './member-insights-columns';

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

export const InsightsTableView = ({
  insights,
  columns,
}: {
  insights: MemberInsight[];
  columns: ColumnDef<MemberInsight, unknown>[];
}) => <BaseTable data={insights} columns={columns} />;

// Legacy export
export const MemberInsightsTableView = InsightsTableView;
