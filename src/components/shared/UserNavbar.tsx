import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';

interface UserNavbarProps {
    className?: string;
    showAuthButtons?: boolean;
    isLoggedIn?: boolean;
    userName?: string;
}

export default function UserNavbar({
    className = "",
    showAuthButtons = true,
    isLoggedIn = false,
    userName = "User"
}: UserNavbarProps) {
    return (
        <nav className={`bg-blue-600/90 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
                <Link href="/" className="text-white">
                    <Logo variant="white" />
                </Link>

                <div className="flex items-center gap-4">
                    {showAuthButtons && !isLoggedIn && (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" className="text-white hover:bg-white/10">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <div className="flex items-center gap-4">
                            <Link href="/user/profile" className="text-white hover:underline">
                                Welcome, {userName}
                            </Link>
                            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
