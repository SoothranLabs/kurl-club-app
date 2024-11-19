import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KView, KViewOff } from '../icons';

type KFieldWrapperProps = {
  label?: string;
  id: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'textarea' | 'number';
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
};

export function KFieldWrapper({
  label,
  id,
  className = '',
  type = 'text',
  value,
  onChange,
  disabled,
}: KFieldWrapperProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (type === 'textarea') resizeTextarea();
  }, [resizeTextarea, type]);

  const commonProps = {
    id,
    value,
    onChange,
    disabled,
    placeholder: ' ',
    className: `peer k-input ${className}`,
  };

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          ref={textareaRef}
          onInput={resizeTextarea}
          className={`resize-none min-h-[150px] max-h-[150px] ${commonProps.className}`}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
      />
    );
  };

  return (
    <div className={`relative flex items-center group ${className}`}>
      {renderInput()}
      {type === 'password' && value && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-blue-100"
          tabIndex={-1}
        >
          {isPasswordVisible ? <KView /> : <KViewOff />}
        </button>
      )}
      {label && (
        <label
          htmlFor={id}
          className="absolute text-sm duration-300 text-primary-blue-100 transform -translate-y-3.5 scale-75 top-5 z-10 origin-[0] start-4 cursor-text
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
            peer-focus:scale-75 peer-focus:-translate-y-3.5"
        >
          {label}
        </label>
      )}
    </div>
  );
}
