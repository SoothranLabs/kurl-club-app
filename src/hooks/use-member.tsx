import { useState } from 'react';
import { useSearch } from '@/hooks/use-search';
import { searchItems } from '@/lib/utils';
import { Member } from '@/types';

export function useMember(initialData: Member[]) {
  const [members, setMembers] = useState<Member[]>(initialData);

  const {
    items: filteredMembers,
    search,
    searchTerm,
  } = useSearch<Member>(members, searchItems);

  // Update the members state by appending new members
  const addMembers = (newMembers: Member[]) => {
    setMembers((prevMembers) => [...prevMembers, ...newMembers]);
  };

  return {
    members: filteredMembers,
    addMembers,
    search,
    searchTerm,
  };
}
