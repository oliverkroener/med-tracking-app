import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create i18n middleware with specific configuration
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle API and auth routes first (no i18n)
  if (pathname.startsWith('/api/') || pathname.startsWith('/auth/')) {
    // Check authentication for protected routes
    if (pathname.startsWith('/api/protected')) {
      const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!session) {
        return new NextResponse(null, { status: 401 });
      }
    }
    return NextResponse.next();
  }

  // Handle portal routes
  if (pathname.startsWith('/portal')) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      const signInUrl = new URL('/auth/signin', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Use i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/api/:path*',
    '/auth/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};