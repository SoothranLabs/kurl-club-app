'use client';

import { usePathname, useRouter } from 'next/navigation';
import { KTabs, TabItem } from '@/components/form/k-tabs';
import { IndianRupee, Map, Settings, Users } from 'lucide-react';

const navItems: TabItem[] = [
  { id: 'staff-management', label: 'Staff Management', icon: Users },
  { id: 'membership-plans', label: 'Membership Plans', icon: IndianRupee },
  { id: 'workout-plans', label: 'Workout Plans', icon: Map },
  { id: 'general-settings', label: 'General Settings', icon: Settings },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab =
    navItems.find((item) => pathname.startsWith(`/settings/${item.id}`))?.id ||
    'staff-management';

  const isDynamicPath = pathname.match(
    /\/settings\/(staff-management|workout-plans)\/[^/]+/
  );
  const isSidebarVisible = !isDynamicPath;

  const handleTabChange = (tab: string) => {
    router.push(`/settings/${tab}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex container px-0!">
      {isSidebarVisible && (
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
      )}
      <main className="w-full">{children}</main>
    </div>
  );
}
