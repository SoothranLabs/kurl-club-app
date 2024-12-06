import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  setIsOpen,
  children,
}) => (
  <div>
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
    {isOpen && <div className="mt-2 space-y-4">{children}</div>}
  </div>
);
