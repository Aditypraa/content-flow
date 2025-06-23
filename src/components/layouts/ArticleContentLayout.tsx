'use client';

import React from 'react';

interface ArticleContentProps {
    content: string;
    className?: string;
}

export default function ArticleContentLayout({ content, className = '' }: ArticleContentProps) {
    return (
        <div
            className={`prose prose-lg max-w-none article-content ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
