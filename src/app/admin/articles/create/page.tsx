'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Upload } from 'lucide-react';
import ThumbnailUpload from '@/components/common/forms/ThumbnailUpload';
import CustomTipTapEditor from '@/components/common/forms/CustomTipTapEditor';

export default function ArticleCreate() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, category, content, thumbnail });
  };

  return (
    <AdminLayout
      title="Articles"
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Articles', href: '/admin/articles' },
        { label: 'Create', href: '/admin/articles/create' },
      ]}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-slate-900" />
            <CardTitle className="text-slate-900 text-base font-medium">
              Create Articles
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              {/* Thumbnail Upload */}
              <ThumbnailUpload
                selectedFile={thumbnail}
                onFileSelect={setThumbnail}
              />

              {/* Title */}
              <div className="space-y-1">
                <Label
                  htmlFor="title"
                  className="text-gray-900 text-sm font-medium"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Input title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <Label
                  htmlFor="category"
                  className="text-gray-900 text-sm font-medium"
                >
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-slate-500 text-sm">
                  The existing category list can be seen in the{' '}
                  <span className="text-blue-600 underline">category</span> menu
                </p>
              </div>
            </div>{' '}
            {/* Content Editor */}
            <Card className="h-[400px] lg:h-[551px] bg-gray-50 border-slate-200 flex flex-col">
              <div className="flex-1">
                <CustomTipTapEditor
                  content={content}
                  onChange={setContent}
                  variant="create"
                />
              </div>
            </Card>
            {/* Word Count */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{wordCount} Words</span>
            </div>
            {/* Action Buttons */}
            <div className="py-4 flex flex-col sm:flex-row justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto bg-slate-200 text-slate-900"
              >
                Preview
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Upload
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
