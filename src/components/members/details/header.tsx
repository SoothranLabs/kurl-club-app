'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MessageSquareText, Trash2 } from 'lucide-react';

import { useAppDialog } from '@/hooks/use-app-dialog';
import { deleteMember } from '@/services/member';

import MemberStatusBadge from '@/components/badges/member-status-badge';
import { KEdit } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isEditing: boolean;
  handleSave: () => void;
  toggleEdit: () => void;
  memberId: string;
}

function Header({ isEditing, handleSave, toggleEdit, memberId }: HeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { showConfirm } = useAppDialog();

  const handleDeleteCustomer = (id: string) => {
    showConfirm({
      title: `Delete Member`,
      description: `Are you sure you want to delete this member from your Database? This action cannot be undone.`,
      variant: 'destructive',
      confirmLabel: 'Delete',
      onConfirm: async () => {
        const response = await deleteMember(id);

        if (response.success) {
          toast.success(response.success);
          router.push('/members');
          queryClient.invalidateQueries({ queryKey: ['gymMembers'] });
        } else {
          toast.error(response.error || 'Failed to delete member.');
        }
      },
    });
  };

  return (
    <div className="flex sticky pt-[26px] pb-4 z-20 drop-shadow-xl top-[80px] w-full items-center bg-primary-blue-500 justify-between gap-3">
      <MemberStatusBadge status="active" />
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={toggleEdit}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </>
        ) : (
          <>
            <Button className="h-10 w-10" variant="outline">
              <MessageSquareText className="text-primary-green-500 !h-5 !w-5" />
            </Button>
            <Button className="h-10" variant="outline" onClick={toggleEdit}>
              <KEdit className="!h-5 !w-5" />
              Edit
            </Button>
            <Button
              className="h-10"
              variant="outline"
              onClick={() => handleDeleteCustomer(memberId)}
            >
              <Trash2 className="text-primary-green-500 !h-5 !w-5" />
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
