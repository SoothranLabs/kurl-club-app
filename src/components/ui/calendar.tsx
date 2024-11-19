/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { KChevronLeftIcon, KChevronRightIcon } from '@/components/icons';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  formatDay?: (date: Date) => string;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  formatDay,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      fixedWeeks={true}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-7 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-normal',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-[10px]',
        head_row: 'flex h-8',
        head_cell:
          'text-muted-foreground rounded-md w-[26px] h-[24px] p-1 font-normal text-[0.8rem] m-[4.5px]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-secondary-blue-500 [&:has([aria-selected].day-outside)]:bg-secondary-blue/50 [&:has([aria-selected].day-range-end)]:rounded-r-[29px] [&:has([aria-selected].day-range-start)]:rounded-l-[29px] p-1',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-[29px] [&:has(>.day-range-start)]:rounded-l-[29px] first:[&:has([aria-selected])]:rounded-l-[29px] last:[&:has([aria-selected])]:rounded-r-[29px]'
            : '[&:has([aria-selected])]:rounded-[29px]'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-[27px] w-[27px] p-0 font-normal aria-selected:opacity-100 hover:bg-primary-green-500 hover:text-black rounded-full'
        ),
        day_range_start: 'day-range-start bg-primary-green-500 text-black',
        day_range_end: 'day-range-end bg-primary-green-500 text-black',
        day_selected:
          'bg-primary-green-500 text-white hover:bg-primary-green-500 hover:text-white focus:bg-primary-green-500 focus:text-black',
        day_today:
          'text-primary-green-200 rounded-full border border-primary-green-500',
        day_outside:
          'day-outside text-primary-blue-300 aria-selected:bg-primary-blue-300/50 aria-selected:text-primary-blue-300',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-secondary-blue-500 aria-selected:text-secondary-blue-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <KChevronLeftIcon />,
        IconRight: ({ ...props }) => <KChevronRightIcon />,
      }}
      formatters={{
        formatDay: formatDay,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
