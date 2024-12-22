'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (term: string) => void;
}

export function Search({ onSearch, ...props }: SearchProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        className="pl-10 bg-secondary-blue-500 rounded-md text-white border-0 appearance-none hover:outline-secondary-blue-400  hover:outline-1 hover:outline transition-colors ease-in-out"
        onChange={handleSearch}
        {...props}
      />
    </div>
  );
}
