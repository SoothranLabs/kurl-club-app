'use client';

import { useState } from 'react';

import {
  Bell,
  CalendarClock,
  ChevronRight,
  CreditCard,
  MessageSquare,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMessagingTemplate } from '@/hooks/use-messaging-template';
import { useSheet } from '@/hooks/use-sheet';
import type { MessageTemplate } from '@/types/messaging-template';

import { MessagingTemplateForm } from './message-template-form';

export function MessagingTemplatePanel() {
  const { templates, refreshTemplates } = useMessagingTemplate();
  const { isOpen, openSheet, closeSheet } = useSheet();
  const [editingTemplate, setEditingTemplate] = useState<
    MessageTemplate | undefined
  >();
  const [currentView, setCurrentView] = useState<'categories' | 'templates'>(
    'categories'
  );
  const [selectedCategory, setSelectedCategory] = useState<
    'payment' | 'reminder' | 'notification' | 'general' | null
  >(null);

  const templatesByCategory = {
    payment: templates.filter((t) => t.category === 'payment'),
    reminder: templates.filter((t) => t.category === 'reminder'),
    notification: templates.filter((t) => t.category === 'notification'),
    general: templates.filter((t) => t.category === 'general'),
  };

  const categoryConfig = {
    payment: {
      name: 'Payment Templates',
      description: 'Payment reminders & alerts',
      icon: CreditCard,
      color: 'text-secondary-green-500',
    },
    reminder: {
      name: 'Reminder Templates',
      description: 'Class & workout reminders',
      icon: CalendarClock,
      color: 'text-secondary-pink-500',
    },
    notification: {
      name: 'Notification Templates',
      description: 'General notifications',
      icon: Bell,
      color: 'text-primary-green-500',
    },
    general: {
      name: 'General Templates',
      description: 'General messages',
      icon: MessageSquare,
      color: 'text-semantic-blue-500',
    },
  };

  const handleEditTemplate = (template: MessageTemplate) => {
    setEditingTemplate(template);
    openSheet();
  };

  const handleDialogClose = () => {
    closeSheet();
    setEditingTemplate(undefined);
    refreshTemplates();
  };

  return (
    <>
      <Card className="bg-secondary-blue-500 rounded-lg border border-secondary-blue-400">
        <CardHeader className="pb-4 flex flex-row justify-between items-start">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-primary-green-500" />
            <div>
              <CardTitle className="text-white text-lg">
                {currentView === 'categories'
                  ? 'WhatsApp Message Templates'
                  : selectedCategory
                    ? categoryConfig[selectedCategory].name
                    : 'Templates'}
              </CardTitle>
              <CardDescription className="text-secondary-blue-200 text-[15px]">
                {currentView === 'categories'
                  ? 'Create and manage automated WhatsApp message templates for different scenarios'
                  : selectedCategory
                    ? categoryConfig[selectedCategory].description
                    : 'Manage your templates'}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentView === 'templates' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentView('categories');
                  setSelectedCategory(null);
                }}
              >
                ← Back
              </Button>
            )}
            {(currentView === 'categories' ||
              (currentView === 'templates' &&
                selectedCategory &&
                templatesByCategory[selectedCategory].length > 0)) && (
              <Button size="sm" onClick={() => openSheet()}>
                <span className="sr-only">Add template</span>+ Add Template
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {currentView === 'categories' ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(
                Object.keys(categoryConfig) as (keyof typeof categoryConfig)[]
              ).map((cat) => (
                <CategoryCard
                  key={cat}
                  title={cat.charAt(0).toUpperCase() + cat.slice(1)}
                  description={categoryConfig[cat].description}
                  count={templatesByCategory[cat].length}
                  icon={categoryConfig[cat].icon}
                  color={categoryConfig[cat].color}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentView('templates');
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {selectedCategory &&
              templatesByCategory[selectedCategory].length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templatesByCategory[selectedCategory].map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      icon={categoryConfig[selectedCategory].icon}
                      color={categoryConfig[selectedCategory].color}
                      onEdit={handleEditTemplate}
                    />
                  ))}
                </div>
              ) : (
                selectedCategory && (
                  <EmptyState
                    category={selectedCategory}
                    onCreate={() => openSheet()}
                  />
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <MessagingTemplateForm
        isOpen={isOpen}
        closeSheet={handleDialogClose}
        editingTemplate={editingTemplate}
        defaultCategory={currentView === 'templates' ? selectedCategory : null}
      />
    </>
  );
}

function CategoryCard({
  title,
  description,
  count,
  icon: Icon,
  color,
  onClick,
}: {
  title: string;
  description: string;
  count: number;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      className="p-4 max-w-md group rounded-lg border border-white/5 hover:border-primary-blue-300/50 bg-primary-blue-400 hover:shadow-lg cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <ChevronRight className="w-5 h-5 text-secondary-blue-200 group-hover:text-primary-green-500" />
      </div>

      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-white/70 mb-2">{description}</p>

      <Badge
        variant="outline"
        className="mt-auto w-fit text-xs bg-secondary-blue-500 border-0 text-secondary-blue-100"
      >
        {count} templates
      </Badge>
    </div>
  );
}

function TemplateCard({
  template,
  icon: Icon,
  color,
  onEdit,
}: {
  template: MessageTemplate;
  icon: React.ElementType;
  color: string;
  onEdit: (t: MessageTemplate) => void;
}) {
  return (
    <div
      key={template.id}
      className="p-4 max-w-md group rounded-lg border border-white/5 hover:border-primary-blue-300/50 bg-primary-blue-400 hover:shadow-lg cursor-pointer flex flex-col"
      onClick={() => onEdit(template)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <Badge
            variant="outline"
            className="w-fit text-xs bg-secondary-blue-500 border-0 text-secondary-blue-100 gap-1 border-secondary-blue-500 capitalize"
          >
            {template.category}
          </Badge>
        </div>
        <ChevronRight className="w-5 h-5 text-secondary-blue-200 group-hover:text-primary-green-500" />
      </div>
      <h4 className="font-medium text-white mb-2">{template.name}</h4>
      <p className="text-sm text-white/70 mb-2 line-clamp-2">
        {template.content.substring(0, 180)}...
      </p>
      <div className="flex items-center justify-between mt-auto text-xs text-secondary-blue-100">
        <span>
          Created:{' '}
          {template.createdAt
            ? new Date(template.createdAt).toLocaleDateString()
            : 'N/A'}
        </span>
      </div>
    </div>
  );
}

function EmptyState({
  category,
  onCreate,
}: {
  category: string;
  onCreate: () => void;
}) {
  return (
    <div className="text-center py-12">
      <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">
        No {category} templates yet
      </h3>
      <p className="text-slate-400 mb-6">
        Create your first {category} template to get started
      </p>
      <Button onClick={onCreate}>+ Create Template</Button>
    </div>
  );
}
