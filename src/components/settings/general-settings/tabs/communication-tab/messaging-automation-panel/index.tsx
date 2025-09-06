'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useMsgAutomation } from '@/hooks/use-msg-automation';
import type { Automation, EventType } from '@/types/msg-automation';
import { AutomationSheet } from './automation-sheet';
import { createAutomationSchema } from '@/schemas';

import {
  ChevronRight,
  BotMessageSquare,
  SquarePen,
  Trash2,
} from 'lucide-react';
import { useMessagingTemplate } from '@/hooks/use-messaging-template';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { useSheet } from '@/hooks/use-sheet';

const EVENT_LABEL: Record<EventType, string> = {
  payment_advance: 'Advance payment reminder',
  payment_due: 'Payment due date',
  payment_grace: 'Payment grace period passed',
  payment_failed: 'Payment failed',
  payment_received: 'Payment received',
  class_reminder: 'Class reminder',
  birthday: 'Birthday',
  anniversary: 'Gym anniversary',
  achievement: 'Achievement',
};

function labelForEvent(e: EventType | string): string {
  return (EVENT_LABEL as Record<string, string>)[e] ?? 'Unknown event';
}

type CategoryKey = 'payments' | 'reminders' | 'celebrations';

const CATEGORY_CONFIG: Record<
  CategoryKey,
  { title: string; subtitle: string; defaultEvent: EventType }
> = {
  payments: {
    title: 'Payments',
    subtitle: 'Payment reminders & alerts',
    defaultEvent: 'payment_due',
  },
  reminders: {
    title: 'Reminders',
    subtitle: 'Class & workout reminders',
    defaultEvent: 'class_reminder',
  },
  celebrations: {
    title: 'Celebrations',
    subtitle: 'Birthdays & achievements',
    defaultEvent: 'birthday',
  },
};

const CATEGORY_MAP: Record<EventType, CategoryKey> = {
  payment_due: 'payments',
  payment_grace: 'payments',
  payment_advance: 'payments',
  payment_failed: 'payments',
  payment_received: 'payments',
  class_reminder: 'reminders',
  birthday: 'celebrations',
  anniversary: 'celebrations',
  achievement: 'celebrations',
};

function eventToCategory(e: EventType | string): CategoryKey {
  return CATEGORY_MAP[e as EventType] ?? 'reminders';
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-dashed bg-secondary-blue-500 border-primary-blue-400/40 p-6 text-center text-primary-blue-200">
      {message}
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  count,
  onBack,
  onAdd,
}: {
  title: string;
  subtitle: string;
  count?: number;
  onBack?: () => void;
  onAdd?: () => void;
}) {
  return (
    <CardHeader className="flex-row items-center justify-between">
      <div className="flex items-center gap-3">
        <BotMessageSquare className="w-6 h-6 text-primary-green-500" />
        <div>
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          <CardDescription className="text-secondary-blue-200 text-[15px]">
            {subtitle}
          </CardDescription>
        </div>
        {typeof count === 'number' && (
          <Badge variant="secondary">{count} automations</Badge>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack}>
            ← Back
          </Button>
        )}
        {onAdd && (
          <Button size="sm" onClick={onAdd}>
            + Add automation
          </Button>
        )}
      </div>
    </CardHeader>
  );
}

