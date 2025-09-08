'use client';

import { useEffect, useState } from 'react';

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
    setItems((prevItems) => [...new Set([...prevItems, ...newItems])]);
  };

  // Prevent unnecessary updates
  useEffect(() => {
    setItems((prevItems) =>
      prevItems.length === initialData.length &&
      prevItems.every((item, index) => item === initialData[index])
        ? prevItems
        : [...new Set([...prevItems, ...initialData])]
    );
  }, [initialData]);

  return {
    items: filteredItems,
    addItems,
    search,
    searchTerm,
  };
}
