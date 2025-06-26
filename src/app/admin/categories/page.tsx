'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { debounce } from 'lodash';
import { toast } from 'sonner';

// Import komponen UI dari ShadCN dan komponen kustom
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import SearchInput from '@/components/common/forms/SearchInput'; // Pastikan path ini benar
import Pagination from '@/components/common/feedback/Pagination'; // Pastikan path ini benar
import DeleteConfirmationModal from '@/components/common/modals/DeleteConfirmationModal'; // Pastikan path ini benar
import axiosInstance from '@/lib/api/axios';

// Tipe data untuk kategori disesuaikan dengan API
interface Category {
  id: string;
  name: string;
  createdAt: string;
}

// Skema validasi untuk form
const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .min(2, 'Category name must be at least 2 characters'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

// Komponen Skeleton yang meniru struktur tabel
const CategoryTableSkeleton = () => (
  <TableBody>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i} className="border-b border-slate-200 last:border-b-0">
        <TableCell className="p-4">
          <Skeleton className="h-5 w-1/2" />
          <div className="mt-2 space-y-1 md:hidden">
            <Skeleton className="h-3 w-3/4" />
          </div>
        </TableCell>
        <TableCell className="hidden p-4 text-center md:table-cell">
          <Skeleton className="mx-auto h-4 w-32" />
        </TableCell>
        <TableCell className="p-4">
          <div className="flex gap-2 md:justify-center">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default function CategoryAdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State untuk data dan UI
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Ambil nilai filter dari URL
  const page = Number(searchParams.get('page')) || 1;
  const name = searchParams.get('search') || '';

  // Inisialisasi form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '' },
  });

  // Fungsi untuk mengambil data kategori dari API
  const fetchCategories = useCallback(
    async (currentPage: number, search: string) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: '10',
        });
        if (search) params.set('search', search);

        const response = await axiosInstance.get(
          `/categories?${params.toString()}`,
        );

        setCategories(response.data.data);
        setTotalCategories(response.data.totalData);
        setTotalPages(response.data.totalPages);
      } catch {
        toast.error('Could not load categories.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Fungsi untuk membuat query string URL
  const createQueryString = useCallback(
    (paramName: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }
      if (paramName !== 'page') {
        params.delete('page');
      }
      return params.toString();
    },
    [searchParams],
  );

  // Fungsi debounce untuk menunda eksekusi pencarian saat pengguna mengetik
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      router.push(`${pathname}?${createQueryString('search', value)}`);
    }, 500),
    [createQueryString, pathname, router],
  );

  // Ambil data setiap kali parameter URL berubah
  useEffect(() => {
    fetchCategories(page, name);
  }, [searchParams, fetchCategories]);

  // Handler untuk Aksi CRUD
  const onAddSubmit = async (data: CategoryFormValues) => {
    try {
      await axiosInstance.post('/categories', data);
      toast.success('Category added successfully!');
      setIsAddOpen(false);
      router.push(pathname);
    } catch {
      toast.error('Failed to add category.');
    }
  };

  const onEditSubmit = async (data: CategoryFormValues) => {
    if (!selectedCategory) return;
    try {
      await axiosInstance.put(`/categories/${selectedCategory.id}`, data);
      toast.success('Category updated successfully!');
      setIsEditOpen(false);
      fetchCategories(page, name);
    } catch {
      toast.error('Failed to update category.');
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await axiosInstance.delete(`/categories/${selectedCategory.id}`);
      toast.success('Category deleted successfully!');
      if (categories.length === 1 && page > 1) {
        router.push(
          `${pathname}?${createQueryString('page', String(page - 1))}`,
        );
      } else {
        fetchCategories(page, name);
      }
    } catch {
      toast.error('Failed to delete category.');
    } finally {
      setIsDeleteOpen(false);
      setSelectedCategory(null);
    }
  };

  // Handler untuk membuka modal
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    form.setValue('name', category.name);
    setIsEditOpen(true);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Categories' },
  ];

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl leading-7 font-semibold text-slate-900">
          Categories
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
              Total Categories : {totalCategories}
            </div>
            <div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center lg:gap-4">
              <SearchInput
                placeholder="Search Category"
                value={name} // Gunakan `value` agar menjadi controlled component
                onChange={(value: string) => {
                  // Terima `value` sebagai string
                  debouncedSearch(value);
                }}
                className="w-full sm:w-60"
              />

              <Dialog
                open={isAddOpen}
                onOpenChange={(isOpen) => {
                  setIsAddOpen(isOpen);
                  if (!isOpen) form.reset();
                }}
              >
                <DialogTrigger asChild>
                  <Button className="flex h-10 items-center gap-1.5 bg-blue-600 px-4 text-white hover:bg-blue-700">
                    <Plus className="h-5 w-5" /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="mx-4 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new category for organizing articles.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onAddSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter category name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting
                            ? 'Adding...'
                            : 'Add Category'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b-0">
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden w-[200px] text-center md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="w-[180px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <CategoryTableSkeleton />
              ) : (
                <TableBody>
                  {categories
                    .filter(
                      (category) => category.id && category.id.trim() !== '',
                    )
                    .map((category) => (
                      <TableRow
                        key={category.id}
                        className="border-b border-slate-200 last:border-b-0"
                      >
                        <TableCell className="p-4">
                          <div className="space-y-1">
                            <h3 className="font-medium text-slate-800 md:text-left md:font-normal">
                              {category.name}
                            </h3>
                            <div className="space-y-1 text-sm text-slate-500 md:hidden">
                              <p>
                                Created:{' '}
                                {new Date(
                                  category.createdAt,
                                ).toLocaleDateString('en-GB')}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden p-4 text-center md:table-cell">
                          {new Date(category.createdAt).toLocaleDateString(
                            'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' },
                          )}
                        </TableCell>
                        <TableCell className="p-4">
                          <div className="flex gap-2 md:justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(category)}
                              className="h-8 flex-1 px-3 text-xs md:h-auto md:flex-none md:border-0 md:bg-transparent md:p-1 md:text-blue-600 md:underline md:hover:bg-transparent md:hover:text-blue-700"
                            >
                              <Edit className="mr-1 h-4 w-4 md:mr-0.5 md:h-3 md:w-3" />
                              <span>Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDeleteModal(category)}
                              className="h-8 flex-1 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 md:h-auto md:flex-none md:border-0 md:bg-transparent md:p-1 md:text-red-500 md:underline md:hover:bg-transparent md:hover:text-red-600"
                            >
                              <Trash2 className="mr-1 h-4 w-4 md:mr-0.5 md:h-3 md:w-3" />
                              <span>Delete</span>
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

      {/* Edit Modal */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(isOpen) => {
          setIsEditOpen(isOpen);
          if (!isOpen) {
            form.reset();
            setSelectedCategory(null);
          }
        }}
      >
        <DialogContent className="mx-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter category name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedCategory?.name}
        itemType="Category"
      />
    </>
  );
}
