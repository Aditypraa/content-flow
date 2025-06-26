// src/app/admin/profile/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
// Komponen Skeleton tidak lagi digunakan secara langsung di sini
// import ProfilePageSkeleton from '@/components/common/feedback/ProfilePageSkeleton';

const UserProfilePage = () => {
  const router = useRouter();
  // Kita tetap membutuhkan 'user' untuk ditampilkan, tapi kita akan menyederhanakan penanganan 'isLoading'
  const { user } = useAuth();

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/articles' },
    { label: 'User Profile' },
  ];

  return (
    <>
      {/* Header Halaman (Judul & Breadcrumbs) */}
      <div className="border-b border-slate-200 bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl leading-7 font-semibold text-slate-900">
          My Profile
        </h1>
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

      {/* Konten Utama Halaman */}
      <main className="flex flex-1 items-start justify-center overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-blue-200">
              <span className="text-3xl font-medium text-blue-900">
                {user?.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
                <span className="font-semibold text-gray-600">Username</span>
                <span className="font-medium text-gray-900">
                  {user?.username}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
                <span className="font-semibold text-gray-600">Password</span>
                <span className="font-mono text-gray-500">********</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
                <span className="font-semibold text-gray-600">Role</span>
                <span className="font-medium text-gray-900">{user?.role}</span>
              </div>
            </div>
            <Button
              onClick={() => router.push('/admin/articles')}
              className="mt-4 w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfilePage;
