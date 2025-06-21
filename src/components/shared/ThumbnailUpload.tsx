import React from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

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
    label = "Thumbnails",
    acceptedTypes = "image/jpeg,image/png",
    supportText = "Support File Type : jpg or png",
    className = "w-[223px]"
}: ThumbnailUploadProps) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        onFileSelect(file || null);
    };

    return (
        <div className={`${className} space-y-1`}>
            <Label className="text-gray-900 text-sm font-medium">{label}</Label>
            <div className="h-[163px] p-3 bg-white rounded-lg border border-slate-300 flex flex-col justify-center items-center gap-2">
                <div className="flex flex-col items-center gap-3">
                    <Upload className="w-5 h-5 text-slate-500" />
                    <div className="flex flex-col gap-1 text-center">
                        <label htmlFor="thumbnail-upload" className="text-slate-500 text-xs underline cursor-pointer">
                            Click to select files
                        </label>
                        <div className="text-slate-500 text-xs">{supportText}</div>
                    </div>
                </div>
                <input
                    id="thumbnail-upload"
                    type="file"
                    accept={acceptedTypes}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {selectedFile && (
                <p className="text-xs text-green-600">Selected: {selectedFile.name}</p>
            )}
        </div>
    );
}
