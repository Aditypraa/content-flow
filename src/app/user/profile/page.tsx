// app/user/profile/page.tsx
'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@radix-ui/react-switch';

// Komponen Skeleton untuk halaman profil
const ProfileSkeleton = () => (
  <div className="mx-auto max-w-4xl px-4 py-12">
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-1 h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function UserProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Could not load user profile. Please try logging in again.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="mt-1 text-gray-600">
            View your personal information and preferences.
          </p>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Your personal details are read-only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={user.username} />
                <AvatarFallback className="bg-gray-200 text-2xl font-semibold text-gray-600">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user.username}
                </h2>
                <p className="text-gray-600">Role: {user.role}</p>
              </div>
            </div>

            <Separator />

            {/* Form Fields - Disabled */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input value="-" disabled />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input value="-" disabled />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input value="-" type="email" disabled />
              </div>
              <Button type="submit" disabled>
                Save Changes (Disabled)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security & Notification Cards - Disabled */}
        <Card>
          <CardHeader>
            <CardTitle>Security & Notifications</CardTitle>
            <CardDescription>
              These features are currently unavailable.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-md bg-gray-100 p-3 opacity-50">
              <p className="font-medium">Change Password</p>
              <Button variant="outline" size="sm" disabled>
                Update
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md bg-gray-100 p-3 opacity-50">
              <p className="font-medium">Email Notifications</p>
              <Switch disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
