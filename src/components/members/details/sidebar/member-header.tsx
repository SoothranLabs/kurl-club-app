import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { getInitials } from '@/lib/utils';
import { EditableSectionProps } from '@/types/members';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export function MemberHeader({
  memberSince,
  gymNo,
  isEditing,
  details,
  onUpdate,
}: EditableSectionProps) {
  return (
    <>
      <div className="items-center mb-4">
        <div className="mb-3">
          {isEditing ? (
            <ProfilePictureUploader isSmall />
          ) : (
            <Avatar
              className={`flex justify-center items-center size-[64px] cursor-default rounded-full bg-secondary-blue-500`}
            >
              <AvatarImage src={''} alt="Profile picture" />
              <AvatarFallback className="text-neutral-green-300 font-medium text-xl leading-normal">
                {getInitials(details.name)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div>
          {isEditing ? (
            <div className="flex items-center pb-1.5 border-b-[1px] gap-2 border-primary-blue-300 group focus-within:border-white hover:border-white k-transition">
              <Input
                value={details.name}
                onChange={(e) => onUpdate('name', e.target.value)}
                className="border-0 font-medium rounded-none h-auto p-0 !text-[20px] focus-visible:outline-0 focus-visible:ring-0"
              />
            </div>
          ) : (
            <h6 className="text-xl font-medium text-white">{details.name}</h6>
          )}
          <p className="text-sm text-primary-blue-50 mt-1">
            Member since {memberSince}
          </p>
        </div>
      </div>
      <Badge className="bg-neutral-ochre-500 flex items-center w-fit justify-center text-sm rounded-full h-[30px] py-[8.5px] px-4 mb-8 border border-neutral-ochre-800 bg-opacity-10">
        Member Id: <span className="uppercase ml-1">{gymNo}</span>
      </Badge>
    </>
  );
}
