'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '@/lib/api/axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

// Tipe untuk data profil pengguna
interface UserProfile {
  id: string;
  username: string;
  role: 'User' | 'Admin';
}

// Tipe untuk nilai yang akan disediakan oleh context
interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  logout: () => void;
}

// Buat context dengan nilai default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Buat komponen Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setIsLoading(false);
        // Tidak perlu redirect di sini, biarkan middleware yang menangani
        return;
      }

      try {
        const response = await axiosInstance.get<UserProfile>('/auth/profile');
        setUser(response.data);
      } catch (error) {
        // Jika token tidak valid, hapus dan biarkan middleware redirect
        console.error(
          'Failed to fetch profile, token might be invalid.',
          error,
        );
        Cookies.remove('token');
        Cookies.remove('user_role');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user_role');
    setUser(null);
    toast.success('Logout berhasil!');
    router.push('/auth/login');
  };

  const value = { user, isLoading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Buat custom hook untuk mempermudah penggunaan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
