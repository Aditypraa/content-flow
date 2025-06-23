"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/common/navigation/Sidebar';
import NavHeader from '@/components/common/navigation/NavHeader';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    userName?: string;
    userInitial?: string;
    profileLink?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AdminLayout({
    children,
    title,
    userName = "James Dean",
    userInitial = "J",
    profileLink = "/admin/profile",
    breadcrumbs = []
}: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-gray-100 overflow-hidden flex lg:flex-row flex-col">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full">
                <NavHeader
                    title={title}
                    userName={userName}
                    userInitial={userInitial}
                    profileLink={profileLink}
                    onMenuClick={() => setIsSidebarOpen(true)}
                    showMenuButton={true}
                />

                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <div className="px-4 lg:px-6 py-3 border-b border-slate-200 bg-white">
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && <BreadcrumbSeparator />}
                                        <BreadcrumbItem>
                                            {crumb.href ? (
                                                <BreadcrumbLink href={crumb.href}>
                                                    {crumb.label}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                )}

                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar with Sheet */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <Sidebar isMobile={true} />
                </SheetContent>
            </Sheet>
        </div>
    );
}
