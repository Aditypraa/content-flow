import { z } from "zod";

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Please select a file" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "Only JPEG, PNG, and WebP images are allowed"
    ),
});

// Search validation schema with debounce
export const searchSchema = z.object({
  query: z.string().max(100, "Search query too long").trim().optional(),
});

// Pagination validation schema
export const paginationSchema = z.object({
  page: z.number().int().min(1, "Page must be at least 1").default(1),
  limit: z
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});

// General ID validation schema
export const idSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

// URL parameters validation schema
export const urlParamsSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

// Delete confirmation validation schema
export const deleteConfirmationSchema = z.object({
  confirmed: z.boolean().refine((val) => val === true, {
    message: "Please confirm the deletion",
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
export type SearchData = z.infer<typeof searchSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
export type IdData = z.infer<typeof idSchema>;
export type UrlParamsData = z.infer<typeof urlParamsSchema>;
export type DeleteConfirmationData = z.infer<typeof deleteConfirmationSchema>;
export type ApiResponseData = z.infer<typeof apiResponseSchema>;
