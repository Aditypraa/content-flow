"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/layouts/AdminLayout';
import Pagination from '@/components/shared/Pagination';

interface Article {
    id: string;
    title: string;
    category: string;
    createdAt: string;
    thumbnail?: string;
}

export default function ArticleAdminPage() {
    const [searchTerm, setSearchTerm] = useState('');

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
        <AdminLayout activeMenu="articles" title="Articles">
            {/* Main Content */}
            <div className="px-6 pt-6 flex justify-center">
                <div className="w-[1097px] bg-white rounded-xl border border-slate-200 flex flex-col justify-start items-start overflow-hidden">
                    {/* Header with controls */}
                    <div className="self-stretch px-4 py-6 bg-gray-50 border-b border-slate-200 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-[287px] h-10 relative">
                                <Input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-full pr-10 bg-white border border-slate-200 rounded-md"
                                />
                                <Search className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            </div>

                            <Select>
                                <SelectTrigger className="w-[120px] h-10 bg-white border border-slate-200">
                                    <SelectValue placeholder="Filter" />
                                    <ChevronDown className="w-5 h-5" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Link href="/admin/articles/create">
                            <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Create Article
                            </Button>
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="self-stretch flex flex-col">
                        {/* Table Header */}
                        <div className="self-stretch px-4 py-3 bg-gray-50 border-b border-slate-200 grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-6 text-slate-900 text-sm font-medium">Article Title</div>
                            <div className="col-span-2 text-slate-900 text-sm font-medium">Category</div>
                            <div className="col-span-3 text-slate-900 text-sm font-medium">Created At</div>
                            <div className="col-span-1 text-slate-900 text-sm font-medium">Actions</div>
                        </div>

                        {/* Table Rows */}
                        <div className="flex flex-col">
                            {filteredArticles.map((article) => (
                                <div key={article.id} className="self-stretch px-4 py-4 border-b border-slate-200 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                                    <div className="col-span-6 flex items-center gap-3">
                                        <Image
                                            src={article.thumbnail || 'https://placehold.co/60x60'}
                                            alt={article.title}
                                            width={60}
                                            height={60}
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-slate-900 text-sm font-medium line-clamp-2">{article.title}</h3>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-slate-600 text-sm">{article.category}</span>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="text-slate-600 text-sm">{article.createdAt}</span>
                                    </div>
                                    <div className="col-span-1 flex items-center gap-2">
                                        <Link
                                            href={`/admin/articles/${article.id}/edit`}
                                            className="text-blue-600 text-sm font-normal underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="text-red-500 text-sm font-normal underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <Pagination currentPage={2} totalPages={10} />
                </div>
            </div>
        </AdminLayout>
    );
}
