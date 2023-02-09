import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_KAKAO_REFRESH_TOKEN_NAME } from './utils/const';

export function middleware(request: NextRequest) {
  const refresh_token = request.cookies.get(COOKIE_KAKAO_REFRESH_TOKEN_NAME)?.value;
  if (!refresh_token && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
