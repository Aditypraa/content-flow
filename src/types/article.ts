// Article related types based on API documentation
export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  // Nested objects from API response
  category?: {
    id: string;
    name: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  user?: {
    id: string;
    username: string;
    role?: string;
  };
}

export interface ArticleCreateData {
  title: string;
  content: string;
  categoryId: string;
}

export interface ArticleUpdateData {
  title?: string;
  content?: string;
  categoryId?: string;
}

export interface ArticleFilters {
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ArticleListResponse {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}
