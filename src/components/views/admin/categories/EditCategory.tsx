"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EditCategoryProps {
    currentName?: string;
    onCancel?: () => void;
    onSave?: (categoryName: string) => void;
}

export default function EditCategory({
    currentName = "Technology",
    onCancel,
    onSave
}: EditCategoryProps) {
    const [categoryName, setCategoryName] = useState(currentName);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryName.trim() && onSave) {
            onSave(categoryName.trim());
        }
    };

    return (
        <Card className="w-[400px] shadow-lg">
            <CardHeader>
                <CardTitle>Edit Category</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                            id="category-name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!categoryName.trim() || categoryName === currentName}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}