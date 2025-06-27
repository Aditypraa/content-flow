'use client';

import React from 'react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="inline-flex w-[400px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-4 py-10">
        {/* Logo */}
        <div className="relative h-6 w-[134px] overflow-hidden">
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
      </div>
    </div>
  );
}
