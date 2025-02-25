import { Fragment } from 'react';
import { Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import type { EditableSectionProps } from '@/types/staff';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { KDatePicker } from '@/components/form/k-datepicker';
import { EditableField } from './basic-details-section';

export function PersonalInfoSection({
  isEditing,
  details,
  onUpdate,
}: EditableSectionProps) {
  return (
    <Fragment>
      {/* CALENDER | DOB  */}
      <div className="py-3 flex flex-col gap-2">
        <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
          DOB
        </Label>
        {isEditing ? (
          <KDatePicker
            icon={<Calendar />}
            mode="single"
            value={details?.dob ? new Date(details.dob) : undefined}
            onDateChange={(date) =>
              onUpdate('dob', date instanceof Date ? date.toISOString() : '')
            }
            label="Date of birth"
            className="bg-transparent border-0 border-b-[1px] border-primary-blue-300 rounded-none hover:bg-transparent hover:border-white k-transition p-0 h-auto w-full pb-1.5 text-white text-[15px] leading-[140%] font-normal gap-1 flex-row-reverse justify-between"
          />
        ) : (
          <p className="text-white text-[15px] leading-[140%] font-normal">
            {details?.dob
              ? format(parseISO(details.dob), 'MMM do, yyyy')
              : 'N/A'}
          </p>
        )}
      </div>

      {/* EMAIL  */}
      <EditableField
        label="Email"
        value={details?.email}
        isEditing={isEditing}
        onChange={(value) => onUpdate('email', value)}
      />

      {/* PHONE_NUMBER  */}
      <EditableField
        label="Mobile"
        value={details?.phone}
        isEditing={isEditing}
        onChange={(value) => onUpdate('phone', value || '')}
        customInput={
          <PhoneInput
            defaultCountry="IN"
            international
            countryCallingCodeEditable={false}
            value={details?.phone}
            onChange={(value) => onUpdate('phone', value || '')}
            disabled={!isEditing}
            className="peer bg-transparent pb-1.5 border-b-[1px] border-primary-blue-300 hover:border-white k-transition"
          />
        }
      />

      <div className="py-3 flex flex-col gap-2">
        <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
          Address
        </Label>
        {isEditing ? (
          <Textarea
            value={details?.fullAddress}
            onChange={(e) => onUpdate('fullAddress', e.target.value)}
            className="resize-none border-0 border-b-[1px] border-primary-blue-300 k-transition rounded-none p-0 !text-[15px] focus:border-b-whit focus-visible:outline-0 hover:border-white focus-visible:border-b-white focus-visible:ring-0"
          />
        ) : (
          <p className="text-white text-[15px] leading-[140%] font-normal">
            {details?.fullAddress}
          </p>
        )}
      </div>
    </Fragment>
  );
}
