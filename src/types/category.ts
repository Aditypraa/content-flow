// Category related types based on API documentation
export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreateData {
  name: string;
}

export interface CategoryUpdateData {
  name?: string;
}

export interface CategoryFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CategoryListResponse {
  data: Category[];
  totalData: number;
  currentPage: number;
  totalPages: number;
}
