// src/components/common/modals/DeleteConfirmationModal.tsx

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
import { Loader2, Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  itemType?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  itemType = 'item',
  isLoading = false,
}: DeleteConfirmationModalProps) {
  // 1. Ref untuk tombol konfirmasi agar bisa difokuskan secara otomatis
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Fokuskan tombol konfirmasi saat modal terbuka untuk UX keyboard yang lebih baik
      setTimeout(() => confirmButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // 2. Logika deskripsi disederhanakan dan dipindahkan ke dalam JSX
  const defaultTitle = `Delete ${itemType}`;
  const defaultDescription = `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="bg-destructive/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
            <Trash2 className="text-destructive h-5 w-5" />
          </div>
          <div className="space-y-1">
            <DialogTitle id="delete-dialog-title" className="text-lg">
              {title || defaultTitle}
            </DialogTitle>
            <DialogDescription
              id="delete-dialog-description"
              className="text-muted-foreground"
            >
              {description ? (
                description
              ) : (
                <>
                  {itemName ? (
                    <>
                      Are you sure you want to delete{' '}
                      <strong>&quot;{itemName}&quot;</strong>?
                    </>
                  ) : (
                    defaultDescription
                  )}
                </>
              )}
            </DialogDescription>
          </div>
        </DialogHeader>
        {/* 3. Layout footer yang lebih responsif dan tombol yang lebih deskriptif */}
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
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? 'Deleting...' : `Delete ${itemType}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
