import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { getInitials } from '@/lib/utils';
import { EditableSectionProps } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';

export function UserHeader({
  role,
  trainerNo,
  isEditing,
  details,
  onUpdate,
}: EditableSectionProps) {
  return (
    <>
      <div className="items-center mb-4">
        <div className="mb-3">
          {isEditing ? (
            <ProfilePictureUploader files={null} onChange={() => {}} isSmall />
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

          <div className="flex items-center gap-2 mt-2">
            <span className="h-[18px] w-[18px]">
              <Image
                alt=""
                src={`/assets/svg/${role === 'Trainer' ? 'trainer-icon' : role === 'Admin' ? 'admin-icon' : 'staff-icon'}.svg`}
                height={18}
                width={18}
              />
            </span>
            <p className="text-white text-sm leading-normal font-normal">
              {role}
            </p>
          </div>
        </div>
      </div>
      <Badge className="bg-neutral-ochre-500 flex items-center w-fit justify-center text-sm rounded-full h-[30px] py-[8.5px] px-4 border border-neutral-ochre-800 bg-opacity-10">
        Trainer no: #{trainerNo}
      </Badge>
    </>
  );
}
