import { z } from "zod";

// Category create validation schema
export const categoryCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters")
    .trim()
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Category name can only contain letters, numbers, spaces, hyphens, and underscores"
    ),
});

// Category update validation schema
export const categoryUpdateSchema = z
  .object({
    name: z
      .string()
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name must not exceed 50 characters")
      .trim()
      .regex(
        /^[a-zA-Z0-9\s\-_]+$/,
        "Category name can only contain letters, numbers, spaces, hyphens, and underscores"
      )
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Category filters validation schema
export const categoryFiltersSchema = z.object({
  search: z.string().max(100, "Search term too long").optional(),
  page: z.number().int().min(1, "Page must be at least 1").optional(),
  limit: z
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .optional(),
});

// Export types
export type CategoryCreateFormData = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateFormData = z.infer<typeof categoryUpdateSchema>;
export type CategoryFiltersData = z.infer<typeof categoryFiltersSchema>;
