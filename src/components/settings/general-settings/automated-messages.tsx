'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { KSwitch } from '@/components/form/k-switch';

const sections = [
  {
    title: 'Milestone & celebrations',
    items: ['Birthdays', 'Gym anniversary', 'Achievements'],
  },
  {
    title: 'Engagement & motivation',
    items: ['Streaks', 'Weekly check-in', 'Skip reminder', 'Inactivity alert'],
  },
  {
    title: 'Payments & subscription alerts',
    items: ['Subscription expiry', 'Payment confirmation'],
  },
];

const channels = ['Chat', 'Whatsapp', 'SMS'];

export default function AutomatedMessages() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="automated-messages"
        className="border border-primary-blue-300 rounded-lg overflow-hidden"
      >
        <AccordionTrigger className="p-6 bg-secondary-blue-400 text-white text-left hover:no-underline">
          <div className="flex flex-col gap-3 text-left">
            <h2 className="text-xl leading-normal  font-medium text-white">
              Automated messages
            </h2>
            <p className="text-base leading-normal  font-normal text-white">
              Send automated messages for the client’s birthday’s and special
              events.
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0 border-t border-primary-blue-300">
          {/* Child Accordions for Each Category */}
          <Accordion
            type="multiple"
            className="divide-y divide-primary-blue-300"
          >
            {sections.map((section, i) => (
              <AccordionItem
                key={i}
                value={`section-${i}`}
                className="border-0"
              >
                <AccordionTrigger className="px-6 py-5 bg-secondary-blue-400 text-left hover:no-underline hover:bg-secondary-blue-300">
                  <span className="font-medium text-lg leading-normal text-white">
                    {section.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-0 bg-secondary-blue-500">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_2fr] py-6 border-b last:border-0 border-primary-blue-300"
                    >
                      <KSwitch label={item} labelClass="text-base!" />
                      <div className="flex items-center gap-4">
                        {channels.map((channel, cIndex) => (
                          <div
                            key={cIndex}
                            className="flex items-center gap-2 text-sm leading-normal cursor-pointer text-white"
                          >
                            <Checkbox id={`${item}-${channel}`} />
                            <label
                              className="cursor-pointer"
                              htmlFor={`${item}-${channel}`}
                            >
                              {channel}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
