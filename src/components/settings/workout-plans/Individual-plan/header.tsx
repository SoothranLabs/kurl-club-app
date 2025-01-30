import { KEdit } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/utils';
import { User } from '@/types/user';
import { MessageSquareText, Trash2 } from 'lucide-react';
import React from 'react';

function Header() {
  const userData: User = {
    name: 'Arjun Verma',
    joined_date: '13/03/2024',
    user_id: '12345',
    picture: '',
  };

  return (
    <div className="p-8 pb-7 sticky top-[80px] bg-primary-blue-500">
      <h5 className="text-white font-medium text-xl leading-normal ">
        Individual workout plans
      </h5>
      <div className="mt-[50px] items-start flex justify-between">
        {/* profile */}
        <div className="flex items-start gap-3">
          <Avatar
            className={`flex justify-center items-center size-[72px] cursor-default rounded-full bg-secondary-blue-500`}
          >
            <AvatarImage src={userData.picture} alt="Profile picture" />
            <AvatarFallback className="text-neutral-green-300 font-medium text-xl leading-normal">
              {getInitials(userData.name)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h6 className="text-white text-xl font-medium leading-normal capitalize">
              {userData.name}
            </h6>
            <p className="mt-1 text-white text-sm font-normal leading-normal">{`Member since ${userData.joined_date}`}</p>
            <Badge className="bg-neutral-ochre-600 flex items-center w-fit justify-center text-sm rounded-full h-[30px] py-[8.5px] px-3 mt-3 border border-neutral-ochre-600 bg-opacity-10">
              Gym no: #{userData.user_id}
            </Badge>
          </div>
        </div>
        {/* action buttons */}
        <div className="flex items-center gap-2 mt-4">
          <Button className="h-10 w-10" variant="outline">
            <MessageSquareText className="text-primary-green-500 !h-5 !w-5" />
          </Button>
          <Button className="h-10" variant="outline">
            <KEdit className="!h-5 !w-5" />
            Edit
          </Button>
          <Button className="h-10" variant="outline">
            <Trash2 className="text-primary-green-500 !h-5 !w-5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
