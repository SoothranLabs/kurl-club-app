import { MessagingTemplatePanel } from './messaging-template-panel';
import { MessagingAutomationPanel } from './messaging-automation-panel';

export function CommunicationTab() {
  return (
    <div>
      <MessagingTemplatePanel />
      <MessagingAutomationPanel />
    </div>
  );
}
