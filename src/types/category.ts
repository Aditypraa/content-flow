// Category related types
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreateData {
  name: string;
  description?: string;
}

export interface CategoryUpdateData extends Partial<CategoryCreateData> {
  id: string;
}

export interface CategoryFilters {
  search?: string;
}
