"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/common/navigation/Sidebar';
import NavHeader from '@/components/common/navigation/NavHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeMenu?: "articles" | "categories" | "logout";
    title: string;
    userName?: string;
    userInitial?: string;
    profileLink?: string;
}

export default function AdminLayout({
    children,
    activeMenu,
    title,
    userName = "James Dean",
    userInitial = "J",
    profileLink = "/admin/profile"
}: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden lg:flex h-full">
                <Sidebar activeMenu={activeMenu} />
                <div className="flex-1 flex flex-col h-full">
                    <NavHeader
                        title={title}
                        userName={userName}
                        userInitial={userInitial}
                        profileLink={profileLink}
                        onMenuClick={() => setIsSidebarOpen(true)}
                        showMenuButton={false}
                    />
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden h-full flex flex-col">
                <NavHeader
                    title={title}
                    userName={userName}
                    userInitial={userInitial}
                    profileLink={profileLink}
                    onMenuClick={() => setIsSidebarOpen(true)}
                    showMenuButton={true}
                />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
                <Sidebar
                    activeMenu={activeMenu}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isMobile={true}
                />
            </div>
        </div>
    );
}
