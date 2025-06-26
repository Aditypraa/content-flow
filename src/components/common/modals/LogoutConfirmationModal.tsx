'use client';

import React from 'react';
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
  onConfirm: () => void; // <-- TAMBAHKAN PROPS INI
}

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm, // <-- Terima props baru
}: LogoutConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Confirm Logout
            </DialogTitle>
          </div>
          <DialogDescription className="text-left text-sm text-gray-600">
            Are you sure you want to log out? You will be returned to the login
            page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm} // <-- GUNAKAN onConfirm DI SINI
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
