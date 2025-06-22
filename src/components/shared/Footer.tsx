import React from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
    brandName?: string;
    year?: number;
    className?: string;
}

export default function Footer({
    brandName = "Blog genzet",
    year = new Date().getFullYear(),
    className = ""
}: FooterProps) {
    return (
        <footer
            className={`bg-blue-600/90 py-8 ${className}`}
            role="contentinfo"
            aria-label="Site footer"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/Logo.svg"
                        alt="Logo"
                        width={134}
                        height={24}
                        priority
                        className="h-6 w-auto"
                    />

                    <Separator className="w-full max-w-md bg-white/20" />

                    <div className="text-center">
                        <p className="text-white text-sm font-normal leading-normal">
                            © {year} {brandName}. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
