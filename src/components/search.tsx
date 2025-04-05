'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (term: string) => void;
  className?: string;
}

export function Search({ onSearch, className, ...props }: SearchProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        className={`pl-10 bg-secondary-blue-500 rounded-md text-white border-transparent appearance-none !ring-0  transition-colors hover:border-secondary-blue-400 focus:border-secondary-blue-400 ease-in-out ${className ? className : ''}`}
        onChange={handleSearch}
        {...props}
      />
    </div>
  );
}
