import { NextRequest, NextResponse } from "next/server";

// Constants defined locally for middleware
const ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  USER_ARTICLES: "/user/articles",
  ADMIN_ARTICLES: "/admin/articles",
} as const;

const STORAGE_KEYS = {
  TOKEN: "content_flow_token",
} as const;

const USER_ROLES = {
  ADMIN: "Admin",
  USER: "User",
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies or localStorage (Note: In middleware, we can only access cookies)
  const token = request.cookies.get(STORAGE_KEYS.TOKEN)?.value;
  const userRole = request.cookies.get("user_role")?.value;

  // Public routes that don't require authentication
  const publicRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, "/"];

  // Admin-only routes
  const adminRoutes = [
    "/admin",
    "/admin/articles",
    "/admin/articles/create",
    "/admin/categories",
    "/admin/categories/create",
    "/admin/profile",
  ];

  // User-only routes
  const userRoutes = ["/user", "/user/articles", "/user/profile"];

  // Check if route is public
  if (publicRoutes.includes(pathname)) {
    // If user is already logged in and tries to access login/register, redirect to appropriate dashboard
    if (token && userRole) {
      if (userRole === USER_ROLES.ADMIN) {
        return NextResponse.redirect(
          new URL(ROUTES.ADMIN_ARTICLES, request.url)
        );
      } else {
        return NextResponse.redirect(
          new URL(ROUTES.USER_ARTICLES, request.url)
        );
      }
    }
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // Check admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (userRole !== USER_ROLES.ADMIN) {
      return NextResponse.redirect(new URL(ROUTES.USER_ARTICLES, request.url));
    }
  }

  // Check user routes
  if (userRoutes.some((route) => pathname.startsWith(route))) {
    if (userRole !== USER_ROLES.USER) {
      return NextResponse.redirect(new URL(ROUTES.ADMIN_ARTICLES, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
