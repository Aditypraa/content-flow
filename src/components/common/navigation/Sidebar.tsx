"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, FileText, Tag, LogOut } from 'lucide-react';
import { ADMIN_MENU_ITEMS } from '@/lib/constants/app';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';

interface SidebarProps {
    activeMenu?: "articles" | "categories" | "logout";
    isOpen?: boolean;
    onClose?: () => void;
    isMobile?: boolean;
}

export default function Sidebar({
    activeMenu,
    isOpen = true,
    onClose,
    isMobile = false
}: SidebarProps) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };
    const menuItems = ADMIN_MENU_ITEMS.map(item => ({
        ...item,
        icon: item.key === "articles" ? FileText :
            item.key === "categories" ? Tag : LogOut
    }));

    const sidebarClasses = isMobile
        ? `fixed inset-y-0 left-0 z-50 w-64 h-full bg-blue-600 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`
        : "w-64 h-screen bg-blue-600 shadow-sm flex-shrink-0";

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={sidebarClasses}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-blue-500">
                        <Image
                            src="/Logo.svg"
                            alt="Logo"
                            width={134}
                            height={24}
                            priority
                            className="h-6 w-auto filter brightness-0 invert"
                        />
                        {isMobile && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="p-2 text-white hover:bg-blue-500 hover:text-white cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeMenu === item.key;

                                return (
                                    <li key={item.key}>
                                        {item.key === 'logout' ? (
                                            <button
                                                onClick={handleLogoutClick}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer ${isActive
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
                                                onClick={isMobile ? onClose : undefined}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
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

            {/* Logout Confirmation Modal */}
            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
            />
        </>
    );
}
