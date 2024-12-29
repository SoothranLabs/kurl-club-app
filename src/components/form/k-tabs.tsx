'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabVariant = 'vertical' | 'underline' | 'pills';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface KTabsProps {
  items: TabItem[];
  variant?: TabVariant;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function KTabs({
  items,
  variant = 'pills',
  value,
  onChange,
  className,
}: KTabsProps) {
  const [activeTab, setActiveTab] = React.useState(value || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div
      className={cn(
        'w-full',
        {
          'flex flex-col': variant === 'vertical',
          'flex space-x-2': variant === 'pills',
          'border-b': variant === 'underline',
        },
        className
      )}
    >
      {variant === 'vertical' ? (
        // Vertical Variant
        <nav className="flex flex-col gap-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  'relative flex items-center gap-2.5 px-8 py-2.5 h-10 text-[15px] leading-normal transition-colors hover:bg-secondary-blue-500',
                  {
                    'bg-secondary-blue-500 text-white before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-primary-green-100':
                      isActive,
                    'text-white': !isActive,
                  }
                )}
              >
                {Icon && (
                  <Icon
                    className={cn('h-5 w-5', {
                      'text-primary-green-200 transition-colors': isActive,
                      'text-white': !isActive,
                    })}
                  />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>
      ) : variant === 'underline' ? (
        // Underline Variant
        <nav className="flex w-full">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  'flex-1 border-b-2 px-4 py-2 text-center text-sm font-medium transition-all',
                  {
                    'border-primary text-primary': isActive,
                    'border-transparent text-muted-foreground hover:text-primary':
                      !isActive,
                  }
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      ) : (
        // Pills Variant (Default)
        <nav className="flex bg-gray-50/50 p-1 rounded-xl">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn('rounded-lg px-6 py-3 text-base transition-all', {
                  'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]':
                    isActive,
                  'text-gray-500 hover:text-gray-900': !isActive,
                })}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
