'use client';

import { useEffect, useMemo, useState } from 'react';

import { Clock } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getGreeting } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';

export function AppHeader() {
  const { appUser } = useAuth();

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formattedTime = useMemo(
    () =>
      now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [now]
  );

  const userName = appUser?.userName || appUser?.userEmail || 'User';

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 sticky top-0 z-50 px-4 bg-secondary-blue-500">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 bg-[#747578]"
        />
        <div className="flex flex-col text-left leading-tight">
          <span className="text-sm font-medium leading-normal text-[#747578]">
            Hey, {userName}
          </span>
          <span className="text-base font-semibold">{getGreeting()}</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2 text-sm font-medium">
        <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <time className="tabular-nums" dateTime={now.toISOString()}>
          {formattedTime}
        </time>
      </div>
    </header>
  );
}
