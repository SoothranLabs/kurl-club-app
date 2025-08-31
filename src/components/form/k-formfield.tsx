'use client';

import { E164Number } from 'libphonenumber-js/core';
import {
  Control,
  FieldValues,
  FieldPath,
  ControllerRenderProps,
} from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Checkbox } from '@/components/ui/checkbox';
import { KSelect } from '@/components/form/k-select';
import { KInput } from '@/components/form/k-input';
import { KPassword } from '@/components/form/k-password';
import { KTextarea } from '@/components/form/k-textarea';
import { KDatePicker } from '@/components/form/k-datepicker';
import { KMultiSelect } from '@/components/form/k-multi-select';

export enum KFormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PASSWORD = 'password',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  MULTISELECT = 'multiSelect',
  OTP = 'otp',
  SKELETON = 'skeleton',
}

interface Option {
  label: string;
  value: string;
}

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: KFormFieldType;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: React.ReactNode;
  disabled?: boolean;
  dateFormat?: string;
  numberOfMonths?: number;
  mode?: 'range' | 'single';
  dateLabel?: string;
  showPresets?: boolean;
  showYearSelector?: boolean;
  children?: React.ReactNode;
  className?: string;
  suffix?: string;
  maxLength?: number;
  mandetory?: boolean;
  options?: Option[];
  renderSkeleton?: (
    field: ControllerRenderProps<T, FieldPath<T>>
  ) => React.ReactNode;
}

const RenderField = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T, FieldPath<T>>;
  props: CustomProps<T>;
}) => {
  const {
    fieldType,
    placeholder,
    renderSkeleton,
    children,
    name,
    label,
    iconSrc,
    numberOfMonths,
    dateLabel,
    mode,
    showPresets,
    showYearSelector,
    className,
    suffix,
    maxLength,
    mandetory,
  } = props;

  switch (fieldType) {
    case KFormFieldType.INPUT:
      return (
        <FormControl>
          <div className="flex items-stretch">
            {iconSrc && (
              <div className="mr-2 bg-secondary-blue-600 h-[52px] w-[52px] p-2 rounded-md flex items-center justify-center">
                {iconSrc}
              </div>
            )}
            <div className="grow">
              <KInput
                label={label ?? 'Input'}
                id={name}
                placeholder=" "
                {...field}
                disabled={props.disabled}
                className={className}
                suffix={suffix}
                maxLength={maxLength}
                mandetory={mandetory}
              />
            </div>
          </div>
        </FormControl>
      );

    case KFormFieldType.TEXTAREA:
      return (
        <FormControl>
          <KTextarea
            label={label ?? 'Textarea'}
            id={name}
            placeholder=" "
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case KFormFieldType.PASSWORD:
      return (
        <FormControl>
          <KPassword
            label={label ?? 'Textarea'}
            id={name}
            placeholder=" "
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case KFormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={`peer ${className ? className : 'input-phone'}`}
          />
        </FormControl>
      );

    case KFormFieldType.SELECT:
      return (
        <FormControl>
          <KSelect
            value={field.value}
            onValueChange={field.onChange}
            label={label}
            options={props.options}
          >
            {children}
          </KSelect>
        </FormControl>
      );

    case KFormFieldType.MULTISELECT:
      return (
        <FormControl>
          <KMultiSelect
            options={props.options ?? []}
            selected={field.value || []}
            onChange={field.onChange}
            placeholder={props.placeholder}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case KFormFieldType.OTP:
      return (
        <FormControl>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={field.value}
            onChange={field.onChange}
          >
            <InputOTPGroup className="shad-otp">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="shad-otp-slot"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
      );

    case KFormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <KDatePicker
            numberOfMonths={numberOfMonths}
            label={dateLabel}
            showPresets={showPresets}
            showYearSelector={showYearSelector}
            onDateChange={field.onChange}
            value={field.value}
            mode={mode ?? 'range'}
            className={className}
            icon={iconSrc}
          />
        </FormControl>
      );

    case KFormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );

    case KFormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
};

export function KFormField<T extends FieldValues>(props: CustomProps<T>) {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {fieldType === KFormFieldType.SKELETON && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="text-alert-red-400 before:content-['*'] before:mr-px" />
        </FormItem>
      )}
    />
  );
}
