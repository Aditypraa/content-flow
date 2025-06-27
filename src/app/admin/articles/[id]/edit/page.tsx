// app/admin/articles/[id]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import ThumbnailUpload from '@/components/common/forms/ThumbnailUpload';
import CustomTipTapEditor from '@/components/common/forms/CustomTipTapEditor';
import axiosInstance from '@/lib/api/axios';
import { useAuth } from '@/contexts/AuthContext';

// --- Definisi Tipe dan Skema ---
interface Category {
  id: string;
  name: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MIN_CONTENT_WORDS = 10;

const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  categoryId: z
    .string({ required_error: 'Please select a category.' })
    .min(1, 'Please select a category.'),
  content: z
    .string()
    .trim()
    .refine(
      (content) => {
        const wordCount = content.split(/\s+/).filter(Boolean).length;
        return wordCount >= MIN_CONTENT_WORDS;
      },
      {
        message: `Content must be at least ${MIN_CONTENT_WORDS} words.`,
      },
    ),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    )
    .optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const { user } = useAuth(); // Mengambil data pengguna
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(
    null,
  );
  const [deleteThumbnail, setDeleteThumbnail] = useState(false);

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

  // Fetch data
  useEffect(() => {
    if (!articleId) return;
    const fetchData = async () => {
      // ... (logika fetch data Anda tetap sama)
      setIsLoadingCategories(true);
      setIsLoadingArticle(true);

      try {
        // Fetch categories
        const categoriesResponse = await axiosInstance.get('/categories');
        if (Array.isArray(categoriesResponse.data.data)) {
          setCategories(categoriesResponse.data.data);
        } else {
          setCategories([]);
          toast.error('Invalid category data received from server.');
        }

        // Fetch article
        const articleResponse = await axiosInstance.get(
          `/articles/${articleId}`,
        );
        const article = articleResponse.data;

        // Validate article data
        if (
          !article ||
          !article.id ||
          !article.title ||
          !article.content ||
          !article.categoryId
        ) {
          throw new Error('Invalid article data received from server.');
        }

        form.reset({
          title: article.title,
          content: article.content,
          categoryId: article.categoryId,
          thumbnail: undefined,
        });

        setExistingThumbnail(article.imageUrl || null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Failed to load data:', error);
        const errorMessage =
          error.response?.data?.message ||
          'Failed to load article or categories.';
        toast.error(errorMessage);
        router.push('/admin/articles');
      } finally {
        setIsLoadingCategories(false);
        setIsLoadingArticle(false);
      }
    };
    fetchData();
  }, [articleId, form, router]);

  const wordCount =
    form.watch('content')?.trim().split(/\s+/).filter(Boolean).length || 0;

  // Fungsi submit
  const onSubmit = async (data: ArticleFormValues) => {
    setIsSubmitting(true);
    // ... (Logika onSubmit Anda tetap sama)
    try {
      let imageUrl = existingThumbnail;

      // Step 1: Upload new thumbnail if exists
      if (data.thumbnail) {
        setUploadProgress('Uploading thumbnail...');
        const formData = new FormData();
        formData.append('image', data.thumbnail);

        const uploadResponse = await axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl =
          uploadResponse.data.url ||
          uploadResponse.data.data?.url ||
          uploadResponse.data.path;
        setUploadProgress('Thumbnail uploaded successfully!');
      } else if (deleteThumbnail) {
        imageUrl = null;
      }

      // Step 2: Update article
      setUploadProgress('Updating article...');
      const requestBody = {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        ...(imageUrl !== undefined && { imageUrl }), // Include imageUrl only if defined
      };

      await axiosInstance.put(`/articles/${articleId}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Article updated successfully!');
      router.push('/admin/articles');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Full error:', error.response?.data || error);
      if (error.response?.status === 413) {
        toast.error('File too large. Please choose a smaller image.');
      } else if (error.response?.status === 415) {
        toast.error('File type not supported. Please use JPG, PNG, or WebP.');
      } else {
        const errorMessage =
          error.response?.data?.message ||
          'Failed to update article. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
    }
  };

  // Fungsi untuk pratinjau
  const handlePreview = () => {
    const data = form.getValues();
    const selectedCategory = categories.find((c) => c.id === data.categoryId);

    let previewImageUrl = existingThumbnail;
    if (data.thumbnail) {
      previewImageUrl = URL.createObjectURL(data.thumbnail);
    } else if (deleteThumbnail) {
      previewImageUrl = null;
    }

    const previewData = {
      title: data.title,
      content: data.content,
      imageUrl: previewImageUrl,
      createdAt: new Date().toISOString(),
      user: { username: user?.username || 'Admin' },
      category: {
        id: data.categoryId,
        name: selectedCategory?.name || 'Uncategorized',
      },
      isPreview: true,
    };

    localStorage.setItem('articlePreview', JSON.stringify(previewData));
    window.open(`/admin/articles/preview`, '_blank');
  };

  const handleDeleteThumbnail = () => {
    setDeleteThumbnail(true);
    setExistingThumbnail(null);
    form.setValue('thumbnail', undefined);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/articles' },
    { label: 'Articles', href: '/admin/articles' },
    { label: 'Edit' },
  ];

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl leading-7 font-semibold text-slate-900">
          Edit Article
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

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-none lg:mx-auto lg:max-w-[1097px]">
          <div className="rounded-xl border border-slate-200 bg-white">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-slate-900" />
                  <CardTitle className="text-base font-medium text-slate-900">
                    Edit Article
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingArticle ? (
                  <Skeleton className="h-[600px] w-full" />
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 lg:space-y-6"
                    >
                      <div className="flex flex-col gap-4">
                        <FormField
                          control={form.control}
                          name="thumbnail"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="space-y-2">
                                  {existingThumbnail && !deleteThumbnail ? (
                                    <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center">
                                      <Image
                                        src={existingThumbnail}
                                        alt="Article thumbnail"
                                        width={300}
                                        height={200}
                                        className="mx-auto rounded-md"
                                      />
                                      <div className="mt-2 flex justify-center gap-2">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            document
                                              .getElementById(
                                                'thumbnail-upload',
                                              )
                                              ?.click()
                                          }
                                        >
                                          Change
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          className="text-red-500"
                                          onClick={handleDeleteThumbnail}
                                        >
                                          Delete
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <ThumbnailUpload
                                      label="Upload new thumbnail (Opsioanal)"
                                      selectedFile={field.value}
                                      onFileSelect={field.onChange}
                                    />
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-900">
                                Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Input title"
                                  className="bg-white"
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
                              <FormLabel className="text-sm font-medium text-gray-900">
                                Category
                              </FormLabel>
                              {isLoadingCategories ? (
                                <Skeleton className="h-10 w-full" />
                              ) : (
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-white">
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {categories
                                      .filter(
                                        (cat) => cat && cat.id && cat.name,
                                      )
                                      .map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                          {cat.name}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              )}
                              <p className="text-sm text-slate-500">
                                The existing category list can be seen in the{' '}
                                <Link
                                  href="/admin/categories"
                                  className="text-blue-600 underline"
                                >
                                  category
                                </Link>{' '}
                                menu
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-900">
                              Content
                            </FormLabel>
                            <Card className="flex h-[400px] flex-col border-slate-200 bg-gray-50 lg:h-[551px]">
                              <FormControl>
                                <CustomTipTapEditor
                                  content={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </Card>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-end text-xs text-gray-500">
                        <span>{wordCount} Words</span>
                      </div>
                      {uploadProgress && (
                        <div className="text-sm font-medium text-blue-600">
                          {uploadProgress}
                        </div>
                      )}
                      <div className="mt-4 flex flex-col justify-end gap-2 border-t py-4 sm:flex-row">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push('/admin/articles')}
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handlePreview}
                          className="w-full bg-slate-200 text-slate-900 sm:w-auto"
                        >
                          Preview
                        </Button>
                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Updating...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
