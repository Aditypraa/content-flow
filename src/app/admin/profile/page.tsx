// src/app/admin/profile/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { User } from 'lucide-react';

export default function AdminProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/articles' },
    { label: 'My Profile' },
  ];

  return (
    <>
      <div className="border-b bg-white px-4 py-5 lg:px-6">
        <h1 className="mb-3 text-xl font-semibold text-slate-900">
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

      <main className="flex flex-1 flex-col overflow-y-auto">
        {isLoading ? (
          // --- Skeleton UI ---
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
              <div className="flex flex-col items-center gap-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="w-full space-y-2 text-center">
                  <Skeleton className="mx-auto h-7 w-40" />
                  <Skeleton className="mx-auto h-4 w-20" />
                </div>
                <div className="w-full space-y-3 border-t pt-6">
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        ) : !user ? (
          // --- User Not Found UI ---
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <User className="text-muted-foreground h-12 w-12" />
            <h2 className="mt-4 text-2xl font-semibold">
              Could Not Load Profile
            </h2>
            <p className="text-muted-foreground mt-2">
              Please try logging in again to view your profile.
            </p>
            <Button onClick={() => router.push('/auth/login')} className="mt-6">
              Go to Login
            </Button>
          </div>
        ) : (
          // --- Main Profile UI ---
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full space-y-3 text-center">
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                  <p className="text-muted-foreground text-sm font-medium">
                    {user.role}
                  </p>
                </div>
                <div className="w-full space-y-3 border-t pt-6">
                  <div className="bg-muted/50 flex items-center justify-between rounded-md p-3">
                    <span className="text-muted-foreground font-semibold">
                      Username
                    </span>
                    <span className="text-foreground font-mono">
                      {user.username}
                    </span>
                  </div>
                  <div className="bg-muted/50 flex items-center justify-between rounded-md p-3">
                    <span className="text-muted-foreground font-semibold">
                      Password
                    </span>
                    <span className="text-muted-foreground font-mono">
                      ********
                    </span>
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
          </div>
        )}
      </main>
    </>
  );
}
