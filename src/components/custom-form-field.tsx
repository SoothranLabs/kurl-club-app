'use client';

import { E164Number } from 'libphonenumber-js/core';
import {
  Control,
  FieldValues,
  FieldPath,
  ControllerRenderProps,
} from 'react-hook-form';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
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
    iconSrc,
    iconAlt,
    placeholder,
    renderSkeleton,
    children,
    name,
    label,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
            // <span className="ml-2">{iconSrc}</span>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>{/* Add date picker component here */}</FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
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

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
};

/**
 * CustomFormField - A flexible and reusable form input component built to integrate with React Hook Form.
 * Supports multiple field types (input, textarea, select, phone input, date picker, checkbox).
 *
 * @template T - The type of form values.
 *
 * @param {Control<T>} control - Required. The control instance from `react-hook-form`, used to manage field state.
 * @param {FormFieldType} fieldType - Required. Specifies the type of input field to render.
 * - `FormFieldType.INPUT`: A standard text input field.
 * - `FormFieldType.TEXTAREA`: A multi-line textarea field.
 * - `FormFieldType.PHONE_INPUT`: A phone input field with international formatting.
 * - `FormFieldType.CHECKBOX`: A checkbox input.
 * - `FormFieldType.DATE_PICKER`: A date picker input (needs an additional component).
 * - `FormFieldType.SELECT`: A dropdown select field.
 * - `FormFieldType.SKELETON`: Custom placeholder for skeleton loading.
 * @param {FieldPath<T>} name - Required. The name of the form field (must match the form schema).
 * @param {string} [label] - Optional. Label text displayed above the field (except for checkboxes).
 * @param {string} [placeholder] - Optional. Placeholder text for input, select, or phone input.
 * @param {string} [iconSrc] - Optional. Icon source path for inputs needing an icon.
 * @param {string} [iconAlt] - Optional. Alt text for the icon (for accessibility).
 * @param {boolean} [disabled] - Optional. Disables the field if set to true.
 * @param {string} [dateFormat] - Optional. Custom format for date inputs (used with DATE_PICKER type).
 * @param {boolean} [showTimeSelect] - Optional. Show a time selector in date picker fields.
 * @param {React.ReactNode} [children] - Optional. Elements rendered inside the select field dropdown.
 * @param {(field: ControllerRenderProps<T, FieldPath<T>>) => React.ReactNode} [renderSkeleton] - Optional. Render function for skeleton placeholder (only for SKELETON type).
 */
const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
