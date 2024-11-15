import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { DateRange } from 'react-day-picker';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDateRange(preset: string): DateRange | undefined {
  const today = new Date();

  switch (preset) {
    case 'Today':
      return { from: today, to: today };
    case 'Yesterday':
      return { from: subDays(today, 1), to: subDays(today, 1) };
    case 'This Week':
      return { from: startOfWeek(today), to: endOfWeek(today) };
    case 'Last Week':
      return {
        from: startOfWeek(subDays(today, 7)),
        to: endOfWeek(subDays(today, 7)),
      };
    case 'Past Two Weeks':
      return { from: subDays(today, 14), to: today };
    case 'This Month':
      return { from: startOfMonth(today), to: endOfMonth(today) };
    case 'Last Month':
      return {
        from: startOfMonth(subDays(today, 30)),
        to: endOfMonth(subDays(today, 30)),
      };
    case 'This Year':
      return { from: startOfYear(today), to: endOfYear(today) };
    case 'Last Year':
      return {
        from: startOfYear(subDays(today, 365)),
        to: endOfYear(subDays(today, 365)),
      };
    default:
      return undefined;
  }
}
