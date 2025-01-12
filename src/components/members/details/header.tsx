import MemberStatusBadge from '@/components/badges/member-status-badge';
import { KEdit } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { MessageSquareText, Trash2 } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <MemberStatusBadge status="active" />
      <div className="flex items-center gap-2">
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
  );
}

export default Header;
