'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { KCalenderMonth } from '@/components/icons';
import { DateRange } from 'react-day-picker';

import { calculateDateRange, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import PresetSidebar from './preset-sidebar';

interface KDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  numberOfMonths: number;
  showPresets?: boolean;
  label: string;
  value?: DateRange | undefined;
  onDateChange?: (range: DateRange | undefined) => void;
}

export function KDatePicker({
  numberOfMonths,
  showPresets,
  label,
  value,
  onDateChange,
  className,
}: KDatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    value || { from: new Date(), to: addDays(new Date(), 6) }
  );
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      setDate(value);
      setTempDate(value);
    }
  }, [value]);

  // Handle preset selection
  const handlePresetSelection = (preset: string) => {
    const newDateRange = calculateDateRange(preset);
    setTempDate(newDateRange);
    setActivePreset(preset);
  };

  // Handle Apply action
  const handleApply = () => {
    setDate(tempDate);
    setIsPopoverOpen(false);
    if (onDateChange) onDateChange(tempDate);
  };

  // Handle Cancel action
  const handleCancel = () => {
    setTempDate(date);
    setActivePreset(null);
    setIsPopoverOpen(false);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isPopoverOpen} onOpenChange={() => setIsPopoverOpen(true)}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            aria-label="Open date picker"
            onClick={() => setIsPopoverOpen(true)}
            className={cn(
              'justify-start text-left px-3 py-2 font-semibold text-sm w-fit',
              !date && 'text-primary-blue-200'
            )}
          >
            <KCalenderMonth />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{label}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto overflow-hidden border border-white/60 bg-secondary-blue-800 p-0"
          align="start"
        >
          {/* Sidebar with Preset Options */}
          {showPresets && (
            <PresetSidebar
              activePreset={activePreset}
              onSelectPreset={handlePresetSelection}
            />
          )}

          <div className="flex flex-col justify-between">
            {/* Calendar Component */}
            <div className="rounded-md text-white">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={tempDate}
                onSelect={setTempDate}
                numberOfMonths={numberOfMonths}
                classNames={{ day_selected: 'selected-date' }}
                aria-label="Date range calendar"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 p-4">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={!tempDate?.from || !tempDate?.to}
                aria-disabled={!tempDate?.from || !tempDate?.to}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
