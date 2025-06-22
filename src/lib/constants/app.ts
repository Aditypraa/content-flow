// Application constants
export const APP_NAME = "Content Flow";

// Menu constants
export const ADMIN_MENU_ITEMS = [
  {
    key: "articles" as const,
    label: "Articles",
    href: "/admin/articles",
  },
  {
    key: "categories" as const,
    label: "Category",
    href: "/admin/categories",
  },
  {
    key: "logout" as const,
    label: "Logout",
    href: "/auth/login",
  },
];

// Article status constants
export const ARTICLE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
