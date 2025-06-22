import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut } from 'lucide-react';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';

interface NavHeaderProps {
    title: string;
    userName?: string;
    userInitial?: string;
    profileLink?: string;
    userAvatar?: string;
    onMenuClick?: () => void;
    showMenuButton?: boolean;
}

export default function NavHeader({
    title,
    userName = "James Dean",
    userInitial = "J",
    profileLink = "/admin/profile",
    userAvatar,
    onMenuClick,
    showMenuButton = false
}: NavHeaderProps) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };
    return (
        <>
            <header className="px-4 lg:px-6 pt-5 pb-4 bg-gray-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {showMenuButton && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onMenuClick}
                            className="lg:hidden p-2"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    )}
                    <h1 className="text-slate-900 text-lg lg:text-xl font-semibold leading-7">{title}</h1>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity outline-none">
                                <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                                    <AvatarImage src={userAvatar} alt={userName} />
                                    <AvatarFallback className="bg-blue-200 text-blue-900 text-xs lg:text-sm font-medium">
                                        {userInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-slate-900 text-xs lg:text-sm font-medium hidden sm:block">
                                    {userName}
                                </span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem asChild>
                                <Link
                                    href={profileLink}
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
            </header>

            {/* Logout Confirmation Modal */}
            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
            />
        </>
    );
}
