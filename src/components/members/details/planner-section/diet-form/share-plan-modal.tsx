import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ClipboardCopy, Download, MessageCircle, Share } from 'lucide-react';

interface SharePlanModalProps {
  prescriptionText: string;
}

export function SharePlanModal({ prescriptionText }: SharePlanModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prescriptionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([prescriptionText], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kurlclub-nutrition-plan-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(prescriptionText)}`;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Share className="h-4 w-4 mr-2" />
        Share Plan
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl bg-secondary-blue-700 border-primary-blue-400">
          <DialogHeader>
            <DialogTitle>Share Nutrition Plan</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCopy} className="flex-1">
                <ClipboardCopy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Text'}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadTxt}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download .txt
              </Button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>

            <div className="rounded-md border bg-background/40 p-4">
              <div className="text-sm font-medium mb-2">Plan Preview:</div>
              <pre className="max-h-96 overflow-auto text-xs leading-6 whitespace-pre-wrap">
                {prescriptionText}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
