import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KChat, KEdit, KTrash } from '../icons';
import InfoCard from '../cards/info-card';
import { Clock } from 'lucide-react';

export default function Header() {
  const cards = {
    id: 1,
    icon: <Clock size={20} strokeWidth={1.75} color="#151821" />,
    color: 'primary-green-500',
    title: 'Total hours spend',
    count: 10,
  };
  return (
    <div className="container">
      <div className="flex  justify-between py-6 h-[40px] mt-[26px]">
        <div className="flex items-center ">
          <Badge className="flex items-center gap-2 bg-secondary-blue-500 w-[69px] h-[30px] rounded-[24px] px-2 py-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Active
          </Badge>
        </div>

        <div className="flex items-center gap-2 ">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 border-[1px] rounded-[8px] border-[#282B32]"
          >
            <KChat className="w-4 h-4 text-yellow-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 border-[1px] rounded-[8px] border-[#282B32]"
          >
            <KEdit className="w-4 h-4 text-yellow-400" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 border-[1px] rounded-[8px] border-[#282B32]"
          >
            <KTrash className="w-4 h-4 text-red-500" />
            Delete
          </Button>
        </div>
      </div>
      <InfoCard item={cards} className="w-[332px] mt-7" />
    </div>
  );
}
