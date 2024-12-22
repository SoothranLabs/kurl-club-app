import { KAccordionClose, KAccordionOpen } from './icons';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  setIsOpen,
  children,
  className,
}) => (
  <div>
    <div
      className={`flex gap-2 px-8 py-3 border-y-[1px] border-secondary-blue-500 justify-between items-center cursor-pointer ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className="text-[15px] font-normal leading-normal text-primary-blue-50">
        {title}
      </h3>
      {isOpen ? <KAccordionOpen /> : <KAccordionClose />}
    </div>
    {isOpen && <div className="px-8">{children}</div>}
  </div>
);
