'use client';

import React, {
  ReactNode,
  useEffect,
  useRef,
  ReactElement,
  useCallback,
} from 'react';

type KFieldWrapperProps = {
  label?: string;
  id: string;
  children: ReactNode;
  className?: string;
};

export function KFieldWrapper({
  label,
  id,
  children,
  className = '',
}: KFieldWrapperProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Resize function for dynamically adjusting textarea height
  const resizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    // Initial resize on mount
    resizeTextarea();
  }, [resizeTextarea]);

  // Function to clone the child with appropriate props and styles
  const cloneChild = (child: ReactNode) => {
    if (!React.isValidElement(child)) return child;

    const sharedProps = {
      id,
      placeholder: ' ',
      className: `peer k-input ${child.props.className || ''}`,
    };

    if (child.type === 'textarea') {
      return React.cloneElement(
        child as ReactElement<React.HTMLProps<HTMLTextAreaElement>>,
        {
          ...sharedProps,
          ref: textareaRef,
          onInput: resizeTextarea,
        }
      );
    }

    if (child.type === 'input') {
      return React.cloneElement(
        child as ReactElement<React.HTMLProps<HTMLInputElement>>,
        sharedProps
      );
    }

    return child;
  };

  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, cloneChild)}
      {label && (
        <label
          htmlFor={id}
          className="absolute text-sm duration-300 text-primary-blue-100 transform -translate-y-3.5 scale-75 top-5 z-10 origin-[0] start-3 cursor-text
                     peer-focus:text-primary-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                     peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
      )}
    </div>
  );
}
