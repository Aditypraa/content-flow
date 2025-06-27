// src/components/common/forms/ThumbnailUpload.tsx

'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useId,
} from 'react';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ThumbnailUploadProps {
  // Mengizinkan nilai file atau URL string untuk preview awal
  value?: File | string | null;
  onValueChange: (file: File | null) => void;
  label?: string;
  acceptedTypes?: string;
  className?: string;
}

// 1. Menggunakan forwardRef untuk fleksibilitas
const ThumbnailUpload = forwardRef<HTMLInputElement, ThumbnailUploadProps>(
  (
    {
      value,
      onValueChange,
      label = 'Thumbnails',
      acceptedTypes = 'image/jpeg,image/png,image/webp',
      className,
    },
    ref,
  ) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const id = useId(); // ID unik untuk aksesibilitas

    // 2. useEffect yang lebih kuat untuk menangani file dan URL
    useEffect(() => {
      if (typeof value === 'string') {
        setPreview(value);
      } else if (value instanceof File) {
        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);
        // Membersihkan object URL ketika file berubah atau komponen unmount
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setPreview(null);
      }
    }, [value]);

    // 3. Menggunakan useCallback untuk semua handler demi efisiensi
    const handleFileChange = useCallback(
      (files: FileList | null) => {
        if (files && files[0]) {
          onValueChange(files[0]);
        }
      },
      [onValueChange],
    );

    const handleDragEnter = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      [],
    );

    const handleDragLeave = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      [],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
      },
      [handleFileChange],
    );

    return (
      <div className={cn('w-full max-w-sm space-y-2', className)}>
        <Label htmlFor={id}>{label}</Label>
        {/* 4. Area upload sekarang adalah sebuah <label> untuk UX dan semantik yang lebih baik */}
        <label
          htmlFor={id}
          className={cn(
            'border-border bg-muted/50 hover:border-primary/50 relative flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors',
            isDragging && 'border-primary ring-primary/30 ring-2',
          )}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()} // Diperlukan untuk event onDrop
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id={id}
            ref={ref}
            type="file"
            accept={acceptedTypes}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />

          {preview ? (
            <ImagePreview src={preview} onRemove={() => onValueChange(null)} />
          ) : (
            <UploadPlaceholder />
          )}
        </label>
      </div>
    );
  },
);

ThumbnailUpload.displayName = 'ThumbnailUpload';

// 5. Sub-komponen untuk kejelasan dan pemisahan logika
const UploadPlaceholder = () => (
  <div className="text-muted-foreground flex flex-col items-center gap-2 text-center">
    <Upload className="h-8 w-8" />
    <span className="font-semibold">Click or drag file to upload</span>
    <span className="text-xs">Supports: JPG, PNG, WebP</span>
  </div>
);

const ImagePreview = ({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) => (
  <>
    <Image
      src={src}
      alt="Thumbnail preview"
      fill
      className="rounded-lg object-cover"
    />
    <div className="absolute top-2 right-2 z-10">
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="h-7 w-7 rounded-full shadow-md"
        onClick={(e) => {
          e.preventDefault(); // Mencegah terbukanya dialog file
          onRemove();
        }}
        aria-label="Remove thumbnail"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  </>
);

export default ThumbnailUpload;
