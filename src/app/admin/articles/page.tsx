// src/app/admin/articles/page.tsx

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import SearchInput from '@/components/common/forms/SearchInput';
import Pagination from '@/components/common/feedback/Pagination';
import DeleteConfirmationModal from '@/components/common/modals/DeleteConfirmationModal';
import axiosInstance from '@/lib/api/axios';

// --- Type Definitions ---
interface Article {
  id: string;
  title: string;
  category: { id: string; name: string };
  createdAt: string;
  imageUrl: string | null;
}
interface Category {
  id: string;
  name: string;
}

// --- Sub-Components ---

const PageHeader = () => (
  <div className="border-b bg-white px-4 py-5 lg:px-6">
    <h1 className="mb-3 text-xl font-semibold text-slate-900">Articles</h1>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/articles">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Articles</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

const FilterControls = ({
  totalArticles,
  categories,
  isLoadingCategories,
  categoryFilter,
  titleFilter,
  onCategoryChange,
  onSearchChange,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <div className="flex w-full flex-col gap-4 border-b bg-gray-50 p-6 lg:flex-row lg:items-center lg:justify-between">
    <p className="text-base font-medium text-slate-800">
      Total Articles: {totalArticles}
    </p>
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      {isLoadingCategories ? (
        <Skeleton className="h-9 w-full sm:w-[180px]" />
      ) : (
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories
              .filter((cat: Category) => cat.id && cat.id.trim() !== '')
              .map((cat: Category) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
      <SearchInput
        placeholder="Search by title..."
        defaultValue={titleFilter}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-60"
      />
      <Link href="/admin/articles/create" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Article
        </Button>
      </Link>
    </div>
  </div>
);

const ArticleRow = ({
  article,
  onOpenDelete,
}: {
  article: Article;
  onOpenDelete: (article: Article) => void;
}) => (
  <TableRow
    key={article.id}
    className="block border-b p-4 md:table-row md:border-b-0 md:p-0"
  >
    <TableCell className="flex items-center justify-between font-semibold md:table-cell md:w-[100px] md:p-2">
      <span className="text-muted-foreground md:hidden">Thumbnail</span>
      <Image
        src={article.imageUrl || 'https://placehold.co/80x80'}
        alt={article.title}
        width={80}
        height={80}
        className="h-16 w-16 rounded-md object-cover md:h-20 md:w-20"
      />
    </TableCell>
    <TableCell className="block py-2 font-medium md:table-cell md:py-4">
      {article.title}
    </TableCell>
    <TableCell className="text-muted-foreground flex justify-between py-2 md:table-cell md:w-[160px] md:py-4 md:text-center">
      <span className="md:hidden">Category</span>
      {article.category.name}
    </TableCell>
    <TableCell className="text-muted-foreground flex justify-between py-2 md:table-cell md:w-[200px] md:py-4 md:text-center">
      <span className="md:hidden">Created at</span>
      {new Date(article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </TableCell>
    <TableCell className="pt-4 pb-2 md:w-[180px] md:py-4">
      <div className="flex justify-end gap-2 md:justify-center">
        <Button asChild variant="ghost" size="sm" className="h-8 px-2">
          <Link href={`/user/articles/${article.id}`}>
            <Eye className="h-4 w-4" /> <span className="sr-only">View</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="h-8 px-2">
          <Link href={`/admin/articles/${article.id}/edit`}>
            <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive h-8 px-2"
          onClick={() => onOpenDelete(article)}
        >
          <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

const ArticleTableSkeleton = ({ rows = 5 }) => (
  <TableBody>
    {Array.from({ length: rows }).map((_, i) => (
      <TableRow key={i}>
        <TableCell className="w-[100px] p-2">
          <Skeleton className="h-20 w-20 rounded-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-3/4 rounded" />
        </TableCell>
        <TableCell className="w-[160px]">
          <Skeleton className="h-5 w-24 rounded" />
        </TableCell>
        <TableCell className="w-[200px]">
          <Skeleton className="h-5 w-32 rounded" />
        </TableCell>
        <TableCell className="w-[180px]">
          <div className="flex justify-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

// --- Main Page Component ---
export default function ArticleAdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { page, title, category } = useMemo(
    () => ({
      page: Number(searchParams.get('page')) || 1,
      title: searchParams.get('title') || '',
      category: searchParams.get('category') || '',
    }),
    [searchParams],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const limit = 10; // Definisikan limit untuk digunakan kembali
    try {
      const articlesPromise = axiosInstance.get('/articles', {
        params: { page, limit, title, category },
      });
      const categoriesPromise = axiosInstance.get('/categories');

      const [articlesResponse, categoriesResponse] = await Promise.all([
        articlesPromise,
        categoriesPromise,
      ]);

      const totalData = articlesResponse.data.total || 0;
      setArticles(articlesResponse.data.data || []);
      setTotalArticles(totalData);
      // FIX: Menghitung totalPages secara manual
      setTotalPages(Math.ceil(totalData / limit));
      setCategories(categoriesResponse.data.data || []);
    } catch {
      toast.error('Failed to load articles or categories.');
    } finally {
      setIsLoading(false);
    }
  }, [page, title, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (key: 'title' | 'category', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set('page', '1');
    if (!value || value === 'all') {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => handleFilterChange('title', value), 500),
    [searchParams],
  );
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedArticle) return;
    try {
      await axiosInstance.delete(`/articles/${selectedArticle.id}`);
      toast.success('Article deleted successfully!');
      fetchData(); // Re-fetch data
    } catch {
      toast.error('Failed to delete article.');
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedArticle(null);
    }
  };

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <PageHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border bg-white">
          <FilterControls
            totalArticles={totalArticles}
            categories={categories}
            isLoadingCategories={isLoading && categories.length === 0}
            categoryFilter={category}
            titleFilter={title}
            onCategoryChange={(value: string) =>
              handleFilterChange('category', value)
            }
            onSearchChange={debouncedSearch}
          />

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    Thumbnail
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[160px] text-center">
                    Category
                  </TableHead>
                  <TableHead className="w-[200px] text-center">
                    Created At
                  </TableHead>
                  <TableHead className="w-[180px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <ArticleTableSkeleton />
              ) : (
                <TableBody className="block md:table-row-group">
                  {articles.map((article) => (
                    <ArticleRow
                      key={article.id}
                      article={article}
                      onOpenDelete={openDeleteModal}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
          </div>

          {/* Kondisi ini sekarang akan berfungsi dengan benar */}
          {!isLoading && totalPages > 1 && (
            <div className="border-t p-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedArticle?.title}
        itemType="Article"
      />
    </>
  );
}
