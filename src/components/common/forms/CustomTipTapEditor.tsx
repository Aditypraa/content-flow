// components/common/forms/CustomTipTapEditor.tsx

'use client';

import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Code as CodeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import axiosInstance from '@/lib/api/axios'; // Pastikan axiosInstance diimpor
import { toast } from 'sonner';

interface CustomTipTapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  variant?: 'default' | 'create';
}

export default function CustomTipTapEditor({
  content = '',
  onChange,
  variant = 'default',
}: CustomTipTapEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        strike: false,
        code: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: false, // Gambar sebagai block-level element
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
      ListItem,
      Blockquote.configure({
        HTMLAttributes: {
          class: 'tiptap-blockquote',
        },
      }),
      Strike,
      Code.configure({
        HTMLAttributes: {
          class: 'tiptap-code',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          variant === 'create'
            ? 'w-full h-full resize-none border-none bg-transparent text-slate-500 text-sm placeholder:text-slate-500 p-3 lg:p-4 prose prose-sm max-w-none focus:outline-none'
            : 'min-h-[400px] border-0 resize-none rounded-none rounded-b-lg focus-visible:ring-0 p-4 prose prose-sm max-w-none focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  // Fungsi untuk upload gambar ke server
  const uploadImageToServer = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file); // 'image' adalah key yang diharapkan backend

    try {
      // KUNCI PERBAIKAN: Endpoint disesuaikan dengan dokumentasi Anda
      const response = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Sesuai dokumentasi, response berisi { "imageUrl": "..." }
      if (response.data && response.data.imageUrl) {
        return response.data.imageUrl;
      }
      toast.error('Invalid response from image upload server.');
      return null;
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Image upload failed. Please try again.');
      return null;
    }
  };

  // --- Toolbar Handlers ---

  const handleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) {
      return;
    }
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileSelectAndUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      toast.info('Uploading image...');
      const imageUrl = await uploadImageToServer(file);
      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
        toast.success('Image uploaded successfully!');
      }
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div
      className={
        variant === 'create' ? 'flex h-full flex-col' : 'rounded-lg border'
      }
    >
      {/* Editor Toolbar */}
      <div
        className={
          variant === 'create'
            ? 'flex items-center gap-1 overflow-x-auto border-b bg-gray-50 p-3'
            : 'flex items-center gap-1 overflow-x-auto rounded-t-lg border-b bg-gray-50 p-3'
        }
      >
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
          title="Inline Code"
        >
          <CodeIcon className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={handleLink}
          className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={handleImageUploadClick}
          className="h-8 w-8 p-0"
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        {/* Hidden file input */}
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleFileSelectAndUpload}
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif"
        />
      </div>

      <EditorContent
        editor={editor}
        className={
          variant === 'create' ? 'flex-1 overflow-y-auto' : 'min-h-[400px]'
        }
      />
    </div>
  );
}
