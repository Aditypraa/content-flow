import { Category, CategoryListResponse } from '@/types/category';

// Dummy categories data matching API structure
export const dummyCategories: Category[] = [
  {
    id: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
    name: 'Technology',
    userId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    createdAt: '2025-06-23T01:22:05.134Z',
    updatedAt: '2025-06-23T01:22:05.134Z',
  },
  {
    id: 'g1h2i3j4-k5l6-4m7n-8o9p-qrstuvwxyz12',
    name: 'Business',
    userId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    createdAt: '2025-06-22T10:15:00.000Z',
    updatedAt: '2025-06-22T10:15:00.000Z',
  },
  {
    id: 'h2i3j4k5-l6m7-4n8o-9p0q-rstuvwxyzabc',
    name: 'Design',
    userId: 'b2c3d4e5-f6g7-4h8i-9j0k-l1m2n3o4p5q6',
    createdAt: '2025-06-21T08:30:00.000Z',
    updatedAt: '2025-06-21T08:30:00.000Z',
  },
  {
    id: 'i3j4k5l6-m7n8-4o9p-0q1r-stuvwxyzabcd',
    name: 'Marketing',
    userId: 'c3d4e5f6-g7h8-4i9j-0k1l-m2n3o4p5q6r7',
    createdAt: '2025-06-20T16:45:00.000Z',
    updatedAt: '2025-06-20T16:45:00.000Z',
  },
  {
    id: 'j4k5l6m7-n8o9-4p0q-1r2s-tuvwxyzabcde',
    name: 'Development',
    userId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    createdAt: '2025-06-19T12:20:00.000Z',
    updatedAt: '2025-06-19T12:20:00.000Z',
  },
  {
    id: 'k5l6m7n8-o9p0-4q1r-2s3t-uvwxyzabcdef',
    name: 'Lifestyle',
    userId: 'd4e5f6g7-h8i9-4j0k-1l2m-n3o4p5q6r7s8',
    createdAt: '2025-06-18T14:15:00.000Z',
    updatedAt: '2025-06-18T14:15:00.000Z',
  },
];

// Dummy category list response
export const dummyCategoryListResponse: CategoryListResponse = {
  data: dummyCategories,
  totalData: dummyCategories.length,
  currentPage: 1,
  totalPages: 1,
};

// Function to search categories
export function searchCategories(query: string): Category[] {
  const lowercaseQuery = query.toLowerCase();
  return dummyCategories.filter((category) =>
    category.name.toLowerCase().includes(lowercaseQuery),
  );
}

// Function to get paginated categories
export function getPaginatedCategories(
  page: number = 1,
  limit: number = 10,
  search?: string,
): CategoryListResponse {
  let filteredCategories = dummyCategories;

  if (search) {
    filteredCategories = searchCategories(search);
  }

  const totalPages = Math.ceil(filteredCategories.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredCategories.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalData: filteredCategories.length,
    currentPage: page,
    totalPages,
  };
}

// Function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return dummyCategories.find((category) => category.id === id);
}
