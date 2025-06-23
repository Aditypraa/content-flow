import { Article, ArticleListResponse } from '@/types/article';

// Dummy articles data matching API structure
export const dummyArticles: Article[] = [
  {
    id: '9z8y7x6w-5v4u-4t3s-2r1q-p0o9n8m7l6k5',
    title: "Figma's New Dev Mode: A Game-Changer for Designers & Developers",
    content: `Figma's new Dev Mode is revolutionizing the way designers and developers collaborate. This comprehensive guide explores how this feature bridges the gap between design and development, making handoffs smoother and more efficient.

## What is Dev Mode?

Dev Mode in Figma is a specialized interface that provides developers with all the information they need to implement designs accurately. It includes specifications, code snippets, and assets in a developer-friendly format.

## Key Features

1. **Code Generation**: Automatically generates CSS, iOS, and Android code
2. **Asset Export**: Easy access to optimized assets
3. **Specifications**: Detailed measurements and properties
4. **Component Documentation**: Clear component structure and variants

## Benefits for Teams

- Reduced back-and-forth communication
- Faster implementation times
- Improved design consistency
- Better developer experience

This tool is essential for modern design-to-development workflows and significantly improves team productivity.`,
    userId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    categoryId: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
    createdAt: '2025-06-23T01:25:15.090Z',
    updatedAt: '2025-06-23T01:25:15.090Z',
    category: {
      id: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
      name: 'Technology',
    },
    user: {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      username: 'admin_user',
    },
  },
  {
    id: '8x7w6v5u-4t3s-2r1q-p0o9-n8m7l6k5j4i3',
    title: '10 UI Design Trends Dominating 2025',
    content: `The UI design landscape is constantly evolving, and 2025 brings exciting new trends that are reshaping how we create digital experiences. From advanced micro-interactions to AI-powered design systems, this year promises to be revolutionary.

## Top Trends to Watch

1. **Neumorphism Evolution**: Soft UI elements with improved accessibility
2. **AI-Generated Assets**: Automated design element creation
3. **Voice Interface Integration**: Seamless voice-to-visual interactions
4. **Sustainable Design**: Eco-friendly color palettes and energy-efficient layouts
5. **Advanced Micro-interactions**: Sophisticated animations that enhance UX

## Implementation Tips

- Start with accessibility-first design principles
- Test new trends with user feedback
- Balance innovation with usability
- Consider performance implications

These trends represent a shift towards more intuitive, accessible, and sustainable design practices.`,
    userId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    categoryId: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
    createdAt: '2025-06-22T15:30:00.000Z',
    updatedAt: '2025-06-22T15:30:00.000Z',
    category: {
      id: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
      name: 'Technology',
    },
    user: {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      username: 'admin_user',
    },
  },
  {
    id: '7w6v5u4t-3s2r-1q0p-o9n8-m7l6k5j4i3h2',
    title: 'Building Scalable Web Applications with React',
    content: `React has become the go-to framework for building modern web applications. This comprehensive guide covers best practices for creating scalable, maintainable React applications that can grow with your business needs.

## Architecture Principles

### Component Design
- Single Responsibility Principle
- Reusable component libraries
- Proper state management
- Performance optimization

### State Management
- Context API for global state
- Custom hooks for complex logic
- Redux for enterprise applications
- Server state with React Query

## Performance Optimization

1. **Code Splitting**: Reduce initial bundle size
2. **Lazy Loading**: Load components on demand
3. **Memoization**: Prevent unnecessary re-renders
4. **Virtual DOM Optimization**: Efficient update patterns

## Best Practices

- Follow consistent file structure
- Implement proper error boundaries
- Use TypeScript for type safety
- Write comprehensive tests

Building scalable React applications requires careful planning and adherence to proven patterns and practices.`,
    userId: 'b2c3d4e5-f6g7-4h8i-9j0k-l1m2n3o4p5q6',
    categoryId: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
    createdAt: '2025-06-21T10:15:00.000Z',
    updatedAt: '2025-06-21T10:15:00.000Z',
    category: {
      id: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
      name: 'Technology',
    },
    user: {
      id: 'b2c3d4e5-f6g7-4h8i-9j0k-l1m2n3o4p5q6',
      username: 'tech_writer',
    },
  },
  {
    id: '6v5u4t3s-2r1q-0p9o-n8m7-l6k5j4i3h2g1',
    title: 'The Future of Remote Work: Digital Tools and Collaboration',
    content: `Remote work has transformed from a temporary solution to a permanent fixture in the modern workplace. This article explores the digital tools and collaboration strategies that are shaping the future of distributed teams.

## Essential Digital Tools

### Communication Platforms
- Video conferencing solutions
- Asynchronous messaging apps
- Virtual whiteboarding tools
- Project management platforms

### Collaboration Software
- Real-time document editing
- Version control systems
- Design collaboration tools
- Code review platforms

## Building Remote Culture

1. **Clear Communication**: Establish protocols and expectations
2. **Regular Check-ins**: Maintain team connection
3. **Flexible Schedules**: Accommodate different time zones
4. **Digital Wellness**: Prevent burnout and promote balance

## Future Trends

- Virtual reality meetings
- AI-powered productivity assistants
- Enhanced security protocols
- Hybrid work optimization

The future of work is digital, distributed, and more flexible than ever before.`,
    userId: 'c3d4e5f6-g7h8-4i9j-0k1l-m2n3o4p5q6r7',
    categoryId: 'g1h2i3j4-k5l6-4m7n-8o9p-qrstuvwxyz12',
    createdAt: '2025-06-20T14:45:00.000Z',
    updatedAt: '2025-06-20T14:45:00.000Z',
    category: {
      id: 'g1h2i3j4-k5l6-4m7n-8o9p-qrstuvwxyz12',
      name: 'Business',
    },
    user: {
      id: 'c3d4e5f6-g7h8-4i9j-0k1l-m2n3o4p5q6r7',
      username: 'business_expert',
    },
  },
  {
    id: '5u4t3s2r-1q0p-o9n8-m7l6-k5j4i3h2g1f0',
    title: 'Cybersecurity Essentials for Modern Developers',
    content: `In today's digital landscape, cybersecurity is not just an IT department concern—it's a fundamental responsibility for every developer. This guide covers essential security practices that every developer should implement.

## Core Security Principles

### Input Validation
- Sanitize all user inputs
- Implement proper validation rules
- Use parameterized queries
- Validate on both client and server

### Authentication & Authorization
- Strong password policies
- Multi-factor authentication
- JWT token management
- Role-based access control

## Common Vulnerabilities

1. **SQL Injection**: Prevent with parameterized queries
2. **XSS Attacks**: Sanitize user inputs and outputs
3. **CSRF**: Implement proper token validation
4. **Insecure Dependencies**: Regular security updates

## Security Best Practices

- Regular security audits
- Automated vulnerability scanning
- Secure coding standards
- Incident response planning

Security is an ongoing process that requires constant vigilance and continuous learning.`,
    userId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    categoryId: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
    createdAt: '2025-06-19T09:20:00.000Z',
    updatedAt: '2025-06-19T09:20:00.000Z',
    category: {
      id: 'f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d',
      name: 'Technology',
    },
    user: {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      username: 'admin_user',
    },
  },
];

// Dummy article list response
export const dummyArticleListResponse: ArticleListResponse = {
  data: dummyArticles,
  total: dummyArticles.length,
  page: 1,
  limit: 10,
};

// Function to get articles by category
export function getArticlesByCategory(categoryId: string): Article[] {
  return dummyArticles.filter((article) => article.categoryId === categoryId);
}

// Function to search articles
export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return dummyArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.category?.name.toLowerCase().includes(lowercaseQuery),
  );
}

// Function to get paginated articles
export function getPaginatedArticles(
  page: number = 1,
  limit: number = 10,
  categoryId?: string,
  search?: string,
): ArticleListResponse {
  let filteredArticles = dummyArticles;

  if (categoryId) {
    filteredArticles = getArticlesByCategory(categoryId);
  }

  if (search) {
    filteredArticles = searchArticles(search);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredArticles.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filteredArticles.length,
    page,
    limit,
  };
}
