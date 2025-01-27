import { KEdit } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className="flex p-8 pb-4 w-full items-center justify-between gap-3">
      <h3 className="text-white font-medium text-xl leading-normal">
        User management
      </h3>
      <div className="flex items-center gap-2">
        <Button className="h-10 w-10" variant="outline">
          <MessageSquareText className="text-primary-green-500 !h-5 !w-5" />
        </Button>
        <Button className="h-10" variant="outline">
          <KEdit className="!h-5 !w-5" />
          Edit
        </Button>
      </div>
    </div>
  );
}

export default Header;
