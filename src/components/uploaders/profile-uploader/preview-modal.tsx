import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
  onDelete: () => void;
  onReupload: () => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  src,
  onDelete,
  onReupload,
}: PreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Picture Preview</DialogTitle>
        </DialogHeader>
        {src && (
          <div className="flex justify-center">
            <Image
              src={src}
              alt="Profile picture"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        )}
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onReupload}>Re-upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
