// src/app/admin/articles/preview/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ArticleContentLayout from '@/components/layouts/ArticleContentLayout';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ArrowLeft, BookOpen } from 'lucide-react';

// --- Type Definitions ---
interface PreviewData {
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user: { username: string };
  category: { name: string };
}

// --- Sub-Components ---
const PageHeader = () => (
  <div className="border-b bg-white px-4 py-5 lg:px-6">
    <h1 className="mb-3 text-xl font-semibold text-slate-900">
      Article Preview
    </h1>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/articles">Articles</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Preview</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

const ArticleHeader = ({ article }: { article: PreviewData }) => (
  <div className="space-y-4 text-center">
    <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
      <Badge variant="outline">
        {article.category.name || 'Uncategorized'}
      </Badge>
      <span>
        Published on{' '}
        {new Date(article.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <span>By {article.user.username}</span>
    </div>
    <h1 className="text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
      {article.title}
    </h1>
  </div>
);

const NotFoundState = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center text-center">
      <BookOpen className="text-muted-foreground h-12 w-12" />
      <h2 className="mt-4 text-2xl font-semibold">Preview Data Not Found</h2>
      <p className="text-muted-foreground mt-2">
        Please go back to the editor and try previewing again.
      </p>
      <Button onClick={() => router.back()} className="mt-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
      </Button>
    </div>
  );
};

// --- Skeleton Component ---
const PreviewSkeleton = () => (
  <div className="container mx-auto max-w-4xl py-12">
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-6 w-24 rounded-full" />
        <Skeleton className="mx-auto h-10 w-3/4 rounded" />
      </div>
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-5/6 rounded" />
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function PreviewArticlePage() {
  const [article, setArticle] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Dijalankan hanya di sisi klien
    if (typeof window !== 'undefined') {
      const previewDataString = localStorage.getItem('articlePreview');
      if (previewDataString) {
        try {
          const data = JSON.parse(previewDataString);
          setArticle(data);
        } catch {
          toast.error('Failed to load preview data.');
        }
      }
      setIsLoading(false);

      // 2. Data pratinjau hanya untuk sekali lihat, langsung hapus.
      localStorage.removeItem('articlePreview');
    }
  }, []);

  if (isLoading) {
    return <PreviewSkeleton />;
  }

  if (!article) {
    return <NotFoundState />;
  }

  return (
    <>
      <PageHeader />
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        <article className="container mx-auto max-w-4xl rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-8">
            <ArticleHeader article={article} />

            {article.imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* 3. Gunakan ArticleContentLayout yang sudah ada */}
            <ArticleContentLayout content={article.content} />
          </div>
        </article>
      </main>
    </>
  );
}
