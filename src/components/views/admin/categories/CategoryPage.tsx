import React from "react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/shared/AdminSidebar";
import AdminHeader from "@/components/shared/AdminHeader";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const CategoryPage = () => {
    const categories = [
        { id: 1, name: "Technology", description: "Tech related articles", articleCount: 5 },
        { id: 2, name: "Business", description: "Business and finance articles", articleCount: 3 },
        { id: 3, name: "Sports", description: "Sports and fitness articles", articleCount: 2 },
    ];

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <AdminHeader title="Categories Management" />

            <div className="flex">
                <AdminSidebar activeMenu="categories" />

                <div className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <Link href="/admin/categories/create">
                                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Category
                                </Button>
                            </Link>
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
                                                            <Link href={`/admin/categories/${category.id}/edit`}>
                                                                <Button variant="outline" size="sm" className="gap-1">
                                                                    <Edit className="w-3 h-3" />
                                                                    Edit
                                                                </Button>
                                                            </Link>
                                                            <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700">
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
                            </div>                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;