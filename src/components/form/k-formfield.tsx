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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { KSelect } from '@/components/form/k-select';
import { Checkbox } from '@/components/ui/checkbox';
import { KFieldWrapper } from '@/components/form/k-field-wrapper';
import { KDatePicker } from '@/components/form/k-datepicker';

export enum KFormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PASSWORD = 'password',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: KFormFieldType;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  numberOfMonths?: number;
  dateLabel?: string;
  showPresets?: boolean;
  children?: React.ReactNode;
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
    numberOfMonths,
    dateLabel,
    showPresets,
  } = props;

  switch (fieldType) {
    case KFormFieldType.INPUT:
      return (
        <FormControl>
          <KFieldWrapper
            label={label}
            id={name}
            type="text"
            value={field.value}
            onChange={field.onChange}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case KFormFieldType.TEXTAREA:
      return (
        <FormControl>
          <KFieldWrapper
            label={label}
            id={name}
            type="textarea"
            value={field.value}
            onChange={field.onChange}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case KFormFieldType.PASSWORD:
      return (
        <FormControl>
          <KFieldWrapper
            label={label}
            id={name}
            type="password"
            value={field.value}
            onChange={field.onChange}
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
            className="peer input-phone"
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
          >
            {children}
          </KSelect>
        </FormControl>
      );

    case KFormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <KDatePicker
            numberOfMonths={numberOfMonths}
            label={dateLabel}
            showPresets={showPresets}
            onChange={field.onChange}
            value={field.value}
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
        <FormItem className="flex-1">
          {fieldType === KFormFieldType.SKELETON && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}
