// src/components/common/forms/CustomTipTapEditor.tsx

'use client';

import React, { useRef, useCallback, ElementType } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code as CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import axiosInstance from '@/lib/api/axios';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CustomTipTapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  variant?: 'default' | 'create';
}

// --- Type Definitions for a more maintainable and type-safe toolbar ---
interface ToolbarActionProps {
  handleLink: () => void;
  handleImageUploadClick: () => void;
}

type ToolbarButtonConfig = {
  type: 'button';
  id: string;
  title: string;
  icon: ElementType;
  action: (editor: Editor, props?: Partial<ToolbarActionProps>) => void;
  level?: number;
  value?: string;
};

type ToolbarSeparatorConfig = {
  type: 'separator';
};

type ToolbarItemConfig = ToolbarButtonConfig | ToolbarSeparatorConfig;

// Konfigurasi toolbar tetap di luar untuk efisiensi dan kemudahan pemeliharaan
const toolbarConfig: ToolbarItemConfig[] = [
  {
    type: 'button',
    id: 'bold',
    title: 'Bold (Ctrl+B)',
    icon: Bold,
    action: (e) => e.chain().focus().toggleBold().run(),
  },
  {
    type: 'button',
    id: 'italic',
    title: 'Italic (Ctrl+I)',
    icon: Italic,
    action: (e) => e.chain().focus().toggleItalic().run(),
  },
  {
    type: 'button',
    id: 'underline',
    title: 'Underline (Ctrl+U)',
    icon: UnderlineIcon,
    action: (e) => e.chain().focus().toggleUnderline().run(),
  },
  {
    type: 'button',
    id: 'strike',
    title: 'Strikethrough',
    icon: Strikethrough,
    action: (e) => e.chain().focus().toggleStrike().run(),
  },
  {
    type: 'button',
    id: 'code',
    title: 'Inline Code',
    icon: CodeIcon,
    action: (e) => e.chain().focus().toggleCode().run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    id: 'heading',
    level: 1,
    title: 'Heading 1',
    icon: Heading1,
    action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    type: 'button',
    id: 'heading',
    level: 2,
    title: 'Heading 2',
    icon: Heading2,
    action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    type: 'button',
    id: 'heading',
    level: 3,
    title: 'Heading 3',
    icon: Heading3,
    action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    id: 'textAlign',
    value: 'left',
    title: 'Align Left',
    icon: AlignLeft,
    action: (e) => e.chain().focus().setTextAlign('left').run(),
  },
  {
    type: 'button',
    id: 'textAlign',
    value: 'center',
    title: 'Align Center',
    icon: AlignCenter,
    action: (e) => e.chain().focus().setTextAlign('center').run(),
  },
  {
    type: 'button',
    id: 'textAlign',
    value: 'right',
    title: 'Align Right',
    icon: AlignRight,
    action: (e) => e.chain().focus().setTextAlign('right').run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    id: 'bulletList',
    title: 'Bullet List',
    icon: List,
    action: (e) => e.chain().focus().toggleBulletList().run(),
  },
  {
    type: 'button',
    id: 'orderedList',
    title: 'Ordered List',
    icon: ListOrdered,
    action: (e) => e.chain().focus().toggleOrderedList().run(),
  },
  {
    type: 'button',
    id: 'blockquote',
    title: 'Quote',
    icon: Quote,
    action: (e) => e.chain().focus().toggleBlockquote().run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    id: 'link',
    title: 'Add Link',
    icon: LinkIcon,
    action: (editor, props) => props?.handleLink?.(),
  },
  {
    type: 'button',
    id: 'image',
    title: 'Add Image',
    icon: ImageIcon,
    action: (editor, props) => props?.handleImageUploadClick?.(),
  },
];

export default function CustomTipTapEditor({
  content = '',
  onChange,
  variant = 'default',
}: CustomTipTapEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none focus:outline-none p-4',
          variant === 'create'
            ? 'flex-1 w-full h-full resize-none border-none bg-transparent text-slate-500 placeholder:text-slate-500'
            : 'min-h-[400px] border-0 resize-none rounded-b-lg',
        ),
      },
    },
  });

  const uploadImageToServer = useCallback(
    async (file: File): Promise<string | null> => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size cannot exceed 2MB.');
        return null;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error('Only JPG, PNG, and WebP formats are supported.');
        return null;
      }

      const formData = new FormData();
      formData.append('image', file);

      toast.info('Uploading image...');
      try {
        const response = await axiosInstance.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data?.imageUrl) {
          toast.success('Image uploaded successfully!');
          return response.data.imageUrl;
        }
        toast.error('Invalid response from image server.');
        return null;
      } catch (error) {
        console.error('Image upload failed:', error);
        toast.error('Image upload failed. Please try again.');
        return null;
      }
    },
    [],
  );

  const handleFileSelectAndUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && editor) {
        const imageUrl = await uploadImageToServer(file);
        if (imageUrl) {
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      }
      if (event.target) {
        event.target.value = '';
      }
    },
    [editor, uploadImageToServer],
  );

  const handleLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col',
        variant === 'default' && 'rounded-lg border',
      )}
    >
      <div
        role="toolbar"
        aria-label="Text formatting"
        className={cn(
          'flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2',
          variant === 'default' ? 'rounded-t-lg' : '',
        )}
      >
        {toolbarConfig.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <Separator
                key={`sep-${index}`}
                orientation="vertical"
                className="mx-1 h-5"
              />
            );
          }

          return (
            <Button
              key={`${item.id}-${item.level || item.value || index}`}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={item.title}
              title={item.title}
              onClick={() =>
                item.action(editor, {
                  handleLink,
                  handleImageUploadClick: () => imageInputRef.current?.click(),
                })
              }
              data-active={
                item.level
                  ? editor.isActive(item.id, { level: item.level })
                  : item.value
                    ? editor.isActive({ [item.id]: item.value })
                    : editor.isActive(item.id)
              }
              className="h-8 w-8 p-0 data-[active=true]:bg-slate-200"
            >
              <item.icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>

      <EditorContent
        editor={editor}
        className={cn(
          'flex-1 overflow-y-auto',
          variant === 'create' && 'bg-gray-50',
        )}
      />

      <input
        type="file"
        ref={imageInputRef}
        onChange={handleFileSelectAndUpload}
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
      />
    </div>
  );
}
