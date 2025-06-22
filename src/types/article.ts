// Article related types
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  categoryId: string;
  authorId: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ArticleCreateData {
  title: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  categoryId: string;
  status: "draft" | "published";
}

export interface ArticleUpdateData extends Partial<ArticleCreateData> {
  id: string;
}

export interface ArticleFilters {
  search?: string;
  category?: string;
  status?: "draft" | "published" | "archived";
  author?: string;
}

export interface ArticlePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
