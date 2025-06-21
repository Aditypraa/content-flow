import React from 'react';
import { Button } from '@/components/ui/button';

interface DeleteArticleAlertProps {
    articleTitle?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export default function DeleteArticleAlert({
    articleTitle = "article",
    onCancel,
    onConfirm
}: DeleteArticleAlertProps) {
    return (
        <div className="w-[400px] p-6 bg-white rounded-lg border border-slate-200 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 text-lg font-semibold leading-7">
                    Delete Article
                </h3>
                <p className="text-slate-500 text-sm leading-tight">
                    Deleting &quot;{articleTitle}&quot; is permanent and cannot be undone. All related content will be removed.
                </p>
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}