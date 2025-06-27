// src/components/common/navigation/UserNavbar.tsx

'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

// 1. Sub-komponen untuk setiap state agar kode utama bersih

// Skeleton yang meniru ukuran dan bentuk konten final untuk mencegah CLS
const UserMenuSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-5 w-20 rounded-md" />
  </div>
);

// Menu untuk pengguna yang sudah login
const UserMenu = ({
  user,
  onLogoutClick,
}: {
  user: { username: string };
  onLogoutClick: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex cursor-pointer items-center gap-2 rounded-md p-1 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt={user.username} />
          <AvatarFallback className="bg-white/20 text-sm text-white">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-white">{user.username}</span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem asChild>
        <Link
          href="/user/profile"
          className="flex w-full cursor-pointer items-center gap-2"
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={onLogoutClick}
        className="text-destructive focus:text-destructive flex cursor-pointer items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Tombol untuk tamu (belum login)
const GuestMenu = () => (
  <>
    <Link href="/auth/login">
      <Button
        variant="ghost"
        className="text-white transition-colors hover:bg-white/10"
      >
        Login
      </Button>
    </Link>
    <Separator orientation="vertical" className="h-6 bg-white/20" />
    <Link href="/auth/register">
      <Button
        variant="outline"
        className="border-white bg-transparent text-white transition-colors hover:bg-white hover:text-blue-600"
      >
        Register
      </Button>
    </Link>
  </>
);

export default function UserNavbar() {
  const { user, isLoading, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutConfirm = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  }, [logout]);

  return (
    <>
      <nav
        className="bg-blue-600/90"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:py-4">
          <Link
            href="/"
            className="rounded text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
            aria-label="Go to homepage"
          >
            <Image
              src="/Logo.svg"
              alt="Content Flow Logo"
              width={134}
              height={24}
              priority
              className="h-6 w-auto"
            />
          </Link>

          {/* 2. Logika render utama menjadi sangat sederhana dan deklaratif */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <UserMenuSkeleton />
            ) : user ? (
              <UserMenu
                user={user}
                onLogoutClick={() => setIsLogoutModalOpen(true)}
              />
            ) : (
              <GuestMenu />
            )}
          </div>
        </div>
      </nav>

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => !isLoggingOut && setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
}
