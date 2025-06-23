'use client';

import React from 'react';
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
    AlignRight
} from 'lucide-react';

interface CustomTipTapEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    variant?: 'default' | 'create';
}

export default function CustomTipTapEditor({
    content = '',
    onChange,
    variant = 'default'
}: CustomTipTapEditorProps) {
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
            }),
            Image,
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
                class: variant === 'create'
                    ? 'w-full h-full resize-none border-none bg-transparent text-slate-500 text-sm placeholder:text-slate-500 p-3 lg:p-4 prose prose-sm max-w-none focus:outline-none'
                    : 'min-h-[400px] border-0 resize-none rounded-none rounded-b-lg focus-visible:ring-0 p-4 prose prose-sm max-w-none focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const handleBold = () => {
        editor.chain().focus().toggleBold().run();
    };

    const handleItalic = () => {
        editor.chain().focus().toggleItalic().run();
    };

    const handleUnderline = () => {
        editor.chain().focus().toggleUnderline().run();
    };

    const handleH1 = () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
    };

    const handleH2 = () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
    };

    const handleH3 = () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
    };

    const handleLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const handleImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const handleBulletList = () => {
        editor.chain().focus().toggleBulletList().run();
    };

    const handleOrderedList = () => {
        editor.chain().focus().toggleOrderedList().run();
    };

    const handleBlockquote = () => {
        editor.chain().focus().toggleBlockquote().run();
    };

    const handleStrike = () => {
        editor.chain().focus().toggleStrike().run();
    };

    const handleCode = () => {
        editor.chain().focus().toggleCode().run();
    };

    const handleAlignLeft = () => {
        editor.chain().focus().setTextAlign('left').run();
    };

    const handleAlignCenter = () => {
        editor.chain().focus().setTextAlign('center').run();
    };

    const handleAlignRight = () => {
        editor.chain().focus().setTextAlign('right').run();
    };

    return (
        <div className={variant === 'create' ? 'h-full flex flex-col' : 'border rounded-lg'}>
            {/* Editor Toolbar - Enhanced with icons and more tools */}
            <div className={variant === 'create'
                ? 'flex items-center gap-1 p-3 border-b bg-gray-50 overflow-x-auto'
                : 'flex items-center gap-1 p-3 border-b bg-gray-50 rounded-t-lg overflow-x-auto'
            }>
                {/* Basic Formatting */}
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleBold}
                    className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleItalic}
                    className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleUnderline}
                    className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                    title="Underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleStrike}
                    className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
                    title="Strikethrough"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleCode}
                    className={`h-8 w-8 p-0 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
                    title="Inline Code"
                >
                    <CodeIcon className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                {/* Headings */}
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleH1}
                    className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
                    title="Heading 1"
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleH2}
                    className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleH3}
                    className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
                    title="Heading 3"
                >
                    <Heading3 className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                {/* Text Alignment */}
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleAlignLeft}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
                    title="Align Left"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleAlignCenter}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
                    title="Align Center"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleAlignRight}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
                    title="Align Right"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                {/* Lists and Quote */}
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleBulletList}
                    className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleOrderedList}
                    className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleBlockquote}
                    className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
                    title="Quote"
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                {/* Link and Image */}
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
                    onClick={handleImage}
                    className="h-8 w-8 p-0"
                    title="Add Image"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
            </div>

            {/* Content Area - Same styling as original */}
            <EditorContent
                editor={editor}
                className={variant === 'create' ? 'flex-1' : 'min-h-[400px]'}
            />
        </div>
    );
}
