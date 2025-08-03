import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className="flex items-center w-full justify-between">
      <h4 className="text-white font-medium leading-normal text-xl">
        Packages
      </h4>
      <Button className="h-10">
        <Plus className="text-black !h-5 !w-5" />
        Add new
      </Button>
    </div>
  );
}

export default Header;
