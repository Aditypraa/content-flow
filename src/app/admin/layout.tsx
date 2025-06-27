// src/app/admin/layout.tsx

'use client';

import React, { useState, useCallback, Suspense } from 'react';
import Sidebar from '@/components/common/navigation/Sidebar';
import NavHeader from '@/components/common/navigation/NavHeader';
import { AuthProvider } from '@/contexts/AuthContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Gunakan useCallback agar fungsi tidak dibuat ulang pada setiap render
  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleSheetOpenChange = useCallback((open: boolean) => {
    setIsSidebarOpen(open);
  }, []);

  return (
    // AuthProvider adalah wrapper yang tepat di level ini
    <AuthProvider>
      <div className="bg-muted/40 flex h-screen">
        {/* Sidebar untuk Desktop */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* Wrapper untuk NavHeader dan Konten Utama */}
        {/* 1. overflow-hidden di sini mencegah double scrollbar */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex-shrink-0">
            <NavHeader onMenuClick={handleMenuClick} showMenuButton={true} />
          </header>

          {/* 2. 'children' (konten halaman) sekarang memiliki scroll sendiri */}
          {/* Ini memastikan header tetap diam saat konten di-scroll */}
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={<div>Loading admin content...</div>}>
              {children}
            </Suspense>
          </div>
        </div>

        {/* Sidebar untuk Mobile menggunakan Sheet */}
        <Sheet open={isSidebarOpen} onOpenChange={handleSheetOpenChange}>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    </AuthProvider>
  );
}
