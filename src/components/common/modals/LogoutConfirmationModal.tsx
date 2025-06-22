"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LogoutConfirmationModal({
    isOpen,
    onClose
}: LogoutConfirmationModalProps) {
    const router = useRouter();

    const handleLogout = () => {
        // Clear any authentication tokens/session data here
        // For now, we'll just redirect to login
        router.push('/auth/login');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                            <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <DialogTitle className="text-lg font-semibold text-gray-900">
                            Confirm Logout
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-gray-600 text-left">
                        Are you sure you want to log out? You will need to log in again to access the admin panel.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                        Logout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
