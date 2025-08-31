'use client';

import type { MessageChannel } from '@/types/messaging-template';
import { generateMessagePreview } from '@/lib/utils/messaging-templates';

interface MessageLivePreviewerProps {
  channel: MessageChannel;
  content: string;
}

export function MessageLivePreviewer({
  channel,
  content,
}: MessageLivePreviewerProps) {
  if (channel === 'whatsapp') {
    return <WhatsAppPreview content={content} />;
  }

  // Future: Add SMS, Email previews
  return null;
}

function WhatsAppPreview({ content }: { content: string }) {
  return (
    <div className="w-[210px] h-[300px] border border-primary-blue-400 rounded-md shadow-lg flex flex-col bg-primary-blue-500">
      {/* Header */}
      <div className="bg-emerald-800 p-3 flex items-center justify-between rounded-t-md h-8" />

      {/* Chat Body */}
      <div className="flex-1 relative overflow-hidden text-black">
        {/* Background overlay */}
        <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/assets/png/whatsapp-bg.png')] before:bg-repeat before:bg-[length:250px] before:opacity-20" />

        {/* Scrollable messages */}
        <div className="relative z-10 p-3 overflow-y-auto h-full">
          <div className="flex justify-center flex-col items-center">
            <div className="uppercase px-2 py-0.5 bg-slate-700 rounded text-white mb-3 text-[10px]">
              today
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-secondary-blue-400/85 rounded-lg rounded-tl-none p-1.5 max-w-[70%] text-xs shadow">
              {content ? (
                <div className="whitespace-pre-wrap text-primary-blue-50">
                  {generateMessagePreview(content)}
                </div>
              ) : (
                <span className="text-primary-blue-50 italic">
                  Start typing your message...
                </span>
              )}
              <p className="text-[10px] text-primary-blue-100 text-right mt-1">
                8:45 AM
              </p>
            </div>
          </div>
        </div>

        {/* Message Input (fixed inside chat body) */}
        <div className="absolute rounded-b-md bottom-0 left-0 w-full bg-secondary-blue-500 flex items-center gap-2 p-1 z-20">
          <input
            type="text"
            placeholder="Message"
            className="flex-1 text-xs outline-none px-2 py-1 rounded-md bg-primary-blue-400/60 placeholder-white/30"
            disabled
          />
          <div className="bg-emerald-800 p-2 rounded-full text-white text-sm w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
