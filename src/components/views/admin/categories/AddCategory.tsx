"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AddCategoryProps {
    onCancel?: () => void;
    onAdd?: (categoryName: string) => void;
}

export default function AddCategory({ onCancel, onAdd }: AddCategoryProps) {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryName.trim() && onAdd) {
            onAdd(categoryName.trim());
            setCategoryName('');
        }
    };

    return (
        <Card className="w-[400px] shadow-lg">
            <CardHeader>
                <CardTitle>Add Category</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                            id="category-name"
                            placeholder="Enter category name"
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
                            disabled={!categoryName.trim()}
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}