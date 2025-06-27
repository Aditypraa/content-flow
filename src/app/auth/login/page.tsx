// src/app/auth/login/page.tsx

'use client';

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import axiosInstance from '@/lib/api/axios';

// Define the login form schema and type
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 1. State untuk show/hide password dipindahkan ke komponen utama
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      setIsSubmitting(true);
      try {
        const response = await axiosInstance.post('/auth/login', data);

        const { token, role } = response.data;

        if (!token || !role) {
          toast.error('Invalid response from server.');
          setIsSubmitting(false);
          return;
        }

        toast.success('Login successful! Redirecting...');

        Cookies.set('token', token, {
          path: '/',
          secure: true,
          sameSite: 'strict',
        });
        Cookies.set('user_role', role, {
          path: '/',
          secure: true,
          sameSite: 'strict',
        });

        const destination =
          role === 'Admin' ? '/admin/articles' : '/user/articles';
        router.push(destination);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Invalid username or password.';
        toast.error(errorMessage);
        setIsSubmitting(false);
      }
    },
    [router],
  );

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  {/* 2. Logika dan JSX untuk input password dikembalikan ke sini */}
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Input password"
                      className="pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-0 right-0 h-full w-10 hover:bg-transparent"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?{' '}
        </span>
        <Link
          href="/auth/register"
          className="text-primary font-semibold underline-offset-4 hover:underline"
        >
          Register now
        </Link>
      </div>
    </div>
  );
}
