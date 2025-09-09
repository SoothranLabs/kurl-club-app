export type Channel = 'chat' | 'whatsapp' | 'sms';

export type TimingDirection = 'before' | 'after';

export type EventType =
  | 'payment_advance' // New: advance reminder before due date
  | 'payment_due' // On due date (no before/after)
  | 'payment_grace' // Grace period passed (after due)
  | 'payment_failed' // Payment attempt failed (immediate)
  | 'payment_received' // Payment received/recorded (immediate)
  | 'class_reminder'
  | 'birthday'
  | 'anniversary'
  | 'achievement';

export interface AutomationTiming {
  id: string;
  direction: TimingDirection;
  days: number;
  sendAt: string;
  channels: Channel[];
  templateId: string;
}

export interface Automation {
  id: string;
  name?: string; // Name is optional; the UI will display the event label when name is empty</CHANGE>
  description?: string;
  eventType: EventType;
  enabled: boolean;
  timings: AutomationTiming[];
  createdAt: string;
  updatedAt: string;
}
