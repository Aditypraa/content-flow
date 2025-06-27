// src/app/user/layout.tsx

import React from 'react';
import UserNavbar from '@/components/common/navigation/UserNavbar';
import Footer from '@/components/common/navigation/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  // 1. AuthProvider tetap di sini untuk membungkus semua halaman khusus pengguna.
  return (
    <AuthProvider>
      {/* 2. Menggunakan flex-col dan min-h-screen untuk layout sticky footer */}
      <div className={cn('flex min-h-screen flex-col bg-gray-50')}>
        <header>
          <UserNavbar />
        </header>

        {/* 3. Main content sekarang akan tumbuh untuk mengisi ruang yang tersedia */}
        <main className="flex-grow">{children}</main>

        <Footer />
      </div>
    </AuthProvider>
  );
}
