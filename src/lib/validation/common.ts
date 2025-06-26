import { z } from 'zod';

// Supported image file types and constants
const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;
type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];
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

// Search validation schema with debounce
export const searchSchema = z.object({
  query: z.string().max(100, 'Search query too long').trim().optional(),
});

// Pagination validation schema
export const paginationSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').default(1),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(10),
});

// General ID validation schema
export const idSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// URL parameters validation schema
export const urlParamsSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

// Delete confirmation validation schema
export const deleteConfirmationSchema = z.object({
  confirmed: z.boolean().refine((val) => val === true, {
    message: 'Please confirm the deletion',
  }),
});

// API response validation schema
export const apiResponseSchema = z.object({
  message: z.string(),
  success: z.boolean().optional(),
  data: z.any().optional(),
});

// Export types
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type MultipleFilesUploadData = z.infer<typeof multipleFilesUploadSchema>;
export type ImageUrlData = z.infer<typeof imageUrlSchema>;
export type SearchData = z.infer<typeof searchSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
export type IdData = z.infer<typeof idSchema>;
export type UrlParamsData = z.infer<typeof urlParamsSchema>;
export type DeleteConfirmationData = z.infer<typeof deleteConfirmationSchema>;
export type ApiResponseData = z.infer<typeof apiResponseSchema>;

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
