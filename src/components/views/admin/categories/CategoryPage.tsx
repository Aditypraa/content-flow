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
import AdminLayout from "@/components/layouts/AdminLayout";
import Pagination from "@/components/shared/Pagination";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Category {
    id: number;
    name: string;
    description: string;
    articleCount: number;
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: "Technology", description: "Tech related articles", articleCount: 5 },
        { id: 2, name: "Business", description: "Business and finance articles", articleCount: 3 },
        { id: 3, name: "Sports", description: "Sports and fitness articles", articleCount: 2 },
    ]);

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
            articleCount: 0
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
        setFormData({ name: "" });
        setSelectedCategory(null);
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

    return (
        <AdminLayout activeMenu="categories" title="Categories Management">
            <div className="px-6 pt-6 flex justify-center">
                <div className="w-full max-w-6xl">
                    <div className="flex justify-between items-center mb-6">
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Category
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
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

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Articles</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr key={category.id} className="border-b border-gray-100">
                                                <td className="py-3 px-4 text-gray-900 font-medium">{category.name}</td>
                                                <td className="py-3 px-4 text-gray-600">{category.description}</td>
                                                <td className="py-3 px-4 text-gray-600">{category.articleCount} articles</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1"
                                                            onClick={() => openEditModal(category)}
                                                        >
                                                            <Edit className="w-3 h-3" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1 text-red-600 hover:text-red-700"
                                                            onClick={() => openDeleteModal(category)}
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <Pagination currentPage={1} totalPages={5} />
                    </div>

                    {/* Edit Modal */}
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogContent className="sm:max-w-[425px]">
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
                        <DialogContent className="sm:max-w-[425px]">
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
                </div>
            </div>
        </AdminLayout>
    );
};

export default CategoryPage;