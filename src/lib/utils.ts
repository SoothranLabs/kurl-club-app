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

// Adds leading zero if single digit for calender
export const formatDayWithLeadingZero = (day: Date): string => {
  const dayNumber = day.getDate();
  return dayNumber.toString().padStart(2, '0');
};

export const formatFieldName = (field: string): string => {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-z])([0-9])/g, '$1 $2')
    .replace(/^[a-z]/, (char) => char.toUpperCase());
};

/**
 * Utility to generate pagination pages for table.
 *
 * @param pageIndex - The current zero-based page index.
 * @param pageCount - The total number of pages.
 * @param maxPagesToShow - The maximum number of pages to show in the pagination UI.
 * @returns An array of page numbers or ellipses ("...").
 */
export const generatePaginationPages = (
  pageIndex: number,
  pageCount: number,
  maxPagesToShow: number = 5
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (pageCount <= maxPagesToShow + 2) {
    for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
    }
  } else {
    if (pageIndex > 1) pages.push(1); // First page
    if (pageIndex > 2) pages.push('...'); // Ellipsis before

    const start = Math.max(1, pageIndex - 1);
    const end = Math.min(pageCount, pageIndex + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (pageIndex + 2 < pageCount - 1) pages.push('...'); // Ellipsis after
    if (pageIndex + 1 < pageCount) pages.push(pageCount); // Last page
  }

  return pages;
};
