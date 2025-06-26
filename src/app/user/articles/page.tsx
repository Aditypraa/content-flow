// app/user/articles/page.tsx
'use client'; // Pastikan ini tetap ada jika Anda menggunakan hooks atau interaktivitas klien

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import UserLayout from '@/components/layouts/UserLayout'; // Hapus import ini
import Image from 'next/image';
import Pagination from '@/components/common/feedback/Pagination';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: '10 UI Design Trends for 2024',
    category: 'Design',
    date: 'Jan 15, 2024',
    description:
      'Explore the latest design trends that will shape user interfaces in 2024...',
    imageUrl: '/images/article1.jpg',
  },
  {
    id: 2,
    title: 'Building Scalable Web Applications with React',
    category: 'Development',
    date: 'Feb 10, 2024',
    description:
      'Learn how to build scalable web applications using React and its ecosystem...',
    imageUrl: '/images/article2.jpg',
  },
  {
    id: 3,
    title: 'The Future of AI in Design',
    category: 'Technology',
    date: 'Mar 5, 2024',
    description:
      'Discover how AI is transforming the design industry and what it means for designers...',
    imageUrl: '/images/article3.jpg',
  },
  {
    id: 4,
    title: 'Career Paths in UX Design',
    category: 'Career',
    date: 'Apr 20, 2024',
    description:
      'Explore various career paths in UX design and how to get started...',
    imageUrl: '/images/article4.jpg',
  },
  {
    id: 5,
    title: 'Creating Engaging Tutorials for Developers',
    category: 'Tutorial',
    date: 'May 15, 2024',
    description:
      'Tips and tricks for creating engaging tutorials that help developers learn effectively...',
    imageUrl: '/images/article5.jpg',
  },
  // Add more articles as needed
];

export default function ArticlesUserPage() {
  return (
    <>
      <div className="relative h-[500px] overflow-hidden bg-blue-600/90">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-base font-bold text-white">Blog genzet</div>
              <h1 className="text-5xl leading-tight font-medium text-white">
                The Journal : Design Resources,
                <br />
                Interviews, and Industry News
              </h1>
              <p className="text-2xl text-white">
                Your daily dose of design insights!
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Select>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search articles..."
                className="w-96 bg-white"
                type="search"
                aria-label="Search articles"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 text-sm text-blue-600">
                  {article.category}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
                <p className="mb-4 text-gray-600">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Read more about article"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination currentPage={2} totalPages={3} />
      </div>
    </>
    // Hapus pembungkus UserLayout di sini
    // </UserLayout>
  );
}
