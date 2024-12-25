'use client';

import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface KInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  suffix?: string;
  maxLength?: number;
}

const KInput = forwardRef<HTMLInputElement, KInputProps>(
  ({ className, label, type, suffix, maxLength, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasContent(e.target.value.trim().length > 0);
      onChange?.(e);
    };

    return (
      <div className="relative">
        <Input
          type={type}
          className={cn('k-input px-4 pb-2.5 pt-6', className)}
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder=" "
          aria-labelledby={`floating-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          autoComplete={props.autoComplete || 'off'}
          maxLength={maxLength}
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
            isFocused || hasContent ? 'top-2 text-xs' : 'top-4 text-sm'
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

KInput.displayName = 'KInput';

export { KInput };
