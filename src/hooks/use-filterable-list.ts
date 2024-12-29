import { useState } from 'react';
import { useSearch } from '@/hooks/use-search';

type SearchFunction<T> = (items: T[], term: string) => T[];

export function useFilterableList<T>(
  initialData: T[] = [],
  searchFunction: SearchFunction<T>
) {
  const [items, setItems] = useState<T[]>(initialData);

  const {
    items: filteredItems,
    search,
    searchTerm,
  } = useSearch<T>(items, searchFunction);

  const addItems = (newItems: T[]) => {
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  return {
    items: filteredItems,
    addItems,
    search,
    searchTerm,
  };
}
