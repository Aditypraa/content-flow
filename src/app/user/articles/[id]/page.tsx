// src/app/user/articles/[id]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ArticleContent from '@/components/layouts/ArticleContentLayout';
import { Skeleton } from '@/components/ui/skeleton';
import axiosInstance from '@/lib/api/axios';

// --- Type Definitions ---
interface ArticleDetail {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user: {
    username: string;
  };
  category: {
    id: string;
    name: string;
  };
}

interface RelatedArticle {
  id: string;
  title: string;
  imageUrl: string | null;
  content: string;
}

// 1. Helper function dipindahkan ke luar komponen
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

// --- Sub-Components for Readability and Reusability ---

// 2. Komponen untuk Header Artikel
const ArticleHeader = ({ article }: { article: ArticleDetail }) => (
  <div className="space-y-4 text-center">
    <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
      <span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
        {article.category.name}
      </span>
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

// 3. Komponen untuk Kartu Artikel Terkait
const RelatedArticleCard = ({ article }: { article: RelatedArticle }) => (
  <Card className="overflow-hidden transition-shadow hover:shadow-md">
    <Link
      href={`/user/articles/${article.id}`}
      className="flex h-full flex-col"
    >
      <div className="relative aspect-video bg-gray-200">
        <Image
          src={article.imageUrl || 'https://placehold.co/333x187/e2e8f0/e2e8f0'}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 font-semibold">{article.title}</h3>
        <p className="text-muted-foreground mb-3 line-clamp-2 flex-grow text-sm">
          {stripHtml(article.content).substring(0, 80)}...
        </p>
        <div className="text-primary mt-auto text-sm font-semibold">
          Read More
        </div>
      </div>
    </Link>
  </Card>
);

// 4. Komponen Skeleton yang lebih akurat untuk mengurangi CLS
const DetailArticleSkeleton = () => (
  <div className="container mx-auto max-w-4xl px-4 py-12">
    <article className="space-y-8">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <Skeleton className="mx-auto h-10 w-3/4 rounded" />
      </div>
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-5/6 rounded" />
      </div>
    </article>
  </div>
);

// Komponen utama
export default function DetailArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 5. Logika fetching yang lebih efisien
  useEffect(() => {
    if (!id) return;

    const fetchArticleDetails = async () => {
      setIsLoading(true);
      try {
        const articleRes = await axiosInstance.get<ArticleDetail>(
          `/articles/${id}`,
        );
        const mainArticle = articleRes.data;
        setArticle(mainArticle);

        // Setelah artikel utama didapat, fetch artikel terkait
        if (mainArticle.category.id) {
          const relatedRes = await axiosInstance.get<{
            data: RelatedArticle[];
          }>('/articles', {
            params: { category: mainArticle.category.id, limit: 4 },
          });
          const filteredRelated = (relatedRes.data.data || [])
            .filter((a) => a.id !== mainArticle.id)
            .slice(0, 3);
          setRelatedArticles(filteredRelated);
        }
      } catch (error) {
        toast.error('Failed to load article.');
        console.error('Failed to fetch article details:', error);
        // Jika artikel tidak ditemukan, arahkan kembali
        router.push('/user/articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id, router]);

  if (isLoading) {
    return <DetailArticleSkeleton />;
  }

  if (!article) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold">Article not found</h2>
        <p className="text-muted-foreground">
          The article you are looking for may have been removed.
        </p>
        <Button onClick={() => router.push('/user/articles')} className="mt-4">
          Back to Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="space-y-8">
        <ArticleHeader article={article} />

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
          <Image
            src={
              article.imageUrl || 'https://placehold.co/1120x630/e2e8f0/e2e8f0'
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <ArticleContent content={article.content} />

        {relatedArticles.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="mb-6 text-2xl font-semibold">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <RelatedArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        )}

        <div className="pt-8 text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/user/articles')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </div>
      </article>
    </div>
  );
}
