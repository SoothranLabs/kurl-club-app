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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { KFieldWrapper } from '@/components/form/k-field-wrapper';
import { KDatePicker } from '@/components/form/k-datepicker';

export enum KFormFieldType {
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
          <KFieldWrapper label={label} id={name}>
            <input type="text" {...field} />
          </KFieldWrapper>
        </FormControl>
      );

    case KFormFieldType.TEXTAREA:
      return (
        <FormControl>
          <KFieldWrapper label={label} id={name}>
            <textarea {...field} disabled={props.disabled} />
          </KFieldWrapper>
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

    case KFormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <KDatePicker
            numberOfMonths={numberOfMonths}
            label={dateLabel}
            showPresets={showPresets}
            onChange={(date) => field.onChange(date)}
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
