'use client';

import Image from 'next/image';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function TeamSwitcher() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent"
        >
          {state === 'collapsed' ? (
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%203-1bUu3foSGcahraLSyANoyl4dlcVN2Z.png"
              alt="KurlClub Logo"
              width={28}
              height={28}
              className="drop-shadow-[0_0_12px_rgba(211,247,2,0.4)]"
            />
          ) : (
            <>
              <Image
                width={120}
                height={18}
                className="w-auto object-contain h-4"
                src="/assets/svg/logo-light.svg"
                alt="KurlClub Logo"
              />
              <div className="grid flex-1 text-left leading-tight ml-1">
                <span className="truncate text-[10px] text-sidebar-foreground/50 font-medium uppercase tracking-wide">
                  Studio Dashboard
                </span>
              </div>
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
