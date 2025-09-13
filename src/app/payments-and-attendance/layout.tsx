'use client';

import { usePathname, useRouter } from 'next/navigation';

import { CalendarDays, IndianRupee } from 'lucide-react';

import { KTabs, TabItem } from '@/components/shared/form/k-tabs';

const navItems: TabItem[] = [
  { id: 'payments', label: 'Payments', icon: IndianRupee },
  { id: 'attendance', label: 'Attendance', icon: CalendarDays },
];

const basePath = '/payments-and-attendance';

export default function PaymentAndAttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab =
    navItems.find((item) => pathname.startsWith(`${basePath}/${item.id}`))
      ?.id || 'payments';

  const handleTabChange = (tab: string) => {
    router.push(`${basePath}/${tab}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex container px-0!">
      <aside className="flex flex-col border-r border-secondary-blue-600 h-[calc(100vh-80px)] sticky left-0 top-[80px] min-w-[336px]">
        <div className="p-8">
          <h3 className="text-2xl leading-normal font-medium text-white">
            Settings
          </h3>
        </div>
        <KTabs
          items={navItems}
          variant="vertical"
          value={activeTab}
          onTabChange={handleTabChange}
        />
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
