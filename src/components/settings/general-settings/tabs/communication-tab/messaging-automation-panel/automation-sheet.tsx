'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import { KSheet } from '@/components/form/k-sheet';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Separator } from '@/components/ui/separator';
import type {
  Automation,
  AutomationTiming,
  EventType,
} from '@/types/msg-automation';
import { AutomationFormRow } from './automation-form-row';
import { useMessagingTemplate } from '@/hooks/use-messaging-template';
import { createAutomationSchema } from '@/schemas';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Automation | null;
  onSave: (
    data: z.infer<typeof createAutomationSchema>,
    existingId?: string
  ) => void;
  defaultEventType?: EventType;
};

type CategoryKey = 'payments' | 'reminders' | 'celebrations';

const CATEGORY_TO_EVENTS: Record<CategoryKey, EventType[]> = {
  payments: [
    'payment_advance',
    'payment_due',
    'payment_grace',
    'payment_failed',
    'payment_received',
  ],
  reminders: ['class_reminder'],
  celebrations: ['birthday', 'anniversary', 'achievement'],
};

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  payments: 'Payments',
  reminders: 'Reminders',
  celebrations: 'Celebrations',
};

function eventToCategory(e: EventType): CategoryKey {
  if (
    e === 'payment_due' ||
    e === 'payment_grace' ||
    e === 'payment_advance' ||
    e === 'payment_failed' ||
    e === 'payment_received'
  )
    return 'payments';
  if (e === 'class_reminder') return 'reminders';
  return 'celebrations';
}

const EVENT_OPTIONS: { value: EventType; label: string }[] = [
  { value: 'payment_advance', label: 'Advance payment reminder' },
  { value: 'payment_due', label: 'Payment due date' },
  { value: 'payment_grace', label: 'Payment grace period passed' },
  { value: 'payment_failed', label: 'Payment failed' },
  { value: 'payment_received', label: 'Payment received' },
  { value: 'class_reminder', label: 'Class reminder' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Gym anniversary' },
  { value: 'achievement', label: 'Achievement' },
];

const automationFormSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  eventType: z.enum([
    'payment_advance',
    'payment_due',
    'payment_grace',
    'payment_failed',
    'payment_received',
    'class_reminder',
    'birthday',
    'anniversary',
    'achievement',
  ]),
  description: z.string().optional(),
});

type AutomationFormData = z.infer<typeof automationFormSchema>;

function createTiming(templates: { id: string }[]): AutomationTiming {
  return {
    id: crypto?.randomUUID?.() || Math.random().toString(36).slice(2, 10),
    direction: 'before' as const,
    days: 0,
    sendAt: '09:00',
    channels: ['whatsapp'] as const,
    templateId: templates[0]?.id || '',
  };
}

function normalizeTimingForEvent(
  eventType: EventType,
  t: AutomationTiming
): AutomationTiming {
  const next = { ...t };
  if (eventType === 'payment_due') {
    next.direction = 'before';
    next.days = 0;
  } else if (eventType === 'payment_advance') {
    next.direction = 'before';
    if (next.days < 1) next.days = 1;
  } else if (eventType === 'payment_grace') {
    next.direction = 'after';
    if (next.days < 0) next.days = 0;
  } else if (
    eventType === 'payment_failed' ||
    eventType === 'payment_received'
  ) {
    next.direction = 'after';
    next.days = 0;
  } else if (eventType === 'class_reminder') {
    next.direction = 'before';
    if (next.days < 0) next.days = 0;
  }
  return next;
}

export function AutomationSheet({
  open,
  onOpenChange,
  initial,
  onSave,
  defaultEventType,
}: Props) {
  const { templates } = useMessagingTemplate();
  const initialEvent = initial?.eventType || defaultEventType || 'payment_due';

  const form = useForm<AutomationFormData>({
    resolver: zodResolver(automationFormSchema),
    defaultValues: {
      category: eventToCategory(initialEvent),
      eventType: initialEvent,
      description: initial?.description || '',
    },
  });

  const [enabled, setEnabled] = useState(initial?.enabled ?? true);
  const [timings, setTimings] = useState<AutomationTiming[]>([]);

  const category = form.watch('category') as CategoryKey;
  const eventType = form.watch('eventType') as EventType;

  useEffect(() => {
    if (!open) return;
    const nextEvent = initial?.eventType || defaultEventType || 'payment_due';
    form.reset({
      category: eventToCategory(nextEvent),
      eventType: nextEvent,
      description: initial?.description || '',
    });
    setEnabled(initial?.enabled ?? true);
    setTimings(
      initial?.timings?.length
        ? initial.timings.map((t) => normalizeTimingForEvent(nextEvent, t))
        : [normalizeTimingForEvent(nextEvent, createTiming(templates))]
    );
  }, [initial, open, templates, defaultEventType, form]);

  useEffect(() => {
    setTimings((prev) =>
      prev.map((t) => normalizeTimingForEvent(eventType, t))
    );
  }, [eventType]);

  const isEdit = !!initial;
  const title = isEdit ? 'Edit Automation' : 'Add Automation';

  const canSave = useMemo(() => {
    if (!timings.length) return false;
    return timings.every((t) => t.templateId && t.sendAt);
  }, [timings]);

  const filteredEventOptions = useMemo(() => {
    const allowed = new Set(CATEGORY_TO_EVENTS[category]);
    return EVENT_OPTIONS.filter((o) => allowed.has(o.value));
  }, [category]);

  const categoryOptions = Object.keys(CATEGORY_LABELS).map((k) => ({
    label: CATEGORY_LABELS[k as CategoryKey],
    value: k,
  }));

  const handleSubmit = (data: AutomationFormData) => {
    try {
      const payload = createAutomationSchema.parse({
        description: data.description,
        eventType: data.eventType,
        enabled,
        timings,
      });
      onSave(payload, initial?.id);
      onOpenChange(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <Button variant="ghost" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Button disabled={!canSave} onClick={form.handleSubmit(handleSubmit)}>
        {isEdit ? 'Update' : 'Save'}
      </Button>
    </div>
  );

  return (
    <KSheet
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={title}
      footer={footer}
      className="w-[585px]"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="category"
                  label="Category"
                  options={categoryOptions}
                />
              </div>
              <div className="md:col-span-2">
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="eventType"
                  label="Event"
                  options={filteredEventOptions.map((o) => ({
                    label: o.label,
                    value: o.value,
                  }))}
                />
              </div>
            </div>

            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="description"
              label="Description"
              placeholder="Optional description"
            />
          </div>

          <Separator className="bg-primary-blue-400/20" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Timings</h4>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setTimings((prev) => [
                    ...prev,
                    normalizeTimingForEvent(eventType, createTiming(templates)),
                  ])
                }
              >
                Add timing
              </Button>
            </div>

            <div className="space-y-3">
              {timings.map((row) => (
                <AutomationFormRow
                  key={row.id}
                  value={row}
                  onChange={(next) =>
                    setTimings((prev) =>
                      prev.map((r) =>
                        r.id === row.id
                          ? normalizeTimingForEvent(eventType, next)
                          : r
                      )
                    )
                  }
                  onRemove={() =>
                    setTimings((prev) => prev.filter((r) => r.id !== row.id))
                  }
                  templates={templates}
                  eventType={eventType}
                />
              ))}
            </div>
          </div>
        </form>
      </FormProvider>
    </KSheet>
  );
}
