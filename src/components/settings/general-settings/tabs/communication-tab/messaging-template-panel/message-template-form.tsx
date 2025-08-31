'use client';

import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Code, Wand2, Pencil } from 'lucide-react';
import { KSheet } from '@/components/form/k-sheet';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { messagingTemplateSchema } from '@/schemas/index';
import { useMessagingTemplate } from '@/hooks/use-messaging-template';
import type { MessageTemplate } from '@/types/messaging-template';
import {
  extractMessageVariables,
  messageVariableSuggestions,
} from '@/lib/utils/messaging-templates';
import { MessageLivePreviewer } from './message-live-previewer';

type CreateMessagingTemplateData = z.infer<typeof messagingTemplateSchema>;

type MessagingTemplateFormProps = {
  isOpen: boolean;
  closeSheet: () => void;
  editingTemplate?: MessageTemplate;
  defaultCategory?: 'payment' | 'reminder' | 'notification' | 'general' | null;
};

const categoryOptions = [
  { label: 'Payment', value: 'payment' },
  { label: 'Reminder', value: 'reminder' },
  { label: 'Notification', value: 'notification' },
  { label: 'General', value: 'general' },
];

export function MessagingTemplateForm({
  isOpen,
  closeSheet,
  editingTemplate,
  defaultCategory,
}: MessagingTemplateFormProps) {
  const { createTemplate, updateTemplate, deleteTemplate } =
    useMessagingTemplate();
  const isEditing = !!editingTemplate;
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<CreateMessagingTemplateData>({
    resolver: zodResolver(messagingTemplateSchema),
    defaultValues: {
      name: '',
      category: 'general',
      channel: 'whatsapp',
      content: '',
    },
  });

  // Reset form when editingTemplate changes
  useEffect(() => {
    if (editingTemplate) {
      form.reset({
        name: editingTemplate.name,
        category: editingTemplate.category,
        channel: 'whatsapp',
        content: editingTemplate.content,
      });
    } else {
      form.reset({
        name: '',
        category: defaultCategory || undefined,
        channel: 'whatsapp',
        content: '',
      });
    }
  }, [editingTemplate, defaultCategory, form]);

  const handleSubmit = async (data: CreateMessagingTemplateData) => {
    try {
      if (isEditing && editingTemplate) {
        updateTemplate(editingTemplate.id, data);
        toast.success('Template updated successfully');
      } else {
        createTemplate(data);
        toast.success('Template created successfully');
      }
      closeSheet();
      form.reset();
    } catch {
      toast.error('Failed to save template');
    }
  };

  const insertVariable = (variable: string) => {
    const currentContent = form.getValues('content');
    const newContent = currentContent + `{{${variable}}}`;
    form.setValue('content', newContent);
  };

  const watchedContent = form.watch('content');
  const watchedCategory = form.watch('category');

  const handleDelete = () => {
    if (
      editingTemplate &&
      window.confirm('Are you sure you want to delete this template?')
    ) {
      deleteTemplate(editingTemplate.id);
      toast.success('Template deleted successfully');
      closeSheet();
    }
  };

  const footer = (
    <div className="flex justify-between w-full">
      {isEditing && (
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="h-[40px] min-w-[90px]"
        >
          Delete Template
        </Button>
      )}
      <div className="flex gap-3 ml-auto">
        <Button
          type="button"
          onClick={() => {
            form.reset();
            closeSheet();
          }}
          variant="secondary"
          className="h-[40px] min-w-[90px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="messaging-template-form"
          className="h-[40px] min-w-[120px]"
        >
          {isEditing ? 'Update Template' : 'Create Template'}
        </Button>
      </div>
    </div>
  );

  return (
    <KSheet
      className="w-[582px]"
      isOpen={isOpen}
      onClose={closeSheet}
      title={isEditing ? 'Edit Messaging Template' : 'Add Messaging Template'}
      footer={footer}
    >
      <FormProvider {...form}>
        <form
          id="messaging-template-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <p className="text-muted-foreground text-[14px]">
            {isEditing
              ? 'Update your WhatsApp message template with dynamic variables.'
              : 'Create a new WhatsApp message template with dynamic variables for personalized communication.'}
          </p>

          <div className="flex items-end gap-3">
            {/* Template Name */}
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Template Name"
              placeholder="e.g., Payment Reminder"
            />

            {/* Category */}
            <KFormField
              fieldType={KFormFieldType.SELECT}
              control={form.control}
              name="category"
              label="Category"
              options={categoryOptions}
            />
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Message Content
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? (
                  <Pencil className="w-4 h-4 mr-2" />
                ) : (
                  <Eye className="w-4 h-4 mr-2" />
                )}
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>

            {!showPreview ? (
              <KFormField
                fieldType={KFormFieldType.TEXTAREA}
                control={form.control}
                name="content"
                placeholder="Enter your WhatsApp message template. Use {{variableName}} for dynamic content like {{memberName}}, {{amount}}, {{dueDate}}"
              />
            ) : (
              <div className="flex justify-center">
                <MessageLivePreviewer
                  channel="whatsapp"
                  content={watchedContent}
                />
              </div>
            )}
          </div>

          {/* Quick Insert Variables */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-white">
              Quick Insert Variables
            </div>
            <div className="p-4 bg-secondary-blue-500 border border-primary-blue-400 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {watchedCategory &&
                  messageVariableSuggestions[watchedCategory].map(
                    (variable) => (
                      <Button
                        key={variable}
                        type="button"
                        className="w-fit bg-primary-blue-400/60 hover:bg-secondary-blue-400 cursor-pointer py-2.5 px-3 text-white"
                        size="sm"
                        onClick={() => insertVariable(variable)}
                      >
                        <Wand2 className="w-3 h-3 mr-1 text-primary-green-100" />
                        {variable}
                      </Button>
                    )
                  )}
                {!watchedCategory && (
                  <p className="text-xs text-muted-foreground italic">
                    Select a category to see variable suggestions
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Detected Variables */}
          {watchedContent && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-white">
                Detected Variables
              </div>
              <div className="p-4 bg-secondary-blue-500 border border-primary-blue-400 rounded-lg min-h-[80px] flex items-start">
                {extractMessageVariables(watchedContent).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {extractMessageVariables(watchedContent).map((variable) => (
                      <Badge
                        key={variable}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Code className="w-3 h-3 text-primary-green-100" />
                        {variable}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No variables detected
                  </p>
                )}
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </KSheet>
  );
}
