'use client';

import React from 'react';

interface ArticleContentProps {
  content: string;
  className?: string;
}

export default function ArticleContentLayout({
  content,
  className = '',
}: ArticleContentProps) {
  return (
    <div
      className={`prose prose-lg article-content max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
