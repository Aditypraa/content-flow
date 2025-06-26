// src/components/common/navigation/NavHeader.tsx

'use client';

import React, { useState } from 'react';
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

// Hapus 'title' dari props interface
interface NavHeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function NavHeader({
  onMenuClick,
  showMenuButton = false,
}: NavHeaderProps) {
  const { user, isLoading, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header className="flex h-[73px] items-center justify-between border-b border-slate-200 bg-gray-50 px-4 lg:px-6">
        {/* Sisi kiri sekarang hanya untuk tombol menu mobile */}
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="p-2 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Sisi kanan untuk menu pengguna */}
        <div className="flex items-center gap-2 lg:gap-3">
          {isLoading ? (
            <Skeleton className="h-8 w-24 rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex cursor-pointer items-center gap-2 transition-opacity outline-none hover:opacity-80 lg:gap-3">
                  <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
                    <AvatarImage src="" alt={user.username} />
                    <AvatarFallback className="bg-blue-200 text-xs font-medium text-blue-900 lg:text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-xs font-medium text-slate-900 sm:block lg:text-sm">
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
                  onClick={() => setShowLogoutModal(true)}
                  className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </header>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
      />
    </>
  );
}
