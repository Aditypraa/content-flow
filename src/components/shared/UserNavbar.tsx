"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import LogoutConfirmationModal from './LogoutConfirmationModal';

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
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none focus:ring-2 focus:ring-white/20 rounded">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={userAvatar} alt={userName} />
                                            <AvatarFallback className="bg-white/20 text-white text-sm">
                                                {userName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-white text-sm">
                                            {userName}
                                        </span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/user/profile"
                                            className="flex items-center gap-2 w-full cursor-pointer"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogoutClick}
                                        className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
            />
        </nav>
    );
}
