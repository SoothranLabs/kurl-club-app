'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';

interface PhoneInputProps {
  value: string;
  onChange: (value?: string) => void;
  disabled?: boolean;
}

export function CustomPhoneInput({
  value,
  onChange,
  disabled,
}: PhoneInputProps) {
  return (
    <PhoneInput
      international
      countryCallingCodeEditable={false}
      defaultCountry="IN"
      value={value}
      onChange={(value) => onChange(value ?? '')}
      disabled={disabled}
      className="bg-gray-800 border-0 rounded-md text-white"
    />
  );
}
