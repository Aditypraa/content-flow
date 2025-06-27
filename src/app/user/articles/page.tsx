// app/user/articles/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import Image from 'next/image';
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
import Link from 'next/link';

// Tipe data untuk artikel dan kategori sesuai API
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

// Komponen Skeleton untuk kartu artikel
const ArticleCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-6">
      <Skeleton className="mb-2 h-4 w-1/4" />
      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-4 h-10 w-full" />
      <div className="flex items-center justify-between">
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

  // State untuk menyimpan data dari API
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Mengambil parameter dari URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  // Fungsi untuk membuat query string URL
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (name !== 'page') {
        params.delete('page');
      }
      return params.toString();
    },
    [searchParams],
  );

  // Fungsi untuk mengambil data artikel
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    const limit = 9; // Kembali ke 10 sesuai permintaan Anda
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(limit),
      });
      if (searchTerm) params.set('search', searchTerm);
      if (categoryFilter) params.set('category', categoryFilter);

      const response = await axiosInstance.get(
        `/articles?${params.toString()}`,
      );

      const responseData = response.data.data || [];
      setArticles(responseData);

      const totalData = response.data.total || 0;
      setTotalPages(Math.ceil(totalData / limit));
    } catch (error) {
      toast.error('Gagal memuat artikel.');
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, categoryFilter]);

  // Fungsi untuk mengambil data kategori
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await axiosInstance.get('/categories');
        setCategories(response.data.data);
      } catch (error) {
        toast.error('Gagal memuat kategori.');
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Memanggil fetchArticles setiap kali parameter URL berubah
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handler untuk pencarian dengan debounce
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      router.push(`${pathname}?${createQueryString('search', value)}`);
    }, 500),
    [createQueryString, pathname, router],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Handler untuk filter kategori
  const handleCategoryChange = (value: string) => {
    const newCategory = value === 'all' ? '' : value;
    router.push(`${pathname}?${createQueryString('category', newCategory)}`);
  };

  // --- PERBAIKAN DI SINI ---
  // Fungsi untuk menghapus HTML dan memotong deskripsi
  const truncateDescription = (htmlContent: string, maxLength: number) => {
    // 1. Hapus semua tag HTML
    const plainText = htmlContent.replace(/<[^>]*>?/gm, '');

    // 2. Potong teks jika lebih panjang dari maxLength
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength) + '...';
  };

  return (
    <>
      <div className="relative h-[500px] overflow-hidden bg-blue-600/90">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-base font-bold text-white">Blog genzet</div>
              <h1 className="text-5xl leading-tight font-medium text-white">
                The Journal : Design Resources,
                <br />
                Interviews, and Industry News
              </h1>
              <p className="text-2xl text-white">
                Your daily dose of design insights!
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Select
                onValueChange={handleCategoryChange}
                defaultValue={categoryFilter || 'all'}
                disabled={isLoadingCategories}
              >
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories
                    .filter((cat) => cat && cat.id && cat.id.trim() !== '')
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  className="w-96 bg-white pl-10"
                  type="search"
                  aria-label="Search articles"
                  defaultValue={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))
            : articles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <Link
                    href={`/user/articles/${article.id}`}
                    className="block h-48 bg-gray-200"
                  >
                    <Image
                      src={
                        article.imageUrl ||
                        'https://placehold.co/400x192/e2e8f0/e2e8f0'
                      }
                      alt={article.title}
                      width={400}
                      height={192}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="mb-2 text-sm text-blue-600">
                      {article.category.name}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {article.title}
                    </h3>
                    <p className="mb-4 text-gray-600">
                      {truncateDescription(article.content, 100)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
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
              ))}
        </div>
        {!isLoading && articles.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <h3 className="text-xl font-semibold">No Articles Found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 mb-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) =>
              router.push(
                `${pathname}?${createQueryString('page', String(page))}`,
              )
            }
          />
        </div>
      )}
    </>
  );
}
