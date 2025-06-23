import { z } from "zod";

// Article create validation schema
export const articleCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters")
    .trim(),
  content: z
    .string()
    .min(1, "Content is required")
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content must not exceed 10,000 characters")
    .trim(),
  categoryId: z
    .string()
    .min(1, "Category is required")
    .uuid("Invalid category ID format"),
});

// Article update validation schema (all fields optional)
export const articleUpdateSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(200, "Title must not exceed 200 characters")
      .trim()
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(10000, "Content must not exceed 10,000 characters")
      .trim()
      .optional(),
    categoryId: z.string().uuid("Invalid category ID format").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Article filters validation schema
export const articleFiltersSchema = z.object({
  search: z.string().max(100, "Search term too long").optional(),
  category: z.string().uuid("Invalid category ID").optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "title"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().int().min(1, "Page must be at least 1").optional(),
  limit: z
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .optional(),
});

// Export types
export type ArticleCreateFormData = z.infer<typeof articleCreateSchema>;
export type ArticleUpdateFormData = z.infer<typeof articleUpdateSchema>;
export type ArticleFiltersData = z.infer<typeof articleFiltersSchema>;
