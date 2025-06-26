'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // Import hook yang diperlukan
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import axiosInstance from '@/lib/api/axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { debounce } from 'lodash';

// Tipe data untuk artikel dan kategori dari API
interface Article {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
}

// Komponen untuk menampilkan kerangka tabel saat loading
const ArticleTableSkeleton = () => (
  <TableBody>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        <TableCell data-label="Thumbnail" className="cell-thumbnail">
          <Skeleton className="h-[60px] w-[60px] rounded-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-3/4" />
        </TableCell>
        <TableCell>
          <Skeleton className="mx-auto h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="mx-auto h-4 w-32" />
        </TableCell>
        <TableCell data-label="Action" className="cell-actions">
          <div className="flex gap-2 lg:justify-center">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default function ArticleAdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State untuk data dan UI
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Ambil nilai filter dari URL search params
  const page = Number(searchParams.get('page')) || 1;
  const title = searchParams.get('title') || '';
  const category = searchParams.get('category') || '';

  // Fungsi untuk mengambil data artikel dari API
  const fetchArticles = useCallback(
    async (currentPage: number, search: string, categoryId: string) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: '10',
        });
        if (search) params.set('title', search);
        if (categoryId) params.set('category', categoryId);

        const response = await axiosInstance.get(
          `/articles?${params.toString()}`,
        );

        setArticles(response.data.data);
        setTotalArticles(response.data.total);
        setTotalPages(
          response.data.totalPages || Math.ceil(response.data.total / 10),
        );
      } catch {
        toast.error('Could not load articles.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Mengambil daftar kategori saat komponen pertama kali dimuat
  useEffect(() => {
    const getCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await axiosInstance.get('/categories');
        setCategories(response.data.data);
      } catch {
        toast.error('Could not load categories.');
      } finally {
        setIsLoadingCategories(false);
      }
    };
    getCategories();
  }, []);

  // useEffect untuk mengambil data setiap kali search params berubah
  useEffect(() => {
    fetchArticles(page, title, category);
  }, [searchParams, fetchArticles]);

  // Fungsi untuk membuat URL baru dengan filter
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Selalu reset ke halaman pertama saat filter berubah
      if (name !== 'page') {
        params.delete('page');
      }
      return params.toString();
    },
    [searchParams],
  );

  // Debounce untuk input pencarian
  const debouncedSearch = useCallback(
    debounce((value) => {
      router.push(`${pathname}?${createQueryString('title', value)}`);
    }, 500),
    [createQueryString, pathname, router],
  );

  // Handler untuk menghapus artikel
  const handleDelete = async () => {
    if (!selectedArticle) return;
    try {
      await axiosInstance.delete(`/articles/${selectedArticle.id}`);
      toast.success('Article deleted successfully!');
      router.push(`${pathname}?${createQueryString('page', '1')}`); // Refresh ke halaman 1
    } catch {
      toast.error('Failed to delete article.');
    } finally {
      setIsDeleteOpen(false);
      setSelectedArticle(null);
    }
  };

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteOpen(true);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/articles' },
    { label: 'Articles' },
  ];

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl leading-7 font-semibold text-slate-900">
          Articles
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="w-full flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="flex w-full flex-col gap-4 border-b border-slate-200 bg-gray-50 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-base font-medium text-slate-800">
              Total Articles : {totalArticles}
            </div>
            <div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center lg:gap-4">
              <div className="flex items-center justify-start gap-2">
                {isLoadingCategories ? (
                  <Skeleton className="h-9 w-[180px]" />
                ) : (
                  <Select
                    value={category}
                    onValueChange={(value) =>
                      router.push(
                        `${pathname}?${createQueryString('category', value === 'all' ? '' : value)}`,
                      )
                    }
                  >
                    <SelectTrigger className="flex h-9 items-center gap-1.5 border border-slate-200 bg-white px-3">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories
                        .filter((cat) => cat.id && cat.id.trim() !== '')
                        .map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
                <SearchInput
                  placeholder="Search by title"
                  value={title} // Menggunakan 'value' bukan 'defaultValue'
                  onChange={(value: string) => debouncedSearch(value)} // Menerima 'string' langsung
                  className="w-60"
                />
              </div>
              <Link href="/admin/articles/create">
                <Button className="flex h-10 items-center gap-1.5 bg-blue-600 px-4 text-white hover:bg-blue-700">
                  <Plus className="h-5 w-5" /> Add Articles
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="responsive-table w-full overflow-x-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px] text-center">
                    Thumbnails
                  </TableHead>
                  <TableHead className="text-center">Title</TableHead>
                  <TableHead className="w-[140px] text-center">
                    Category
                  </TableHead>
                  <TableHead className="w-[200px] text-center">
                    Created at
                  </TableHead>
                  <TableHead className="w-[180px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <ArticleTableSkeleton />
              ) : (
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell
                        data-label="Thumbnail"
                        className="cell-thumbnail"
                      >
                        <Image
                          src={article.imageUrl || 'https://placehold.co/60x60'}
                          alt={article.title}
                          width={100}
                          height={100}
                          className="h-[100px] w-[100px] rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell data-label="Title" className="break-words">
                        {article.title}
                      </TableCell>
                      <TableCell data-label="Category" className="text-center">
                        {article.category.name}
                      </TableCell>
                      <TableCell
                        data-label="Created at"
                        className="text-center"
                      >
                        {new Date(article.createdAt).toLocaleDateString(
                          'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' },
                        )}
                      </TableCell>
                      <TableCell data-label="Action" className="cell-actions">
                        <div className="flex gap-2 lg:justify-center">
                          <Link
                            href={`/admin/articles/${article.id}`}
                            className="flex-1 lg:flex-none"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-full text-xs lg:h-auto lg:border-0 lg:bg-transparent lg:p-1 lg:text-blue-600 lg:underline"
                            >
                              <Eye className="mr-1 h-4 w-4 lg:h-3 lg:w-3" />
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
                              className="h-8 w-full text-xs lg:h-auto lg:border-0 lg:bg-transparent lg:p-1 lg:text-blue-600 lg:underline"
                            >
                              <Edit className="mr-1 h-4 w-4 lg:h-3 lg:w-3" />
                              <span className="lg:text-xs">Edit</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 lg:h-auto lg:border-0 lg:bg-transparent lg:p-1 lg:text-red-500 lg:underline"
                            onClick={() => openDeleteModal(article)}
                          >
                            <Trash2 className="mr-1 h-4 w-4 lg:h-3 lg:w-3" />
                            <span className="lg:text-xs">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>

          <div className="border-t border-slate-200 p-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                router.push(
                  `${pathname}?${createQueryString('page', String(newPage))}`,
                )
              }
            />
          </div>
        </div>
      </main>
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedArticle?.title}
        itemType="Article"
      />
    </>
  );
}
