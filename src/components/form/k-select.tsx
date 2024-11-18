import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';

export const KSelect = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Select> & {
    label?: string;
  }
>(({ label, children, value, onValueChange, ...props }, ref) => {
  const [hasValue, setHasValue] = React.useState(false);

  React.useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div ref={ref} className="relative">
      <Select
        {...props}
        value={value}
        onValueChange={(val) => {
          setHasValue(!!val);
          if (onValueChange) onValueChange(val);
        }}
      >
        <SelectTrigger
          className={`peer shad-select-trigger px-4
            ${hasValue ? 'pt-5' : 'pt-2'}`}
        >
          <SelectValue placeholder=" " />
        </SelectTrigger>
        <SelectContent className="shad-select-content">
          {children}
        </SelectContent>
      </Select>
      {label && (
        <label
          className={`absolute text-md duration-300 text-primary-blue-100 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] start-4 cursor-pointer
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
            ${hasValue ? '-translate-y-3.5 text-sm scale-75 top-5' : 'translate-y-0 scale-100'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
});
KSelect.displayName = 'KSelect';
