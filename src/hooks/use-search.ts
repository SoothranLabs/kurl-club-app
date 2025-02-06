'use client';

import { useState, useCallback, useEffect } from 'react';

type SearchFunction<T> = (items: T[], searchTerm: string) => T[];

export function useSearch<T>(
  initialItems: T[],
  searchFunction: SearchFunction<T>
) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  const search = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term.trim() === '') {
        setItems(initialItems);
      } else {
        const filteredItems = searchFunction(initialItems, term);
        setItems(filteredItems.length > 0 ? filteredItems : []);
      }
    },
    [initialItems, searchFunction]
  );

  // Prevent unnecessary updates by checking if the items actually changed
  useEffect(() => {
    setItems((prevItems) =>
      prevItems.length === initialItems.length &&
      prevItems.every((item, index) => item === initialItems[index])
        ? prevItems
        : initialItems
    );
  }, [initialItems]);

  return { items, search, searchTerm };
}
