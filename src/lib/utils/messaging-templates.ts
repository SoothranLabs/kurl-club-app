import type { MessageTemplateCategory } from '@/types/messaging-template';

export const messagingChannelIcons = {
  whatsapp: 'MessageSquare',
  // Future channels: sms: 'Smartphone', email: 'Mail'
} as const;

export const categoryColors = {
  payment: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  reminder: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  notification:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  general: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
} as const;

export const messageVariableSuggestions: Record<
  MessageTemplateCategory,
  string[]
> = {
  payment: [
    'memberName',
    'amount',
    'dueDate',
    'paymentMethod',
    'invoiceNumber',
  ],
  reminder: ['memberName', 'className', 'classTime', 'trainerName', 'location'],
  notification: [
    'memberName',
    'expiryDate',
    'renewalDate',
    'planName',
    'benefits',
  ],
  general: ['memberName', 'gymName', 'contactNumber', 'email', 'address'],
};

export const sampleMessageData = {
  memberName: 'John Doe',
  amount: '99.99',
  dueDate: '2024-02-15',
  paymentMethod: 'Credit Card',
  invoiceNumber: 'INV-2024-001',
  className: 'Morning Yoga',
  classTime: '8:00 AM',
  trainerName: 'Sarah Johnson',
  location: 'Studio A',
  expiryDate: '2024-03-01',
  renewalDate: '2024-02-28',
  planName: 'Premium Membership',
  benefits: 'Access to all classes and equipment',
  gymName: 'FitLife Gym',
  contactNumber: '+1 (555) 123-4567',
  email: 'info@fitlifegym.com',
  address: '123 Fitness Street, Health City',
} as const;

export const extractMessageVariables = (content: string): string[] => {
  const matches = content.match(/\{\{(\w+)\}\}/g);
  return matches ? matches.map((match) => match.replace(/[{}]/g, '')) : [];
};

export const generateMessagePreview = (content: string): string => {
  let preview = content;
  Object.entries(sampleMessageData).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    preview = preview.replace(regex, value);
  });
  return preview;
};
