'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showEllipsis?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage = 2,
  totalPages = 10,
  onPageChange,
  showEllipsis = true,
  className = '',
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={`flex items-center justify-center self-stretch border-b border-slate-200 bg-gray-50 px-3 py-4 lg:px-4 lg:py-6 ${className}`}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <div className="flex items-center gap-1 lg:gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className="gap-1 px-2 lg:px-3"
          aria-label={`Go to previous page, page ${currentPage - 1}`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Show first page if not current and not adjacent */}
        {currentPage > 3 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageClick(1)}
              className="h-8 w-8 p-0 text-sm lg:h-10 lg:w-10"
              aria-label="Go to page 1"
            >
              1
            </Button>
            {showEllipsis && currentPage > 4 && (
              <div
                className="flex h-8 w-8 items-center justify-center lg:h-10 lg:w-10"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-3 w-3 text-slate-400 lg:h-4 lg:w-4" />
              </div>
            )}
          </>
        )}

        {/* Show pages around current page */}
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          const page = Math.max(1, currentPage - 1) + i;
          if (page > totalPages) return null;

          const isCurrentPage = page === currentPage;

          return (
            <Button
              key={page}
              variant={isCurrentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageClick(page)}
              className="h-8 w-8 p-0 text-sm lg:h-10 lg:w-10"
              aria-label={`${isCurrentPage ? 'Current page, ' : ''}Go to page ${page}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          );
        })}

        {/* Show last page if not current and not adjacent */}
        {currentPage < totalPages - 2 && (
          <>
            {showEllipsis && currentPage < totalPages - 3 && (
              <div
                className="flex h-8 w-8 items-center justify-center lg:h-10 lg:w-10"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-3 w-3 text-slate-400 lg:h-4 lg:w-4" />
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageClick(totalPages)}
              className="h-8 w-8 p-0 text-sm lg:h-10 lg:w-10"
              aria-label={`Go to page ${totalPages}`}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="gap-1 px-2 lg:px-3"
          aria-label={`Go to next page, page ${currentPage + 1}`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}
