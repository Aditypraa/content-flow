// src/app/admin/articles/create/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Upload, Loader2 } from 'lucide-react';

import ThumbnailUpload from '@/components/common/forms/ThumbnailUpload';
import CustomTipTapEditor from '@/components/common/forms/CustomTipTapEditor';
import axiosInstance from '@/lib/api/axios';
import { useAuth } from '@/contexts/AuthContext';

import * as z from 'zod';

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
    <h1 className="mb-3 text-xl font-semibold text-slate-900">
      Create New Article
    </h1>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/articles">Articles</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Create</BreadcrumbPage>
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
    <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isSubmitting ? 'Creating...' : 'Create Article'}
    </Button>
  </div>
);

// --- Main Page Component ---
export default function ArticleCreatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      thumbnail: undefined,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/categories');
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          toast.error('Invalid category data from server.');
        }
      } catch {
        toast.error('Failed to load categories.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const uploadThumbnail = async (thumbnail: File): Promise<string | null> => {
    toast.info('Uploading thumbnail...');
    const formData = new FormData();
    formData.append('image', thumbnail);
    try {
      const response = await axiosInstance.post('/upload', formData);
      toast.success('Thumbnail uploaded.');
      return response.data.imageUrl;
    } catch (error) {
      toast.error('Thumbnail upload failed.');
      throw error; // Lemparkan error agar proses submit berhenti
    }
  };

  const onSubmit = useCallback(
    async (data: ArticleFormValues) => {
      form.clearErrors();

      let thumbnailUrl = null;
      try {
        if (data.thumbnail) {
          thumbnailUrl = await uploadThumbnail(data.thumbnail);
        }

        const payload = {
          title: data.title,
          content: data.content,
          categoryId: data.categoryId,
          ...(thumbnailUrl && { imageUrl: thumbnailUrl }),
        };

        await axiosInstance.post('/articles', payload);
        toast.success('Article created successfully!');
        router.push('/admin/articles');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Failed to create article.';
        toast.error(errorMessage);
      }
    },
    [form, router],
  );

  const handlePreview = () => {
    const data = form.getValues();
    const selectedCategory = categories.find((c) => c.id === data.categoryId);
    const previewData = {
      title: data.title || 'Untitled Article',
      content: data.content || '<p>No content yet.</p>',
      imageUrl: data.thumbnail ? URL.createObjectURL(data.thumbnail) : null,
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

  const wordCount =
    form.watch('content')?.trim().split(/\s+/).filter(Boolean).length || 0;

  return (
    <>
      <PageHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Upload className="h-5 w-5" /> Article Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thumbnail (Optional)</FormLabel>
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
                          {isLoading ? (
                            <Skeleton className="h-10 w-full" />
                          ) : (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories
                                  .filter((cat) => cat && cat.id && cat.name)
                                  .map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
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
                  <div className="text-muted-foreground mt-2 flex items-center justify-end text-xs">
                    <span>{wordCount} Words</span>
                  </div>
                </CardContent>
              </Card>

              <FormActions
                onPreview={handlePreview}
                isSubmitting={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}
