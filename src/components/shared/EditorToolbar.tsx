import React from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Link, Heading1, Heading2, Heading3, List } from 'lucide-react';

interface EditorToolbarProps {
    onBold?: () => void;
    onItalic?: () => void;
    onUnderline?: () => void;
    onLink?: () => void;
    onH1?: () => void;
    onH2?: () => void;
    onH3?: () => void;
    onList?: () => void;
}

export default function EditorToolbar({
    onBold,
    onItalic,
    onUnderline,
    onLink,
    onH1,
    onH2,
    onH3,
    onList
}: EditorToolbarProps) {
    return (
        <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onBold}>
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onItalic}>
                        <Italic className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onUnderline}>
                        <Underline className="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onLink}>
                        <Link className="w-4 h-4" />
                    </Button>
                </div>
                <div className="w-[18px] h-0 border-t border-slate-200" />
                <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onList}>
                    <List className="w-4 h-4" />
                </Button>
                <div className="w-[18px] h-0 border-t border-slate-200" />
                <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onH1}>
                        <Heading1 className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onH2}>
                        <Heading2 className="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="p-1" onClick={onH3}>
                        <Heading3 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
