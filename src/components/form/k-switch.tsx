'use client';

import { Switch } from '@/components/ui/switch';

interface KSwitchProps {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function KSwitch({ label, checked, onCheckedChange }: KSwitchProps) {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} />
      {label && (
        <label
          htmlFor={label}
          className="text-sm text-white font-normal leading-normal cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
}
