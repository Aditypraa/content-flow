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
import { Trash2 } from 'lucide-react';

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
  const defaultTitle = `Delete ${itemType}`;
  const defaultDescription = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-4 sm:max-w-[425px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title || defaultTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="text-left text-sm text-gray-600">
            {description || defaultDescription}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : `Delete ${itemType}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
