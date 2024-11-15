import * as React from 'react';
import { cn } from '@/lib/utils';

interface PresetSidebarProps {
  activePreset: string | null;
  onSelectPreset: (preset: string) => void;
}

const PresetSidebar: React.FC<PresetSidebarProps> = ({
  activePreset,
  onSelectPreset,
}) => {
  const presets = React.useMemo(
    () => [
      'Today',
      'Yesterday',
      'This Week',
      'Last Week',
      'Past Two Weeks',
      'This Month',
      'Last Month',
      'This Year',
      'Last Year',
    ],
    []
  );

  return (
    <div className="flex flex-col bg-secondary-blue-800 border-r border-primary-blue-400 rounded-tl-md rounded-bl-md">
      {presets.map((preset) => (
        <button
          key={preset}
          onClick={() => onSelectPreset(preset)}
          className={cn(
            'px-3.5 py-3 text-[13px] text-left text-white hover:text-primary-green-500 hover:bg-secondary-blue-600 transition-colors duration-300',
            activePreset === preset
              ? 'bg-secondary-blue-600 text-primary-green-500'
              : 'bg-transparent'
          )}
          aria-label={`Select ${preset} preset`}
        >
          {preset}
        </button>
      ))}
    </div>
  );
};

export default PresetSidebar;
