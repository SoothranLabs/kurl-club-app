'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import type { Editor } from '@tiptap/react';
import { Button } from '../ui/button';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const buttonStyle = (isActive: boolean) =>
    `px-3 py-1 text-sm rounded hover:bg-secondary-blue-500 ${
      isActive ? 'bg-black text-white' : ''
    }`;

  return (
    <div className="absolute bottom-5 right-5 flex items-center gap-1 bg-primary-blue-400/80 backdrop-blur-sm rounded-lg p-1 border border-slate-600/50 z-20">
      <Button
        variant="ghost"
        size="sm"
        className={`h-10 w-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700/50 ${buttonStyle(editor?.isActive('bold') ?? false)}`}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-5 w-5 font-bold" strokeWidth={2.5} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={`h-10 w-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700/50 ${buttonStyle(editor?.isActive('italic') ?? false)}`}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-5 w-5" strokeWidth={2} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={`h-10 w-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700/50 ${buttonStyle(editor?.isActive('list-item') ?? false)}`}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <ListOrdered className="h-5 w-5" strokeWidth={2} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={`h-10 w-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700/50 ${buttonStyle(editor?.isActive('list-disc') ?? false)}`}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <List className="h-5 w-5" strokeWidth={2} />
      </Button>
    </div>
  );
};

type RichTextEditorProps = {
  content: string;
  onUpdate?: (value: string) => void;
};

export default function RichTextEditor({
  content,
  onUpdate,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
  });

  return (
    <div className="relative w-full bg-secondary-blue-500 overflow-hidden min-h-[220px] pb-20">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none mt-4 p-5 rounded shadow text-white"
        style={{
          // Ensure ProseMirror root uses white text
          color: 'white',
        }}
      />
      <style jsx global>{`
        .ProseMirror {
          color: white !important;
        }
      `}</style>
    </div>
  );
}
