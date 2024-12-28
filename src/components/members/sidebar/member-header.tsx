import { Badge } from '@/components/ui/badge';
import { getInitials } from '@/lib/utils';

interface MemberHeaderProps {
  name: string;
  memberSince: string;
  gymNo: string;
}

export function MemberHeader({ name, memberSince, gymNo }: MemberHeaderProps) {
  return (
    <>
      <div className="items-center mb-4">
        {/* TODO: Profile uploader */}
        <div className="w-16 h-16 bg-secondary-blue-500 rounded-full flex items-center justify-center text-xl font-normal text-neutral-green-300 mr-4 mb-3">
          {getInitials(name)}
        </div>
        <div>
          <h6 className="text-xl font-medium text-white">{name}</h6>
          <p className="text-sm text-primary-blue-50 mt-1">
            Member since {memberSince}
          </p>
        </div>
      </div>

      <Badge className="bg-neutral-ochre-500 flex items-center w-fit justify-center text-sm rounded-full h-[30px] py-[8.5px] px-4 mb-8 border border-neutral-ochre-800 bg-opacity-10">
        Gym no: #{gymNo}
      </Badge>
    </>
  );
}
