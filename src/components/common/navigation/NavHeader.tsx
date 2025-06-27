// src/components/common/navigation/NavHeader.tsx

'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut } from 'lucide-react';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface NavHeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

// 1. Dibuat sub-komponen untuk Skeleton agar kode utama lebih bersih
const UserMenuSkeleton = () => (
  <div className="flex items-center gap-2 lg:gap-3">
    <Skeleton className="h-7 w-7 rounded-full lg:h-8 lg:w-8" />
    <Skeleton className="hidden h-5 w-24 rounded-md sm:block" />
  </div>
);

export default function NavHeader({
  onMenuClick,
  showMenuButton = false,
}: NavHeaderProps) {
  const { user, isLoading, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // 2. State lokal untuk menangani proses logout
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      // Fungsi logout dari context tetap dipanggil
      await logout();
      // Modal akan ditutup oleh redirect dari fungsi logout
    } catch (error) {
      // Jika ada error (jarang terjadi di sini), pastikan state loading berhenti
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  }, [logout]);

  return (
    <>
      <header className="flex h-[73px] items-center justify-between border-b border-slate-200 bg-gray-50 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="h-8 w-8 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          {isLoading ? (
            // 3. Skeleton sekarang memiliki ukuran yang sama persis dengan konten final
            <UserMenuSkeleton />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-accent focus-visible:ring-ring flex cursor-pointer items-center gap-2 rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:gap-3">
                  <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
                    <AvatarImage src="" alt={user.username} />
                    <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700 lg:text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium text-slate-900 sm:block">
                    {user.username}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/profile"
                    className="flex w-full cursor-pointer items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="text-destructive focus:text-destructive flex cursor-pointer items-center gap-2"
                  aria-disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </header>

      {/* 4. Modal sekarang menerima state isLoading-nya sendiri */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => !isLoggingOut && setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
}
