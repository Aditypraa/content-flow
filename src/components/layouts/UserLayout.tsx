import React from 'react';
import UserNavbar from '@/components/common/navigation/UserNavbar';
import Footer from '@/components/common/navigation/Footer';

interface UserLayoutProps {
  children: React.ReactNode;
  backgroundColor?: 'white' | 'gray';
  showNavbar?: boolean;
  showNavbarBorder?: boolean;
  navbarProps?: {
    isLoggedIn?: boolean;
    userName?: string;
    showAuthButtons?: boolean;
  };
  footerClassName?: string;
}

export default function UserLayout({
  children,
  backgroundColor = 'white',
  showNavbar = true,
  showNavbarBorder = false,
  navbarProps,
  footerClassName,
}: UserLayoutProps) {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-gray-50';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      {showNavbar && (
        <div
          className={
            showNavbarBorder ? 'bg-white border-b border-gray-200' : ''
          }
        >
          <UserNavbar {...navbarProps} />
        </div>
      )}

      {/* Main Content */}
      {children}

      {/* Footer */}
      <Footer className={footerClassName} />
    </div>
  );
}
