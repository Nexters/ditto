// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const res = NextResponse.next({ request });
  res.headers.append('x-matched-path', '/testing/[id]');
  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/testing/:path*'],
};
