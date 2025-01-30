import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials } from '@/lib/utils';
import { User } from '@/types/user';

type UserCardProps = {
  user: User;
  active: boolean;
  onClick: (id: string) => void;
};

const UserCard = ({ user, active, onClick }: UserCardProps) => (
  <div
    onClick={() => onClick(user.user_id)}
    className={`w-full cursor-pointer hover:bg-secondary-blue-500 k-transition flex items-start justify-between px-8 py-3 ${active ? 'bg-secondary-blue-500' : ''}`}
  >
    <div className="flex items-start gap-2">
      <Avatar className="flex justify-center items-center size-[28px] cursor-default rounded-full bg-secondary-blue-400">
        <AvatarImage src={user.picture} alt="Profile picture" />
        <AvatarFallback className="text-neutral-green-300 font-medium text-sm leading-normal">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h6 className="text-white text-base leading-normal font-normal">
          {user.name}
        </h6>
        <p className="mt-2 text-sm text-secondary-blue-100 font-normal leading-normal">
          {user.user_id}
        </p>
      </div>
    </div>
    <Badge className="bg-neutral-ochre-600 flex items-center w-fit justify-center text-sm rounded-full h-[25px] py-[6px] px-3 border border-neutral-ochre-600 bg-opacity-10">
      {user.package}
    </Badge>
  </div>
);

export default UserCard;
