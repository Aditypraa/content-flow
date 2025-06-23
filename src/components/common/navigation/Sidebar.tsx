'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FileText, Tag, LogOut } from 'lucide-react';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';

interface SidebarProps {
  isMobile?: boolean;
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  // Menu items defined locally
  const adminMenuItems = [
    {
      key: 'articles' as const,
      label: 'Articles',
      href: '/admin/articles',
      icon: FileText,
    },
    {
      key: 'categories' as const,
      label: 'Category',
      href: '/admin/categories',
      icon: Tag,
    },
    {
      key: 'logout' as const,
      label: 'Logout',
      href: '/auth/login',
      icon: LogOut,
    },
  ];

  const sidebarClasses = isMobile
    ? 'w-full h-full bg-blue-600'
    : 'w-64 h-screen bg-blue-600 shadow-sm flex-shrink-0';

  return (
    <>
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center p-6 border-b border-blue-500">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={134}
              height={24}
              priority
              className="h-6 w-auto filter brightness-0 invert"
            />
          </div>

          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.key !== 'logout' && pathname.startsWith(item.href);

                return (
                  <li key={item.key}>
                    {item.key === 'logout' ? (
                      <button
                        onClick={handleLogoutClick}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer ${
                          isActive
                            ? 'bg-white text-blue-600'
                            : 'text-white hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-white text-blue-600'
                            : 'text-white hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}
