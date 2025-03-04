import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { KAccordionClose, KAccordionOpen } from '@/components/icons';

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
}

export function SectionHeader({ title, isOpen }: SectionHeaderProps) {
  return (
    <CollapsibleTrigger className="flex px-8 py-3 border-y-[1px] border-secondary-blue-500 justify-between items-center w-full">
      <h3 className="text-[15px] font-normal leading-normal text-primary-blue-50">
        {title}
      </h3>
      {isOpen ? <KAccordionOpen /> : <KAccordionClose />}
    </CollapsibleTrigger>
  );
}
