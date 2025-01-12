import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Option {
  label: string;
  value: string;
}

export const KSelect = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Select> & {
    label?: string;
    options?: Option[];
    className?: string;
  }
>(({ label, value, onValueChange, options = [], className, ...props }, ref) => {
  const [hasValue, setHasValue] = React.useState(false);

  React.useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div ref={ref} className="relative w-full">
      <Select
        {...props}
        value={value}
        onValueChange={(val) => {
          setHasValue(!!val);
          if (onValueChange) onValueChange(val);
        }}
      >
        <SelectTrigger
          className={`peer shad-select-trigger h-14 px-4
            ${hasValue ? 'pt-5' : 'pt-2'} ${className ? className : ''}`}
        >
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="shad-select-content">
          {options.map((option) => (
            <SelectItem
              className="shad-select-item"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {label && (
        <label
          className={`absolute text-lg duration-300 text-primary-blue-100 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] start-4 cursor-pointer
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

{
  /* <KSelect
  label="Select Country"
  value={selectedCountry}
  onValueChange={(value) => onChange({ target: { name, value } })}
  options={[
    { label: 'India', value: 'IN' },
    { label: 'United States', value: 'US' },
    { label: 'Australia', value: 'AU' },
  ]}
  className="!border-white !rounded-lg"
/> */
}
