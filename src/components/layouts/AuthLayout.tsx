"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
}

export default function AuthLayout({
    children,
    footerText,
    footerLinkText,
    footerLinkHref
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-[400px] px-4 py-10 bg-white rounded-xl inline-flex flex-col justify-center items-center gap-6">
                {/* Logo */}
                <div className="w-[134px] h-6 relative overflow-hidden">
                    <Image
                        src="/LogoBiru.svg"
                        alt="Logo"
                        width={134}
                        height={24}
                        priority
                        className="h-6 w-auto"
                    />
                </div>

                {/* Form Content */}
                {children}

                {/* Footer Links */}
                <div className="justify-center">
                    <span className="text-slate-600 text-sm font-normal font-['Archivo'] leading-tight">
                        {footerText}{" "}
                    </span>
                    <Link
                        href={footerLinkHref}
                        className="text-blue-600 text-sm font-normal font-['Archivo'] underline leading-tight hover:text-blue-700"
                    >
                        {footerLinkText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
