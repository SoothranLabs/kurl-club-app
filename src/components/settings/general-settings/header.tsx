'use client';

import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCancel: () => void;
  onSave: () => void;
}

export const Header = ({ onCancel, onSave }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b border-zinc-800">
      <h1 className="text-xl font-semibold mt-[41px] mb-[32px]">
        General Settings
      </h1>
      <div className="flex gap-2 mt-[26px] mb-[25px]">
        <Button
          variant="outline"
          className="w-full h-[46px]"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="w-full h-[46px]" onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
