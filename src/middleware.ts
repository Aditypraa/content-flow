// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ambil token dan role dari cookies
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value;

  // 2. Definisikan rute-rute penting
  const isAuthPage = pathname.startsWith('/auth');
  const isAdminPage = pathname.startsWith('/admin');
  const isUserPage = pathname.startsWith('/user');

  if (token && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = role === 'Admin' ? '/admin/articles' : '/user/articles';
    return NextResponse.redirect(url);
  }

  if (!token && (isAdminPage || isUserPage)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(url);
  }

  if (token && role === 'User' && isAdminPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/user/articles';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Konfigurasi matcher (sudah benar)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
