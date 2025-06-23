"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/layouts/AdminLayout';
import SearchInput from '@/components/common/forms/SearchInput';
import Pagination from '@/components/common/feedback/Pagination';

interface Article {
    id: string;
    title: string;
    category: string;
    createdAt: string;
    thumbnail?: string;
}

export default function ArticleAdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const handleDelete = () => {
        if (selectedArticle) {
            // Here you would typically call an API to delete the article
            console.log('Deleting article:', selectedArticle.id);
            setSelectedArticle(null);
            setIsDeleteOpen(false);
        }
    };

    const openDeleteModal = (article: Article) => {
        setSelectedArticle(article);
        setIsDeleteOpen(true);
    };

    // Extended mock data to match the design
    const articles: Article[] = [
        {
            id: '1',
            title: 'Cybersecurity Essentials Every Developer Should Know',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '2',
            title: 'The Future of Work: Remote-First Teams and Digital Tools',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '3',
            title: 'Design Systems: Why Your Team Needs One in 2025',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '4',
            title: 'Web3 and the Decentralized Internet: What You Need to...',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '5',
            title: 'Debugging Like a Pro: Tools & Techniques for Faster Fixes',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '6',
            title: 'Accessibility in Design: More Than Just Compliance',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '7',
            title: 'Figma\'s New Dev Mode: A Game-Changer for Designers & Developers',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '8',
            title: 'How AI Is Changing the Game in Front-End Development',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '9',
            title: '10 UI Trends Dominating 2025',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
        {
            id: '10',
            title: 'Debugging Like a Pro: Tools & Techniques for Faster Fixes',
            category: 'Technology',
            createdAt: 'April 13, 2025 10:55:12',
            thumbnail: 'https://placehold.co/60x60'
        },
    ];

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="Articles">
            {/* Main Content */}
            <div className="p-4 lg:px-6 lg:pt-6">
                <div className="w-full max-w-none lg:max-w-[1097px] lg:mx-auto bg-white rounded-xl border border-slate-200 flex flex-col justify-start items-start overflow-hidden">

                    {/* Header with Total Articles and controls */}
                    <div className="w-full p-6 bg-gray-50 border-b border-slate-200 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        {/* Total Articles */}
                        <div className="text-slate-800 text-base font-medium">Total Articles : {filteredArticles.length}</div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 lg:gap-4">
                            <div className="flex justify-start items-center gap-2">
                                <Select>
                                    <SelectTrigger className="h-9 px-3 bg-white border border-slate-200 flex items-center gap-1.5">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                    </SelectContent>
                                </Select>

                                <SearchInput
                                    placeholder="Search by title"
                                    value={searchTerm}
                                    onChange={setSearchTerm}
                                    className="w-60"
                                    showClearButton={false}
                                />
                            </div>

                            <Link href="/admin/articles/create">
                                <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
                                    <Plus className="w-5 h-5" />
                                    Add Articles
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block w-full">
                        {/* Table using flexbox layout matching the design */}
                        <div className="flex">
                            {/* Thumbnails Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Thumbnails</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`thumb-${article.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center h-[84px]">
                                        <Image
                                            src={article.thumbnail || 'https://placehold.co/60x60'}
                                            alt={article.title}
                                            width={60}
                                            height={60}
                                            className="w-[60px] h-[60px] object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Title Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Title</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`title-${article.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center h-[84px]">
                                        <div className="flex-1 text-slate-600 text-sm">{article.title}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Category Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Category</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`cat-${article.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center h-[84px]">
                                        <div className="text-slate-600 text-sm">{article.category}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Created At Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Created at</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`date-${article.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center h-[84px]">
                                        <div className="text-slate-600 text-sm">{article.createdAt}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Column */}
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-3 bg-gray-100 border-b border-slate-200 flex justify-center items-center">
                                    <div className="text-slate-900 text-sm font-medium">Action</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`action-${article.id}`} className="px-4 py-3 bg-gray-50 border-b border-slate-200 flex justify-center items-center gap-3 h-[84px]">
                                        <Link href={`/admin/articles/${article.id}`} className="text-blue-600 text-sm underline hover:text-blue-700">
                                            Preview
                                        </Link>
                                        <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 text-sm underline hover:text-blue-700">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => openDeleteModal(article)}
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
                            {filteredArticles.map((article) => (
                                <div key={article.id} className="p-4 border-b border-slate-200 last:border-b-0">
                                    <div className="flex gap-3">
                                        <Image
                                            src={article.thumbnail || 'https://placehold.co/60x60'}
                                            alt={article.title}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-slate-900 text-sm font-medium leading-normal mb-2 line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <div className="text-xs text-slate-600 mb-2">
                                                <span className="inline-block bg-slate-100 px-2 py-1 rounded mr-2">
                                                    {article.category}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-500 mb-3">
                                                {article.createdAt}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/admin/articles/${article.id}`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Preview
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/articles/${article.id}/edit`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Edit className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => openDeleteModal(article)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <Pagination currentPage={2} totalPages={10} />
                </div>
            </div>

            {/* Delete Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px] mx-4">
                    <DialogHeader>
                        <DialogTitle>Delete Article</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{selectedArticle?.title}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete Article
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
