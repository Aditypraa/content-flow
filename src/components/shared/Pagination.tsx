"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    showEllipsis?: boolean;
}

export default function Pagination({
    currentPage = 2,
    totalPages = 10,
    onPageChange,
    showEllipsis = true
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
        <div className="self-stretch px-4 py-6 bg-gray-50 border-b border-slate-200 inline-flex justify-between items-center">
            <div className="flex-1 flex justify-center items-center gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage <= 1}
                    className="h-10 pl-2.5 pr-4 rounded-md flex justify-center items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Previous</div>
                </button>

                {/* Page 1 */}
                {currentPage > 1 && (
                    <button
                        onClick={() => handlePageClick(1)}
                        className="w-10 h-10 rounded-md flex justify-center items-center hover:bg-white hover:outline-1 hover:outline-slate-200"
                    >
                        <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">1</div>
                    </button>
                )}

                {/* Current Page */}
                <div className="w-10 h-10 bg-white rounded-md outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center">
                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">{currentPage}</div>
                </div>

                {/* Ellipsis */}
                {showEllipsis && currentPage < totalPages && (
                    <div className="w-9 h-9 rounded-md flex justify-center items-center">
                        <div className="w-6 h-6 relative">
                            <div className="w-0 h-[0.50px] left-[16px] top-[11.75px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-900" />
                            <div className="w-0 h-[0.50px] left-[12px] top-[11.75px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-900" />
                            <div className="w-0 h-[0.50px] left-[8px] top-[11.75px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-900" />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleNext}
                    disabled={currentPage >= totalPages}
                    className="h-10 pl-4 pr-2.5 rounded-md flex justify-center items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="justify-start text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Next</div>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
