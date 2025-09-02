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

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * Merges multiple class names conditionally and removes duplicates.
 *
 * @param inputs - An array of class values.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates a date range based on a preset string.
 *
 * @param preset - A string representing the desired date range preset (e.g., "Today", "This Week").
 * @returns A `DateRange` object containing `from` and `to` dates, or `undefined` if the preset is invalid.
 */
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

/**
 * Formats a date's day as a string with a leading zero if it is a single digit.
 *
 * @param day - The date to format.
 * @returns A string representing the day with a leading zero.
 */
export const formatDayWithLeadingZero = (day: Date): string => {
  const dayNumber = day.getDate();
  return dayNumber.toString().padStart(2, '0');
};

/**
 * Formats a camelCase or PascalCase string into a human-readable format.
 * Adds spaces between words and capitalizes the first letter.
 *
 * @param field - The string to format.
 * @returns A human-readable formatted string.
 */
export const formatFieldName = (field: string): string => {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-z])([0-9])/g, '$1 $2')
    .replace(/^[a-z]/, (char) => char.toUpperCase());
};

/**
 * Filters an array of objects based on a search term.
 * Searches through all string properties by default.
 *
 * @param items - The array of objects to search.
 * @param term - The search term.
 * @param getSearchableValues - Optional function to extract searchable values from an item.
 * @returns Filtered array of items matching the search term.
 */
export function searchItems<T extends Record<string, unknown>>(
  items: T[],
  term: string,
  getSearchableValues?: (item: T) => string[]
): T[] {
  if (!term.trim()) return items;

  return items.filter((item) => {
    const searchableValues = getSearchableValues
      ? getSearchableValues(item)
      : (Object.values(item).filter(
          (value) => typeof value === 'string'
        ) as string[]);

    return searchableValues.some((value) =>
      value.toLowerCase().includes(term.toLowerCase())
    );
  });
}

/**
 * * Extracts and returns the initials from a given name.
 * If the name is empty or undefined, returns an empty string.
 *
 * @param name - The full name to extract initials from.
 * @returns The uppercase initials of the name.
 */
export const getInitials = (name?: string): string => {
  return name
    ? name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : '';
};

/**
 * Returns a greeting message based on the current time of the day.
 *
 * - Morning: 5:00 AM to 11:59 AM -> "Good morning"
 * - Afternoon: 12:00 PM to 4:59 PM -> "Good afternoon"
 * - Evening: 5:00 PM to 8:59 PM -> "Good evening"
 * - Night: 9:00 PM to 4:59 AM -> "Good night"
 *
 * The function uses the user's local timezone to determine the current time.
 *
 * @returns {string} A greeting message corresponding to the current time of day.
 */
export const getGreeting = (): string => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning 💪🏼';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon ☀️';
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening 🌙';
  } else {
    return 'Good night 💤';
  }
};

/**
 * Converts a Base64 string into a File object.
 * Useful for handling file uploads from Base64-encoded images.
 *
 * @param base64String - The Base64-encoded image data.
 * @param fileName - The desired name for the resulting File object.
 * @returns A File object representing the image.
 */
export function base64ToFile(base64String: string, fileName: string): File {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  return new File([blob], fileName, { type: 'image/png' });
}

/**
 * Returns the corresponding color classes for a given difficulty level.
 * Used for styling elements based on difficulty.
 *
 * @param level - The difficulty level ('beginner', 'intermediate', 'advanced').
 * @returns A string containing Tailwind CSS classes for background and text color.
 */
export const getDifficultyColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-neutral-green-500/10 border-neutral-green-500';
    case 'intermediate':
      return 'bg-neutral-ochre-600/10 border-neutral-ochre-500';
    case 'advanced':
      return 'bg-alert-red-500/10 border-alert-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

/**
 * Returns a valid image source for a profile picture.
 * Handles Base64 strings, data URLs, File objects, and provides a fallback if null.
 *
 * @param profilePicture - The profile picture as a Base64 string, data URL, File, or null.
 * @param fallback - A fallback image URL if the profile picture is null.
 * @returns A valid image source URL.
 */
export const getProfilePictureSrc = (
  profilePicture: string | File | null,
  fallback: string
) => {
  if (!profilePicture) return fallback;

  if (typeof profilePicture === 'string') {
    return profilePicture.startsWith('data:image')
      ? profilePicture
      : `data:image/png;base64,${profilePicture}`;
  }

  return URL.createObjectURL(profilePicture);
};

/**
 * Formats an ISO date string to a readable format.
 *
 * @param isoString - The ISO date string to format.
 * @param format - Format type: 'date', 'time', or 'both' (default).
 * @returns A formatted string.
 */
export const formatDateTime = (
  isoString: string,
  format: 'date' | 'time' | 'both' = 'both'
): string => {
  try {
    const date = new Date(isoString);

    if (format === 'date') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    if (format === 'time') {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return isoString;
  }
};
