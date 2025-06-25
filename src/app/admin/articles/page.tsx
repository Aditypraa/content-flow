'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/layouts/AdminLayout';
import SearchInput from '@/components/common/forms/SearchInput';
import Pagination from '@/components/common/feedback/Pagination';
import DeleteConfirmationModal from '@/components/common/modals/DeleteConfirmationModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '2',
      title: 'The Future of Work: Remote-First Teams and Digital Tools',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '3',
      title: 'Design Systems: Why Your Team Needs One in 2025',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '4',
      title: 'Web3 and the Decentralized Internet: What You Need to...',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '5',
      title: 'Debugging Like a Pro: Tools & Techniques for Faster Fixes',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '6',
      title: 'Accessibility in Design: More Than Just Compliance',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '7',
      title: "Figma's New Dev Mode: A Game-Changer for Designers & Developers",
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '8',
      title: 'How AI Is Changing the Game in Front-End Development',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '9',
      title: '10 UI Trends Dominating 2025',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
    {
      id: '10',
      title: 'Debugging Like a Pro: Tools & Techniques for Faster Fixes',
      category: 'Technology',
      createdAt: 'April 13, 2025 10:55:12',
      thumbnail: 'https://placehold.co/60x60',
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout
      title="Articles"
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Articles' },
      ]}
    >
      {/* Header with controls */}
      <div className="w-full p-6 bg-gray-50 border-b border-slate-200 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="text-slate-800 text-base font-medium">
          Total Articles : {filteredArticles.length}
        </div>

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

      {/* Article List */}
      <Table className="w-full responsive-table overflow-x-hidden">
        <TableHeader>
          {/* TableHeader tetap sama */}
          <TableRow>
            <TableHead className="w-[120px] text-center">Thumbnails</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="w-[140px] text-center">Category</TableHead>
            <TableHead className="w-[200px] text-center">Created at</TableHead>
            <TableHead className="w-[180px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredArticles.map((article) => (
            <TableRow key={article.id}>
              <TableCell data-label="Thumbnail" className="cell-thumbnail">
                <Image
                  src={article.thumbnail || 'https://placehold.co/60x60'}
                  alt={article.title}
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
              </TableCell>

              <TableCell data-label="Title" className="break-words">
                {article.title}
              </TableCell>

              <TableCell data-label="Category">{article.category}</TableCell>
              <TableCell data-label="Created at">{article.createdAt}</TableCell>

              <TableCell data-label="Action" className="cell-actions">
                <div className="flex gap-2 lg:justify-center">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="flex-1 lg:flex-none"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-8 text-xs lg:h-auto lg:p-1 lg:bg-transparent lg:border-0 lg:text-blue-600 lg:underline"
                    >
                      <Eye className="w-4 h-4 mr-1 lg:w-3 lg:h-3" />
                      <span className="lg:text-xs">Preview</span>
                    </Button>
                  </Link>
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="flex-1 lg:flex-none"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-8 text-xs lg:h-auto lg:p-1 lg:bg-transparent lg:border-0 lg:text-blue-600 lg:underline"
                    >
                      <Edit className="w-4 h-4 mr-1 lg:w-3 lg:h-3" />
                      <span className="lg:text-xs">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 lg:h-auto lg:p-1 lg:bg-transparent lg:border-0 lg:text-red-500 lg:underline"
                    onClick={() => openDeleteModal(article)}
                  >
                    <Trash2 className="w-4 h-4 mr-1 lg:w-3 lg:h-3" />
                    <span className="lg:text-xs">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination currentPage={2} totalPages={10} />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedArticle?.title}
        itemType="Article"
      />
    </AdminLayout>
  );
}
