// src/app/admin/layout.tsx

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/common/navigation/Sidebar';
import NavHeader from '@/components/common/navigation/NavHeader';
import { AuthProvider } from '@/contexts/AuthContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';

// Ini adalah Layout Utama untuk semua halaman di bawah /admin.
// Perhatikan bahwa layout ini tidak lagi menerima props seperti title atau breadcrumbs.
// Hal tersebut akan menjadi tanggung jawab setiap halaman (page.tsx).
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // AuthProvider membungkus semua, menyediakan data login.
    <AuthProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-gray-100 lg:flex-row">
        {/* Sidebar untuk Desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Konten Utama */}
        <div className="flex h-full flex-1 flex-col">
          {/* NavHeader tidak lagi memerlukan props spesifik halaman.
              Ia akan mengambil data pengguna dari AuthContext. */}
          <NavHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            showMenuButton={true}
          />

          {/* 'children' akan merender halaman yang sedang aktif.
              Kita TIDAK LAGI meletakkan <main> atau pembungkus lain di sini
              agar setiap halaman memiliki kebebasan penuh atas layout kontennya sendiri. */}
          {children}
        </div>

        {/* Sidebar untuk Mobile */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    </AuthProvider>
  );
}
