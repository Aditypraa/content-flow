'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { registerSchema } from '@/lib/validation/auth';
import axiosInstance from '@/lib/api/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      // Berikan nilai default untuk role jika perlu, atau biarkan kosong
      role: 'User',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Destructuring untuk mengambil data yang diperlukan oleh API
    // dan mengabaikan confirmPassword
    const { username, password, role } = data;

    try {
      await axiosInstance.post('/auth/register', {
        username,
        password,
        role,
      });

      toast.success('Registrasi berhasil! Silakan login.');
      router.push('/auth/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage =
        error.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      toast.error(errorMessage);
    }
  };

  return (
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

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel className="font-['Archivo'] text-sm leading-tight font-medium text-gray-900">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative self-stretch">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    className="h-10 self-stretch rounded-md border border-slate-200 bg-white px-3 py-2 pr-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-0 right-0 h-10 w-10 hover:bg-transparent"
                  >
                    {showConfirmPassword ? (
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

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel className="font-['Archivo'] text-sm leading-tight font-medium text-gray-900">
                Role
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 self-stretch rounded-md border border-slate-200 bg-white px-3 py-2">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Register Button */}
        <Button
          type="submit"
          className="inline-flex h-10 items-center justify-center gap-1.5 self-stretch rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
          disabled={form.formState.isSubmitting}
        >
          <span className="justify-center text-center font-['Archivo'] text-sm leading-tight font-medium text-slate-50">
            {form.formState.isSubmitting ? 'Creating account...' : 'Register'}
          </span>
        </Button>
      </form>

      {/* Footer Links */}
      <div className="justify-center">
        <span className="font-['Archivo'] text-sm leading-tight font-normal text-slate-600">
          Already have an account?
        </span>
        <Link
          href="/auth/login"
          className="font-['Archivo'] text-sm leading-tight font-normal text-blue-600 underline hover:text-blue-700"
        >
          Login
        </Link>
      </div>
    </Form>
  );
};

export default RegisterPage;
