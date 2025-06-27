// src/app/admin/articles/[id]/edit/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit as EditIcon, Loader2 } from 'lucide-react';

import ThumbnailUpload from '@/components/common/forms/ThumbnailUpload';
import CustomTipTapEditor from '@/components/common/forms/CustomTipTapEditor';
import axiosInstance from '@/lib/api/axios';
import { useAuth } from '@/contexts/AuthContext';
// Menggunakan kembali skema dari file validasi terpusat

// --- Type Definitions ---
interface Category {
  id: string;
  name: string;
}

type ArticleFormValues = {
  title: string;
  content: string;
  categoryId: string;
  thumbnail?: File | null;
};

// --- Validation Schema ---
const articleSchema = z.object({
  title: z
    .string()
    .min(3, 'Title is required and should be at least 3 characters.'),
  content: z.string().min(1, 'Content is required.'),
  categoryId: z.string().min(1, 'Category is required.'),
  thumbnail: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      'Thumbnail must be a file.',
    ),
});

// --- Sub-Components ---
const PageHeader = () => (
  <div className="border-b bg-white px-4 py-5 lg:px-6">
    <h1 className="mb-3 text-xl font-semibold text-slate-900">Edit Article</h1>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/articles">Articles</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Edit</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

const FormActions = ({
  onPreview,
  isSubmitting,
}: {
  onPreview: () => void;
  isSubmitting: boolean;
}) => (
  <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t pt-6 sm:flex-row">
    <Button asChild type="button" variant="outline" disabled={isSubmitting}>
      <Link href="/admin/articles">Cancel</Link>
    </Button>
    <Button
      type="button"
      variant="secondary"
      onClick={onPreview}
      disabled={isSubmitting}
    >
      Preview
    </Button>
    <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isSubmitting ? 'Saving...' : 'Save Changes'}
    </Button>
  </div>
);

const EditPageSkeleton = () => (
  <div className="space-y-8">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48 rounded" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Skeleton className="aspect-video w-full rounded-lg" />
        </div>
        <div className="space-y-6 md:col-span-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32 rounded" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[400px] w-full rounded-md" />
      </CardContent>
    </Card>
  </div>
);

// --- Main Page Component ---
export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: { title: '', content: '', categoryId: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!articleId) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [articleRes, categoriesRes] = await Promise.all([
          axiosInstance.get(`/articles/${articleId}`),
          axiosInstance.get('/categories'),
        ]);

        const article = articleRes.data;
        setCategories(categoriesRes.data.data || []);

        if (!article) throw new Error('Article not found.');

        form.reset({
          title: article.title,
          content: article.content,
          categoryId: article.categoryId,
          thumbnail: article.imageUrl,
        });
      } catch {
        toast.error('Failed to load article data.');
        router.push('/admin/articles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [articleId, form, router]);

  const uploadThumbnail = async (thumbnail: File): Promise<string | null> => {
    // Logic ini sama seperti di halaman create
    toast.info('Uploading thumbnail...');
    const formData = new FormData();
    formData.append('image', thumbnail);
    try {
      const response = await axiosInstance.post('/upload', formData);
      toast.success('Thumbnail uploaded.');
      return response.data.imageUrl;
    } catch (error) {
      toast.error('Thumbnail upload failed.');
      throw error;
    }
  };

  const onSubmit = useCallback(
    async (data: ArticleFormValues) => {
      let finalImageUrl: string | null = null;

      if (data.thumbnail instanceof File) {
        finalImageUrl = await uploadThumbnail(data.thumbnail);
      } else if (typeof data.thumbnail === 'string') {
        finalImageUrl = data.thumbnail;
      } else {
        finalImageUrl = null;
      }

      const payload = {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        ...(finalImageUrl !== undefined && { imageUrl: finalImageUrl }),
      };

      try {
        await axiosInstance.put(`/articles/${articleId}`, payload);
        toast.success('Article updated successfully!');
        router.push('/admin/articles');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Failed to update article.';
        toast.error(errorMessage);
      }
    },
    [articleId, router],
  );

  const handlePreview = () => {
    // Logic ini sama seperti di halaman create
    const data = form.getValues();
    const selectedCategory = categories.find((c) => c.id === data.categoryId);

    let previewImageUrl: string | null = null;
    if (data.thumbnail instanceof File) {
      previewImageUrl = URL.createObjectURL(data.thumbnail);
    } else if (typeof data.thumbnail === 'string') {
      previewImageUrl = data.thumbnail;
    }

    const previewData = {
      title: data.title || 'Untitled Article',
      content: data.content || '<p>No content yet.</p>',
      imageUrl: previewImageUrl,
      createdAt: new Date().toISOString(),
      user: { username: user?.username || 'Admin' },
      category: {
        id: data.categoryId,
        name: selectedCategory?.name || 'Uncategorized',
      },
    };
    localStorage.setItem('articlePreview', JSON.stringify(previewData));
    window.open(`/admin/articles/preview`, '_blank');
  };

  return (
    <>
      <PageHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          {isLoading ? (
            <EditPageSkeleton />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <EditIcon className="h-5 w-5" /> Article Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thumbnail</FormLabel>
                            <FormControl>
                              <ThumbnailUpload
                                value={field.value}
                                onValueChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-6 md:col-span-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter article title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories
                                  .filter((cat) => cat && cat.id)
                                  .map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="h-[400px] w-full rounded-md border lg:h-[500px]">
                              <CustomTipTapEditor
                                content={field.value}
                                onChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <FormActions
                  onPreview={handlePreview}
                  isSubmitting={form.formState.isSubmitting}
                />
              </form>
            </Form>
          )}
        </div>
      </main>
    </>
  );
}
