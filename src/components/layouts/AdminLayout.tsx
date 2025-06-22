"use client";

import React from 'react';
import Sidebar from '@/components/shared/Sidebar';
import NavHeader from '@/components/shared/NavHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeMenu?: "articles" | "categories" | "profile";
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
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar activeMenu={activeMenu} />

            <div className="flex-1 flex flex-col">
                <NavHeader
                    title={title}
                    userName={userName}
                    userInitial={userInitial}
                    profileLink={profileLink}
                />

                {children}
            </div>
        </div>
    );
}
