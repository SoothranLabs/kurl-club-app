import { Fragment } from 'react';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { KDatePicker } from '@/components/form/k-datepicker';
import { Calendar } from 'lucide-react';
import { BloodGroup, EditableSectionProps, Gender } from '@/types/user';

export function BasicDetailsSection({
  isEditing,
  details,
  onUpdate,
}: EditableSectionProps) {
  return (
    <Fragment>
      {/* EMAIL  */}
      <EditableField
        label="Email"
        value={details.email}
        isEditing={isEditing}
        onChange={(value) => onUpdate('email', value)}
      />

      {/* PHONE_NUMBER  */}
      <EditableField
        label="Mobile"
        value={details.mobile}
        isEditing={isEditing}
        onChange={(value) => onUpdate('mobile', value || '')}
        customInput={
          <PhoneInput
            defaultCountry="IN"
            international
            countryCallingCodeEditable={false}
            value={details.mobile}
            onChange={(value) => onUpdate('mobile', value || '')}
            disabled={!isEditing}
            className="peer bg-transparent pb-1.5 border-b-[1px] border-primary-blue-300 hover:border-white k-transition"
          />
        }
      />

      {/* CALENDER | DOB  */}
      <div className="py-3 flex flex-col gap-2">
        <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
          DOB
        </Label>
        {isEditing ? (
          <KDatePicker
            icon={<Calendar />}
            mode="single"
            value={details.dob ? new Date(details.dob) : undefined}
            onDateChange={(date) =>
              onUpdate('dob', date instanceof Date ? date.toISOString() : '')
            }
            label="Date of birth"
            className="bg-transparent border-0 border-b-[1px] border-primary-blue-300 rounded-none hover:bg-transparent hover:border-white k-transition p-0 h-auto w-full pb-1.5 text-white text-[15px] leading-[140%] font-normal gap-1 flex-row-reverse justify-between"
          />
        ) : (
          <p className="text-white text-[15px] leading-[140%] font-normal">
            {format(parseISO(details.dob), 'MMM do, yyyy')}
          </p>
        )}
      </div>

      {/* CALENDER | DOJ  */}
      <div className="py-3 flex flex-col gap-2">
        <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
          DOJ
        </Label>
        {isEditing ? (
          <KDatePicker
            icon={<Calendar />}
            mode="single"
            value={details.doj ? new Date(details.doj) : undefined}
            onDateChange={(date) =>
              onUpdate('doj', date instanceof Date ? date.toISOString() : '')
            }
            label="Date of birth"
            className="bg-transparent border-0 border-b-[1px] border-primary-blue-300 rounded-none hover:bg-transparent hover:border-white k-transition p-0 h-auto w-full pb-1.5 text-white text-[15px] leading-[140%] font-normal gap-1 flex-row-reverse justify-between"
          />
        ) : (
          <p className="text-white text-[15px] leading-[140%] font-normal">
            {format(parseISO(details.doj), 'MMM do, yyyy')}
          </p>
        )}
      </div>

      {/* BLOOD_GROUP  */}
      <EditableSelect<BloodGroup>
        label="Blood Group"
        value={details.bloodGroup}
        isEditing={isEditing}
        onChange={(value) => onUpdate('bloodGroup', value)}
        options={[
          { value: 'A+', label: 'A+' },
          { value: 'B+', label: 'B+' },
          { value: 'O+', label: 'O+' },
          { value: 'AB+', label: 'AB+' },
          { value: 'A-', label: 'A-' },
          { value: 'B-', label: 'B-' },
          { value: 'O-', label: 'O-' },
          { value: 'AB-', label: 'AB-' },
        ]}
      />

      {/* GENDER  */}
      <EditableSelect<Gender>
        label="Sex"
        value={details.gender}
        isEditing={isEditing}
        onChange={(value) => onUpdate('gender', value)}
        options={[
          {
            value: 'Male',
            label: 'Male',
          },
          {
            value: 'Female',
            label: 'Female',
          },
          {
            value: 'Transgender',
            label: 'Transgender',
          },
        ]}
      />
    </Fragment>
  );
}

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  suffix?: string;
  customInput?: React.ReactNode;
}

function EditableField({
  label,
  value,
  isEditing,
  onChange,
  suffix,
  customInput,
}: EditableFieldProps) {
  return (
    <div className="py-3 flex flex-col gap-2">
      <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
        {label}
      </Label>
      {isEditing ? (
        customInput ? (
          customInput
        ) : (
          <div className="flex items-center pb-1.5 border-b-[1px] gap-2 border-primary-blue-300 group focus-within:border-white hover:border-white k-transition">
            <Input
              maxLength={suffix ? 6 : undefined}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="border-0 rounded-none h-auto p-0 !text-[15px] focus-visible:outline-0 focus-visible:ring-0"
            />
            {suffix && (
              <span className="text-white text-[15px] leading-[140%] font-normal">
                {suffix}
              </span>
            )}
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
  );
}

interface EditableSelectProps<T extends string> {
  label: string;
  value: T;
  isEditing: boolean;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string; avatar?: string }>;
}

function EditableSelect<T extends string>({
  label,
  value,
  isEditing,
  onChange,
  options,
}: EditableSelectProps<T>) {
  return (
    <div className="py-3 flex flex-col gap-2">
      <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
        {label}
      </Label>
      {isEditing ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-0 border-b-[1px] rounded-none focus:outline-none focus:shadow-none focus:ring-0 p-0 h-auto text-[15px] text-white font-normal leading-normal pb-2 border-primary-blue-300 focus:border-white hover:border-white k-transition focus:outline-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {options.map((option) => (
              <SelectItem
                className="shad-select-item"
                key={option.value}
                value={option.value}
              >
                <div className="flex items-center gap-2">
                  {option.avatar && (
                    <span className="w-6 h-6 flex items-center justify-center">
                      <Image
                        height={24}
                        width={24}
                        src={option.avatar}
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
      ) : (
        <p className="text-white text-[15px] leading-[140%] font-normal">
          {value}
        </p>
      )}
    </div>
  );
}
