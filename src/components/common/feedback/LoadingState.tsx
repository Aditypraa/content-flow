import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LoadingStateProps {
  variant?: 'article' | 'profile' | 'table' | 'card';
  count?: number;
  className?: string;
}

export default function LoadingState({
  variant = 'card',
  count = 3,
  className = '',
}: LoadingStateProps) {
  const renderArticleLoading = () => (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="space-y-2 p-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  const renderProfileLoading = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderTableLoading = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 rounded bg-gray-50 p-4">
            <Skeleton className="col-span-1 h-4 w-full" />
            <Skeleton className="col-span-4 h-4 w-full" />
            <Skeleton className="col-span-2 h-4 w-full" />
            <Skeleton className="col-span-3 h-4 w-full" />
            <Skeleton className="col-span-2 h-4 w-full" />
          </div>
          {/* Table Rows */}
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 border-b p-4">
              <Skeleton className="col-span-1 h-12 w-12 rounded" />
              <Skeleton className="col-span-4 h-4 w-full" />
              <Skeleton className="col-span-2 h-4 w-full" />
              <Skeleton className="col-span-3 h-4 w-full" />
              <div className="col-span-2 flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderCardLoading = () => (
    <Card>
      <CardContent className="space-y-4 p-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  const getLoadingComponent = () => {
    switch (variant) {
      case 'article':
        return renderArticleLoading();
      case 'profile':
        return renderProfileLoading();
      case 'table':
        return renderTableLoading();
      case 'card':
      default:
        return renderCardLoading();
    }
  };

  if (variant === 'table' || variant === 'profile') {
    return (
      <div className={className} role="status" aria-label="Loading content">
        {getLoadingComponent()}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${className}`}
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>{getLoadingComponent()}</React.Fragment>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
