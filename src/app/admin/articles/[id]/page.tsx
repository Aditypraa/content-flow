// app/admin/articles/preview/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ArticleContent from '@/components/layouts/ArticleContentLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Tipe untuk data pratinjau
interface PreviewData {
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user: { username: string };
  category: { name: string };
}

// Komponen Skeleton
const ArticlePreviewSkeleton = () => (
  <>
    <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
      <Skeleton className="mb-3 h-7 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-6 w-24 rounded-full" />
          <Skeleton className="mx-auto h-10 w-3/4" />
        </div>
        <Skeleton className="mt-8 h-96 w-full rounded-xl" />
      </div>
    </main>
  </>
);

export default function PreviewArticlePage() {
  const router = useRouter();
  const [article, setArticle] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const previewDataString = localStorage.getItem('articlePreview');
    if (previewDataString) {
      try {
        const data = JSON.parse(previewDataString);
        setArticle(data);
      } catch {
        toast.error('Gagal memuat data pratinjau.');
      }
    }
    setIsLoading(false);

    // Hapus data dari localStorage saat komponen dilepas (unmount)
    return () => {
      localStorage.removeItem('articlePreview');
    };
  }, []);

  const breadcrumbs = [
    { label: 'Articles', href: '/admin/articles' },
    { label: 'Preview' },
  ];

  if (isLoading) {
    return <ArticlePreviewSkeleton />;
  }

  if (!article) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">
          Data Pratinjau Tidak Ditemukan
        </h2>
        <p className="text-gray-500">Silakan kembali dan coba lagi.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Header Halaman */}
      <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl leading-7 font-semibold text-slate-900">
          Article Preview
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

      {/* Konten Utama Halaman */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <article className="mx-auto max-w-4xl rounded-xl border bg-white p-4 sm:p-8">
          <div className="mb-6 text-center lg:mb-10">
            <div className="mb-3 flex flex-col items-center justify-center gap-1 text-sm text-slate-600 sm:flex-row lg:mb-4">
              <span>
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Created by {article.user.username}</span>
            </div>
            <h1 className="mb-3 px-2 text-xl leading-tight font-semibold text-slate-900 sm:text-2xl lg:mb-4 lg:text-3xl lg:leading-9">
              {article.title}
            </h1>
            <Badge variant="outline">{article.category.name}</Badge>
          </div>
          <div className="mb-6 lg:mb-10">
            <Image
              src={
                article.imageUrl ||
                'https://placehold.co/1120x480?text=No+Image'
              }
              alt={article.title}
              width={1120}
              height={480}
              className="h-[240px] w-full rounded-lg object-cover sm:h-[320px] lg:h-[480px] lg:rounded-xl"
            />
          </div>
          <ArticleContent
            content={article.content}
            className="prose prose-slate max-w-none text-sm sm:text-base"
          />
        </article>
      </main>
    </>
  );
}
