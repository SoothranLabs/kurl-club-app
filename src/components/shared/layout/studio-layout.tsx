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
  const getContentMaxWidth = () => {
    switch (maxContentWidth) {
      case 'narrow':
        return 'max-w-4xl';
      case 'wide':
        return 'max-w-none';
      default:
        return 'max-w-[calc(100vw-200px)] md:max-w-[calc(100vw-250px)]';
    }
  };

  return (
    <div className="bg-background-dark h-full">
      {/* Header Section */}
      <div className="px-4 py-5 md:p-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center space-x-2 flex-wrap">
              {headerActions}
            </div>
          )}
        </div>
      </div>

      {/* Tab Section */}
      {tabs && tabs.length > 0 && (
        <KTabs
          items={tabs}
          variant="underline"
          value={activeTab || ''}
          onTabChange={onTabChange || (() => {})}
          className="p-0 md:px-2 border-secondary-blue-500"
        />
      )}

      {/* Content Section */}
      <div className={`px-4 py-5 md:p-8 ${getContentMaxWidth()}`}>
        {maxContentWidth === 'narrow' ? (
          <div className="max-w-4xl">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
