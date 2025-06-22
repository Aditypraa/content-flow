import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface UserNavbarProps {
    className?: string;
    showAuthButtons?: boolean;
    isLoggedIn?: boolean;
    userName?: string;
    userAvatar?: string;
}

export default function UserNavbar({
    className = "",
    showAuthButtons = true,
    isLoggedIn = false,
    userName = "User",
    userAvatar
}: UserNavbarProps) {
    return (
        <nav className={`bg-blue-600/90 ${className}`} role="navigation" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
                <Link href="/" className="text-white focus:outline-none focus:ring-2 focus:ring-white/20 rounded" aria-label="Go to homepage">
                    <Image
                        src="/Logo.svg"
                        alt="Logo"
                        width={134}
                        height={24}
                        priority
                        className="h-6 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-4">
                    {showAuthButtons && !isLoggedIn && (
                        <>
                            <Link href="/auth/login">
                                <Button
                                    variant="ghost"
                                    className="text-white hover:bg-white/10 transition-colors"
                                    aria-label="Login to your account"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Separator orientation="vertical" className="h-6 bg-white/20" />
                            <Link href="/auth/register">
                                <Button
                                    variant="outline"
                                    className="text-white border-white hover:bg-white hover:text-blue-600 transition-colors"
                                    aria-label="Create new account"
                                >
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={userAvatar} alt={userName} />
                                    <AvatarFallback className="bg-white/20 text-white text-sm">
                                        {userName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <Link
                                    href="/user/profile"
                                    className="text-white hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-1"
                                    aria-label={`View profile for ${userName}`}
                                >
                                    Welcome, {userName}
                                </Link>
                            </div>
                            <Separator orientation="vertical" className="h-6 bg-white/20" />
                            <Button
                                variant="outline"
                                className="text-white border-white hover:bg-white hover:text-blue-600 transition-colors"
                                aria-label="Logout from account"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
