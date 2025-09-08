'use client';

import { useEffect, useState } from 'react';

import { z } from 'zod/v4';

import {
  automationSchema,
  createAutomationSchema,
  updateAutomationSchema,
} from '@/schemas';
import type { Automation } from '@/types/msg-automation';

const STORAGE_KEY = 'gym-automations:v1';

function safeNowISO(): string {
  try {
    return new Date().toISOString();
  } catch {
    return '1970-01-01T00:00:00.000Z';
  }
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

function load(): Automation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Validate each item against schema
    return parsed.filter((item) => {
      try {
        automationSchema.parse(item);
        return true;
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

function save(items: Automation[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useMsgAutomation() {
  const [items, setItems] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setItems(load());
    } catch {
      setError('Failed to load automations');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = (data: z.infer<typeof createAutomationSchema>): Automation => {
    try {
      // Validate input data
      const validatedData = createAutomationSchema.parse(data);

      const newAutomation: Automation = {
        ...validatedData,
        id: createId(),
        createdAt: safeNowISO(),
        updatedAt: safeNowISO(),
      };

      // Validate complete automation
      const validatedAutomation = automationSchema.parse(newAutomation);

      setItems((prev) => {
        const updated = [validatedAutomation, ...prev];
        save(updated);
        return updated;
      });

      setError(null);
      return validatedAutomation;
    } catch (err) {
      const errorMessage =
        err instanceof z.ZodError
          ? err.issues.map((e) => e.message).join(', ')
          : 'Failed to create automation';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const update = (
    id: string,
    patch: z.infer<typeof updateAutomationSchema>
  ): void => {
    try {
      // Validate patch data
      const validatedPatch = updateAutomationSchema.parse(patch);

      setItems((prev) => {
        const updated = prev.map((automation) => {
          if (automation.id === id) {
            const updatedAutomation = {
              ...automation,
              ...validatedPatch,
              updatedAt: safeNowISO(),
            };

            // Validate complete updated automation
            return automationSchema.parse(updatedAutomation);
          }
          return automation;
        });

        save(updated);
        return updated;
      });

      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof z.ZodError
          ? err.issues.map((e) => e.message).join(', ')
          : 'Failed to update automation';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const remove = (id: string): void => {
    try {
      setItems((prev) => {
        const updated = prev.filter((automation) => automation.id !== id);
        save(updated);
        return updated;
      });
      setError(null);
    } catch {
      setError('Failed to remove automation');
      throw new Error('Failed to remove automation');
    }
  };

  const toggle = (id: string, enabled: boolean): void => {
    update(id, { enabled });
  };

  const getById = (id?: string | null): Automation | null => {
    if (!id) return null;
    return items.find((automation) => automation.id === id) || null;
  };

  const getByEventType = (eventType: string): Automation[] => {
    return items.filter((automation) => automation.eventType === eventType);
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    items,
    loading,
    error,
    create,
    update,
    remove,
    toggle,
    getById,
    getByEventType,
    clearError,
  };
}
