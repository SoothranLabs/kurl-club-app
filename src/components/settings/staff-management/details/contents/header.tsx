'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MessageSquareText, Trash2 } from 'lucide-react';

import { useAppDialog } from '@/hooks/use-app-dialog';
import { deleteStaff } from '@/services/staff';

import { KEdit } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isEditing: boolean;
  handleSave: () => void;
  toggleEdit: () => void;
  staffId: string;
}

function Header({ isEditing, handleSave, toggleEdit, staffId }: HeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { showConfirm } = useAppDialog();

  const handleDeleteStaff = (id: string) => {
    showConfirm({
      title: `Delete Staff`,
      description: `Are you sure you want to delete this staff from your Database? This action cannot be undone.`,
      variant: 'destructive',
      confirmLabel: 'Delete',
      onConfirm: async () => {
        const response = await deleteStaff(id);

        if (response.success) {
          toast.success(response.success);
          router.push('/members');
          queryClient.invalidateQueries({ queryKey: ['gymStaffs'] });
        } else {
          toast.error(response.error || 'Failed to delete staff.');
        }
      },
    });
  };

  return (
    <div className="flex p-8 pb-4 w-full items-center justify-between gap-3">
      <h3 className="text-white font-medium text-xl leading-normal">
        Staff management
      </h3>
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
              variant="destructive"
              onClick={() => handleDeleteStaff(staffId)}
            >
              <Trash2 className="!h-5 !w-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
