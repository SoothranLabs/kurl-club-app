// import InfoCard from '@/components/shared/cards/info-card';
import { Clock4 } from 'lucide-react';

import ProfilePictureUploader from '@/components/shared/uploaders/profile-uploader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';
import { base64ToFile } from '@/lib/utils';
import { EditableSectionProps } from '@/types/members';

export function MemberHeader({
  isEditing,
  details,
  onUpdate,
}: EditableSectionProps) {
  return (
    <div className="bg-secondary-blue-500 rounded-lg flex items-start justify-between p-5">
      {/* <div className="items-center"> */}
      {/* <div> */}
      <div className="flex gap-4">
        {isEditing ? (
          <ProfilePictureUploader
            files={
              details?.profilePicture instanceof File
                ? details.profilePicture
                : details?.profilePicture
                  ? base64ToFile(details.profilePicture, 'profile.png')
                  : null
            }
            onChange={(file) => {
              if (file) {
                onUpdate('profilePicture', file);
              } else {
                onUpdate('profilePicture', null);
              }
            }}
            isSmall
          />
        ) : (
          <Avatar className="size-[100px]">
            <AvatarImage
              src={`data:image/png;base64,${details?.profilePicture}`}
              alt="Profile picture"
            />
            <AvatarFallback
              className="font-medium text-[26px] leading-normal"
              style={getAvatarColor(details?.name || '')}
            >
              {getInitials(details?.name || '')}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <div className="flex items-center pb-1.5 border-b gap-2 border-primary-blue-300 group focus-within:border-white hover:border-white k-transition">
              <Input
                value={details?.name}
                onChange={(e) => onUpdate('name', e.target.value)}
                className="border-0 font-medium rounded-none h-auto p-0 text-[20px]! focus-visible:outline-0 focus-visible:ring-0"
              />
            </div>
          ) : (
            <h6 className="text-xl font-medium text-white">{details?.name}</h6>
          )}
          <Badge className="bg-neutral-ochre-500 flex items-center w-fit justify-center text-sm rounded-full h-[30px] py-[8.5px] px-4 border border-neutral-ochre-800 bg-opacity-10">
            Member ID:{' '}
            <span className="uppercase ml-1">{details?.memberIdentifier}</span>
          </Badge>
          <p className="text-sm text-primary-blue-50">
            Member since {details?.doj}
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-1.5 flex-col p-4 rounded-lg cursor-pointer bg-primary-blue-400 w-[120px]">
          <Clock4 className="text-primary-green-500 size-5" />
          <span
            className="text-white font-bold text-lg leading-tight 
            transform transition-all duration-300 group-hover:scale-105 origin-left block"
          >
            10
          </span>
          <p
            className="text-white/70 font-medium text-xs leading-tight truncate 
            group-hover:text-white/80 transition-colors duration-300"
          >
            Total hours
          </p>
        </div>
      </div>
      {/* </div> */}
      {/* <InfoCard
              item={{
                id: 1,
                icon: <Clock4  className="text-black" />,
                color: 'primary-green-500',
                title: 'Total hours spent',
                count: 10,
              }}
              className="max-w-[332px]! w-full md:mt-4"
            /> */}
      {/* </div> */}
    </div>
  );
}
