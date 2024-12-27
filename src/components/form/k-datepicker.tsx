'use client';

import * as React from 'react';
import { format, getYear, setYear } from 'date-fns';
import { KCalenderMonth } from '@/components/icons';
import { DateRange } from 'react-day-picker';

import { calculateDateRange, cn, formatDayWithLeadingZero } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import PresetSidebar from './preset-sidebar';

interface KDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  numberOfMonths?: number;
  showPresets?: boolean;
  label?: string;
  value?: DateRange | Date | undefined;
  onDateChange?: (range: DateRange | Date | undefined) => void;
  presets?: string[];
  startYear?: number;
  endYear?: number;
  mode?: 'range' | 'single';
  className?: string;
  icon?: React.ReactNode;
}

export function KDatePicker({
  numberOfMonths = 1,
  showPresets = true,
  label = 'Pick a date range',
  value,
  onDateChange,
  className,
  presets = [
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
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  mode = 'range',
  icon = <KCalenderMonth className="text-primary-green-500" />,
}: KDatePickerProps) {
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>(
    mode === 'range' ? (value as DateRange) : undefined
  );
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(
    mode === 'single' ? (value as Date) : undefined
  );

  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(
    rangeDate
  );
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(
    rangeDate?.from || singleDate || new Date()
  );

  React.useEffect(() => {
    if (value) {
      if (mode === 'range') {
        setRangeDate(value as DateRange);
        setTempDate(value as DateRange);
        setViewDate((value as DateRange).from || new Date());
      } else if (mode === 'single') {
        setSingleDate(value as Date);
        setViewDate(value as Date);
      }
    }
  }, [value, mode]);

  const handlePresetSelection = (preset: string) => {
    const newDateRange = calculateDateRange(preset);
    setTempDate(newDateRange);
    setViewDate(newDateRange?.from || new Date());
    setActivePreset(preset);
  };

  const handleApply = () => {
    if (mode === 'range') {
      setRangeDate(tempDate);
      if (onDateChange) onDateChange(tempDate);
    }
    setIsPopoverOpen(false);
  };

  const handleCancel = () => {
    if (mode === 'range') {
      setTempDate(rangeDate);
    }
    setActivePreset(null);
    setIsPopoverOpen(false);
  };

  const handleSingleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setSingleDate(selectedDate);
      setViewDate(selectedDate);
      setIsPopoverOpen(false);
      if (onDateChange) onDateChange(selectedDate);
    }
  };

  const renderLabel = () => {
    if (mode === 'range') {
      return rangeDate?.from ? (
        rangeDate.to ? (
          `${format(rangeDate.from, 'LLL dd, y')} - ${format(
            rangeDate.to,
            'LLL dd, y'
          )}`
        ) : (
          format(rangeDate.from, 'LLL dd, y')
        )
      ) : (
        <span>{label}</span>
      );
    } else {
      return singleDate ? (
        format(singleDate, 'LLL dd, y')
      ) : (
        <span>{label}</span>
      );
    }
  };

  const renderCalendar = () => {
    const commonProps = {
      initialFocus: true,
      classNames: { day_selected: 'selected-date' },
      className: 'p-0',
      ariaLabel:
        mode === 'range' ? 'Date range calendar' : 'Single date calendar',
      month: viewDate,
      onMonthChange: setViewDate,
      formatDay: formatDayWithLeadingZero,
    };

    if (mode === 'range') {
      return (
        <>
          <Calendar
            {...commonProps}
            mode="range"
            defaultMonth={viewDate}
            selected={tempDate}
            onSelect={setTempDate}
            numberOfMonths={numberOfMonths}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={!tempDate?.from || !tempDate?.to}
            >
              Apply
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <Calendar
          {...commonProps}
          mode="single"
          selected={singleDate}
          onSelect={handleSingleDateSelect}
          numberOfMonths={numberOfMonths}
        />
      );
    }
  };

  return (
    <div className={cn('grid gap-2')}>
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => {
          if (!open) handleCancel();
          setIsPopoverOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            aria-label="Open date picker"
            className={`justify-start text-left px-3 py-2 font-semibold text-sm w-fit ${className ? className : ''}`}
            onClick={() => setIsPopoverOpen(true)}
          >
            {icon}
            {renderLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto overflow-hidden rounded-xl border border-primary-blue-400 bg-secondary-blue-800 p-0"
          align="start"
        >
          {showPresets && mode === 'range' && (
            <PresetSidebar
              presets={presets}
              activePreset={activePreset}
              onSelectPreset={handlePresetSelection}
              years={Array.from(
                { length: endYear - startYear + 1 },
                (_, i) => startYear + i
              )}
              currentYear={getYear(viewDate).toString()}
              onYearChange={(year) =>
                setViewDate(setYear(viewDate, parseInt(year)))
              }
            />
          )}
          <div className="flex flex-col justify-between gap-4 p-4">
            {renderCalendar()}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
