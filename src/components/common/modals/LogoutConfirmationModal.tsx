// src/components/common/modals/LogoutConfirmationModal.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean; // 1. Menambahkan prop isLoading
}

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: LogoutConfirmationModalProps) {
  // 2. Ref untuk fokus otomatis
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => confirmButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        {/* 3. Header yang konsisten dengan modal lain */}
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="bg-destructive/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
            <LogOut className="text-destructive h-5 w-5" />
          </div>
          <div className="space-y-1">
            <DialogTitle id="logout-dialog-title" className="text-lg">
              Confirm Logout
            </DialogTitle>
            <DialogDescription
              id="logout-dialog-description"
              className="text-muted-foreground"
            >
              Are you sure you want to log out? You will be returned to the
              login page.
            </DialogDescription>
          </div>
        </DialogHeader>
        {/* 4. Footer yang responsif dan tombol dengan state loading */}
        <DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            ref={confirmButtonRef}
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
