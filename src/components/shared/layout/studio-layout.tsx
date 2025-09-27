import { ReactNode } from 'react';

import { KTabs, TabItem } from '@/components/shared/form/k-tabs';

interface StudioLayoutProps {
  title: string;
  description?: string;
  headerActions?: ReactNode;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  children: ReactNode;
  maxContentWidth?: 'default' | 'narrow' | 'wide';
}

export const StudioLayout = ({
  title,
  description,
  headerActions,
  tabs,
  activeTab,
  onTabChange,
  children,
  maxContentWidth = 'default',
}: StudioLayoutProps) => {
  return (
    <div className="bg-background-dark h-full">
      <div className="px-4 py-5 md:p-8">
        <div className="flex flex-col gap-6 ">
          {/* Page header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            {headerActions && <div className="flex gap-2">{headerActions}</div>}
          </div>

          {/* Tabs */}
          {tabs?.length ? (
            <KTabs
              items={tabs}
              variant="underline"
              value={activeTab || ''}
              onTabChange={onTabChange || (() => {})}
            />
          ) : null}

          {/* Content */}
          <div
            className={`flex-1 ${maxContentWidth === 'narrow' ? 'max-w-4xl' : ''}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
