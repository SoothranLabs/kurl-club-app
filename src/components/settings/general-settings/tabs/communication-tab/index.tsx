import { MessagingAutomationPanel } from './messaging-automation-panel';
import { MessagingTemplatePanel } from './messaging-template-panel';

export function CommunicationTab() {
  return (
    <div>
      <MessagingTemplatePanel />
      <MessagingAutomationPanel />
    </div>
  );
}
