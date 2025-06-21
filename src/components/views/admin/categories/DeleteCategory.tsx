import React from 'react';
import { Button } from '@/components/ui/button';

interface DeleteCategoryProps {
    categoryName?: string;
    onCancel?: () => void;
    onDelete?: () => void;
}

export default function DeleteCategory({
    categoryName = "Technology",
    onCancel,
    onDelete
}: DeleteCategoryProps) {
    return (
        <div className="w-[400px] p-6 bg-white rounded-lg border border-slate-200 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 text-lg font-semibold leading-7">
                    Delete Category
                </h3>
                <p className="text-slate-500 text-sm leading-tight">
                    Delete category &quot;{categoryName}&quot;? This will remove it from master data permanently.
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
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}