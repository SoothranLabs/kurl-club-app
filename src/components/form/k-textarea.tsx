'use client';

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface KTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const KTextarea = forwardRef<HTMLTextAreaElement, KTextareaProps>(
  ({ className, label, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const localRef = useRef<HTMLTextAreaElement | null>(null);

    // Synchronize the forwarded ref with the internal ref
    const handleRef = (node: HTMLTextAreaElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node;
      }
      localRef.current = node;
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasContent(e.target.value.trim().length > 0);
      onChange?.(e);
      adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
      if (localRef.current) {
        localRef.current.style.height = 'auto';
        localRef.current.style.height = `${localRef.current.scrollHeight}px`;
      }
    };

    // Ensure the textarea resizes on initial render
    useEffect(() => {
      adjustTextareaHeight();
    }, []);

    return (
      <div className="relative">
        <textarea
          className={cn(
            'k-input pt-6 pb-2 px-4 min-h-[80px] overflow-auto max-h-[80px]:',
            isFocused || hasContent ? 'pt-6' : 'pt-3',
            className
          )}
          ref={handleRef}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-labelledby={`floating-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          id={`floating-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn(
            'text-sm text-primary-blue-100 absolute left-4 transition-all duration-200 pointer-events-none',
            isFocused || hasContent ? 'top-2 text-xs' : 'top-3 text-sm'
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

KTextarea.displayName = 'KTextarea';

export { KTextarea };
