export type MessageChannel = 'whatsapp' | 'sms' | 'email';

export type MessageTemplateCategory =
  | 'payment'
  | 'reminder'
  | 'notification'
  | 'general';

export interface MessageTemplate {
  id: string;
  name: string;
  category: MessageTemplateCategory;
  channel: MessageChannel;
  content: string;
  variables: string[];
  createdAt: string;
  isActive: boolean;
}

export interface CreateMessageTemplateData {
  name: string;
  category: MessageTemplateCategory;
  channel: MessageChannel;
  content: string;
}

export interface MessageTemplateFormProps {
  initialData?: MessageTemplate;
  onSubmit: (data: CreateMessageTemplateData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export interface MessageTemplateCardProps {
  template: MessageTemplate;
  onEdit: (template: MessageTemplate) => void;
  onDelete: (id: string) => void;
}

export interface MessageTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: MessageTemplate;
  onSubmit: (data: CreateMessageTemplateData) => void;
}
