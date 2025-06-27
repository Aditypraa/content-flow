// src/app/admin/categories/page.tsx

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { debounce } from 'lodash';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import SearchInput from '@/components/common/forms/SearchInput';
import Pagination from '@/components/common/feedback/Pagination';
import DeleteConfirmationModal from '@/components/common/modals/DeleteConfirmationModal';
import axiosInstance from '@/lib/api/axios';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

// --- Type Definitions and Schema ---
interface Category {
  id: string;
  name: string;
  createdAt: string;
}

const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
});
type CategoryFormValues = z.infer<typeof categorySchema>;

// --- Skeleton Component ---
const CategoryTableSkeleton = ({ rows = 5 }) => (
  <TableBody>
    {Array.from({ length: rows }).map((_, i) => (
      <TableRow key={i}>
        <TableCell className="w-full py-4">
          <Skeleton className="h-5 w-3/4 rounded" />
        </TableCell>
        <TableCell className="w-[200px]">
          <Skeleton className="h-5 w-32 rounded" />
        </TableCell>
        <TableCell className="w-[120px]">
          <div className="flex justify-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

// --- Main Page Component ---
export default function CategoryAdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. State disederhanakan
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalCategories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    type: 'add' | 'edit' | 'delete' | null;
    data?: Category | null;
  }>({ type: null, data: null });

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '' },
  });

  // 2. Memoized URL params menjadi sumber kebenaran tunggal
  const { page, search } = useMemo(
    () => ({
      page: Number(searchParams.get('page')) || 1,
      search: searchParams.get('search') || '',
    }),
    [searchParams],
  );

  // 3. Fungsi fetching data terpusat
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = { page: String(page), limit: '10', search };
      const response = await axiosInstance.get('/categories', { params });

      setCategories(response.data.data || []);
      setPagination({
        totalPages: response.data.totalPages || 1,
        totalCategories: response.data.totalData || 0,
      });
    } catch {
      toast.error('Could not load categories.');
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 4. Handler untuk mengelola URL
  const handleUpdateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.set('page', '1');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => handleUpdateQuery('search', query), 500),
    [searchParams],
  );

  // 5. Handler CRUD yang lebih bersih
  const handleFormSubmit = async (data: CategoryFormValues) => {
    const isEditing = modalState.type === 'edit';
    const id = modalState.data?.id;

    try {
      if (isEditing && id) {
        await axiosInstance.put(`/categories/${id}`, data);
        toast.success('Category updated successfully!');
      } else {
        await axiosInstance.post('/categories', data);
        toast.success('Category created successfully!');
      }
      setModalState({ type: null });
      fetchCategories(); // Re-fetch data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditing ? 'update' : 'create'} category.`,
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (modalState.type !== 'delete' || !modalState.data) return;
    try {
      await axiosInstance.delete(`/categories/${modalState.data.id}`);
      toast.success('Category deleted successfully!');
      setModalState({ type: null });
      fetchCategories(); // Re-fetch data
    } catch {
      toast.error('Failed to delete category.');
    }
  };

  return (
    <>
      <div className="border-b bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl font-semibold text-slate-900">
          Categories
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/articles">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border bg-white">
          <div className="flex w-full flex-col gap-4 border-b bg-gray-50 p-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base font-medium text-slate-800">
              Total Categories: {pagination.totalCategories}
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <SearchInput
                placeholder="Search Category"
                defaultValue={search}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full sm:w-auto"
              />
              <Dialog
                open={modalState.type === 'add'}
                onOpenChange={(isOpen) => {
                  setModalState({ type: isOpen ? 'add' : null });
                  if (!isOpen) form.reset();
                }}
              >
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new category for organizing articles.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleFormSubmit)}
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
                                disabled={form.formState.isSubmitting}
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
                          onClick={() => setModalState({ type: null })}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Add Category
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-[200px] text-center">
                    Created at
                  </TableHead>
                  <TableHead className="w-[120px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <CategoryTableSkeleton />
              ) : (
                <TableBody className="block md:table-row-group">
                  {categories.map((item) => (
                    <TableRow
                      key={item.id}
                      className="block border-b p-4 md:table-row md:border-b-0 md:p-0"
                    >
                      <TableCell className="block font-medium md:table-cell md:p-4">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground flex justify-between text-sm md:table-cell md:w-[200px] md:py-4 md:text-center">
                        <span className="md:hidden">Created:</span>
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="pt-4 pb-2 md:w-[120px] md:py-4">
                        <div className="flex justify-end gap-2 md:justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              form.reset({ name: item.name });
                              setModalState({ type: 'edit', data: item });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive h-8 w-8"
                            onClick={() =>
                              setModalState({ type: 'delete', data: item })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
          {pagination.totalPages > 1 && (
            <div className="border-t p-4">
              <Pagination
                currentPage={page}
                totalPages={pagination.totalPages}
                onPageChange={(p) => handleUpdateQuery('page', String(p))}
              />
            </div>
          )}
        </div>
      </main>

      <Dialog
        open={modalState.type === 'edit'}
        onOpenChange={(isOpen) => !isOpen && setModalState({ type: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category name.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
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
                        disabled={form.formState.isSubmitting}
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
                  onClick={() => setModalState({ type: null })}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationModal
        isOpen={modalState.type === 'delete'}
        onClose={() => setModalState({ type: null })}
        onConfirm={handleDeleteConfirm}
        itemName={modalState.data?.name}
        itemType="Category"
        isLoading={form.formState.isSubmitting}
      />
    </>
  );
}
