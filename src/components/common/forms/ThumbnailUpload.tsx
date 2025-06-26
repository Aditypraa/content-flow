// components/common/forms/ThumbnailUpload.tsx

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ThumbnailUploadProps {
  selectedFile?: File | null;
  onFileSelect: (file: File | null) => void;
  label?: string;
  acceptedTypes?: string;
  supportText?: string;
  className?: string;
}

export default function ThumbnailUpload({
  selectedFile,
  onFileSelect,
  label = 'Thumbnails',
  acceptedTypes = 'image/jpeg,image/png,image/webp', // Menambahkan webp
  supportText = 'Support File Type : jpg, png, or webp',
  className = 'w-full sm:w-[280px] lg:w-[223px]',
}: ThumbnailUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // Membuat URL preview ketika file dipilih
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Membersihkan object URL ketika komponen unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileSelect(file || null);
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
  };

  const fileInputId = 'thumbnail-upload';

  return (
    <div className={`${className} space-y-1`}>
      <Label
        htmlFor={fileInputId}
        className="text-sm font-medium text-gray-900"
      >
        {label}
      </Label>
      <div className="relative flex h-[140px] items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-white sm:h-[163px]">
        {preview ? (
          // Tampilan ketika ada preview gambar
          <>
            <Image
              src={preview}
              alt="Thumbnail preview"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
            <div className="absolute top-1 right-1">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="bg-opacity-50 hover:bg-opacity-75 h-7 w-7 bg-black"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
          </>
        ) : (
          // Tampilan default untuk upload
          <div className="flex flex-col items-center justify-center gap-2 p-3">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <Upload className="h-5 w-5 text-slate-500" />
              <div className="flex flex-col gap-1 text-center">
                <label
                  htmlFor={fileInputId}
                  className="cursor-pointer text-xs text-slate-500 underline"
                >
                  Click to select files
                </label>
                <div className="hidden text-xs text-slate-500 sm:block">
                  {supportText}
                </div>
                <div className="text-xs text-slate-500 sm:hidden">
                  jpg, png, webp
                </div>
              </div>
            </div>
          </div>
        )}
        <input
          id={fileInputId}
          type="file"
          accept={acceptedTypes}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {selectedFile &&
        !preview && ( // Tampilkan nama file jika preview belum siap
          <p className="text-xs text-green-600">
            Selected: {selectedFile.name}
          </p>
        )}
    </div>
  );
}
