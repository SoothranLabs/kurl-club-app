'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';
import { KFormField, KFormFieldType } from './form/k-formfield';
import { Form } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { SamplePageSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

interface Option {
  id: number;
  label: string;
  src?: string;
}
interface EditableFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => void;
  isEditing: boolean;
  type?: 'text' | 'dropdown' | 'textArea' | 'phone' | 'datePicker' | string;
  options?: Option[];
  className?: string;
  suffix?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  name,
  value,
  onChange,
  isEditing,
  type = 'text',
  options = [],
  className,
  suffix,
}) => {
  const form = useForm<z.infer<typeof SamplePageSchema>>({
    resolver: zodResolver(SamplePageSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      privacyConsent: false,
      fullName: '',
      familyHistory: '',
      phoneNumber: '',
      identificationType: '',
      dateOfBirth: undefined,
      identificationDocument: '',
      otp: '',
      websiteUrl: '',
    },
  });

  return (
    <Form {...form}>
      <form className="">
        <div className={className}>
          <Label
            className="text-primary-blue-100 font-normal text-sm leading-normal"
            htmlFor={name}
          >
            {label}
          </Label>
          {isEditing ? (
            type === 'dropdown' ? (
              <Select
                name={name}
                value={value}
                onValueChange={(value) => onChange({ target: { name, value } })}
              >
                <SelectTrigger className="border-0 border-b-[1px] rounded-none focus:outline-none focus:shadow-none focus:ring-0 p-0 h-auto text-[15px] text-white font-normal leading-normal pb-2 border-primary-blue-300 focus:border-white hover:border-white k-transition focus:outline-0">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  {options.map((option) => (
                    <SelectItem
                      className="shad-select-item"
                      key={option.id}
                      value={option.label}
                    >
                      <div className="flex items-center gap-2">
                        {option.src && (
                          <span className="w-6 h-6 flex items-center justify-center">
                            <Image
                              height={24}
                              width={24}
                              src={option.src}
                              alt={option.label}
                              className="rounded-full object-cover"
                            />
                          </span>
                        )}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === 'textArea' ? (
              <Textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="resize-none border-0 border-b-[1px] border-primary-blue-300 k-transition rounded-none p-0 !text-[15px] focus:border-b-whit focus-visible:outline-0 hover:border-white focus-visible:border-b-white focus-visible:ring-0"
              />
            ) : type === 'phone' ? (
              <KFormField
                fieldType={KFormFieldType.PHONE_INPUT}
                // value={value.toString()}
                control={form.control}
                name="phoneNumber"
                label="Phone number"
                placeholder="(555) 123-4567"
                className="bg-transparent pb-1.5 border-b-[1px] border-primary-blue-300 hover:border-white k-transition"
              />
            ) : type === 'datePicker' ? (
              <KFormField
                fieldType={KFormFieldType.DATE_PICKER}
                control={form.control}
                name="dateOfBirth"
                label="Date of birth"
                numberOfMonths={1}
                dateLabel="Pick a date range"
                showPresets
              />
            ) : (
              <div className="flex items-center pb-1.5 border-b-[1px] gap-2 border-primary-blue-300 group focus-within:border-white hover:border-white k-transition">
                <Input
                  maxLength={suffix ? 6 : undefined}
                  id={name}
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="border-0 rounded-none h-auto p-0 !text-[15px] focus-visible:outline-0 focus-visible:ring-0"
                />
                {suffix && <span id={name}>{suffix}</span>}
              </div>
            )
          ) : (
            <div className="flex items-center gap-1">
              <p className="text-white text-[15px] leading-[140%] font-normal">
                {value}
              </p>
              {suffix && (
                <span className="block text-white text-[15px] leading-[140%] font-normal">
                  {suffix}
                </span>
              )}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
