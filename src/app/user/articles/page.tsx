// src/app/user/articles/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Pagination from '@/components/common/feedback/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import axiosInstance from '@/lib/api/axios';

// --- Type Definitions ---
interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

// 1. Helper function di luar komponen untuk efisiensi
const truncateDescription = (htmlContent: string, maxLength: number) => {
  const plainText = htmlContent.replace(/<[^>]*>?/gm, '');
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return `${plainText.substring(0, maxLength)}...`;
};

// --- Sub-Components for Readability and Reusability ---

// 2. Komponen untuk Hero Section
const ArticlePageHeader = ({
  categories,
  categoryFilter,
  searchTerm,
  isLoadingCategories,
  onCategoryChange,
  onSearchChange,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <header className="relative overflow-hidden bg-blue-600/90 py-16 sm:py-24">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      <div className="space-y-4">
        <p className="font-semibold text-white">Our Latest Insights</p>
        <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl">
          The Journal: Resources & News
        </h1>
        <p className="text-xl text-blue-100 sm:text-2xl">
          Your daily dose of design insights!
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Select
          onValueChange={onCategoryChange}
          defaultValue={categoryFilter || 'all'}
          disabled={isLoadingCategories}
        >
          <SelectTrigger className="w-full bg-white sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {/* FIX: Filter out categories with empty string IDs */}
            {categories
              .filter((cat: Category) => cat.id && cat.id.trim() !== '')
              .map((cat: Category) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="relative w-full sm:w-auto">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search articles..."
            className="w-full bg-white pl-10 sm:w-80"
            type="search"
            aria-label="Search articles"
            defaultValue={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  </header>
);

// 3. Komponen untuk Kartu Artikel
const ArticleCard = ({ article }: { article: Article }) => (
  <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
    <Link href={`/user/articles/${article.id}`} className="block">
      <div className="relative aspect-[2/1] bg-gray-200">
        <Image
          src={article.imageUrl || 'https://placehold.co/400x200/e2e8f0/e2e8f0'}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
    </Link>
    <div className="flex flex-1 flex-col p-6">
      <p className="text-primary mb-2 text-sm font-semibold">
        {article.category.name}
      </p>
      <h3 className="mb-2 text-xl leading-snug font-bold">{article.title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">
        {truncateDescription(article.content, 100)}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {new Date(article.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <Link href={`/user/articles/${article.id}`}>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Read more about ${article.title}`}
          >
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </Card>
);

// 4. Komponen Skeleton yang lebih akurat
const ArticleCardSkeleton = () => (
  <Card className="flex h-full flex-col overflow-hidden">
    <Skeleton className="aspect-[2/1] w-full" />
    <div className="flex flex-1 flex-col p-6">
      <Skeleton className="mb-2 h-4 w-1/4" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <div className="my-4 flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="mt-auto flex items-center justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  </Card>
);

export default function ArticlesUserPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Mengambil parameter dari URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  // 5. Logika fetching yang lebih terpusat
  const fetchPageData = useCallback(
    async (page: number, search: string, category: string) => {
      setIsLoading(true);
      try {
        const articlesPromise = axiosInstance.get('/articles', {
          params: { page, limit: 9, search, category },
        });
        const categoriesPromise = axiosInstance.get('/categories');

        const [articlesResponse, categoriesResponse] = await Promise.all([
          articlesPromise,
          categoriesPromise,
        ]);

        setArticles(articlesResponse.data.data || []);
        setTotalPages(articlesResponse.data.totalPages || 1);
        setCategories(categoriesResponse.data.data || []);
      } catch (error) {
        toast.error('Failed to load page data.');
        console.error('Failed to fetch page data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPageData(currentPage, searchTerm, categoryFilter);
  }, [currentPage, searchTerm, categoryFilter, fetchPageData]);

  const handleFilterChange = (key: 'search' | 'category', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set('page', '1'); // Selalu reset ke halaman 1 saat filter berubah
    if (!value || value === 'all') {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => handleFilterChange('search', value), 500),
    [],
  );
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <ArticlePageHeader
        categories={categories}
        categoryFilter={categoryFilter}
        searchTerm={searchTerm}
        isLoadingCategories={isLoading && categories.length === 0}
        onCategoryChange={(value: string) =>
          handleFilterChange('category', value)
        }
        onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          debouncedSearch(e.target.value)
        }
      />

      <section className="container mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))
            : articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
        </div>

        {!isLoading && articles.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <h3 className="text-2xl font-semibold">No Articles Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <div className="pb-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
