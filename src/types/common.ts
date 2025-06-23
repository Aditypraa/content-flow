// Common/shared types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

export interface ErrorState {
  message: string;
  code?: string;
}

// Menu types for navigation
export type AdminMenuKey = "articles" | "categories" | "logout";
export type UserMenuKey = "articles" | "profile" | "logout";

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// Upload types based on API documentation
export interface UploadResponse {
  imageUrl: string;
}

// Generic API error response
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Delete response based on API documentation
export interface DeleteResponse {
  message: string;
}
