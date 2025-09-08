'use client';

import { useCallback, useEffect, useState } from 'react';

import { extractMessageVariables } from '@/lib/utils/messaging-templates';
import type {
  CreateMessageTemplateData,
  MessageTemplate,
} from '@/types/messaging-template';

const STORAGE_KEY = 'messaging-templates';

const getTemplatesFromStorage = (): MessageTemplate[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTemplatesToStorage = (templates: MessageTemplate[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Failed to save templates to localStorage:', error);
  }
};

export function useMessagingTemplate() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);

  useEffect(() => {
    setTemplates(getTemplatesFromStorage());
  }, []);

  const createTemplate = useCallback(
    (data: CreateMessageTemplateData) => {
      const variables = extractMessageVariables(data.content);
      const template: MessageTemplate = {
        id: Date.now().toString(),
        name: data.name,
        category: data.category,
        content: data.content,
        channel: 'whatsapp',
        variables,
        createdAt: new Date().toISOString().split('T')[0],
        isActive: true,
      };
      const updatedTemplates = [...templates, template];
      setTemplates(updatedTemplates);
      saveTemplatesToStorage(updatedTemplates);
      return template;
    },
    [templates]
  );

  const updateTemplate = useCallback(
    (id: string, data: Partial<CreateMessageTemplateData>) => {
      const updatedTemplates = templates.map((template) => {
        if (template.id === id) {
          const updatedContent = data.content || template.content;
          const variables = extractMessageVariables(updatedContent);
          return {
            ...template,
            ...data,
            variables,
          };
        }
        return template;
      });
      setTemplates(updatedTemplates);
      saveTemplatesToStorage(updatedTemplates);
    },
    [templates]
  );

  const deleteTemplate = useCallback(
    (id: string) => {
      const updatedTemplates = templates.filter(
        (template) => template.id !== id
      );
      setTemplates(updatedTemplates);
      saveTemplatesToStorage(updatedTemplates);
    },
    [templates]
  );

  const getTemplate = useCallback(
    (id: string) => {
      return templates.find((template) => template.id === id);
    },
    [templates]
  );

  // Future: getTemplatesByChannel when multiple channels are supported

  const getTemplatesByCategory = useCallback(
    (category: 'payment' | 'reminder' | 'notification' | 'general') => {
      return templates.filter((template) => template.category === category);
    },
    [templates]
  );

  const refreshTemplates = useCallback(() => {
    setTemplates(getTemplatesFromStorage());
  }, []);

  return {
    templates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    getTemplatesByCategory,
    refreshTemplates,
    // Future: getTemplatesByChannel
  };
}
