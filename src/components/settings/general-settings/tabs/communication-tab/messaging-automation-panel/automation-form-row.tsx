'use client';

import { useMemo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { cn } from '@/lib/utils';
import type { AutomationTiming, EventType } from '@/types/msg-automation';
import { Trash2 } from 'lucide-react';
import { useAppDialog } from '@/hooks/use-app-dialog';

type TemplateOption = { id: string; name: string };

const automationTimingFormSchema = z.object({
  direction: z.enum(['before', 'after']),
  days: z.string(),
  sendAt: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  templateId: z.string().min(1, 'Template is required'),
  whatsappEnabled: z.boolean(),
  smsEnabled: z.boolean(),
  mailEnabled: z.boolean(),
});

type AutomationTimingFormData = z.infer<typeof automationTimingFormSchema>;

type Props = {
  value: AutomationTiming;
  onChange: (next: AutomationTiming) => void;
  onRemove: () => void;
  templates: TemplateOption[];
  className?: string;
  eventType?: EventType;
};

type Constraints = {
  hideDirection?: boolean;
  hideDays?: boolean;
  allowedDirections?: Array<'before' | 'after'>;
  minDays?: number;
};

function getConstraints(eventType?: EventType): Constraints {
  switch (eventType) {
    case 'payment_due':
      // On due date only; no before/after or days
      return { hideDirection: true, hideDays: true };
    case 'payment_failed':
    case 'payment_received':
      // Immediate or scheduled same-day; no offset
      return { hideDirection: true, hideDays: true };
    case 'payment_advance':
      // Only before, min 1 day
      return { allowedDirections: ['before'], minDays: 1 };
    case 'payment_grace':
      // Only after; min 0 days
      return { allowedDirections: ['after'], minDays: 0 };
    case 'class_reminder':
      // Typically before class; min 0 days
      return { allowedDirections: ['before'], minDays: 0 };
    default:
      return {};
  }
}

export function AutomationFormRow({
  value,
  onChange,
  onRemove,
  templates,
  className,
  eventType,
}: Props) {
  const { showConfirm } = useAppDialog();
  const templateOptions = useMemo(() => templates, [templates]);
  const constraints = getConstraints(eventType);
  const dirOptions = constraints.allowedDirections ?? ['before', 'after'];

  const form = useForm<AutomationTimingFormData>({
    resolver: zodResolver(automationTimingFormSchema),
    defaultValues: {
      direction: value.direction,
      days: String(value.days),
      sendAt: value.sendAt,
      templateId: value.templateId,
      whatsappEnabled: value.channels.includes('whatsapp'),
      smsEnabled: value.channels.includes('sms'),
      mailEnabled: value.channels.includes('chat'),
    },
  });

  // Update form when value changes
  useEffect(() => {
    form.reset({
      direction: value.direction,
      days: String(value.days),
      sendAt: value.sendAt,
      templateId: value.templateId,
      whatsappEnabled: value.channels.includes('whatsapp'),
      smsEnabled: value.channels.includes('sms'),
      mailEnabled: value.channels.includes('chat'),
    });
  }, [value, form]);

  // Watch form changes and update parent
  const formValues = form.watch();
  useEffect(() => {
    const channels: ('whatsapp' | 'sms' | 'chat')[] = [];
    if (formValues.whatsappEnabled) channels.push('whatsapp');
    if (formValues.smsEnabled) channels.push('sms');
    if (formValues.mailEnabled) channels.push('chat');

    const daysNumber = parseInt(formValues.days) || 0;
    const hasChanges =
      formValues.direction !== value.direction ||
      daysNumber !== value.days ||
      formValues.sendAt !== value.sendAt ||
      formValues.templateId !== value.templateId ||
      JSON.stringify(channels.sort()) !== JSON.stringify(value.channels.sort());

    if (hasChanges) {
      onChange({
        ...value,
        direction: formValues.direction,
        days: daysNumber,
        sendAt: formValues.sendAt,
        templateId: formValues.templateId,
        channels,
      });
    }
  }, [formValues, value, onChange]);

  return (
    <FormProvider {...form}>
      <div
        className={cn(
          'rounded-md border border-primary-blue-400/40 bg-secondary-blue-600/10 p-3 md:p-4',
          className
        )}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {/* Direction */}
          {!constraints.hideDirection && (
            <div className="min-w-0">
              <KFormField
                fieldType={KFormFieldType.SELECT}
                control={form.control}
                name="direction"
                label="When"
                options={dirOptions.map((dir) => ({
                  label: dir.charAt(0).toUpperCase() + dir.slice(1),
                  value: dir,
                }))}
              />
            </div>
          )}

          {/* Days */}
          {!constraints.hideDays && (
            <div className="min-w-0">
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="days"
                label="Days"
                type="number"
              />
            </div>
          )}

          {/* Send at */}
          <div className="min-w-0">
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="sendAt"
              label="Send at"
              type="time"
            />
          </div>

          {/* Template */}
          <div className="min-w-0">
            <KFormField
              fieldType={KFormFieldType.SELECT}
              control={form.control}
              name="templateId"
              label="Select Template"
              options={templateOptions.map((t) => ({
                label: t.name,
                value: t.id,
              }))}
              placeholder="Select template"
            />
          </div>

          {/* Channels */}
          <div className="md:col-span-2 min-w-0">
            <Label className="mb-3 block text-primary-blue-100">Channels</Label>
            <div className="flex flex-wrap items-center gap-4 rounded-md border border-primary-blue-400 p-3 bg-secondary-blue-500">
              <div className="flex items-center gap-3">
                <KFormField
                  fieldType={KFormFieldType.CHECKBOX}
                  control={form.control}
                  name="whatsappEnabled"
                  label="WhatsApp"
                />
                <KFormField
                  fieldType={KFormFieldType.CHECKBOX}
                  control={form.control}
                  name="smsEnabled"
                  label="SMS"
                  disabled
                />
                <KFormField
                  fieldType={KFormFieldType.CHECKBOX}
                  control={form.control}
                  name="mailEnabled"
                  label="Mail"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <div className="md:col-span-2 flex items-center justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                showConfirm({
                  title: 'Remove Timing?',
                  description:
                    'This will permanently remove this timing configuration from the automation.',
                  variant: 'destructive',
                  confirmLabel: 'Remove',
                  onConfirm: onRemove,
                });
              }}
            >
              <Trash2 className="text-alert-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
