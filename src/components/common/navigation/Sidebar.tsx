// src/components/common/navigation/Sidebar.tsx

'use client';

import React, { useState, useCallback, ElementType } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FileText, Tag, LogOut } from 'lucide-react';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Tipe untuk item menu tetap digunakan untuk type-safety
type MenuItem = {
  key: string;
  label: string;
  href?: string;
  icon: ElementType;
  onClick?: (e: React.MouseEvent) => void;
};

interface SidebarProps {
  isMobile?: boolean;
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const { logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  }, [logout]);

  const menuItems: MenuItem[] = [
    {
      key: 'articles',
      label: 'Articles',
      href: '/admin/articles',
      icon: FileText,
    },
    {
      key: 'categories',
      label: 'Category',
      href: '/admin/categories',
      icon: Tag,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: LogOut,
      onClick: handleLogoutClick,
    },
  ];

  return (
    <>
      <div
        className={cn(
          'flex h-full flex-col bg-blue-600',
          isMobile ? 'w-full' : 'w-64 flex-shrink-0 shadow-lg',
        )}
      >
        <div className="flex items-center justify-center border-b border-blue-500 p-6">
          <Image
            src="/logo.svg"
            alt="Content Flow Logo"
            width={134}
            height={24}
            priority
            className="h-6 w-auto brightness-0 invert"
          />
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-colors',
                      pathname.startsWith(item.href)
                        ? 'bg-white text-blue-600'
                        : 'text-white hover:bg-blue-500/80',
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-colors',
                      'text-white hover:bg-blue-500/80',
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => !isLoggingOut && setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
}
