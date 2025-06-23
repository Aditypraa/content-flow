import { z } from 'zod';

// Supported image file types
const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;
type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.size > 0, {
      message: 'File cannot be empty',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    })
    .refine(
      (file) => SUPPORTED_IMAGE_TYPES.includes(file.type as SupportedImageType),
      {
        message: 'Only JPEG, PNG, and WebP images are supported',
      },
    ),
});

// Multiple files upload validation schema
export const multipleFilesUploadSchema = z.object({
  files: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size > 0, {
          message: 'File cannot be empty',
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `File size must be less than ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB`,
        })
        .refine(
          (file) =>
            SUPPORTED_IMAGE_TYPES.includes(file.type as SupportedImageType),
          {
            message: 'Only JPEG, PNG, and WebP images are supported',
          },
        ),
    )
    .min(1, 'At least one file is required')
    .max(5, 'Maximum 5 files allowed'),
});

// Image URL validation schema (for validating URLs returned from upload)
export const imageUrlSchema = z.object({
  imageUrl: z
    .string()
    .url('Invalid image URL')
    .regex(
      /\.(jpeg|jpg|png|webp)(\?.*)?$/i,
      'URL must point to a valid image file (JPEG, PNG, or WebP)',
    ),
});

// Form data for file upload (multipart/form-data)
export const uploadFormDataSchema = z.object({
  // Note: In actual usage, this would be handled by FormData
  // This schema is more for type inference and client-side validation
  file: z.instanceof(File).optional(),
  description: z.string().max(255, 'Description too long').optional(),
  alt: z.string().max(100, 'Alt text too long').optional(),
});

// Export types
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type MultipleFilesUploadData = z.infer<typeof multipleFilesUploadSchema>;
export type ImageUrlData = z.infer<typeof imageUrlSchema>;
export type UploadFormData = z.infer<typeof uploadFormDataSchema>;

// Helper function to validate file on client side
export const validateImageFile = (
  file: File,
): { isValid: boolean; error?: string } => {
  try {
    fileUploadSchema.parse({ file });
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: 'Invalid file' };
  }
};

// Helper function to create FormData for upload
export const createUploadFormData = (
  file: File,
  options?: { description?: string; alt?: string },
): FormData => {
  const formData = new FormData();
  formData.append('file', file);

  if (options?.description) {
    formData.append('description', options.description);
  }

  if (options?.alt) {
    formData.append('alt', options.alt);
  }

  return formData;
};
