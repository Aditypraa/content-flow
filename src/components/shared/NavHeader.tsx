import React from 'react';
import Link from 'next/link';

interface NavHeaderProps {
    title: string;
    userName?: string;
    userInitial?: string;
    profileLink?: string;
}

export default function NavHeader({
    title,
    userName = "James Dean",
    userInitial = "J",
    profileLink = "/admin/profile"
}: NavHeaderProps) {
    return (
        <div className="px-6 pt-5 pb-4 bg-gray-50 border-b border-slate-200 flex justify-between items-center">
            <h1 className="text-slate-900 text-xl font-semibold leading-7">{title}</h1>
            <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-900 text-base font-medium">{userInitial}</span>
                </div>
                <Link href={profileLink} className="text-slate-900 text-sm font-medium underline">
                    {userName}
                </Link>
            </div>
        </div>
    );
}
