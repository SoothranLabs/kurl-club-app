import { Fragment } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { EditableSectionProps } from '@/types/members';

export function AddressDetailsSection({
  isEditing,
  details,
  onUpdate,
}: EditableSectionProps) {
  return (
    <Fragment>
      <div className="py-3 flex flex-col gap-2">
        <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
          Address
        </Label>
        {isEditing ? (
          <Textarea
            value={details.address}
            onChange={(e) => onUpdate('address', e.target.value)}
            className="resize-none border-0 border-b-[1px] border-primary-blue-300 k-transition rounded-none p-0 !text-[15px] focus:border-b-whit focus-visible:outline-0 hover:border-white focus-visible:border-b-white focus-visible:ring-0"
          />
        ) : (
          <p className="text-white text-[15px] leading-[140%] font-normal">
            {details.address}
          </p>
        )}
      </div>

      <div className="py-3 flex flex-col gap-2">
        <Label className="text-primary-blue-100 font-normal text-sm leading-normal">
          PIN
        </Label>
        {isEditing ? (
          <Input
            value={details.pin}
            onChange={(e) => onUpdate('pin', e.target.value)}
            className="border-0 rounded-none h-auto p-0 !text-[15px] focus-visible:outline-0 focus-visible:ring-0"
          />
        ) : (
          <p className="text-white text-[15px] leading-[140%] font-normal">
            {details.pin}
          </p>
        )}
      </div>
    </Fragment>
  );
}
