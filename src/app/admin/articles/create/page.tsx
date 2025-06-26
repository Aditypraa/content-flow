'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

// Import components
import ThumbnailUpload from '@/components/common/forms/ThumbnailUpload';
import CustomTipTapEditor from '@/components/common/forms/CustomTipTapEditor';
import axiosInstance from '@/lib/api/axios';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

// Type for category
interface Category {
  id: string;
  name: string;
}

// Constants for validation
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MIN_CONTENT_WORDS = 50;

// Zod schema validation with optional thumbnail
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

export default function ArticleCreatePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await axiosInstance.get('/categories');
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          setCategories([]);
          toast.error('Invalid category data received from server.');
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        toast.error('Failed to load categories.');
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Setup react-hook-form
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

  const wordCount =
    form.watch('content')?.trim().split(/\s+/).filter(Boolean).length || 0;

  // Two-step upload process
  const onSubmit = async (data: ArticleFormValues) => {
    setIsSubmitting(true);
    setUploadProgress('');

    try {
      let thumbnailUrl = null;

      // Step 1: Upload thumbnail if exists
      if (data.thumbnail) {
        setUploadProgress('Uploading thumbnail...');

        const formData = new FormData();
        formData.append('image', data.thumbnail);

        console.log('Uploading thumbnail...', data.thumbnail.name);

        const uploadResponse = await axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Adjust this based on your backend response structure
        thumbnailUrl =
          uploadResponse.data.url ||
          uploadResponse.data.data?.url ||
          uploadResponse.data.path;

        console.log('Thumbnail uploaded successfully:', thumbnailUrl);
        setUploadProgress('Thumbnail uploaded successfully!');
      }

      // Step 2: Create article with JSON
      setUploadProgress('Creating article...');

      const requestBody = {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        ...(thumbnailUrl && { thumbnailUrl }), // Include thumbnail URL if exists
        // Alternative field names you might need:
        // ...(thumbnailUrl && { image: thumbnailUrl }),
        // ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
      };

      console.log('Creating article with data:', requestBody);

      await axiosInstance.post('/articles', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Article created successfully!');
      router.push('/admin/articles');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Full error:', error.response?.data || error);

      // More detailed error handling
      if (error.response?.status === 413) {
        toast.error('File too large. Please choose a smaller image.');
      } else if (error.response?.status === 415) {
        toast.error('File type not supported. Please use JPG, PNG, or WebP.');
      } else {
        const errorMessage =
          error.response?.data?.message ||
          'Failed to create article. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/articles' },
    { label: 'Articles', href: '/admin/articles' },
    { label: 'Create' },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl leading-7 font-semibold text-slate-900">
          Create Article
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-none lg:mx-auto lg:max-w-[1097px]">
          <div className="rounded-xl border border-slate-200 bg-white">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-slate-900" />
                  <CardTitle className="text-base font-medium text-slate-900">
                    Create Articles
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 lg:space-y-6"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Thumbnail Upload Field */}
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ThumbnailUpload
                                label="Thumbnail (optional)"
                                selectedFile={field.value}
                                onFileSelect={field.onChange}
                              />
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
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white">
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
                                variant="create"
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

                    {/* Upload Progress */}
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
                        className="w-full bg-slate-200 text-slate-900 sm:w-auto"
                        disabled
                      >
                        Preview
                      </Button>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating...' : 'Create Article'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
