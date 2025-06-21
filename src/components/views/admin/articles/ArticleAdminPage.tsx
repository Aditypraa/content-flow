"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="w-[1440px] h-[1324px] bg-gray-100 inline-flex justify-between items-start">
            {/* Sidebar */}
            <div className="w-[267px] self-stretch pt-6 pb-4 bg-blue-600 inline-flex flex-col justify-start items-center gap-4 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    {/* Logo */}
                    <div className="self-stretch h-9 px-8 inline-flex justify-start items-center gap-2">
                        <div className="w-[134px] h-6 relative overflow-hidden">
                            <div className="w-[20.18px] h-[22.33px] left-0 top-0 absolute bg-white" />
                            <div className="w-[19.05px] h-[11.65px] left-[114.95px] top-[6.83px] absolute bg-white" />
                            <div className="w-[11px] h-[11.63px] left-[101.80px] top-[7px] absolute bg-white" />
                            <div className="w-[9.58px] h-[11.86px] left-[90.66px] top-[6.81px] absolute bg-white" />
                            <div className="w-3 h-[17.14px] left-[77.90px] top-[6.81px] absolute bg-white" />
                            <div className="w-[3.58px] h-[16.25px] left-[72.52px] top-[2.23px] absolute bg-white" />
                            <div className="w-[11.87px] h-[11.86px] left-[59.55px] top-[6.81px] absolute bg-white" />
                            <div className="w-[11.87px] h-[11.86px] left-[47px] top-[6.81px] absolute bg-white" />
                            <div className="w-[11.87px] h-[11.86px] left-[34.45px] top-[6.81px] absolute bg-white" />
                            <div className="w-[7.71px] h-[14.47px] left-[26.35px] top-[4.02px] absolute bg-white" />
                            <div className="w-[11.11px] h-[5.83px] left-[47.77px] top-[17.96px] absolute bg-white" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="self-stretch px-4 flex flex-col justify-start items-start">
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                            {/* Articles - Active */}
                            <Link href="/admin/articles" className="w-[235px] h-10 relative bg-blue-500 rounded-md">
                                <div className="left-[16px] top-[8px] absolute inline-flex justify-start items-center gap-3">
                                    <div className="w-5 h-5 relative overflow-hidden">
                                        <div className="w-[4.17px] h-0 left-[8.33px] top-[15px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                        <div className="w-[6.67px] h-0 left-[8.33px] top-[11.67px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                        <div className="w-[16.67px] h-[16.67px] left-[1.67px] top-[1.67px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                        <div className="w-[6.67px] h-[3.33px] left-[8.33px] top-[5px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                    </div>
                                    <div className="justify-start text-white text-base font-medium font-['Archivo'] leading-normal">Articles</div>
                                </div>
                            </Link>

                            {/* Categories */}
                            <Link href="/admin/categories" className="w-[235px] h-10 relative rounded-md">
                                <div className="left-[16px] top-[8px] absolute inline-flex justify-start items-center gap-3">
                                    <div className="w-5 h-5 relative overflow-hidden">
                                        <div className="w-[16.66px] h-[16.66px] left-[1.67px] top-[1.67px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                        <div className="w-[0.83px] h-[0.83px] left-[5.83px] top-[5.83px] absolute bg-white outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                    </div>
                                    <div className="justify-start text-white text-base font-medium font-['Archivo'] leading-normal">Category</div>
                                </div>
                            </Link>

                            {/* Logout */}
                            <div className="w-[235px] h-10 relative rounded-md">
                                <div className="left-[16px] top-[8px] absolute inline-flex justify-start items-center gap-3">
                                    <div className="w-5 h-5 relative overflow-hidden">
                                        <div className="w-[5px] h-[15px] left-[2.50px] top-[2.50px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                        <div className="w-[4.17px] h-[8.33px] left-[13.33px] top-[5.83px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                        <div className="w-2.5 h-0 left-[7.50px] top-[10px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                    </div>
                                    <div className="justify-start text-white text-base font-medium font-['Archivo'] leading-normal">Logout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start">
                {/* Header */}
                <div className="self-stretch px-6 pt-5 pb-4 bg-gray-50 border-b border-slate-200 inline-flex justify-between items-center">
                    <div className="justify-start text-slate-900 text-xl font-semibold font-['Archivo'] leading-7">Articles</div>
                    <div className="flex justify-start items-center gap-1.5">
                        <div className="w-8 h-8 relative bg-blue-200 rounded-[100px] overflow-hidden">
                            <div className="left-[11px] top-[4px] absolute justify-start text-blue-900 text-base font-medium font-['Archivo'] leading-normal">J</div>
                        </div>
                        <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] underline leading-tight">James Dean</div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="self-stretch flex-1 px-6 pt-6 inline-flex justify-start items-start gap-3">
                    <div className="flex-1 rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-start items-start overflow-hidden">

                        {/* Table Header Section */}
                        <div className="self-stretch flex flex-col justify-start items-start">
                            {/* Total Articles */}
                            <div className="self-stretch p-6 bg-gray-50 border-b border-slate-200 inline-flex justify-start items-center gap-2.5">
                                <div className="justify-start text-slate-800 text-base font-medium font-['Archivo'] leading-normal">Total Articles : {filteredArticles.length}</div>
                            </div>

                            {/* Controls */}
                            <div className="self-stretch p-6 bg-gray-50 border-b border-slate-200 inline-flex justify-between items-center">
                                <div className="flex justify-start items-center gap-2">
                                    {/* Category Filter */}
                                    <Select>
                                        <SelectTrigger className="h-9 px-3 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-1.5">
                                            <SelectValue placeholder="Category" className="text-center justify-center text-slate-900 text-sm font-medium font-['Archivo'] leading-tight" />
                                            <ChevronDown className="w-5 h-5" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Search */}
                                    <div className="w-60 h-9 px-3 py-2 rounded-md outline outline-1 outline-offset-[-1px] outline-slate-300 flex justify-start items-center gap-1.5">
                                        <Search className="w-5 h-5 text-slate-400" />
                                        <Input
                                            placeholder="Search by title"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="justify-start text-slate-400 text-sm font-normal font-['Archivo'] leading-tight border-0 p-0 h-auto focus-visible:ring-0"
                                        />
                                    </div>
                                </div>

                                {/* Add Articles Button */}
                                <Link href="/admin/articles/create">
                                    <Button className="h-10 px-4 py-2 bg-blue-600 rounded-md flex justify-center items-center gap-1.5">
                                        <Plus className="w-5 h-5" />
                                        <div className="text-center justify-center text-slate-50 text-sm font-medium font-['Archivo'] leading-tight">Add Articles</div>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="self-stretch inline-flex justify-start items-start">
                            {/* Thumbnails Column */}
                            <div className="flex-1 inline-flex flex-col justify-center items-center">
                                <div className="self-stretch px-4 py-3 bg-gray-100 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Thumbnails</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`thumb-${article.id}`} className="self-stretch px-4 py-3 bg-gray-50 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                        <Image
                                            src={article.thumbnail || "https://placehold.co/60x60"}
                                            alt={`Thumbnail for ${article.title}`}
                                            width={60}
                                            height={60}
                                            className="rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Title Column */}
                            <div className="flex-1 inline-flex flex-col justify-center items-center">
                                <div className="self-stretch px-4 py-3 bg-gray-100 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Title</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`title-${article.id}`} className="self-stretch h-[84px] px-4 py-3 bg-gray-50 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                        <div className="flex-1 justify-start text-slate-600 text-sm font-normal font-['Archivo'] leading-tight">{article.title}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Category Column */}
                            <div className="flex-1 inline-flex flex-col justify-center items-center">
                                <div className="self-stretch px-4 py-3 bg-gray-100 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Category</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`category-${article.id}`} className="self-stretch h-[84px] px-4 py-3 bg-gray-50 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                        <div className="justify-start text-slate-600 text-sm font-normal font-['Archivo'] leading-tight">{article.category}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Created at Column */}
                            <div className="flex-1 inline-flex flex-col justify-center items-center">
                                <div className="self-stretch px-4 py-3 bg-gray-100 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Created at</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`date-${article.id}`} className="self-stretch h-[84px] px-4 py-3 bg-gray-50 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                        <div className="justify-start text-slate-600 text-sm font-normal font-['Archivo'] leading-tight">{article.createdAt}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Column */}
                            <div className="flex-1 inline-flex flex-col justify-center items-center">
                                <div className="self-stretch px-4 py-3 bg-gray-100 border-b border-slate-200 inline-flex justify-center items-center gap-2">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Action</div>
                                </div>
                                {filteredArticles.map((article) => (
                                    <div key={`action-${article.id}`} className="self-stretch h-[84px] px-4 py-3 bg-gray-50 border-b border-slate-200 inline-flex justify-center items-center gap-3">
                                        <Link href={`/admin/articles/${article.id}`} className="justify-start text-blue-600 text-sm font-normal font-['Archivo'] underline leading-tight">
                                            Preview
                                        </Link>
                                        <Link href={`/admin/articles/${article.id}/edit`} className="justify-start text-blue-600 text-sm font-normal font-['Archivo'] underline leading-tight">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => console.log('Delete article:', article.id)}
                                            className="justify-start text-red-500 text-sm font-normal font-['Archivo'] underline leading-tight"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="self-stretch px-4 py-6 bg-gray-50 border-b border-slate-200 inline-flex justify-between items-center">
                            <div className="flex-1 flex justify-center items-center gap-2">
                                <div className="h-10 pl-2.5 pr-4 rounded-md flex justify-center items-center gap-1">
                                    <ChevronLeft className="w-4 h-4" />
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Previous</div>
                                </div>
                                <div className="w-10 h-10 rounded-md flex justify-center items-center">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">1</div>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">2</div>
                                </div>
                                <div className="w-9 h-9 rounded-md flex justify-center items-center">
                                    <div className="w-6 h-6 relative">
                                        <div className="w-0 h-[0.50px] left-[16px] top-[11.75px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-900" />
                                        <div className="w-0 h-[0.50px] left-[12px] top-[11.75px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-900" />
                                        <div className="w-0 h-[0.50px] left-[8px] top-[11.75px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-900" />
                                    </div>
                                </div>
                                <div className="h-10 pl-4 pr-2.5 rounded-md flex justify-center items-center gap-1">
                                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Next</div>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
