// src/app/auth/layout.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // 1. Impor cn untuk konsistensi

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // 2. Menggunakan <main> sebagai elemen utama untuk konten halaman
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* 3. Kartu sekarang memiliki max-width dan mengambil lebar penuh di mobile */}
      <div
        className={cn(
          'w-full max-w-sm flex-col items-center justify-center gap-6 rounded-xl bg-white px-6 py-10 shadow-md',
        )}
      >
        {/* Logo */}
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/LogoBiru.svg"
            alt="Content Flow Logo"
            width={134}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </div>

        {/* Form Content */}
        {children}
      </div>
    </main>
  );
}
