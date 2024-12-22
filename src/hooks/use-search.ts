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
        setItems(filteredItems);
      }
    },
    [initialItems, searchFunction]
  );

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return { items, search, searchTerm };
}
