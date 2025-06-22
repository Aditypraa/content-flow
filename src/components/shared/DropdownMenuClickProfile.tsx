"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function DropdownMenuClickProfile() {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const handleLogout = () => {
        // Here you would typically call an API to logout or clear session
        console.log('Logging out...');
        // For now, we'll just redirect to login page
        window.location.href = '/auth/login';
    };

    return (
        <>
            <div className="rounded-md shadow-lg border border-slate-200 bg-white overflow-hidden min-w-56">
                <div className="p-1">
                    <div className="px-3 py-2 text-sm text-slate-600 border-b border-slate-100">
                        My Account
                    </div>
                    <div className="p-1 space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-8 px-2"
                        >
                            Profile Settings
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-8 px-2"
                        >
                            Account Preferences
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-8 px-2"
                        >
                            Security
                        </Button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setIsLogoutOpen(true)}
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to logout? You will be redirected to the login page.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLogoutOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}