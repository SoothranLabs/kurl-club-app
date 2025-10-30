'use client';

import { useState } from 'react';

import { UserCheck, UserPlus, UserX } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAvatarColor, getInitials } from '@/lib/avatar-utils';

type Member = {
  id: string;
  name: string;
  identifier: string;
  isCheckedIn: boolean;
};

const mockMembers: Member[] = [
  { id: 'M001', name: 'John Doe', identifier: 'GYM001', isCheckedIn: false },
  { id: 'M002', name: 'Jane Smith', identifier: 'GYM002', isCheckedIn: true },
  { id: 'M003', name: 'Mike Chen', identifier: 'GYM003', isCheckedIn: false },
  {
    id: 'M004',
    name: 'Sarah Johnson',
    identifier: 'GYM004',
    isCheckedIn: true,
  },
  { id: 'M005', name: 'Emma Davis', identifier: 'GYM005', isCheckedIn: false },
];

type Props = {
  onCheckIn: (member: Member) => void;
  onCheckOut: (member: Member) => void;
  checkedInMembers: Set<string>;
};

export function MemberSearchCommand({
  onCheckIn,
  onCheckOut,
  checkedInMembers,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleAction = (member: Member) => {
    const isCheckedIn = checkedInMembers.has(member.id);
    if (isCheckedIn) {
      onCheckOut(member);
    } else {
      onCheckIn(member);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserPlus size={16} />
          Record Attendance
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 shad-select-content" align="end">
        <Command className="shad-command">
          <CommandInput
            placeholder="Search member..."
            className="shad-command-input"
          />
          <CommandList className="shad-command-list">
            <CommandEmpty className="shad-command-empty">
              No member found.
            </CommandEmpty>
            <CommandGroup className="shad-command-group">
              {mockMembers.map((member) => {
                const isCheckedIn = checkedInMembers.has(member.id);
                const avatarStyle = getAvatarColor(member.name);
                const initials = getInitials(member.name);

                return (
                  <CommandItem
                    key={member.id}
                    value={`${member.name} ${member.identifier}`}
                    className="shad-command-item px-3 py-2.5 !cursor-default"
                  >
                    <div className="flex items-center justify-between w-full gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-10 w-10 border-2 border-secondary-blue-400">
                            <AvatarFallback
                              className="text-xs font-semibold"
                              style={avatarStyle}
                            >
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          {isCheckedIn && (
                            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-primary-green-400 opacity-75"></span>
                              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white dark:border-secondary-blue-500 bg-primary-green-500"></span>
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-0 leading-none">
                            <span className="text-sm font-semibold dark:text-white truncate">
                              {member.name}
                            </span>
                            <span className="text-[9px] text-gray-400">
                              #{member.identifier}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={isCheckedIn ? 'destructive' : 'default'}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(member);
                        }}
                      >
                        {isCheckedIn ? (
                          <>
                            <UserX size={14} />
                            Check Out
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} />
                            Check In
                          </>
                        )}
                      </Button>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
