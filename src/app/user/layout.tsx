import React from 'react';
import UserNavbar from '@/components/common/navigation/UserNavbar';
import Footer from '@/components/common/navigation/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const bgClass = 'bg-gray-50';

  return (
    <AuthProvider>
      <div className={`min-h-screen ${bgClass}`}>
        {/* UserNavbar akan selalu ditampilkan di sini untuk semua rute /user */}
        <UserNavbar />

        {/* Main Content dari halaman (children) */}
        <main>{children}</main>

        {/* Footer akan selalu ditampilkan */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
