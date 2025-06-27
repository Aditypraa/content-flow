// app/user/articles/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ArticleContent from '@/components/layouts/ArticleContentLayout';
import { Skeleton } from '@/components/ui/skeleton';
import axiosInstance from '@/lib/api/axios';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Tipe data untuk artikel tunggal (detail)
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

// Tipe data untuk artikel terkait (lebih ringkas)
interface RelatedArticle {
  id: string;
  title: string;
  imageUrl: string | null;
  content: string; // Tetap perlukan content untuk deskripsi singkat
}

// Komponen Skeleton untuk halaman detail
const DetailArticleSkeleton = () => (
  <div className="mx-auto max-w-4xl px-4 py-12">
    <article className="space-y-8">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="mx-auto h-10 w-3/4" />
        <Skeleton className="mx-auto h-8 w-1/2" />
      </div>
      <Skeleton className="h-96 w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
      </div>
    </article>
  </div>
);

export default function DetailArticle() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fungsi untuk menghapus tag HTML ---
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  useEffect(() => {
    if (!id) return;

    const fetchArticleDetails = async () => {
      setIsLoading(true);
      try {
        const articleRes = await axiosInstance.get(`/articles/${id}`);
        const mainArticle: ArticleDetail = articleRes.data;
        setArticle(mainArticle);

        if (mainArticle.category.id) {
          const relatedRes = await axiosInstance.get('/articles', {
            params: {
              category: mainArticle.category.id,
              limit: 4,
            },
          });
          const allRelated: RelatedArticle[] = relatedRes.data.data;
          const filteredRelated = allRelated
            .filter((a) => a.id !== mainArticle.id)
            .slice(0, 3);
          setRelatedArticles(filteredRelated);
        }
      } catch (error) {
        toast.error('Gagal memuat artikel.');
        console.error('Failed to fetch article details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  if (isLoading) {
    return <DetailArticleSkeleton />;
  }

  if (!article) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold">Artikel tidak ditemukan</h2>
        <p className="text-gray-500">
          Artikel yang Anda cari mungkin telah dihapus atau tidak ada.
        </p>
        <Button onClick={() => router.push('/user/articles')} className="mt-4">
          Kembali ke Daftar Artikel
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <article className="space-y-8">
        {/* Article Meta */}
        <div className="space-y-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-600">
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

          <h1 className="text-4xl leading-tight font-bold text-gray-900">
            {article.title}
          </h1>
        </div>

        {/* Article Image */}
        <div className="h-96 w-full overflow-hidden rounded-xl bg-gray-200">
          <Image
            src={
              article.imageUrl || 'https://placehold.co/1120x480/e2e8f0/e2e8f0'
            }
            alt={article.title}
            width={1120}
            height={480}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <ArticleContent content={article.content} className="space-y-6" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="mb-6 text-2xl font-semibold">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Card key={related.id} className="overflow-hidden">
                  <Link href={`/user/articles/${related.id}`}>
                    <div className="h-48 bg-gray-200">
                      <Image
                        src={
                          related.imageUrl ||
                          'https://placehold.co/333x240/e2e8f0/e2e8f0'
                        }
                        alt={related.title}
                        width={333}
                        height={240}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 font-semibold">{related.title}</h3>
                      {/* --- PERBAIKAN DI SINI --- */}
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                        {stripHtml(related.content).substring(0, 100)}...
                      </p>
                      <Button variant="ghost" size="sm" className="h-auto p-0">
                        Read More
                      </Button>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back to Articles */}
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
