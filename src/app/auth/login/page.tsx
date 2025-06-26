'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/api/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/validation/auth';
import Link from 'next/link';

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      // Langkah 1: Kirim data login ke API
      const response = await axiosInstance.post('/auth/login', data);

      // Langkah 2: Ekstrak token dan role langsung dari response.data
      const { token, role } = response.data;

      // Langkah 3: Pastikan token dan role ada
      if (token && role) {
        toast.success('Login berhasil!');

        // Simpan ke cookies
        Cookies.set('token', token, { path: '/' });
        Cookies.set('user_role', role, { path: '/' });

        // Arahkan pengguna berdasarkan role
        if (role === 'Admin') {
          router.push('/admin/articles');
        } else {
          router.push('/user/articles');
        }
      } else {
        // Ini terjadi jika respons API tidak mengandung token atau role
        toast.error('Respons dari server tidak valid.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Login error:', err);
      // Tampilkan pesan error dari API jika ada, jika tidak, tampilkan pesan default
      const errorMessage =
        err.response?.data?.message || 'Username atau password salah.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-start gap-3 self-stretch"
        >
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="self-stretch">
                <FormLabel className="font-['Archivo'] text-sm leading-tight font-medium text-gray-900">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Input username"
                    className="h-10 self-stretch rounded-md border border-slate-200 bg-white px-3 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="self-stretch">
                <FormLabel className="font-['Archivo'] text-sm leading-tight font-medium text-gray-900">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative self-stretch">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Input password"
                      className="h-10 self-stretch rounded-md border border-slate-200 bg-white px-3 py-2 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 right-0 h-10 w-10 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-600 opacity-50" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-600 opacity-50" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Login Button */}
          <Button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-1.5 self-stretch rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
            disabled={form.formState.isSubmitting}
          >
            <span className="justify-center text-center font-['Archivo'] text-sm leading-tight font-medium text-slate-50">
              {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
            </span>
          </Button>
        </form>
      </Form>

      {/* Footer Links */}
      <div className="justify-center">
        <span className="font-['Archivo'] text-sm leading-tight font-normal text-slate-600">
          Belum punya akun?{' '}
        </span>
        <Link
          href="/auth/register"
          className="font-['Archivo'] text-sm leading-tight font-normal text-blue-600 underline hover:text-blue-700"
        >
          Daftar sekarang
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
