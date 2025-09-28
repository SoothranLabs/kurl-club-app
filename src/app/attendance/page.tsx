import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendance',
  description: 'Track member attendance and gym visit records',
};

const AttendancePage = () => {
  return (
    <div className="rounded-[12px] bg-background-dark h-full">
      AttendancePage
    </div>
  );
};

export default AttendancePage;
