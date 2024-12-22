import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('refresh_token')?.value;

  // List of public paths that don't require authentication
  const publicPaths = [
    '/auth/register',
    '/auth/login',
    '/auth/reset',
    '/auth/verify',
    '/auth/update-password',
  ];

  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // If there's no auth token and the path is not public, redirect to login
  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If there is an auth token and the user is on a public path, redirect to home
  if (authToken && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
