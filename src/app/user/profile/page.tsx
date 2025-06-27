// src/app/user/profile/page.tsx

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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

// --- Sub-Components for Readability ---

const ProfilePageHeader = () => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
      User Profile
    </h1>
    <p className="text-muted-foreground mt-1">
      View and manage your personal information.
    </p>
  </div>
);

const ProfileInfoCard = ({
  user,
}: {
  user: { username: string; role: string };
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Profile Information</CardTitle>
      <CardDescription>
        Your personal details are read-only for now.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src="" alt={user.username} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.username}
            </h2>
            <p className="text-muted-foreground">Role: {user.role}</p>
          </div>
        </div>
        <Separator />
        <fieldset disabled className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value="-" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value="-" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value="-" />
          </div>
          <Button type="submit" className="mt-2">
            Save Changes (Disabled)
          </Button>
        </fieldset>
      </form>
    </CardContent>
  </Card>
);

const SecurityCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Security & Notifications</CardTitle>
      <CardDescription>
        These features are currently unavailable.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border p-4 opacity-60">
        <div>
          <p className="font-medium">Change Password</p>
          <p className="text-muted-foreground text-xs">Update your password</p>
        </div>
        <Button variant="outline" size="sm" disabled>
          Update
        </Button>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4 opacity-60">
        <div>
          <p className="font-medium">Email Notifications</p>
          <p className="text-muted-foreground text-xs">
            Enable/disable email alerts
          </p>
        </div>
        <Switch disabled />
      </div>
    </CardContent>
  </Card>
);

const ProfileSkeleton = () => (
  <div className="container mx-auto max-w-2xl py-12">
    <div className="space-y-8">
      <div>
        <Skeleton className="h-9 w-48 rounded" />
        <Skeleton className="mt-2 h-4 w-72 rounded" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="mt-2 h-4 w-64 rounded" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-32 rounded" />
              <Skeleton className="h-5 w-48 rounded" />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function UserProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-semibold">Profile not found</h2>
          <p className="text-muted-foreground mt-2">
            Could not load user profile. Please try logging in again.
          </p>
          <Button onClick={() => router.push('/auth/login')} className="mt-6">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <div className="space-y-8">
        <ProfilePageHeader />
        <ProfileInfoCard user={user} />
        <SecurityCard />
      </div>
    </div>
  );
}
