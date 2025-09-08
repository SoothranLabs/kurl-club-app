'use client';

import React, { forwardRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface KInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  suffix?: string;
  maxLength?: number;
  mandetory?: boolean;
}

const KInput = forwardRef<HTMLInputElement, KInputProps>(
  (
    {
      className,
      label,
      mandetory,
      type,
      suffix,
      maxLength,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasContent =
      (typeof value === 'number' && !isNaN(value)) ||
      (typeof value === 'string' && value.trim().length > 0);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <div className="relative">
        <Input
          type={type}
          className={cn(
            'k-input px-4 pb-2.5 pt-6 bg-secondary-blue-500',
            className
          )}
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder=" "
          aria-labelledby={`floating-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          autoComplete={props.autoComplete || 'off'}
          maxLength={maxLength}
          value={value}
        />
        {suffix && (
          <span className="absolute right-3 top-[42%] p-1 text-primary-blue-100 text-sm font-normal leading-normal bg-secondary-blue-500">
            {suffix}
          </span>
        )}
        <label
          id={`floating-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          htmlFor={props.id}
          className={cn(
            'text-sm text-primary-blue-100 absolute left-4 transition-all duration-200 pointer-events-none',
            isFocused || hasContent ? 'top-1.5 text-xs' : 'top-3.5 text-sm'
          )}
        >
          {label}
          {mandetory && (
            <span className="text-alert-red-500 text-sm font-normal leading-normal ml-px">
              *
            </span>
          )}
        </label>
      </div>
    );
  }
);

KInput.displayName = 'KInput';

export { KInput };
