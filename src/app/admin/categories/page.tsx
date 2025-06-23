"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import SearchInput from "@/components/common/forms/SearchInput";
import Pagination from "@/components/common/feedback/Pagination";

interface Category {
    id: number;
    name: string;
    description: string;
    articleCount: number;
    createdAt: string;
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: "Technology", description: "Tech related articles", articleCount: 5, createdAt: "April 13, 2025 10:55:12" },
        { id: 2, name: "Business", description: "Business and finance articles", articleCount: 3, createdAt: "April 13, 2025 10:55:12" },
        { id: 3, name: "Sports", description: "Sports and fitness articles", articleCount: 2, createdAt: "April 13, 2025 10:55:12" },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: "" });

    const handleAdd = () => {
        const newCategory = {
            id: Date.now(),
            name: formData.name,
            description: "", // Default empty description
            articleCount: 0,
            createdAt: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };
        setCategories([...categories, newCategory]);
        setFormData({ name: "" });
        setIsAddOpen(false);
    };

    const handleEdit = () => {
        if (!selectedCategory) return;
        setCategories(categories.map(cat =>
            cat.id === selectedCategory.id
                ? { ...cat, name: formData.name }
                : cat
        ));
        setSelectedCategory(null);
        setFormData({ name: "" });
        setIsEditOpen(false);
    };

    const handleDelete = () => {
        if (!selectedCategory) return;
        setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
        setSelectedCategory(null);
        setIsDeleteOpen(false);
    };

    const openEditModal = (category: Category) => {
        setSelectedCategory(category);
        setFormData({ name: category.name });
        setIsEditOpen(true);
    };

    const openDeleteModal = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteOpen(true);
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="Categories">
            <div className="p-4 lg:px-6 lg:pt-6">
                <div className="w-full max-w-none lg:max-w-[1097px] lg:mx-auto bg-white rounded-xl border border-slate-200 flex flex-col justify-start items-start overflow-hidden">

                    {/* Header with Total Categories and controls */}
                    <div className="w-full p-6 bg-gray-50 border-b border-slate-200 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        {/* Total Categories */}
                        <div className="text-slate-800 text-base font-medium">Total Category : {filteredCategories.length}</div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 lg:gap-4">
                            <SearchInput
                                placeholder="Search Category"
                                value={searchTerm}
                                onChange={setSearchTerm}
                                className="w-full sm:w-60"
                                showClearButton={false}
                            />

                            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                                <DialogTrigger asChild>
                                    <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
                                        <Plus className="w-5 h-5" />
                                        Add Category
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] mx-4">
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                        <DialogDescription>
                                            Create a new category for organizing articles.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="add-name">Category Name</Label>
                                            <Input
                                                id="add-name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter category name"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAdd} disabled={!formData.name.trim()}>
                                            Add Category
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block w-full">
                        {/* Table using flexbox layout matching the design */}
                        <div className="flex">
                            {/* Category Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Category</div>
                                </div>
                                {filteredCategories.map((category) => (
                                    <div key={`cat-${category.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center h-[84px]">
                                        <div className="text-slate-600 text-sm">{category.name}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Created At Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Created at</div>
                                </div>
                                {filteredCategories.map((category) => (
                                    <div key={`date-${category.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center h-[84px]">
                                        <div className="text-slate-600 text-sm">{category.createdAt}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Action</div>
                                </div>
                                {filteredCategories.map((category) => (
                                    <div key={`action-${category.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center gap-3 h-[84px]">
                                        <button
                                            onClick={() => openEditModal(category)}
                                            className="text-blue-600 text-sm underline hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(category)}
                                            className="text-red-500 text-sm underline hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden w-full">
                        <div className="flex flex-col">
                            {filteredCategories.map((category) => (
                                <div key={category.id} className="p-4 border-b border-slate-200 last:border-b-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditModal(category)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => openDeleteModal(category)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                                    <div className="text-xs text-gray-500 mb-2">
                                        {category.articleCount} articles
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Created: {category.createdAt}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <Pagination currentPage={1} totalPages={5} />
                </div>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[425px] mx-4">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update the category name below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Category Name</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter category name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEdit} disabled={!formData.name.trim()}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px] mx-4">
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{selectedCategory?.name}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default CategoryPage;
