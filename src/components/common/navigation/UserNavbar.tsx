'use client';

import React, { useState } from 'react';
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

export default function UserNavbar() {
  const { user, isLoading, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav
        className="bg-blue-600/90"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8">
          {/* Logo */}
          <Link
            href="/"
            className="rounded text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
            aria-label="Go to homepage"
          >
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={134}
              height={24}
              priority
              className="h-6 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            {isLoading ? (
              // 1. Tampilan saat data pengguna sedang dimuat
              <Skeleton className="h-8 w-28 rounded-md" />
            ) : user ? (
              // 2. Tampilan jika PENGGUNA SUDAH LOGIN (hanya dropdown)
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex cursor-pointer items-center gap-2 rounded transition-opacity outline-none hover:opacity-80 focus:ring-2 focus:ring-white/20">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.username} />
                      <AvatarFallback className="bg-white/20 text-sm text-white">
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white">{user.username}</span>
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
                    onClick={() => setShowLogoutModal(true)}
                    className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // 3. Tampilan jika PENGGUNA BELUM LOGIN
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
                    className="border-white text-white transition-colors hover:bg-white hover:text-blue-600"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal konfirmasi tetap ada di sini */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