export function MessagingAutomationPanel() {
  const { items, create, update, remove, toggle, getById } = useMsgAutomation();
  const { templates } = useMessagingTemplate();
  const { showConfirm } = useAppDialog();
  const { isOpen, openSheet, closeSheet } = useSheet();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );

  const selected = useMemo(() => getById(selectedId), [getById, selectedId]);

  const grouped = useMemo(() => {
    const g: Record<CategoryKey, Automation[]> = {
      payments: [],
      reminders: [],
      celebrations: [],
    };
    for (const a of items) {
      g[eventToCategory(a.eventType)].push(a);
    }
    return g;
  }, [items]);

  const openCreate = (cat?: CategoryKey) => {
    setSelectedId(null);
    if (cat) setSelectedCategory(cat);
    openSheet();
  };

  const openEdit = (id: string) => {
    setSelectedId(id);
    openSheet();
  };

  const onSave = (
    data: z.infer<typeof createAutomationSchema>,
    id?: string
  ) => {
    try {
      if (id) {
        update(id, data);
      } else {
        create(data);
      }
    } catch (error) {
      console.error('Failed to save automation:', error);
    }
  };

  function AutomationRow({ automation }: { automation: Automation }) {
    return (
      <div className="p-4 group rounded-lg border border-white/5 hover:border-primary-blue-300/50 bg-primary-blue-400 hover:shadow-lg cursor-pointer w-full">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h4 className="truncate text-base font-medium text-white">
                {labelForEvent(automation.eventType)}
              </h4>
              {automation.enabled ? (
                <Badge className="bg-neutral-green-500/20 text-neutral-green-200">
                  Enabled
                </Badge>
              ) : (
                <Badge variant="secondary">Disabled</Badge>
              )}
              <Switch
                checked={automation.enabled}
                onCheckedChange={(ck) => toggle(automation.id, !!ck)}
              />
            </div>
            {automation.description && (
              <p className="mt-1 line-clamp-2 text-sm text-primary-blue-300">
                {automation.description}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {automation.timings.map((t) => {
                const tpl = templates.find((x) => x.id === t.templateId);
                const when =
                  t.days === 0
                    ? `@ ${t.sendAt}`
                    : `${t.direction === 'before' ? '−' : '+'}${t.days}d @ ${t.sendAt}`;
                return (
                  <Badge
                    key={t.id}
                    variant="secondary"
                    className="w-fit text-xs bg-secondary-blue-500 border-0 text-secondary-blue-100 gap-1"
                  >
                    {when}
                    <span className="mx-1 text-primary-blue-400">•</span>
                    {(t.channels || []).join(', ')}
                    {tpl ? (
                      <>
                        <span className="mx-1 text-primary-blue-400">•</span>
                        {tpl.name}
                      </>
                    ) : (
                      'No template'
                    )}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => openEdit(automation.id)}
            >
              <SquarePen />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                showConfirm({
                  title: 'Delete Automation Rule?',
                  description: `This will permanently delete the "${labelForEvent(automation.eventType)}" automation and stop all scheduled messages.`,
                  variant: 'destructive',
                  confirmLabel: 'Delete Rule',
                  onConfirm: () => remove(automation.id),
                });
              }}
            >
              <Trash2 className="text-alert-red-300" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function CategoryCard({
    categoryKey,
    meta,
    count,
  }: {
    categoryKey: CategoryKey;
    meta: (typeof CATEGORY_CONFIG)[CategoryKey];
    count: number;
  }) {
    return (
      <div
        onClick={() => setSelectedCategory(categoryKey)}
        className="p-4 max-w-md group rounded-lg border border-white/5 hover:border-primary-blue-300/50 bg-primary-blue-400 hover:shadow-lg cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-medium text-white">{meta.title}</div>
            <div className="text-sm text-white">{meta.subtitle}</div>
          </div>
          <ChevronRight className="w-5 h-5 text-secondary-blue-200 group-hover:text-primary-green-500" />
        </div>
        <div className="mt-3">
          <Badge
            variant="outline"
            className="text-xs bg-secondary-blue-500 border-0 text-secondary-blue-100"
          >
            {count} automations
          </Badge>
        </div>
      </div>
    );
  }

  function Overview() {
    const cards = (Object.keys(CATEGORY_CONFIG) as CategoryKey[])
      .map((k) => ({ key: k, meta: CATEGORY_CONFIG[k], list: grouped[k] }))
      .filter(({ list }) => list.length > 0);

    return (
      <>
        <SectionHeader
          title="Automated Messages"
          subtitle="Configure automated messages for birthdays, achievements, payments, and more."
          onAdd={() => openCreate()}
        />
        <CardContent>
          {cards.length === 0 ? (
            <EmptyState message='No automations yet. Click "Add automation" to create your first rule.' />
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {cards.map(({ key, meta, list }) => (
                <CategoryCard
                  key={key}
                  categoryKey={key}
                  meta={meta}
                  count={list.length}
                />
              ))}
            </div>
          )}
        </CardContent>
      </>
    );
  }

  function Detail({ cat }: { cat: CategoryKey }) {
    const meta = CATEGORY_CONFIG[cat];
    const list = grouped[cat];

    return (
      <>
        <SectionHeader
          title={meta.title}
          subtitle={meta.subtitle}
          count={list.length}
          onBack={() => setSelectedCategory(null)}
          onAdd={() => openCreate(cat)}
        />
        <CardContent className="space-y-3">
          {list.length === 0 ? (
            <EmptyState message='No automations in this category. Click "Add automation" to create one.' />
          ) : (
            list.map((automation) => (
              <AutomationRow key={automation.id} automation={automation} />
            ))
          )}
        </CardContent>
      </>
    );
  }

  const defaultEventFor = (cat?: CategoryKey | null): EventType | undefined =>
    cat ? CATEGORY_CONFIG[cat].defaultEvent : undefined;

  return (
    <Card className="mt-8 bg-secondary-blue-500 border-primary-blue-400 py-2">
      {selectedCategory ? <Detail cat={selectedCategory} /> : <Overview />}
      <AutomationSheet
        open={isOpen}
        onOpenChange={closeSheet}
        initial={selected}
        onSave={onSave}
        defaultEventType={defaultEventFor(selectedCategory)}
      />
    </Card>
  );
}
