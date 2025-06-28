import React from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer
      className={`bg-blue-600/90 py-8`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={134}
            height={24}
            priority
            className="h-6 w-auto"
          />

          <Separator className="w-full max-w-md bg-white/20" />

          <div className="text-center">
            <p className="text-sm leading-normal font-normal text-white">
              © 2025 Aditya Pratama. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
